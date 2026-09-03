"""Fetch building outlines for the partner map and cache them in _data/partner_footprints.json.

Same approach as map_Kor-Fin/map_explore.ipynb: outlines come from OpenStreetMap via
Overpass, keyed by coordinate, so moving a pin in _data/partners.yml refetches it.
Delete the JSON to refetch everything. Run manually after editing partners.yml; the
result is committed, so the site build never depends on Overpass.
"""

import json, math, re, time, urllib.parse, urllib.request
from pathlib import Path
import yaml

PARTNERS = Path('_data/partners.yml')
FOOT_FILE = Path('_data/partner_footprints.json')
OVERPASS = 'https://overpass-api.de/api/interpreter'


def _num(s):
  m = re.search(r"-?\d+(\.\d+)?", str(s or ""))
  return float(m.group()) if m else None


def _inside(pt, ring):
  x, y = pt
  inside = False
  for i in range(len(ring)):
    (xi, yi), (xj, yj) = ring[i], ring[i - 1]
    if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
      inside = not inside
  return inside


def _stitch(segments):
  """Join open way segments end-to-end into closed rings (multipolygon outers)."""
  segs, rings = [list(s) for s in segments], []
  while segs:
    ring = segs.pop(0)
    while ring[0] != ring[-1] and segs:
      for k, s in enumerate(segs):
        if s[0] == ring[-1]:    ring += s[1:];              break
        if s[-1] == ring[-1]:   ring += s[-2::-1];          break
        if s[-1] == ring[0]:    ring = s[:-1] + ring;       break
        if s[0] == ring[0]:     ring = s[::-1][:-1] + ring; break
      else:
        break
      segs.pop(k)
    if ring[0] == ring[-1] and len(ring) >= 4:
      rings.append(ring)
  return rings


def _fetch_footprint(lat, lon):
  # "around" measures distance to a building's outline, so use a wide radius and let
  # the point-in-polygon test below pick the building the pin is actually inside.
  q = (f'[out:json][timeout:25];(way(around:120,{lat},{lon})["building"];'
       f'relation(around:120,{lat},{lon})["building"];);out geom;')
  req = urllib.request.Request(OVERPASS, data=urllib.parse.urlencode({'data': q}).encode(),
                               headers={'User-Agent': 'tsirc-partner-map/1.0'})
  for attempt in range(4):
    try:
      els = json.load(urllib.request.urlopen(req, timeout=90))['elements']
      break
    except urllib.error.HTTPError as e:
      if e.code not in (429, 504) or attempt == 3:
        raise
      time.sleep(20 * (attempt + 1))   # rate limited: back off and retry

  cands = []
  for el in els:
    rings = []
    if el['type'] == 'way' and el.get('geometry'):
      rings = [[(p['lon'], p['lat']) for p in el['geometry']]]
    elif el['type'] == 'relation':
      mem = [m for m in el.get('members', []) if m.get('geometry')]
      outer = _stitch([[(p['lon'], p['lat']) for p in m['geometry']]
                       for m in mem if m.get('role') == 'outer'])
      if outer:   # largest outer ring; holes become inner rings
        rings = [max(outer, key=len)]
        rings += [[(p['lon'], p['lat']) for p in m['geometry']]
                  for m in mem if m.get('role') == 'inner']
    if len(rings) and len(rings[0]) >= 4:
      cands.append((rings, el.get('tags', {})))
  if not cands:
    return None

  # Several buildings can contain the point (an unnamed part drawn inside a larger
  # outline). Take the largest, which is the building proper rather than a wing.
  def area(c):
    r = c[0][0]
    return abs(sum(r[i][0] * r[i - 1][1] - r[i - 1][0] * r[i][1] for i in range(len(r)))) / 2
  contains = [c for c in cands if _inside((lon, lat), c[0][0])]
  pick = max(contains, key=area) if contains else None
  if pick is None:
    # Not inside any outline: accept a building only if a wall is within ~8 m,
    # otherwise return None (no highlight) rather than lighting up a neighbour.
    def dist_m(c):
      return min(((x - lon) * 111320 * math.cos(math.radians(lat))) ** 2 + ((y - lat) * 111320) ** 2
                 for x, y in c[0][0]) ** 0.5
    near = min(cands, key=dist_m)
    if dist_m(near) > 8:
      return None
    pick = near

  rings, t = pick
  lv, mlv = _num(t.get('building:levels')), _num(t.get('building:min_level'))
  h = _num(t.get('height')) or (lv * 3.66 if lv else 5.0)          # OpenMapTiles' rule
  b = _num(t.get('min_height')) or (mlv * 3.66 if mlv else 0.0)
  return {'h': h, 'b': b, 'rings': rings,
          'name': t.get('name') or t.get('addr:housename')}


partners = yaml.safe_load(PARTNERS.read_text())
cache = json.loads(FOOT_FILE.read_text()) if FOOT_FILE.exists() else {}
for p in partners:
  key = f"{p['lat']:.5f},{p['lon']:.5f}"
  if key in cache:
    continue
  try:
    cache[key] = _fetch_footprint(p['lat'], p['lon'])
    got = cache[key]['name'] if cache[key] else 'no building found'
    print(f"{p['name']:20} {key:22} -> {got}")
  except Exception as e:
    print(f"{p['name']:20} {key:22} -> FAILED ({e})")
  time.sleep(3)

FOOT_FILE.write_text(json.dumps(cache))
hit = sum(1 for p in partners if cache.get(f"{p['lat']:.5f},{p['lon']:.5f}"))
print(f"{hit} of {len(partners)} partners have a footprint")
