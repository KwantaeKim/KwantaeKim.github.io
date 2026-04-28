"""
# Conferences renderer

Reads `./conf_<sheet>.json` (source of truth) and writes:
- `./conf_<sheet>.html` — Folium maps in this directory
- `../_includes/conferences_<sheet>_table.md` — Jekyll table includes
"""

import re, glob, pandas as pd, folium
from folium.plugins import Fullscreen, Geocoder

# conf_<sheet>.json -> maps + table includes
EMOJI_CSS = '<link rel="stylesheet" type="text/css" href="../emoji.css">'
MAP_CSS = '<style>.leaflet-container { height: 100% !important; }</style>'
TABLE_CSS = (
  '<style>'
  '.content table{width:100%;max-width:100%;overflow-x:auto;display:block;border-collapse:collapse}'
  '.content th,.content td{padding:8px;text-align:left;vertical-align:top}'
  '.content th:nth-child(1),.content td:nth-child(1){width:17%}'
  '.content th:nth-child(2),.content td:nth-child(2){width:13%;white-space:nowrap}'
  '.content th:nth-child(3),.content td:nth-child(3){width:22%;white-space:nowrap}'
  '.content th:nth-child(4),.content td:nth-child(4){width:28%}'
  '.content th:nth-child(5),.content td:nth-child(5){width:20%}'
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

def add_markers(df, fmap):
  for _, r in df.iterrows():
    coords = tuple(map(float, r['coordinate'].split(', ')))
    tip = (f'<div style="display:flex;align-items:center;height:100%"><div style="text-align:left;font-family:Trebuchet MS;font-size:1.5em">'
           f'<b>{r["organization"]} {r["name"]} {r["year"]}</b><br>{r["city"]}<br>{r["region"]} <span class="emoji">{r["region_flag"]}</span></div></div>')
    folium.Marker(coords, tooltip=tip, icon=folium.Icon(icon='fa-user', prefix='fa', color=r.get('color', 'blue'))).add_to(fmap)

paths = sorted(glob.glob('./conf_*.json'))
sheets = [re.search(r'conf_(.+)\.json$', p).group(1) for p in paths]
dfs = {s: pd.read_json(p) for s, p in zip(sheets, paths)}
MAP_CFG = dict(location=[40, -15], zoom_start=2, prefer_canvas=True, lang='en', tiles='cartodbpositron')

for sheet in sheets:
  m = folium.Map(**MAP_CFG)
  add_markers(dfs[sheet], m)
  Geocoder().add_to(m)
  Fullscreen(position='topright', title='Expand me', title_cancel='Exit me', force_separate_button=True).add_to(m)
  m.get_root().html.add_child(folium.Element(MAP_CSS))
  fp = f'./conf_{sheet}.html'
  m.save(fp)
  html = open(fp).read()
  open(fp, 'w').write(html.replace('</head>', EMOJI_CSS + '</head>', 1))

for sheet in sheets:
  if sheet == 'sscs': continue
  dfs[sheet] = dfs[sheet].assign(date_start=pd.to_datetime(dfs[sheet]['date_start'], errors='coerce')).sort_values('date_start').reset_index(drop=True)

for sheet, df in dfs.items():
  rows = HEADER
  for _, r in df.iterrows():
    venue = r['city'] if r['venue'] == 'false' else r['venue']
    rows += (f"| <a href='{r['webpage']}' target=_blank> {r['name']} </a> | "
             f"{fmt_date(r['submission'], True, False)} | "
             f"{fmt_date(r['date_start'], True)}{fmt_date(r['date_end'], True, False)} | "
             f"{venue} | {r['region']} <span class='emoji'>{r['region_flag']}</span> |\n ")
  open(f'../_includes/conferences_{sheet}_table.md', 'w').write(TABLE_CSS + '\n' + rows)
