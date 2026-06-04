"""Fetch the public GA sheet and write visitor.html + visitor_last_update.json.

Run during the Jekyll build (incl. the daily cron) so the page refreshes
without a push. On fetch/parse failure the previous files are left untouched.
"""

import sys, json, base64
from datetime import datetime
from pathlib import Path
import pandas as pd
import plotly.graph_objects as go
import flag

CSV_URL = 'https://docs.google.com/spreadsheets/d/1am_8aCNAUhJyobSD_YbH68V478vy0JWNaHgq1mBe59A/export?gid=0&format=csv'

try:
  df = pd.read_csv(CSV_URL)
  if not {'country', 'countryId', 'active1DayUsers'}.issubset(df.columns):
    raise ValueError(f"unexpected columns: {list(df.columns)}")
except Exception as e:
  sys.exit(f"visitor.py: keeping last good output, fetch/parse failed: {e}")

df = df.dropna(subset=['countryId'])
total_visitors = int(df['active1DayUsers'].sum())
last_update = datetime.now().strftime("%d.%b.%Y")
df['country'] += '   '  # pad names
df = df.sort_values('active1DayUsers', ascending=False).head(15)

fig = go.Figure(go.Bar(
  y=df['country'],
  x=df['active1DayUsers'] + 150,            # pad for layout
  customdata=df['active1DayUsers'].values,  # real values for hover
  orientation='h', marker=dict(color='#02343F'), hoverinfo='none',
  hovertemplate='<b>%{y}</b><br><b>%{customdata:,}</b><br><extra></extra>',
))
fig.update_layout(
  hoverlabel=dict(font_size=16, font_family='Trebuchet MS'),
  yaxis_title=None,
  xaxis=dict(showgrid=False, showticklabels=False,
             range=[0, df['active1DayUsers'].max() * 1.4]),  # headroom so enlarged mobile flags aren't clipped
  yaxis=dict(autorange='reversed'),
  margin=dict(t=0, b=0),
  font=dict(family='Trebuchet MS', size=16, color='black'),
  plot_bgcolor='rgba(0,0,0,0)', dragmode=False,
)

for _, r in df.iterrows():
  n = r['active1DayUsers']
  png = Path('./images/country-flags') / f"{r['countryId']}.png"
  if png.exists():
    uri = 'data:image/png;base64,' + base64.b64encode(png.read_bytes()).decode()
    fig.add_layout_image(dict(source=uri, xref='x', yref='y', x=n + 170, y=r['country'],
                              xanchor='left', yanchor='middle',
                              sizex=120, sizey=100, layer='above'))  # just past the bar end, uniform size
  else:
    fig.add_annotation(x=n + 170, y=r['country'], showarrow=False, font=dict(size=30), xanchor='left',
                       text=f'<span class="emoji">{flag.flag(r["countryId"])}</span>')
  fig.add_annotation(x=n * 0.1, y=r['country'], text=f"{n:,}", showarrow=False,
                     font=dict(color='white', size=20), xanchor='left', yanchor='middle')

emoji_css = '''<style>
.emoji { font-family: "NotoColorEmojiLimited", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }
/* Dark outline keeps the white count readable when a short bar lets it spill onto the page. */
.annotation-text { paint-order: stroke; stroke: #02343F; stroke-width: 3px; stroke-linejoin: round; }
/* Flags are sized in data units, so they shrink on a narrow plot; scale them up on mobile. */
@media (max-width: 600px) {
  .imagelayer image { transform: scale(2); transform-box: fill-box; transform-origin: left center; }
}
</style>'''
html = fig.to_html(config={'displayModeBar': False}).replace('</head>', emoji_css + '</head>', 1)
Path('./visitor.html').write_text(html)
Path('./visitor_last_update.json').write_text(json.dumps({'last_update': last_update, 'total_visitors': total_visitors}))

print(f"visitor.py: wrote outputs (total_visitors={total_visitors}, last_update={last_update})")
