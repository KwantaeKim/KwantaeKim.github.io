# Guidelines for updating `conf_*.json`

This folder holds JSON files (`conf_sscs.json`, `conf_cass.json`, ...) that drive the conferences page. Each file is a flat array of conference records sharing the same schema. These notes are for LLMs adding or updating entries — please follow them so the downstream notebook keeps working.

## Record schema

Every entry must include all of the following keys, in this order:

| Field | Type | Notes |
| --- | --- | --- |
| `organization` | string | e.g. `"IEEE"`. |
| `name` | string | Short conference acronym, e.g. `"ISSCC"`. |
| `year` | integer | Edition year, e.g. `2026`. Not a string. |
| `city` | string | Host city. |
| `region` | string | Host region, full name (e.g. `"United States"`, `"South Korea"`). |
| `region_flag` | string | Single Unicode flag emoji matching `region` (e.g. `"🇺🇸"`). |
| `color` | string | Marker color. Default `"gray"` unless an existing convention says otherwise. |
| `bg_color` | string | Default `"false"` (literal string, not boolean). |
| `submission` | string | Paper submission deadline in ISO `YYYY-MM-DD`. Use `"false"` if unknown. |
| `date_start` | string | Conference start date, ISO `YYYY-MM-DD`. |
| `date_end` | string | Conference end date, ISO `YYYY-MM-DD`. |
| `venue` | string | Venue name. If unknown, use the literal string `"false"` (the renderer falls back to `city`). |
| `coordinate` | string | `"lat, lon"` decimal degrees, comma + single space, e.g. `"37.785426, -122.404493"`. |
| `webpage` | string | Official conference URL. |

Keep all date fields as strings (ISO format), not JSON dates. Do not introduce new keys without updating the notebook that consumes these files.

## Filling the `coordinate` field

1. Find the venue in Google Maps.
2. Right-click (or click on a nearby point) to reveal the coordinate.
3. The decimal `lat, lon` appears at the bottom of the page / popup — copy that.
4. If that doesn't work, use <https://coordinates-converter.com/en/decimal/51.000000,10.000000?karte=OpenStreetMap&zoom=8>.
5. If the venue cannot be located, fall back to the coordinate of the city center.

Format the value as `"<lat>, <lon>"` (comma followed by one space, six decimal places preferred). Both values are signed decimal degrees; do not use N/S/E/W suffixes.

## Sorting and ordering

Within each file, records are sorted by `date_start` ascending in the rendered output (the notebook handles this for non-`sscs` sheets). You don't have to pre-sort the JSON, but keeping new entries in chronological order makes diffs easier to read.

## Adding a new conference

1. Append a new object to the appropriate `conf_<sheet>.json`.
2. Fill every field above; use `"false"` only where explicitly allowed (`submission`, `venue`).
3. Double-check `region_flag` matches `region`, and that `coordinate` parses as two floats.
4. Validate the file is still valid JSON (e.g. `python3 -m json.tool conf_<sheet>.json`).
