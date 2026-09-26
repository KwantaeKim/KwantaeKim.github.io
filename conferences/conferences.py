"""
# Conferences renderer

Reads `./conf_<sheet>.json` (source of truth) and writes:
- `./conf_<sheet>.html` — MapLibre maps in this directory (same dark
  OpenFreeMap style as ../worldmap.html, no API key)
- `../_includes/conferences_<sheet>_table.md` — Jekyll table includes
"""

import re, glob, json, pandas as pd

# conf_<sheet>.json -> maps + table includes
MAP_HTML = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Conferences</title>
<link href="https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.css" rel="stylesheet">
<script src="https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.js"></script>
<link rel="stylesheet" type="text/css" href="../emoji.css">
<style>
  html, body { margin:0; padding:0; height:100%; overflow:hidden; background:#0B0F14; }
  #map { position:absolute; top:0; bottom:0; left:0; right:0; }
  .pin { width:14px; height:14px; border-radius:50%; background:#00E0C6; cursor:pointer;
    box-shadow:0 0 0 6px #00E0C633, 0 0 0 13px #00E0C61a, 0 0 22px #00E0C6; }
  .maplibregl-popup-content { background:#0B0F14; color:#E8EDF2; border:1px solid rgba(255,255,255,.15);
    border-radius:9px; padding:12px 14px; box-shadow:0 6px 26px rgba(0,0,0,.6);
    font-family:"Trebuchet MS",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
    font-size:15px; line-height:1.45; }
  .maplibregl-popup-content .place { opacity:.7; font-size:13px; }
  .maplibregl-popup-tip { border-top-color:#0B0F14; border-bottom-color:#0B0F14; }
</style>
</head>
<body>
<div id="map"></div>
<script>
const CONFS = __CONFS__;
const C = { bg:"#0B0F14", water:"#122430", road:"#1B2733",
            tiles:"https://tiles.openfreemap.org/planet",
            glyphs:"https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf" };

// Dark vector style on OpenFreeMap tiles, copied from ../worldmap.html.
const style = {
  version: 8,
  glyphs: C.glyphs,
  sources: { of: { type:"vector", url: C.tiles } },
  layers: [
    { id:"bg", type:"background", paint:{ "background-color": C.bg } },
    { id:"water", type:"fill", source:"of", "source-layer":"water",
      paint:{ "fill-color":["interpolate",["linear"],["zoom"], 6,"#1B3A52", 12,C.water] } },
    { id:"landcover", type:"fill", source:"of", "source-layer":"landcover", maxzoom:13,
      filter:["in",["get","class"],["literal",["wood","forest","grass","farmland","wetland"]]],
      paint:{ "fill-color":"#12211C",
        "fill-opacity":["interpolate",["linear"],["zoom"], 8,0.85, 12,0] } },
    { id:"towns", type:"fill", source:"of", "source-layer":"landuse", maxzoom:13,
      filter:["in",["get","class"],["literal",["residential","commercial","industrial","retail"]]],
      paint:{ "fill-color":"#24374A",
        "fill-opacity":["interpolate",["linear"],["zoom"], 6,0.9, 12,0] } },
    { id:"borders", type:"line", source:"of", "source-layer":"boundary",
      filter:["all",["<=",["get","admin_level"],4],["!=",["get","maritime"],1]],
      paint:{ "line-color":"#31424F",
        "line-width":["case",["<=",["get","admin_level"],2], 1.2, 0.5],
        "line-opacity":["case",["<=",["get","admin_level"],2], 1, 0.4] } },
    { id:"roads", type:"line", source:"of", "source-layer":"transportation", minzoom:6,
      paint:{ "line-color":C.road,
        "line-width":["interpolate",["linear"],["zoom"], 6,0.4, 12,1.0, 18,4] } },
    { id:"places", type:"symbol", source:"of", "source-layer":"place",
      filter:["in",["get","class"],["literal",["country","city"]]],
      layout:{ "text-field":["coalesce",["get","name:en"],["get","name"]], "text-font":["Noto Sans Regular"],
        "text-size":["interpolate",["linear"],["zoom"], 2,10, 8,13] },
      paint:{ "text-color":"#7E92A3", "text-halo-color":C.bg, "text-halo-width":1.2 } },
  ],
};

const map = new maplibregl.Map({
  container:"map", style: style, center:[20, 30], zoom: 1,
  attributionControl:{ compact:true },
});
map.addControl(new maplibregl.NavigationControl({ showCompass:false }), "top-left");
map.addControl(new maplibregl.FullscreenControl(), "top-right");
map.scrollZoom.disable();  // let the page scroll past the iframe instead of zooming

// One pin per conference; hovering shows the same text the old Folium tooltip had.
const bounds = new maplibregl.LngLatBounds(), popups = [];
CONFS.forEach(c => {
  bounds.extend([c.lon, c.lat]);
  const el = document.createElement("div");
  el.className = "pin";
  const popup = new maplibregl.Popup({ anchor:"bottom", offset:14, closeButton:false, closeOnClick:false })
    .setLngLat([c.lon, c.lat])
    .setHTML('<b>' + c.organization + ' ' + c.name + ' ' + c.year + '</b><br>' +
             '<span class="place">' + c.city + '<br>' + c.region +
             ' <span class="emoji">' + c.region_flag + '</span></span>');
  popups.push(popup);
  el.addEventListener("mouseenter", () => popup.addTo(map));
  el.addEventListener("mouseleave", () => popup.remove());
  new maplibregl.Marker({ element: el }).setLngLat([c.lon, c.lat]).addTo(map);
});
map.fitBounds(bounds, { padding: 50, maxZoom: 3, duration: 0 });

// The conferences page posts {type:"conf-fly", name, year} when a table row is
// clicked: fly to that conference's pin and show its tooltip.
window.addEventListener("message", e => {
  const d = e.data || {};
  if (d.type !== "conf-fly") return;
  const i = CONFS.findIndex(c => c.name === d.name && c.year === d.year);
  if (i < 0) return;
  popups.forEach(p => p.remove());
  map.once("moveend", () => popups[i].addTo(map));
  map.flyTo({ center:[CONFS[i].lon, CONFS[i].lat], zoom: 6, duration: 2500, essential: true });
});

// Start the attribution collapsed to the "i" button; it still opens on click.
map.on("load", () => {
  document.querySelectorAll(".maplibregl-ctrl-attrib.maplibregl-compact")
    .forEach(el => el.classList.remove("maplibregl-compact-show"));
});
</script>
</body>
</html>
"""
TABLE_CSS = (
  '<style>'
  '.content table{width:100%;max-width:100%;overflow-x:auto;display:block;border-collapse:collapse}'
  '.content th,.content td{padding:8px;text-align:left;vertical-align:top}'
  '.content th:nth-child(1),.content td:nth-child(1){width:17%}'
  '.content th:nth-child(2),.content td:nth-child(2){width:13%;white-space:nowrap}'
  '.content th:nth-child(3),.content td:nth-child(3){width:22%;white-space:nowrap}'
  '.content th:nth-child(4),.content td:nth-child(4){width:28%}'
  '.content th:nth-child(5),.content td:nth-child(5){width:20%}'
  '.content tr:has(.conf-pin){cursor:pointer}'
  '.content tr:has(.conf-pin):hover{background:rgba(0,224,198,.12)}'
  '</style>\n'
)
HEADER = ("| <i class='fa-solid fa-microchip fa-xl'></i> **Conferences**"
          "| <i class='fa-solid fa-clock fa-lg'></i> **Deadline**"
          "| <i class='fa-solid fa-calendar-days fa-lg'></i> **Dates**"
          "| <i class='fa-solid fa-hotel fa-lg'></i> **Venue**"
          "| <i class='fa-solid fa-location-dot fa-lg'></i> **Region** |\n")

def fmt_date(d, strike=False, start=True):
  if d == 'false' or not d: return '-'
  ts = pd.to_datetime(d); s = ts.strftime('%d.%b.%Y') + ('-' if start else '')
  return f"<span style='color:#d3d3d3;{'text-decoration:line-through;' if strike else ''}'>{s}</span>" if ts < pd.Timestamp.now() else s

def map_records(df):
  recs = []
  for _, r in df.iterrows():
    lat, lon = map(float, r['coordinate'].split(', '))
    recs.append({k: r[k] for k in ['organization', 'name', 'year', 'city', 'region', 'region_flag']} | {'lat': lat, 'lon': lon})
  return recs

paths = sorted(glob.glob('./conf_*.json'))
sheets = [re.search(r'conf_(.+)\.json$', p).group(1) for p in paths]
dfs = {s: pd.read_json(p) for s, p in zip(sheets, paths)}

for sheet in sheets:
  confs = json.dumps(map_records(dfs[sheet]), ensure_ascii=False, default=int)
  open(f'./conf_{sheet}.html', 'w').write(MAP_HTML.replace('__CONFS__', confs))

for sheet in sheets:
  if sheet == 'sscs': continue
  dfs[sheet] = dfs[sheet].assign(date_start=pd.to_datetime(dfs[sheet]['date_start'], errors='coerce')).sort_values('date_start').reset_index(drop=True)

for sheet, df in dfs.items():
  rows = HEADER
  for _, r in df.iterrows():
    venue = r['city'] if r['venue'] == 'false' else r['venue']
    # Hidden marker the conferences page reads to fly the map to this row's pin.
    pin = f"<span class='conf-pin' data-sheet='{sheet}' data-name='{r['name']}' data-year='{r['year']}'></span>"
    rows += (f"| <a href='{r['webpage']}' target=_blank> {r['name']} </a>{pin} | "
             f"{fmt_date(r['submission'], True, False)} | "
             f"{fmt_date(r['date_start'], True)}{fmt_date(r['date_end'], True, False)} | "
             f"{venue} | {r['region']} <span class='emoji'>{r['region_flag']}</span> |\n ")
  open(f'../_includes/conferences_{sheet}_table.md', 'w').write(TABLE_CSS + '\n' + rows)
