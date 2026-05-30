/* ============================================================
   TSirc Vision Stack — vanilla JS, no dependencies
   ============================================================ */

(function () {
  "use strict";

  /* ─── DATA ────────────────────────────────────────────────
     The project list is loaded from v3_list.json (sibling of
     vision-stack.html in /assets/). Each entry: tag | title | brief
     | authors | venue | year | doi.  Edit that file to change the
     panel content.
     ───────────────────────────────────────────────────────── */
  let PROJECTS = { application: [], system: [], circuit: [] };
  async function loadProjects() {
    try {
      const res = await fetch("v3_list.json", { cache: "no-cache" });
      if (res.ok) PROJECTS = await res.json();
    } catch (e) { console.warn("v3_list.json load failed:", e); }
  }

  const LAYERS = [
    {
      id: "application",
      idx: 0,
      num: "03",
      code: "L3",
      name: "Application",
      tags: ["audio", "biomedical"],
      blurb: "What the chip does in the world — listening, sensing the body.",
    },
    {
      id: "system",
      idx: 1,
      num: "02",
      code: "L2",
      name: "System",
      tags: ["algorithm", "flexible"],
      blurb: "How signals are organised, encoded, and processed.",
    },
    {
      id: "circuit",
      idx: 2,
      num: "01",
      code: "L1",
      name: "Circuit",
      tags: ["analog", "automation", "digital"],
      blurb: "Transistors, capacitors, gates — the silicon substrate.",
    },
  ];

  const TAG_LABELS = {
    audio: "Audio",
    biomedical: "Biomedical",
    flexible: "Flexible",
    algorithm: "Algorithm",
    analog: "Analog",
    digital: "Digital",
    automation: "Automation",
  };

  /* ─── State ─────────────────────────────────────────────── */
  let selectedLayer = "application";
  let hasInteracted = false;
  let pinned = false;     // a sub-motif callout is click-pinned (see setupSubmotifs)
  let motifCallout = null; // { show(g, opts), clear() } — assigned by setupSubmotifs
  const doiCache = new Map(); // doi -> Promise<crossref|null>
  const repoCache = new Map(); // "owner/name" -> Promise<github|null>

  /* ─── DOM helpers ───────────────────────────────────────── */
  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") el.className = attrs[k];
        else if (k === "style") el.style.cssText = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function") {
          el.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) {
          el.setAttribute(k, attrs[k]);
        }
      }
    }
    if (children != null) {
      const arr = Array.isArray(children) ? children : [children];
      for (const c of arr) {
        if (c == null || c === false) continue;
        el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      }
    }
    return el;
  }

  function svgEl(tag, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  // Sub-motif registry: each labelled graphic on a plane is wrapped in its own
  // <g class="submotif" data-motif="id"> with a transparent hit-rect, so it can
  // be highlighted individually and cloned into the enlarged callout. The box is
  // its sub-rectangle of the 600×260 plane viewBox (hit area + callout viewBox).
  const MOTIF_BOX = {};
  const MOTIF_NAME = {
    "audio-ai": "Audio AI", "bioimpedance": "Bioimpedance",
    "gru": "GRU", "flexible": "Flexible",
    "analog": "Analog", "automation": "Automation", "digital": "Digital",
  };
  // Sub-motif → project tag, used to highlight matching cards in the panel
  // when a sub-motif is hovered/pinned.
  const MOTIF_TAG = {
    "audio-ai": "audio", "bioimpedance": "biomedical",
    "gru": "algorithm", "flexible": "flexible",
    "analog": "analog", "automation": "automation", "digital": "digital",
  };
  // Tighter viewBox for the callout that crops out the motif's OWN title/label
  // (the card caption supplies the name, so we avoid showing it twice). Falls
  // back to the full MOTIF_BOX for motifs with no internal title.
  const MOTIF_CBOX = {
    "gru": [10, 36, 268, 132],
    "audio-ai": [4, 46, 290, 98],
    "bioimpedance": [336, 14, 244, 138],
    "flexible": [298, 66, 282, 140],
  };
  function submotifGroup(svg, id, box) {
    MOTIF_BOX[id] = box;
    const g = svgEl("g", { class: "submotif", "data-motif": id });
    g.appendChild(svgEl("rect", {
      x: box[0], y: box[1], width: box[2], height: box[3],
      fill: "transparent", "pointer-events": "all",
    }));
    svg.appendChild(g);
    return g;
  }

  /* ─── Procedural patterns on each plane ─────────────────── */
  function makeApplicationPattern() {
    const svg = svgEl("svg", {
      viewBox: "0 0 600 260",
      preserveAspectRatio: "none",
      class: "plane-pattern",
    });
    const STROKE = {
      fill: "none", stroke: "currentColor", "stroke-width": "1.5",
      "stroke-linecap": "round", "stroke-linejoin": "round",
    };
    const path = (d, o) => svgEl("path", Object.assign({ d }, STROKE, o || {}));
    const rect = (x, y, w, h, o) => svgEl("rect", Object.assign({ x, y, width: w, height: h }, STROKE, o || {}));
    const circle = (cx, cy, r, o) => svgEl("circle", Object.assign({ cx, cy, r }, STROKE, o || {}));
    const tri = (d) => svgEl("path", { d, fill: "currentColor", stroke: "none" });
    const label = (x, y, str, fs) => {
      const t = svgEl("text", { x, y, "font-size": fs || 12, "text-anchor": "middle", fill: "currentColor" });
      t.textContent = str;
      return t;
    };
    let cur = svg;
    const add = (el) => cur.appendChild(el);

    /* Two peer motifs sharing the Application surface:
       Left  = Tiny audio intelligence — a speech waveform feeding a tiny
               on-device neural net (keyword / voice classification).
       Right = Bioimpedance — a tetrapolar measurement: AC current driven
               through tissue via the outer electrodes, voltage sensed across
               the inner pair. */

    /* ─── Left: Tiny audio intelligence ─── */
    cur = submotifGroup(svg, "audio-ai", [4, 22, 290, 122]);
    add(label(150, 38, "audio AI", 16)).setAttribute("class", "motif-title");
    // 🗣 speaking-head icon (user-supplied silhouette, recoloured teal and
    // flipped to face right into the network). Its own sound-wave arcs are the
    // audio input — there is no separate input waveform.
    const headG = svgEl("g", { transform: "translate(80 56) scale(-1 1)" });
    headG.appendChild(svgEl("image", { href: "speaking-teal-outline.png", x: 0, y: 0, width: 72, height: 66 }));
    add(headG);
    // speech feeds into the network — arrow centered in the head→NN gap (x=80→152)
    add(path("M104,96 H128")); add(tri("M128,96 L120,92 L120,100 Z"));
    // tiny neural net (3 → 3 → 3 output classes): edges first, then nodes on top
    const La = [[152, 74], [152, 96], [152, 118]];
    const Lb = [[190, 74], [190, 96], [190, 118]];
    const Lc = [[228, 74], [228, 96], [228, 118]];
    La.forEach((a) => Lb.forEach((b) => add(path(`M${a[0]},${a[1]} L${b[0]},${b[1]}`, { "stroke-width": "0.7" }))));
    Lb.forEach((b) => Lc.forEach((c) => add(path(`M${b[0]},${b[1]} L${c[0]},${c[1]}`, { "stroke-width": "0.7" }))));
    [...La, ...Lb, ...Lc].forEach((p) => add(circle(p[0], p[1], 4.2, { fill: "#ffffff" })));
    // output classes — one label per class node
    const audioClasses = ["speech", "music", "noise"];
    Lc.forEach((c, i) => {
      add(path(`M${c[0] + 6},${c[1]} H250`)); add(tri(`M250,${c[1]} L244,${c[1] - 3.5} L244,${c[1] + 3.5} Z`));
      add(label(272, c[1] + 3.5, audioClasses[i], 10.5));
    });

    /* ─── Right: Bioimpedance (tetrapolar) ─── */
    cur = submotifGroup(svg, "bioimpedance", [336, 14, 244, 156]);
    add(rect(348, 104, 200, 34, { rx: 8, ry: 8 }));               // tissue segment
    add(path("M378,121 H512")); add(tri("M512,121 L504,117 L504,125 Z"));  // current through tissue
    [366, 430, 470, 534].forEach((ex) => add(rect(ex - 7, 96, 14, 8, { rx: 1, ry: 1 })));  // 4 electrodes
    // AC current source across the OUTER pair
    add(circle(450, 48, 13));
    add(path("M442,48 q4,-7 8,0 t8,0", { "stroke-width": "1.2" }));   // ~ (AC) inside
    add(label(450, 28, "I", 11));
    add(path("M439,56 C408,76 384,82 366,96"));   // → outer-left electrode
    add(path("M461,56 C492,76 516,82 534,96"));   // → outer-right electrode
    // voltmeter across the INNER pair
    add(circle(450, 84, 10));
    add(label(450, 88, "V", 11));
    add(path("M444,92 L432,96")); add(path("M456,92 L468,96"));   // → inner electrodes
    add(label(450, 158, "bioimpedance", 12)).setAttribute("class", "motif-title");

    return svg;
  }

  function makeSystemPattern() {
    const svg = svgEl("svg", {
      viewBox: "0 0 600 260",
      preserveAspectRatio: "none",
      class: "plane-pattern",
    });
    const STROKE = {
      fill: "none", stroke: "currentColor", "stroke-width": "1.5",
      "stroke-linecap": "round", "stroke-linejoin": "round",
    };
    const path = (d, o) => svgEl("path", Object.assign({ d }, STROKE, o || {}));
    const rect = (x, y, w, h, o) => svgEl("rect", Object.assign({ x, y, width: w, height: h }, STROKE, o || {}));
    const tri = (d) => svgEl("path", { d, fill: "currentColor", stroke: "none" });
    const label = (x, y, str, fs) => {
      const t = svgEl("text", {
        x, y, "font-size": fs || 12, "text-anchor": "middle", fill: "currentColor",
      });
      t.textContent = str;
      return t;
    };
    let cur = svg;
    const add = (el) => cur.appendChild(el);

    /* Two peer motifs sharing the System surface (peers — no flow between):
       Left  = Algorithm — a generic GRU cell (Cho et al. 2014).
       Right = Flexible electronics — chiplets riding a bending thin-film
               substrate (the arch = it flexes), à la Pragmatic Semiconductor. */

    /* ─── Left: Algorithm — generic GRU cell (Cho et al. 2014) ───
       r = σ(Wr·[hₜ₋₁,xₜ]) ;  z = σ(Wz·[hₜ₋₁,xₜ]) ;
       h̃ = tanh(W·[r⊙hₜ₋₁, xₜ]) ;  hₜ = (1−z)⊙hₜ₋₁ + z⊙h̃.
       Reset path: r⊙hₜ₋₁ feeds the tanh ONLY (never the output). */
    cur = submotifGroup(svg, "gru", [-30, 22, 308, 178]);
    add(label(150, 30, "GRU", 13)).setAttribute("class", "motif-title");
    const SW = { "stroke-width": "1.1" };
    // Recurrent hₜ₋₁ path uses the same default teal stroke as every other
    // wire — the earlier lighter-teal accent read as a faded line rather than
    // an emphasised one, so all wires render identically now. ACCENT resolves
    // to currentColor so acdot/apath collapse onto jdot/path behaviour.
    const ACCENT = "currentColor";
    const ASW = {};
    const circ = (cx, cy) => svgEl("circle", Object.assign({ cx, cy, r: 6.5 }, STROKE, SW));
    const mult = (cx, cy) => { add(circ(cx, cy));
      add(path(`M${cx - 3},${cy - 3} L${cx + 3},${cy + 3} M${cx + 3},${cy - 3} L${cx - 3},${cy + 3}`, SW)); };
    const plus = (cx, cy) => { add(circ(cx, cy));
      add(path(`M${cx},${cy - 3.6} V${cy + 3.6} M${cx - 3.6},${cy} H${cx + 3.6}`, SW)); };
    const gbox = (cx, cy, txt, fs) => { add(rect(cx - 14, cy - 9, 28, 18, Object.assign({ rx: 3, ry: 3 }, SW)));
      add(label(cx, cy + 3.5, txt, fs)); };
    const jdot = (cx, cy) => add(svgEl("circle", { cx, cy, r: 1.9, fill: "currentColor", stroke: "none" }));
    const acdot = (cx, cy) => add(svgEl("circle", { cx, cy, r: 1.9, fill: ACCENT, stroke: "none" }));
    const apath = (d) => add(path(d, ASW));

    // Two-row layout matching the reference exactly:
    //   Top row    (y=YT):  σz, Mcarry [(1-z)⊙hₜ₋₁], ADD       → hₜ
    //   Bottom row (y=YB):  σr, Mr [r⊙hₜ₋₁], tanh, Mz [z⊙cₜ]
    // 1-z box sits between the rows in the column under Mcarry.
    // Mz's output feeds back UP at x=245 into ADD's bottom input.
    // The hₜ₋₁ recurrent line wraps OUTSIDE the inner box (top + left edge)
    // and turns right at each branch to enter the box's left edge.
    const YT    = 70;   // top row:    σz, Mcarry, ADD
    const YMID  = 104;  // middle:     1-z
    const YB    = 170;  // bottom row: σr, Mr, tanh, Mz  (moved down +32 so the
                        // top and bottom rows have a comfortable vertical band
                        // between them for the 1-z box and the Mz→ADD feedback)
    const YX    = 184;  // xₜ rail   (moved down with the bottom row)
    const YXL   = 192;  // xₜ label

    // Inner cell boundary — a thin rounded rect with a barely-there teal wash.
    // Internal operators and wiring sit inside it; hₜ₋₁ / xₜ inputs, hₜ output,
    // and the recurrent top rail / loop tap all sit outside, crossing the box
    // edges where they enter or exit. Drawn before the operators so it sits
    // visually behind everything else.
    //   x ∈ [22, 244]  — left edge extended past the descent at x=30 so the
    //                    branch point at (30, 70) and the full left descent
    //                    sit inside the box (hₜ₋₁ label at x=16 outside).
    //                    Right edge pulled in 14 px from the previous 258 so
    //                    the hₜ output arrow has clear breathing room exiting
    //                    the box before the hₜ label and card edge.
    //   y ∈ [50, 182]  — top rail at y=38 is outside the top edge,
    //                    xₜ rail at y=184 is outside the bottom edge.
    add(rect(22, 50, 222, 132, {
      rx: 4, ry: 4,
      fill: "rgba(2, 52, 63, 0.04)",
      "stroke-width": "0.8",
      "stroke-opacity": "0.35",
    }));

    // Boxes / operators
    // All operators shifted left by 20 px from the previous layout so the
    // left margin of the inner box (≈24) roughly matches the right (≈26.5).
    gbox(60,  YT,   "σ",    11);    // σz: update gate (top row)
    gbox(60,  YB,   "σ",    11);    // σr: reset gate  (bottom row)
    mult(110, YB);                   // Mr  : r ⊙ hₜ₋₁
    gbox(155, YB,   "tanh", 8.5);   // candidate
    mult(215, YB);                   // Mz  : z ⊙ cₜ   (bottom row, under ADD; -10 for hₜ breathing room)
    mult(150, YT);                   // Mcarry : (1-z) ⊙ hₜ₋₁ (top row)
    gbox(150, YMID, "1-z",  8);     // complement (between rows, under Mcarry)
    plus(215, YT);                   // ADD → hₜ (above Mz; -10 so the hₜ exit isn't crammed)

    // I/O labels (no standalone z/r — the signal labels zₜ/rₜ identify the gates)
    add(label(-20, 40,  "hₜ₋₁", 10));
    add(label(263, YT,  "hₜ",   10));
    add(label(28,  YXL, "xₜ",   10));    // shifted -20 to follow the xₜ rise

    // Intermediate-signal labels — each named ONCE at its output (shifted -20
    // with the operator group so each label stays on its respective signal).
    add(label(94,  92,     "zₜ", 10));   // on the z drop, between σz and the z-rail
    add(label(88,  YB - 6, "rₜ", 10));   // on the r line, between σr and Mr
    add(label(194, YB - 6, "cₜ", 10));   // on the c line, between tanh and Mz

    // ─ Recurrent hₜ₋₁ path (accent stroke) ─────────────────
    // Entirely OUTSIDE the inner box on the left and top; each feed turns
    // RIGHT and enters the box through its left edge at the appropriate
    // y-height. No vertical wire crosses the box's top edge from outside.
    //   Label (-20, 30) sits in the upper-left, outside the box.
    //   Top horizontal at y=30 (above box top y=50) runs from the label
    //   rightward to x=259 (just past box right edge x=258), then drops
    //   to tap the hₜ output line at (259, 70). The whole arc lives
    //   outside the box → that's the recurrent loop.
    //   External vertical descent at x=10 (outside box left x=22) carries
    //   hₜ₋₁ down the left side. Four right-turning branches enter the box:
    //     y=55  → over σz, then drops at x=150 → Mcarry top (with a tap
    //             at x=110 dropping to Mr top — both fed from the same
    //             carry rail at y=55, inside the box).
    //     y=70  → straight into σz's left edge.
    //     y=170 → straight into σr's left edge (descent terminates here).
    apath(`M-20,44 H232 V${YT}`);                    // hₜ₋₁ top wire + loop down, tapping the hₜ output just past ADD
    apath(`M10,44 V${YB}`);                          // external descent at x=10
    apath(`M10,55 H150 V${YT - 6.5}`);               // → Mcarry top (over σz, inside box)
    apath(`M110,55 V${YB - 6.5}`);                   // → Mr top (drops off the y=55 carry rail)
    apath(`M10,${YT} H46`);                          // → σz left (σz left edge moved -20)
    apath(`M10,${YB} H46`);                          // → σr left
    // Arrowheads at each hₜ₋₁ branch endpoint, pointing into the operator.
    // Same 6×6 size as the existing Mr→tanh and ADD→hₜ arrowheads.
    add(tri(`M46,${YT} L40,${YT - 3} L40,${YT + 3} Z`));                       // → σz left edge
    add(tri(`M46,${YB} L40,${YB - 3} L40,${YB + 3} Z`));                       // → σr left edge
    add(tri(`M150,${YT - 6.5} L147,${YT - 12.5} L153,${YT - 12.5} Z`));        // ↓ Mcarry top
    add(tri(`M110,${YB - 6.5} L107,${YB - 12.5} L113,${YB - 12.5} Z`));        // ↓ Mr top
    // T-junctions: top horiz × descent, descent × Mcarry rail, descent × σz
    // feed, carry rail × Mr drop, ADD output × loop tap.
    acdot(10, 44); acdot(10, 55); acdot(10, YT);
    acdot(110, 55);
    acdot(232, YT);

    // ─ Default-teal internal signals ──────────────────────
    // σz output (z): drops at x=80 (just right of σz), branches at y=104 to
    // the 1-z box and at y=120 across to Mz's left input (passing below 1-z).
    add(path(`M74,${YT} H80 V120`));                 // σz output → drop
    add(path(`M80,104 H136`));                        // z-rail → 1-z box left input
    add(path(`M80,120 H215 V${YB - 6.5}`));           // z branch → Mz top (enters from above, not from the side)
    jdot(80, 104);                                   // z-rail to (1-z) branches off the σz drop

    // σr output (r) → Mr ; Mr → tanh (arrowhead into tanh)
    add(path(`M74,${YB} H103.5`));                   // σr → Mr
    add(path(`M116.5,${YB} H138`));                  // Mr → tanh (line)
    add(tri(`M141,${YB} L135,${YB - 3} L135,${YB + 3} Z`));   // arrowhead into tanh

    // tanh output (cₜ) → Mz left input (z now enters from Mz's top, so the two
    // inputs come in from different sides and the corner stays clean)
    add(path(`M169,${YB} H205.5`));                  // tanh → Mz (line, 3 px short of tip)
    add(tri(`M208.5,${YB} L202.5,${YB - 3} L202.5,${YB + 3} Z`));   // arrowhead into Mz's left edge

    // (1-z) → Mcarry (vertical at x=150, 1-z top up into Mcarry bottom)
    add(path(`M150,${YMID - 9} V${YT + 6.5}`));      // 1-z top (95) → Mcarry bottom (76.5)

    // Mcarry → ADD (top-row horizontal)
    add(path(`M156.5,${YT} H208.5`));                // Mcarry right → ADD left

    // Mz → ADD (vertical feedback at x=215, Mz top up to ADD bottom)
    add(path(`M215,${YB - 6.5} V${YT + 6.5}`));      // Mz top (163.5) → ADD bottom (76.5)

    // ADD output → hₜ (extended right; arrow exits the inner box clearly into
    // open space before the hₜ label, with comfortable margin to the card edge)
    add(path(`M221.5,${YT} H257`));                  // ADD output line
    add(tri(`M257,${YT} L251,${YT - 3} L251,${YT + 3} Z`));   // arrowhead toward hₜ

    // ─ xₜ rail ────────────────────────────────────────────
    // xₜ rise moved leftward to x=30 (gap of 16 px to σ's new left edge at 46
    // and 8 px to the box's left edge at 22). Same topology as before — left-
    // side horizontal arrows into σz/σr, bottom stub into tanh.
    add(path(`M30,${YX} H155`));                     // xₜ rail
    add(path(`M30,${YX} V75`));                      // xₜ vertical: rail → up past σr to σz row
    add(path(`M30,75 H40`));                          // σz xₜ → arrow base
    add(tri(`M46,75 L40,72 L40,78 Z`));               // σz ← xₜ (left-side arrow, below hₜ₋₁ at y=70)
    add(path(`M30,175 H40`));                         // σr xₜ → arrow base
    add(tri(`M46,175 L40,172 L40,178 Z`));            // σr ← xₜ (left-side arrow, below hₜ₋₁ at y=170)
    add(path(`M155,${YX} V${YB + 9}`));              // tanh ← x (bottom stub, unchanged shape)
    jdot(30, 175);                                    // T: xₜ vertical passes through, σr branch right

    /* ─── Right: Flexible electronics — foil-thin flexible IC (Pragmatic-style) ───
       A continuous foil flexed into a smooth S-curve. The chip floorplan is
       mapped onto the bending surface (Coons patch) so blocks, buses and the
       array bank sit on the foil and follow the bend; a white sheet fill, a
       thickened front edge and a soft drop shadow read it as a sheet lifting off. */
    cur = submotifGroup(svg, "flexible", [298, 66, 282, 158]);
    const FX0 = 302, FX1 = 578, fskew = 13;
    const fyc = (u) => 128 + 26 * Math.sin(2 * Math.PI * 0.92 * u + 0.5);   // gentle S-curve (down→up)
    const fhw = (u) => 29 - 9 * u;                                          // width taper → perspective
    const FP = (u, v) => {                          // surface point: u along [0..1], v across [0..1]
      const x = FX0 + (FX1 - FX0) * u, yC = fyc(u), h = fhw(u);
      const xf = x + fskew, yf = yC - h;            // far / back edge  (v = 0)
      const xn = x,         yn = yC + h;            // near / front edge (v = 1)
      return [xf + (xn - xf) * v, yf + (yn - yf) * v];
    };
    const samp = (fn, n) => {                        // polyline path from t∈[0..1] → [x,y]
      let d = "";
      for (let i = 0; i <= n; i++) { const [x, y] = fn(i / n); d += `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)} `; }
      return d;
    };
    const alongU = (v, u0, u1, o) => path(samp((t) => FP(u0 + (u1 - u0) * t, v), 22), o);   // bus along length
    const acrossV = (u, v0, v1, o) => path(samp((t) => FP(u, v0 + (v1 - v0) * t), 6), o);   // line across width
    const blockUV = (u0, u1, v0, v1, o) => {         // floorplan block as a curved quad on the surface
      let d = samp((t) => FP(u0 + (u1 - u0) * t, v0), 8);
      d += samp((t) => FP(u1, v0 + (v1 - v0) * t), 6).replace("M", "L");
      d += samp((t) => FP(u1 - (u1 - u0) * t, v1), 8).replace("M", "L");
      d += samp((t) => FP(u0, v1 - (v1 - v0) * t), 6).replace("M", "L") + "Z";
      return path(d, o);
    };
    const THIN = { "stroke-width": "1" };
    const outlineD = samp((t) => FP(t, 0), 64) + samp((t) => FP(1 - t, 1), 64).replace("M", "L") + "Z";
    const rid = Math.random().toString(36).slice(2, 8);

    // soft drop shadow beneath the sheet
    const fdefs = svgEl("defs", {});
    const blur = svgEl("filter", { id: `fsh-${rid}`, x: "-15%", y: "-15%", width: "140%", height: "170%" });
    blur.appendChild(svgEl("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "4.5" }));
    fdefs.appendChild(blur);
    add(fdefs);
    add(svgEl("path", { d: outlineD, transform: "translate(8,16)", fill: "currentColor", opacity: "0.22", filter: `url(#fsh-${rid})`, stroke: "none" }));
    // foil surface — occludes the shadow within the sheet, reads as a physical foil
    add(svgEl("path", { d: outlineD, fill: "#ffffff", "fill-opacity": "0.82", stroke: "none" }));

    // ── coherent chip floorplan etched on the foil (grid-aligned in u,v) ──
    const VT = 0.17, VB = 0.83;
    const FINE = { "stroke-width": "0.7" };
    [0.30, 0.50, 0.72].forEach((u) => add(acrossV(u, VT, VB, { "stroke-width": "0.9" })));  // region separators
    add(alongU(0.50, 0.06, 0.94, { "stroke-width": "0.9" }));               // spine bus
    // R1 — logic block with internal register rows
    add(blockUV(0.07, 0.28, VT, VB, THIN));
    [0.30, 0.42, 0.58, 0.70].forEach((v) => add(alongU(v, 0.085, 0.265, FINE)));
    // R2 — standard-cell array (uniform small cells)
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
      const u0 = 0.325 + c * 0.038, v0 = 0.24 + r * 0.20;
      add(blockUV(u0, u0 + 0.026, v0, v0 + 0.13, FINE));
    }
    // R3 — memory / I-O finger banks (evenly spaced, two stacked)
    for (let k = 0; k <= 12; k++) {
      const u = 0.525 + (0.705 - 0.525) * (k / 12);
      add(acrossV(u, 0.20, 0.46, { "stroke-width": "0.8" }));
      add(acrossV(u, 0.54, 0.80, { "stroke-width": "0.8" }));
    }
    // R4 — right block with sub-cells
    add(blockUV(0.74, 0.93, VT, VB, THIN));
    for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
      const u0 = 0.77 + c * 0.075, v0 = 0.27 + r * 0.28;
      add(blockUV(u0, u0 + 0.05, v0, v0 + 0.18, FINE));
    }

    // ── foil edges: full outline + thickened front edge ──
    add(path(outlineD, { "stroke-width": "1.6" }));
    add(path(samp((t) => { const [x, y] = FP(t, 1); return [x, y + 3.5]; }, 64), { "stroke-width": "1.2" }));
    [0, 1].forEach((u) => { const [x, y] = FP(u, 1); add(path(`M${x.toFixed(1)},${y.toFixed(1)} L${x.toFixed(1)},${(y + 3.5).toFixed(1)}`, { "stroke-width": "1.2" })); });

    add(label(440, 214, "flexible", 12)).setAttribute("class", "motif-title");

    return svg;
  }

  function makeCircuitPattern() {
    const svg = svgEl("svg", {
      viewBox: "0 0 600 260",
      preserveAspectRatio: "none",
      class: "plane-pattern",
    });

    const STROKE = {
      fill: "none", stroke: "currentColor", "stroke-width": "1.5",
      "stroke-linecap": "round", "stroke-linejoin": "round",
    };
    const path = (d) => svgEl("path", Object.assign({ d }, STROKE));
    const rect = (x, y, w, h, opts) => svgEl("rect", Object.assign({
      x, y, width: w, height: h
    }, STROKE, opts || {}));
    const tri = (d) => svgEl("path", { d, fill: "currentColor", stroke: "none" });

    /* Top-down die floorplan: outline + bond-pad ring + pin-1 marker
       + two internal IP blocks (smaller mixed-signal region on the left,
       larger memory bitcell array on the right). Reads instantly as
       "chip / silicon" at any scale — unified single composition. */

    // Die outline
    const D = { x: 60, y: 32, w: 480, h: 196 };
    svg.appendChild(rect(D.x, D.y, D.w, D.h, { rx: 6, ry: 6 }));

    // Pin-1 indicator
    svg.appendChild(tri(
      `M${D.x + 6},${D.y + 6} L${D.x + 18},${D.y + 6} L${D.x + 6},${D.y + 18} Z`
    ));

    // Bond pad ring
    const padSize = 6;
    const padOff = 7;
    const padStep = 14;
    const inset = 24;
    for (let x = D.x + inset; x <= D.x + D.w - inset; x += padStep) {
      svg.appendChild(rect(x - padSize / 2, D.y - padSize - padOff, padSize, padSize));
      svg.appendChild(path(`M${x},${D.y - padOff} L${x},${D.y}`));
      svg.appendChild(rect(x - padSize / 2, D.y + D.h + padOff, padSize, padSize));
      svg.appendChild(path(`M${x},${D.y + D.h} L${x},${D.y + D.h + padOff}`));
    }
    for (let y = D.y + inset; y <= D.y + D.h - inset; y += padStep) {
      svg.appendChild(rect(D.x - padSize - padOff, y - padSize / 2, padSize, padSize));
      svg.appendChild(path(`M${D.x - padOff},${y} L${D.x},${y}`));
      svg.appendChild(rect(D.x + D.w + padOff, y - padSize / 2, padSize, padSize));
      svg.appendChild(path(`M${D.x + D.w},${y} L${D.x + D.w + padOff},${y}`));
    }

    // ─── Internal block A (Analog — three minimal icons:
    //     a single MOS transistor, an op-amp triangle, and a
    //     small sine wave. ──── */
    const gA = submotifGroup(svg, "analog", [78, 58, 144, 144]);
    { const svg = gA;   // scoped: svg.appendChild in this block → the analog group
    const A = { x: 80, y: 60, w: 140, h: 140 };
    svg.appendChild(rect(A.x, A.y, A.w, A.h, { rx: 2, ry: 2 }));

    const SCH = Object.assign({}, STROKE, { "stroke-width": "1.7" });
    const sch = (d) => svgEl("path", Object.assign({ d }, SCH));

    /* ── 1. Three passive icons (resistor, current source, capacitor)
       arranged in a row across the top of the block. Each one is a
       standalone symbol with small lead stubs — they're not wired
       to each other, just shown as parts of an analog vocabulary. ── */

    // Resistor — zigzag (5 peaks), horizontal orientation
    {
      const cx = A.x + 30;
      const cy = A.y + 30;
      const peakW = 2.5;
      const peakH = 4.5;
      const peaks = 6;
      const half = (peakW * peaks) / 2;
      // Left lead
      const d = [`M${cx - half - 7},${cy}`, `L${cx - half},${cy}`];
      let dir = -1;
      for (let i = 0; i < peaks; i++) {
        d.push(`L${cx - half + (i + 0.5) * peakW},${cy + dir * peakH}`);
        d.push(`L${cx - half + (i + 1) * peakW},${cy}`);
        dir *= -1;
      }
      // Right lead
      d.push(`L${cx + half + 7},${cy}`);
      svg.appendChild(sch(d.join(" ")));
    }

    // Current source — circle with arrow pointing up (current flowing up)
    {
      const cx = A.x + 70;
      const cy = A.y + 30;
      const r = 9;
      svg.appendChild(svgEl("circle", {
        cx, cy, r,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.7",
        "stroke-linecap": "round",
      }));
      // Vertical arrow inside, pointing up
      svg.appendChild(sch(`M${cx},${cy + r - 3} L${cx},${cy - r + 4}`));
      svg.appendChild(tri(
        `M${cx},${cy - r + 2} L${cx - 3},${cy - r + 6} L${cx + 3},${cy - r + 6} Z`
      ));
      // Leads top + bottom
      svg.appendChild(sch(`M${cx},${cy - r} L${cx},${cy - r - 6}`));
      svg.appendChild(sch(`M${cx},${cy + r} L${cx},${cy + r + 6}`));
    }

    // Capacitor — two horizontal plates, vertical orientation
    {
      const cx = A.x + 110;
      const cy = A.y + 30;
      const gap = 2.5;
      const plateW = 10;
      // Two plates
      svg.appendChild(sch(`M${cx - plateW},${cy - gap} L${cx + plateW},${cy - gap}`));
      svg.appendChild(sch(`M${cx - plateW},${cy + gap} L${cx + plateW},${cy + gap}`));
      // Leads top + bottom
      svg.appendChild(sch(`M${cx},${cy - gap} L${cx},${cy - gap - 8}`));
      svg.appendChild(sch(`M${cx},${cy + gap} L${cx},${cy + gap + 8}`));
    }

    /* ── 2. Op-amp triangle (center, middle area) ── */
    {
      const cx = A.x + 70;
      const cy = A.y + 70;
      const w = 36;        // triangle width
      const h = 30;        // triangle height
      // Triangle: left edge vertical (inputs), apex pointing right (output)
      svg.appendChild(sch(
        `M${cx - w / 2},${cy - h / 2} L${cx + w / 2},${cy} L${cx - w / 2},${cy + h / 2} Z`
      ));
      // Input lines (− on top, + on bottom)
      const inX0 = cx - w / 2 - 12;
      const inXEnd = cx - w / 2;
      const inYTop = cy - h / 4;
      const inYBot = cy + h / 4;
      svg.appendChild(sch(`M${inX0},${inYTop} L${inXEnd},${inYTop}`));
      svg.appendChild(sch(`M${inX0},${inYBot} L${inXEnd},${inYBot}`));
      // − sign next to top input
      svg.appendChild(sch(`M${inXEnd + 3},${inYTop - 3} L${inXEnd + 7},${inYTop - 3}`));
      // + sign next to bottom input
      svg.appendChild(sch(`M${inXEnd + 3},${inYBot - 3} L${inXEnd + 7},${inYBot - 3}`));
      svg.appendChild(sch(`M${inXEnd + 5},${inYBot - 5} L${inXEnd + 5},${inYBot - 1}`));
      // Output line
      svg.appendChild(sch(`M${cx + w / 2},${cy} L${cx + w / 2 + 12},${cy}`));
    }

    /* ── 3. Sine wave (bottom of the block) ── */
    {
      const wfY0 = A.y + 118;
      const wfX0 = A.x + 18;
      const wfX1 = A.x + A.w - 18;
      const wfPts = [];
      const wfW = wfX1 - wfX0;
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const x = wfX0 + t * wfW;
        const y = wfY0 - Math.sin(t * Math.PI * 4) * 9;
        wfPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      svg.appendChild(svgEl("polyline", {
        points: wfPts.join(" "),
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.7",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      }));
    }
    }   // ← end of analog sub-motif group

    // ─── Internal block C (Python-driven automation, middle third) ───
    /* Python "two-snake" logo abstracted to a pair of interlocking
       rounded bars + eye dots. Below it, two prominent arrows shoot
       out toward the analog and SRAM blocks, suggesting the automation
       layer drives both. */
    // Hit-area rect matches the visible content box exactly so the .is-hi
    // dashed outline lines up with the drawn rect (was padded out for the
    // neighbour-arrows, which made the highlight look mis-sized).
    const gC = submotifGroup(svg, "automation", [230, 60, 140, 140]);
    { const svg = gC;
    const C = { x: 230, y: 60, w: 140, h: 140 };
    svg.appendChild(rect(C.x, C.y, C.w, C.h, { rx: 2, ry: 2 }));

    // Python icon — official two-snake silhouette (filled in teal,
    // eye circles cut through via evenodd fill-rule).
    const px = C.x + C.w / 2; // 300
    const py = C.y + 22;      // 82 — keeps space below for code + arrows
    const pySize = 32;
    const pyScale = pySize / 32;
    const pyG = svgEl("g", {
      transform:
        "translate(" + (px - pySize / 2) + " " + (py - pySize / 2) + ") " +
        "scale(" + pyScale + ")",
    });
    pyG.appendChild(svgEl("path", {
      d: "M14.5 1.07c-7.42 0-6.93 3.22-6.93 3.22V7.59h7.05v1H4.75S0 8.06 0 15.55C0 23.03 4.15 22.77 4.15 22.77H6.6V19.34s-0.13-4.15 4.07-4.15h6.99s3.96 0.06 3.96-3.83V4.95s0.6-3.88-7.12-3.88zM10.71 3.16c0.7 0 1.27 0.57 1.27 1.27 0 0.7-0.57 1.27-1.27 1.27-0.7 0-1.27-0.57-1.27-1.27 0-0.7 0.57-1.27 1.27-1.27z",
      fill: "currentColor",
      "fill-rule": "evenodd",
    }));
    pyG.appendChild(svgEl("path", {
      d: "M17.5 30.93c7.42 0 6.93-3.22 6.93-3.22V24.41h-7.05v-1h9.87s4.75 0.54 4.75-6.95c0-7.48-4.15-7.22-4.15-7.22h-2.45v3.43s0.13 4.15-4.07 4.15h-6.99s-3.96-0.06-3.96 3.83v6.41s-0.6 3.88 7.12 3.88zM21.29 28.84c-0.7 0-1.27-0.57-1.27-1.27 0-0.7 0.57-1.27 1.27-1.27 0.7 0 1.27 0.57 1.27 1.27 0 0.7-0.57 1.27-1.27 1.27z",
      fill: "currentColor",
      "fill-rule": "evenodd",
    }));
    svg.appendChild(pyG);

    // Code snippet — cdl_gen example
    const codeLines = [
      "import cdl_gen",
      "sram = cdl_gen.sram(",
      "  banks=12, cell=\"8T\",",
      "  vdd=0.6)",
      "sram.to_cdl()",
      "# \u2192 Cadence schematic",
    ];
    const codeX0 = C.x + 8;
    const codeY0 = C.y + 56;   // first baseline
    const lineH = 8.5;
    codeLines.forEach((line, i) => {
      const t = svgEl("text", {
        x: codeX0,
        y: codeY0 + i * lineH,
        "font-size": "7",
        "font-family": "ui-monospace, 'SF Mono', Menlo, Consolas, 'Courier New', monospace",
        fill: "currentColor",
      });
      t.textContent = line;
      svg.appendChild(t);
    });

    }   // ← end of automation sub-motif group

    // ─── Internal block B (Digital — NPU compute + memory, right third) ──
    // Two paired arrays so the motif reads as "NPU = PE + on-chip SRAM"
    // purely from visual contrast (no text):
    //   LEFT  : 3×2 grid of PE/MAC cells, each containing the ⊗ multiplier
    //           symbol — the same iconography used for the multipliers in
    //           the GRU cell, which signals "compute".
    //   RIGHT : 5×4 grid of plain SRAM bitcells — denser and smaller, which
    //           reads as "memory grain" against the larger compute tiles.
    const gB = submotifGroup(svg, "digital", [378, 58, 144, 144]);
    { const svg = gB;
    const B = { x: 380, y: 60, w: 140, h: 140 };
    svg.appendChild(rect(B.x, B.y, B.w, B.h, { rx: 2, ry: 2 }));

    // PE/MAC array (left half) — 3 rows × 2 cols. Each cell holds a MAC:
    // ⊗ (multiplier) feeding ⊕ (accumulator) via a short connector, so the
    // tile reads as "multiply-and-accumulate" rather than just multiply.
    const pe = { x: B.x + 14, y: B.y + 18, cols: 2, rows: 3, w: 22, h: 32, gap: 5 };
    for (let r = 0; r < pe.rows; r++) {
      for (let c = 0; c < pe.cols; c++) {
        const cx = pe.x + c * (pe.w + pe.gap);
        const cy = pe.y + r * (pe.h + pe.gap);
        svg.appendChild(rect(cx, cy, pe.w, pe.h, { rx: 2, ry: 2 }));

        const mx = cx + pe.w / 2;
        const mulY = cy + 10;
        const addY = cy + 23;
        const r0 = 4;

        // ⊗ — multiply
        svg.appendChild(svgEl("circle", Object.assign({ cx: mx, cy: mulY, r: r0 }, STROKE)));
        svg.appendChild(path(
          `M${mx - 2.5},${mulY - 2.5} L${mx + 2.5},${mulY + 2.5} ` +
          `M${mx + 2.5},${mulY - 2.5} L${mx - 2.5},${mulY + 2.5}`
        ));

        // connector from ⊗ bottom to ⊕ top
        svg.appendChild(path(`M${mx},${mulY + r0} V${addY - r0}`));

        // ⊕ — accumulate
        svg.appendChild(svgEl("circle", Object.assign({ cx: mx, cy: addY, r: r0 }, STROKE)));
        svg.appendChild(path(
          `M${mx - 2.5},${addY} H${mx + 2.5} ` +
          `M${mx},${addY - 2.5} V${addY + 2.5}`
        ));
      }
    }

    // SRAM macro (right half) — full layout with periphery:
    //   • row decoder on the LEFT  (word-line drivers, horizontal ticks)
    //   • col decoder on TOP       (bit-line drivers, vertical ticks)
    //   • bitcell array in the middle
    //   • I/O register on BOTTOM   (one latch box per column)
    const ram = { x: B.x + 82, y: B.y + 22, cols: 4, rows: 6, w: 10, h: 13, gap: 2 };
    const arrW = ram.cols * ram.w + (ram.cols - 1) * ram.gap;  // 46
    const arrH = ram.rows * ram.h + (ram.rows - 1) * ram.gap;  // 88

    // Periphery strips
    const rowDec = { x: ram.x - 10, y: ram.y,         w: 8,    h: arrH };
    const colDec = { x: ram.x,      y: ram.y - 10,    w: arrW, h: 8    };
    const ioReg  = { x: ram.x,      y: ram.y + arrH + 4, w: arrW, h: 10 };

    // Thin-stroke helper for the small internal ticks so they don't overpower
    // the cells (the default stroke-width: 1.5 reads too chunky at this size).
    const thin = (d) => svgEl("path", {
      d, fill: "none", stroke: "currentColor",
      "stroke-width": "0.8", "stroke-linecap": "round",
    });

    // Row decoder — word lines fan out horizontally to each row
    svg.appendChild(rect(rowDec.x, rowDec.y, rowDec.w, rowDec.h, { rx: 1, ry: 1 }));
    for (let r = 0; r < ram.rows; r++) {
      const ly = ram.y + r * (ram.h + ram.gap) + ram.h / 2;
      svg.appendChild(thin(`M${rowDec.x + 2.5},${ly} H${rowDec.x + rowDec.w + 1}`));
    }

    // Column decoder / bit-line drivers — vertical ticks down each column
    svg.appendChild(rect(colDec.x, colDec.y, colDec.w, colDec.h, { rx: 1, ry: 1 }));
    for (let c = 0; c < ram.cols; c++) {
      const lx = ram.x + c * (ram.w + ram.gap) + ram.w / 2;
      svg.appendChild(thin(`M${lx},${colDec.y + 2.5} V${colDec.y + colDec.h + 1}`));
    }

    // Bitcell array
    for (let r = 0; r < ram.rows; r++) {
      for (let c = 0; c < ram.cols; c++) {
        svg.appendChild(rect(
          ram.x + c * (ram.w + ram.gap),
          ram.y + r * (ram.h + ram.gap),
          ram.w, ram.h
        ));
      }
    }

    // I/O register — one small latch box per column lane
    svg.appendChild(rect(ioReg.x, ioReg.y, ioReg.w, ioReg.h, { rx: 1, ry: 1 }));
    for (let c = 0; c < ram.cols; c++) {
      const lx = ram.x + c * (ram.w + ram.gap);
      svg.appendChild(rect(
        lx + 1.5, ioReg.y + 2, ram.w - 3, ioReg.h - 4,
        { rx: 0.5, ry: 0.5, "stroke-width": "0.8" }
      ));
    }
    }   // ← end of digital sub-motif group

    return svg;
  }

  const PATTERN_MAKERS = {
    application: makeApplicationPattern,
    system: makeSystemPattern,
    circuit: makeCircuitPattern,
  };

  /* Select a layer — shared by keyboard focus and the #stage pointer
     delegation in setupPlaneSelection. */
  function selectLayer(id) {
    hasInteracted = true;
    if (selectedLayer === id) return;
    selectedLayer = id;
    renderAll();
  }

  /* ─── Build planes ──────────────────────────────────────── */
  function makePlane(layer) {
    const btn = h("button", {
      type: "button",
      class: "plane plane--" + layer.id,
      style: "--i:" + layer.idx,
      "data-layer": layer.id,
      "aria-label": layer.name + " layer",
    });
    const top = h("span", { class: "plane-top" });
    const patternWrap = h("span", { class: "plane-pattern-wrap" });
    patternWrap.appendChild(PATTERN_MAKERS[layer.id]());
    top.appendChild(patternWrap);

    // label group
    const label = h("span", { class: "plane-label" });
    const name = h("span", { class: "plane-name" });
    name.textContent = layer.name;
    const tags = h("span", { class: "plane-tags" });
    layer.tags.forEach(t => {
      const tag = h("span", { class: "plane-tag" });
      tag.textContent = TAG_LABELS[t];
      tags.appendChild(tag);
    });
    label.appendChild(name);
    label.appendChild(tags);
    top.appendChild(label);

    // Inner layer carries the static isometric 3D tilt (see .plane-3d in CSS);
    // the animated hover scale lives on the outer .plane button, decoupled.
    const inner = h("span", { class: "plane-3d", "aria-hidden": "true" });
    inner.appendChild(top);
    inner.appendChild(h("span", { class: "plane-side plane-side--right", "aria-hidden": "true" }));
    inner.appendChild(h("span", { class: "plane-side plane-side--front", "aria-hidden": "true" }));
    inner.appendChild(h("span", { class: "plane-glow", "aria-hidden": "true" }));
    btn.appendChild(inner);

    // Pointer hover/click is delegated on #stage (see setupPlaneSelection) so the
    // hit area follows the rotated .plane-top, not the flat .plane box. Keyboard
    // focus selects directly (focus still fires with pointer-events:none).
    btn.addEventListener("focus", () => selectLayer(layer.id));

    return btn;
  }

  // Planes are built ONCE and kept; selection only toggles classes on the
  // persistent elements, so CSS transitions (hover zoom, dim fade) animate
  // instead of snapping on a DOM rebuild.
  let planeEls = {};
  function buildStage() {
    const world = document.getElementById("world");
    world.innerHTML = "";
    planeEls = {};
    LAYERS.forEach(layer => {
      const p = makePlane(layer);
      planeEls[layer.id] = p;
      world.appendChild(p);
    });
  }
  function updateStage() {
    LAYERS.forEach(layer => {
      const p = planeEls[layer.id];
      if (!p) return;
      const active = selectedLayer === layer.id;
      p.classList.toggle("plane--active", active);
      p.classList.toggle("plane--dimmed", !active);
    });
  }

  function renderAxis() {
    const axis = document.getElementById("axis");
    axis.innerHTML = "";
    LAYERS.forEach(layer => {
      const step = h("div", {
        class: "axis-step" + (selectedLayer === layer.id ? " is-active" : ""),
      });
      step.textContent = layer.code + " · " + layer.name;
      axis.appendChild(step);
    });
  }

  /* ─── Panel ─────────────────────────────────────────────── */
  function renderPanel() {
    const layer = LAYERS.find(l => l.id === selectedLayer);
    const panel = document.getElementById("panel");
    panel.className = "panel panel--" + selectedLayer;
    panel.innerHTML = "";

    // head
    const head = h("div", { class: "panel-head" });
    const headRight = h("div");
    headRight.appendChild(h("h2", { class: "panel-title" }, layer.name));
    head.appendChild(headRight);
    panel.appendChild(head);

    // projects — sorted newest-first by year so the panel reads chronologically.
    // Ongoing entries float to the top (treated as more recent than any year).
    const proj = h("div", { class: "projects" });
    const sortKey = (x) => x.status === "ongoing" ? Infinity : (parseInt(x.year, 10) || 0);
    const list = (PROJECTS[selectedLayer] || [])
      .slice()
      .sort((a, b) => sortKey(b) - sortKey(a));
    if (!list.length) {
      proj.appendChild(h("div", { class: "empty" }, "No projects yet."));
    } else {
      list.forEach(p => proj.appendChild(makeProjectCard(p)));
    }
    panel.appendChild(proj);

  }

  function makeProjectCard(p) {
    const ongoing = p.status === "ongoing";
    const repo = p.status === "repo";
    // Ongoing entries have no link target → non-link <div>. Repo entries link to
    // the github URL; paper entries link to the DOI.
    const card = ongoing
      ? h("div", { class: "project project--" + selectedLayer, "data-tag": p.tag })
      : h("a", {
          class: "project project--" + selectedLayer,
          href: repo ? p.repo : "https://doi.org/" + p.doi,
          target: "_blank",
          rel: "noopener noreferrer",
          "data-doi": repo ? "" : p.doi,
          "data-tag": p.tag,
        });

    const row = h("div", { class: "project-tag-row" });
    row.appendChild(h("span", { class: "project-tag project-tag--" + p.tag }, TAG_LABELS[p.tag]));
    if (repo) {
      // Inline GitHub mark (avoids pulling in Font Awesome just for one icon).
      const venueEl = h("span", { class: "project-venue" });
      const gh = svgEl("svg", {
        viewBox: "0 0 16 16", width: "12", height: "12", fill: "currentColor",
        style: "vertical-align: -1px; margin-right: 5px;",
        "aria-hidden": "true",
      });
      gh.appendChild(svgEl("path", {
        d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z",
      }));
      venueEl.appendChild(gh);
      venueEl.appendChild(document.createTextNode("GitHub" + (p.year ? " · " + p.year : "")));
      row.appendChild(venueEl);
    } else {
      const venueText = ongoing
        ? (p.year ? "Ongoing · " + p.year : "Ongoing")
        : p.venue + " · " + p.year;
      row.appendChild(h("span", { class: "project-venue" }, venueText));
    }
    card.appendChild(row);

    card.appendChild(h("h3", { class: "project-title" }, p.title));

    const foot = h("div", { class: "project-foot" });
    foot.appendChild(h("span", { class: "project-authors" }, p.authors));
    const doi = h("span", { class: "project-doi" });
    if (ongoing) {
      doi.appendChild(h("span", { class: "project-doi-key" }, "ONGOING"));
      doi.appendChild(h("span", { class: "project-doi-val" }, "in progress"));
    } else if (repo) {
      // Show the "owner/repo" tail of the URL, e.g. "KwantaeKim/cdl_gen".
      const tail = (p.repo || "").replace(/^https?:\/\/(?:www\.)?github\.com\//i, "");
      doi.appendChild(h("span", { class: "project-doi-key" }, "REPO"));
      doi.appendChild(h("span", { class: "project-doi-val" }, tail));
      doi.appendChild(h("span", { class: "project-doi-arrow" }, "↗"));
    } else {
      doi.appendChild(h("span", { class: "project-doi-key" }, "DOI"));
      doi.appendChild(h("span", { class: "project-doi-val" }, p.doi));
      doi.appendChild(h("span", { class: "project-doi-arrow" }, "↗"));
    }
    foot.appendChild(doi);
    card.appendChild(foot);

    // Ongoing entries have no external source to look up, so no tooltip.
    if (ongoing) return card;

    // Hover: DOI/GitHub preview tooltip + drive the sub-motif callout (without
    // the sibling-card emphasis — that was distracting per earlier feedback).
    const motifId = Object.keys(MOTIF_TAG).find((id) => MOTIF_TAG[id] === p.tag);
    const motifEl = motifId ? document.querySelector('.submotif[data-motif="' + motifId + '"]') : null;
    let hoverTimer;
    card.addEventListener("mouseenter", () => {
      if (motifEl && motifCallout && !pinned) motifCallout.show(motifEl, { skipEmphasis: true });
      hoverTimer = setTimeout(() => showTooltip(card, p), 200);
    });
    card.addEventListener("mouseleave", () => {
      if (motifEl && motifCallout && !pinned) motifCallout.clear();
      clearTimeout(hoverTimer);
      hideTooltip();
    });
    card.addEventListener("focus", () => showTooltip(card, p));
    card.addEventListener("blur", hideTooltip);

    return card;
  }

  /* ─── Tooltip / DOI preview ─────────────────────────────── */
  function positionTooltip(anchor) {
    const tip = document.getElementById("tooltip");
    const r = anchor.getBoundingClientRect();
    const tipR = tip.getBoundingClientRect();
    // try right side of anchor, vertically aligned
    let left = r.left - tipR.width - 16;
    let top = r.top;
    let below = false;
    // if not enough space on left, place to the right
    if (left < 8) {
      left = r.right + 16;
    }
    // clamp horizontally
    if (left + tipR.width > window.innerWidth - 8) {
      left = window.innerWidth - tipR.width - 8;
    }
    // clamp vertically
    if (top + tipR.height > window.innerHeight - 8) {
      top = window.innerHeight - tipR.height - 8;
    }
    if (top < 8) top = 8;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
    tip.classList.toggle("is-below", below);
  }

  function fetchCrossref(doi) {
    if (doiCache.has(doi)) return doiCache.get(doi);
    const promise = fetch("https://api.crossref.org/works/" + encodeURIComponent(doi), {
      headers: { "Accept": "application/json" },
    }).then(r => {
      if (!r.ok) throw new Error("DOI not found");
      return r.json();
    }).then(json => json.message).catch(() => null);
    doiCache.set(doi, promise);
    return promise;
  }

  /* GitHub repo metadata via the public REST API (no auth → ~60 req/hr/IP;
     responses are cached per "owner/name" so panel re-renders don't re-hit). */
  function fetchGithub(repoUrl) {
    const m = String(repoUrl || "").match(/github\.com\/([^/]+)\/([^/?#]+)/i);
    if (!m) return Promise.resolve(null);
    const key = m[1] + "/" + m[2].replace(/\.git$/, "");
    if (repoCache.has(key)) return repoCache.get(key);
    const promise = fetch("https://api.github.com/repos/" + key, {
      headers: { "Accept": "application/vnd.github+json" },
    }).then(r => r.ok ? r.json() : null).catch(() => null);
    repoCache.set(key, promise);
    return promise;
  }

  function stripHtml(s) {
    if (!s) return "";
    // strip <jats:p> etc.
    return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  }

  /* CrossRef titles for IEEE papers often contain raw LaTeX math
     (e.g. "$2.48 \\mu \\mathrm{W} 33.13 \\text{nV}/\\sqrt{ }\\text{Hz}$").
     Convert the common bits to readable Unicode so the tooltip doesn't
     show the raw source. Unknown commands fall through as plain text. */
  function stripLatex(s) {
    if (!s) return "";
    const SYMBOLS = {
      mu: "μ", Omega: "Ω", omega: "ω", pi: "π", alpha: "α", beta: "β",
      gamma: "γ", delta: "δ", theta: "θ", lambda: "λ", sigma: "σ", tau: "τ",
      times: "×", cdot: "·", pm: "±", approx: "≈", leq: "≤", geq: "≥",
      ll: "≪", gg: "≫", infty: "∞", degree: "°", deg: "°",
    };
    return s
      // \sqrt{X} → √X (also \sqrt{ } → √)
      .replace(/\\sqrt\{\s*([^}]*)\s*\}/g, (_, x) => "√" + x)
      // \text{X} / \mathrm{X} / \mathbf{X} / \mathit{X} → X
      .replace(/\\(?:text|mathrm|mathbf|mathit|mathsf|mathtt)\{([^}]*)\}/g, "$1")
      // \mu, \Omega, etc.
      .replace(/\\([a-zA-Z]+)/g, (_, name) => SYMBOLS[name] != null ? SYMBOLS[name] : "")
      // strip math delimiters and stray braces / tildes
      .replace(/\$/g, "")
      .replace(/[{}]/g, "")
      .replace(/~/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* Build the author list as an array of mixed text nodes + <span> elements,
     highlighting any occurrence of Kwantae Kim (full or abbreviated "K. Kim").
     Accepts either a CrossRef author array or a plain string from the JSON.
     opts.coFirst: integer N — the first N listed authors are co-first; each
     gets a trailing "*". (Boolean true is treated as 1 for back-compat.) */
  function buildAuthorNodes(input, opts) {
    const coN = opts && opts.coFirst === true ? 1
              : opts && typeof opts.coFirst === "number" ? opts.coFirst : 0;
    const authorNode = (text, isCo, isKK) => {
      const starred = text + (isCo ? "*" : "");
      return isKK ? h("span", { class: "kk-author" }, starred) : starred;
    };
    if (Array.isArray(input)) {
      const nodes = [];
      input.slice(0, 4).forEach((a, i) => {
        if (i > 0) nodes.push(", ");
        const text = (a.given ? a.given[0] + ". " : "") + (a.family || "");
        const isKK = a.family === "Kim" && /^Kwantae\b/i.test(a.given || "");
        nodes.push(authorNode(text, i < coN, isKK));
      });
      if (input.length > 4) nodes.push(", et al.");
      return nodes;
    }
    // String fallback: split by comma, mark the first coN names with "*",
    // and keep any trailing " et al." outside the starred name.
    const s = String(input || "");
    const parts = s.split(/,\s*/);
    const nodes = [];
    parts.forEach((part, i) => {
      if (i > 0) nodes.push(", ");
      const tailM = part.match(/^(.*?)(\s+et\s+al\.?)\s*$/i);
      const body = tailM ? tailM[1] : part;
      const tail = tailM ? tailM[2] : "";
      const isKK = /\b(?:Kwantae\s+Kim|K\.\s*Kim)\b/.test(body);
      nodes.push(authorNode(body, i < coN, isKK));
      if (tail) nodes.push(tail);
    });
    return nodes;
  }

  function fillMeta(metaEl, authors, venue, year, opts) {
    metaEl.textContent = "";
    buildAuthorNodes(authors, opts).forEach(n =>
      metaEl.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
    metaEl.appendChild(document.createTextNode("\n" + venue + " · " + year));
  }

  function showTooltip(anchor, project) {
    const tip = document.getElementById("tooltip");
    const isRepo = project.status === "repo";
    // initial state: local data + loading
    tip.innerHTML = "";
    const head = h("div", { class: "tooltip-head" });
    head.appendChild(h("span", { class: "tooltip-source" },
      [h("span", { class: "dot" }), document.createTextNode(" Preview")]));
    head.appendChild(h("span", { class: "tooltip-loading" }, "Loading…"));
    tip.appendChild(head);
    tip.appendChild(h("div", { class: "tooltip-title" }, project.title));
    const metaEl = h("div", { class: "tooltip-meta" });
    if (isRepo) {
      // author line + "GitHub" tail — stars/language/updated come from the API
      buildAuthorNodes(project.authors).forEach((n) =>
        metaEl.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      metaEl.appendChild(document.createTextNode("\nGitHub"));
    } else {
      fillMeta(metaEl, project.authors, project.venue, project.year, { coFirst: project.coFirst });
    }
    tip.appendChild(metaEl);
    tip.appendChild(h("div", { class: "tooltip-abstract" }, project.brief));

    const cta = h("div", { class: "tooltip-cta" });
    const ctaId = isRepo
      ? (project.repo || "").replace(/^https?:\/\/(?:www\.)?github\.com\//i, "").replace(/\.git$/, "")
      : project.doi;
    cta.appendChild(h("span", { class: "tooltip-doi" }, ctaId));
    cta.appendChild(h("span", { class: "tooltip-cta-link" }, "click to open ↗"));
    tip.appendChild(cta);

    tip.classList.add("is-open");
    requestAnimationFrame(() => positionTooltip(anchor));

    if (isRepo) {
      fetchGithub(project.repo).then((data) => {
        if (!tip.classList.contains("is-open")) return;
        if (!data) {
          const loading = tip.querySelector(".tooltip-loading");
          if (loading) loading.textContent = "Local preview";
          return;
        }
        tip.querySelector(".tooltip-loading").textContent = "via GitHub";
        const meta = tip.querySelector(".tooltip-meta");
        meta.textContent = "";
        buildAuthorNodes(project.authors).forEach((n) =>
          meta.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
        const updated = data.pushed_at ? new Date(data.pushed_at).getFullYear() : "";
        const stars = (data.stargazers_count != null) ? "★ " + data.stargazers_count : "";
        const tail = [data.language || "", stars, "GitHub" + (updated ? " · " + updated : "")]
          .filter(Boolean).join(" · ");
        meta.appendChild(document.createTextNode("\n" + tail));
        if (data.description) {
          const abEl = tip.querySelector(".tooltip-abstract");
          abEl.textContent = data.description;
          if (data.description.length > 220) abEl.classList.add("is-clipped");
        }
        requestAnimationFrame(() => positionTooltip(anchor));
      });
      return;
    }

    // fetch real data
    fetchCrossref(project.doi).then(data => {
      if (!tip.classList.contains("is-open")) return; // closed already
      if (!data) {
        const loading = tip.querySelector(".tooltip-loading");
        if (loading) loading.textContent = "Local preview";
        return;
      }
      const title = stripLatex(stripHtml((data.title && data.title[0]) || "")) || project.title;
      const authorList = (data.author && data.author.length) ? data.author : project.authors;
      // CrossRef returns conference titles like "2025 23rd IEEE … (NEWCAS)";
      // strip the leading year and edition ordinal for a cleaner display.
      let venue = (data["container-title"] && data["container-title"][0]) || project.venue;
      venue = venue.replace(/^\d{4}\s+/, "").replace(/^\d+(st|nd|rd|th)\s+/i, "");
      const year = (data.issued && data.issued["date-parts"] && data.issued["date-parts"][0] && data.issued["date-parts"][0][0]) || project.year;
      const abstract = stripHtml(data.abstract || "");

      tip.querySelector(".tooltip-loading").textContent = "via CrossRef";
      tip.querySelector(".tooltip-title").textContent = title;
      fillMeta(tip.querySelector(".tooltip-meta"), authorList, venue, year, { coFirst: project.coFirst });
      const abEl = tip.querySelector(".tooltip-abstract");
      if (abstract) {
        abEl.textContent = abstract;
        if (abstract.length > 220) abEl.classList.add("is-clipped");
      }
      // re-position after content change
      requestAnimationFrame(() => positionTooltip(anchor));
    });
  }

  function hideTooltip() {
    const tip = document.getElementById("tooltip");
    tip.classList.remove("is-open");
  }

  /* Manual hit-testing removed: with the flat z-index stacking model pointer
     events resolve natively (each plane's own mouseenter/click drives
     selection, topmost-by-z-index wins overlaps). */

  /* Subtle mouse parallax — lean the whole flattened stack toward the cursor.
     #world stays transform-style:flat, so this tilts only the composited stack
     image; plane z-index + per-plane zoom are untouched. Held still while a
     sub-motif callout is open so its connector leader stays aligned. */
  function setupParallax() {
    const stage = document.getElementById("stage");
    const world = document.getElementById("world");
    const callout = document.getElementById("callout");
    if (!stage || !world) return;
    if (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const MAX_Y = 11, MAX_X = 7;         // degrees of horizontal / vertical lean
    let raf = 0, tx = 0, ty = 0;
    function apply() {
      raf = 0;
      world.style.setProperty("--tilt-x", tx.toFixed(2) + "deg");
      world.style.setProperty("--tilt-y", ty.toFixed(2) + "deg");
    }
    stage.addEventListener("mousemove", (e) => {
      if (callout && callout.querySelector(".callout-card")) return; // examining a detail → hold still
      const r = stage.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;   // -1..1
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;   // -1..1
      ty = nx * MAX_Y;                   // mouse right → lean right
      tx = -ny * MAX_X;                  // mouse down  → top edge tips toward viewer
      if (!raf) raf = requestAnimationFrame(apply);
    });
    stage.addEventListener("mouseleave", () => {
      tx = ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  }

  /* ─── Hint sequence — preview each layer once on load ───── */
  function hintSequence() {
    const seq = ["system", "circuit", "application"];
    let i = 0;
    const t = setInterval(() => {
      if (hasInteracted) { clearInterval(t); return; }
      selectedLayer = seq[i % seq.length];
      i++;
      renderAll();
      if (i >= seq.length) clearInterval(t);
    }, 1300);
  }

  /* ─── Render all ────────────────────────────────────────── */
  function renderAll() {
    updateStage();
    renderPanel();
  }

  /* ─── Init ──────────────────────────────────────────────── */
  /* ─── Sub-motif hover/tap → in-place highlight + enlarged callout ─────────
     Finer level on top of the layer hover. The callout reuses the SAME drawing
     by cloning the on-plane <g.submotif> into a fresh SVG cropped (via viewBox)
     to that motif's box and shown upright — so on-plane and enlarged never drift. */
  function setupSubmotifs() {
    const stage = document.getElementById("stage");
    const callout = document.getElementById("callout");
    if (!stage || !callout) return;
    let current = null;

    const connector = document.getElementById("connector");

    function clearMotif() {
      if (!current) return;
      document.querySelectorAll(".submotif.is-hi, .submotif.is-dim")
        .forEach((s) => s.classList.remove("is-hi", "is-dim"));
      document.querySelectorAll(".project.is-emphasised")
        .forEach((c) => c.classList.remove("is-emphasised"));
      const card = callout.querySelector(".callout-card");
      if (card) card.remove();
      callout.classList.remove("is-active");
      if (connector) connector.innerHTML = "";
      current = null;
    }

    // dashed leader from the highlighted motif (on the tilted plane) to the card
    function drawConnector(g, card) {
      if (!connector) return;
      const rootEl = connector.parentElement;
      const rb = rootEl.getBoundingClientRect();
      const mb = g.getBoundingClientRect();
      const cb = card.getBoundingClientRect();
      const x1 = (mb.left + mb.right) / 2 - rb.left, y1 = (mb.top + mb.bottom) / 2 - rb.top;
      const x2 = cb.left - rb.left, y2 = (cb.top + cb.bottom) / 2 - rb.top;
      connector.setAttribute("viewBox", `0 0 ${rb.width} ${rb.height}`);
      connector.setAttribute("width", rb.width);
      connector.setAttribute("height", rb.height);
      const mx = (x1 + x2) / 2;
      connector.innerHTML = "";
      connector.appendChild(svgEl("path", {
        d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`,
        fill: "none", stroke: "currentColor", "stroke-width": "1.4",
        "stroke-dasharray": "4 3", opacity: "0.55",
      }));
      connector.appendChild(svgEl("circle", { cx: x1, cy: y1, r: 2.6, fill: "currentColor" }));
      connector.appendChild(svgEl("circle", { cx: x2, cy: y2, r: 2.6, fill: "currentColor", opacity: "0.6" }));
    }

    function showMotif(g, opts) {
      if (g === current) return;
      clearMotif();
      const skipEmphasis = opts && opts.skipEmphasis;
      current = g;
      const id = g.getAttribute("data-motif");
      const box = MOTIF_BOX[id];
      if (!box) return;
      // highlight this motif, dim the others on the same plane
      const svg = g.ownerSVGElement;
      svg.querySelectorAll(".submotif").forEach((s) => {
        s.classList.toggle("is-hi", s === g);
        s.classList.toggle("is-dim", s !== g);
      });
      // framed card: caption + enlarged, upright, single-source clone
      const card = document.createElement("div");
      card.className = "callout-card";
      const cap = document.createElement("div");
      cap.className = "callout-cap";
      cap.textContent = MOTIF_NAME[id] || id;
      card.appendChild(cap);
      const cs = svgEl("svg", {
        class: "callout-svg",
        preserveAspectRatio: "xMidYMid meet",
      });
      const clone = g.cloneNode(true);
      clone.classList.remove("is-hi", "is-dim");
      const hit = clone.querySelector("rect");
      if (hit && hit.getAttribute("fill") === "transparent") hit.remove();
      // drop the motif's own title — the card caption supplies the name
      clone.querySelectorAll(".motif-title").forEach((t) => t.remove());
      cs.appendChild(clone);
      card.appendChild(cs);
      callout.appendChild(card);
      callout.classList.add("is-active");
      // Fit the viewBox to the actual drawn content (now in the DOM) so nothing
      // is clipped, regardless of where the motif sits on its plane. Falls back
      // to the static crop box if the bbox can't be measured.
      const PAD = 12;
      let vb = MOTIF_CBOX[id] || box;
      try {
        const bb = clone.getBBox();
        if (bb.width > 1 && bb.height > 1)
          vb = [bb.x - PAD, bb.y - PAD, bb.width + 2 * PAD, bb.height + 2 * PAD];
      } catch (e) { /* not measurable — keep fallback */ }
      cs.setAttribute("viewBox", vb.join(" "));
      // Highlight matching project cards in the panel (inverted colour treatment).
      // Skipped when the callout was triggered FROM a panel card (avoids the
      // cross-card highlight feedback that was distracting).
      if (!skipEmphasis) {
        const tag = MOTIF_TAG[id];
        if (tag) document.querySelectorAll('.project[data-tag="' + tag + '"]')
          .forEach((c) => c.classList.add("is-emphasised"));
      }
      drawConnector(g, card);
      // if a parallax tilt was still settling when this opened, realign once it stops
      const world = document.getElementById("world");
      if (world) world.addEventListener("transitionend",
        () => { if (current === g) drawConnector(g, card); }, { once: true });
    }

    // Click-to-pin: hovering previews; clicking a sub-motif locks the callout
    // so it survives mouse-out. Click the same motif again, or click empty
    // stage area, to unpin. While pinned, hovering other motifs is ignored
    // (the `pinned` flag is module-scope so setupPlaneSelection can also gate
    // layer-hover on it — see there).
    const closestMotif = (el) => (el && el.closest ? el.closest(".submotif") : null);
    stage.addEventListener("mouseover", (e) => {
      if (pinned) return;
      const g = closestMotif(e.target);
      if (g) showMotif(g);
    });
    stage.addEventListener("mouseout", (e) => {
      if (pinned) return;
      const to = e.relatedTarget;
      if (current && !closestMotif(to)) clearMotif();
    });
    stage.addEventListener("click", (e) => {
      const g = closestMotif(e.target);
      if (g) {
        if (g === current && pinned) { pinned = false; clearMotif(); }
        else { showMotif(g); pinned = true; }
      } else {
        pinned = false;
        clearMotif();
      }
    });

    // Expose so panel-card hover can drive the callout without going through
    // the #stage event path (which would also emphasise sibling cards).
    motifCallout = { show: showMotif, clear: clearMotif };
  }

  /* Layer hover/click via #stage delegation. The interactive surface is each
     plane's rotated .plane-top (CSS: .plane is pointer-events:none), so the hit
     area matches the visible isometric face instead of the flat bounding box —
     fixes neighbouring planes blocking each other on the large stack. */
  function setupPlaneSelection() {
    const stage = document.getElementById("stage");
    if (!stage) return;
    const pick = (e) => {
      const p = e.target.closest && e.target.closest(".plane");
      if (p && p.dataset.layer) selectLayer(p.dataset.layer);
    };
    // While a sub-motif is click-pinned, freeze layer-hover so moving the
    // cursor across other planes doesn't switch the active layer underneath
    // the user. Click-to-switch still works (intentional action).
    stage.addEventListener("mouseover", (e) => { if (pinned) return; pick(e); });
    stage.addEventListener("click", pick);
  }

  /* Optional layout variant for the v2_1/v2_2/v2_3 comparison wrappers:
     ?layout=a|b|c adds .lay-* on .root (CSS does the rest). */
  function applyLayoutParam() {
    const lp = new URLSearchParams(location.search).get("layout");
    if (!lp) return;
    const root = document.querySelector(".root");
    if (root) root.classList.add("lay-" + lp);
  }

  async function init() {
    applyLayoutParam();
    buildStage();
    await loadProjects();    // populate PROJECTS from ../v3_list.json before first render
    renderAll();
    setupPlaneSelection();
    setupSubmotifs();
    setupParallax();
    hintSequence();

    // tell parent (Jekyll page) we're ready, in case it wants to resize
    try {
      window.parent.postMessage(
        { type: "tsirc-vision-stack-ready", height: document.body.scrollHeight },
        "*"
      );
    } catch (e) { /* cross-origin */ }

    // hide tooltip on scroll
    window.addEventListener("scroll", hideTooltip, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
