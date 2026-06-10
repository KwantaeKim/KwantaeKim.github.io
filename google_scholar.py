"""Write img/citation_plot.html + citation_last_update.json from Google Scholar.

Runs in the Jekyll build (incl. daily cron). Scholar blocks CI IPs often, so on
failure we exit 0 and keep the last good files rather than abort the build.
"""

import sys, json
from datetime import datetime
from pathlib import Path
import pandas as pd
import plotly.graph_objects as go
from scholarly import scholarly

USER_ID = "YcWEaGIAAAAJ"

try:
  author = scholarly.fill(scholarly.search_author_id(USER_ID))
  yearly = author.get('cites_per_year', {})
  if not yearly:
    raise ValueError("no cites_per_year returned")
except Exception as e:  # keep last good files, don't fail the build
  print(f"google_scholar.py: keeping last good output, fetch failed: {e}")
  sys.exit(0)

df = pd.DataFrame({
  "Year": sorted(yearly),
  "Citation": [yearly[y] for y in sorted(yearly)],
})

fig = go.Figure(go.Bar(
  y=df['Citation'],
  x=df['Year'],
  orientation='v',
  marker=dict(color='#02343F'),
  width=0.5,
))
fig.update_layout(
  xaxis=dict(title='Year', tickmode='linear'),
  yaxis=dict(title='Citations', gridcolor='lightgray', griddash='dash', gridwidth=2),
  margin=dict(t=5, b=5),
  font=dict(family="Trebuchet MS", size=16, color="black"),
  plot_bgcolor='rgba(0, 0, 0, 0)',
  hoverlabel_font_family='Trebuchet MS',
  hovermode='x',
  dragmode=False,
)
fig.update_xaxes(linewidth=2, linecolor='black', mirror=True, ticks='outside', tickwidth=2, showline=True)
fig.update_yaxes(linewidth=2, linecolor='black', mirror=True, ticks='outside', tickwidth=2, showline=True)

Path("./img/citation_plot.html").write_text(fig.to_html(config={'displayModeBar': False}))

last_update = datetime.now().strftime("%b. %Y")
Path("./img/citation_last_update.json").write_text(json.dumps({
  'last_update': last_update,
  'citations': str(author.get('citedby', 0)),
  'hidx': str(author.get('hindex', 0)),
  'i10idx': str(author.get('i10index', 0)),
}))

print(f"google_scholar.py: wrote outputs (citations={author.get('citedby', 0)}, last_update={last_update})")
