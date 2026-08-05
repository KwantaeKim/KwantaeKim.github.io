(function () {
  "use strict";

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

  const TOUCH = window.matchMedia &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const NARROW_MQ = window.matchMedia && window.matchMedia("(max-width: 800px)");
  const isNarrow = () => NARROW_MQ && NARROW_MQ.matches;
  const hoverDisabled = () => TOUCH || isNarrow();

  let selectedLayer = "application";
  let hasInteracted = false;
  let pinned = false;
  let motifCallout = null;
  const doiCache = new Map();
  const repoCache = new Map();

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

  const MOTIF_BOX = {};
  const MOTIF_NAME = {
    "audio-ai": "Audio AI", "bioimpedance": "Bioimpedance",
    "gru": "GRU", "flexible": "Flexible",
    "analog": "Analog", "automation": "Automation", "digital": "Digital",
  };

  const MOTIF_TAG = {
    "audio-ai": "audio", "bioimpedance": "biomedical",
    "gru": "algorithm", "flexible": "flexible",
    "analog": "analog", "automation": "automation", "digital": "digital",
  };

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

    cur = submotifGroup(svg, "audio-ai", [4, 22, 290, 122]);
    add(label(150, 38, "audio AI", 16)).setAttribute("class", "motif-title");

    const headG = svgEl("g", { transform: "translate(80 56) scale(-1 1)" });
    headG.appendChild(svgEl("image", { href: "speaking-teal-outline.png", x: 0, y: 0, width: 72, height: 66 }));
    add(headG);

    add(path("M104,96 H128")); add(tri("M128,96 L120,92 L120,100 Z"));

    const La = [[152, 74], [152, 96], [152, 118]];
    const Lb = [[190, 74], [190, 96], [190, 118]];
    const Lc = [[228, 74], [228, 96], [228, 118]];
    La.forEach((a) => Lb.forEach((b) => add(path(`M${a[0]},${a[1]} L${b[0]},${b[1]}`, { "stroke-width": "0.7" }))));
    Lb.forEach((b) => Lc.forEach((c) => add(path(`M${b[0]},${b[1]} L${c[0]},${c[1]}`, { "stroke-width": "0.7" }))));
    [...La, ...Lb, ...Lc].forEach((p) => add(circle(p[0], p[1], 4.2, { fill: "#ffffff" })));

    const audioClasses = ["speech", "music", "noise"];
    Lc.forEach((c, i) => {
      add(path(`M${c[0] + 6},${c[1]} H250`)); add(tri(`M250,${c[1]} L244,${c[1] - 3.5} L244,${c[1] + 3.5} Z`));
      add(label(272, c[1] + 3.5, audioClasses[i], 10.5));
    });

    cur = submotifGroup(svg, "bioimpedance", [336, 14, 244, 156]);
    add(rect(348, 104, 200, 34, { rx: 8, ry: 8 }));
    add(path("M378,121 H512")); add(tri("M512,121 L504,117 L504,125 Z"));
    [366, 430, 470, 534].forEach((ex) => add(rect(ex - 7, 96, 14, 8, { rx: 1, ry: 1 })));

    add(circle(450, 48, 13));
    add(path("M442,48 q4,-7 8,0 t8,0", { "stroke-width": "1.2" }));
    add(label(450, 28, "I", 11));
    add(path("M439,56 C408,76 384,82 366,96"));
    add(path("M461,56 C492,76 516,82 534,96"));

    add(circle(450, 84, 10));
    add(label(450, 88, "V", 11));
    add(path("M444,92 L432,96")); add(path("M456,92 L468,96"));
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

    cur = submotifGroup(svg, "gru", [-30, 22, 308, 178]);
    add(label(150, 30, "GRU", 13)).setAttribute("class", "motif-title");
    const SW = { "stroke-width": "1.1" };

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

    const YT    = 70;
    const YMID  = 104;
    const YB    = 170;

    const YX    = 184;
    const YXL   = 192;

    add(rect(22, 50, 222, 132, {
      rx: 4, ry: 4,
      fill: "rgba(2, 52, 63, 0.04)",
      "stroke-width": "0.8",
      "stroke-opacity": "0.35",
    }));

    gbox(60,  YT,   "σ",    11);
    gbox(60,  YB,   "σ",    11);
    mult(110, YB);
    gbox(155, YB,   "tanh", 8.5);
    mult(215, YB);
    mult(150, YT);
    gbox(150, YMID, "1-z",  8);
    plus(215, YT);

    add(label(-20, 40,  "hₜ₋₁", 10));
    add(label(263, YT,  "hₜ",   10));
    add(label(28,  YXL, "xₜ",   10));

    add(label(94,  92,     "zₜ", 10));
    add(label(88,  YB - 6, "rₜ", 10));
    add(label(194, YB - 6, "cₜ", 10));

    apath(`M-20,44 H232 V${YT}`);
    apath(`M10,44 V${YB}`);
    apath(`M10,55 H150 V${YT - 6.5}`);
    apath(`M110,55 V${YB - 6.5}`);
    apath(`M10,${YT} H46`);
    apath(`M10,${YB} H46`);

    add(tri(`M46,${YT} L40,${YT - 3} L40,${YT + 3} Z`));
    add(tri(`M46,${YB} L40,${YB - 3} L40,${YB + 3} Z`));
    add(tri(`M150,${YT - 6.5} L147,${YT - 12.5} L153,${YT - 12.5} Z`));
    add(tri(`M110,${YB - 6.5} L107,${YB - 12.5} L113,${YB - 12.5} Z`));

    acdot(10, 44); acdot(10, 55); acdot(10, YT);
    acdot(110, 55);
    acdot(232, YT);

    add(path(`M74,${YT} H80 V120`));
    add(path(`M80,104 H136`));
    add(path(`M80,120 H215 V${YB - 6.5}`));
    jdot(80, 104);

    add(path(`M74,${YB} H103.5`));
    add(path(`M116.5,${YB} H138`));
    add(tri(`M141,${YB} L135,${YB - 3} L135,${YB + 3} Z`));

    add(path(`M169,${YB} H205.5`));
    add(tri(`M208.5,${YB} L202.5,${YB - 3} L202.5,${YB + 3} Z`));

    add(path(`M150,${YMID - 9} V${YT + 6.5}`));

    add(path(`M156.5,${YT} H208.5`));

    add(path(`M215,${YB - 6.5} V${YT + 6.5}`));

    add(path(`M221.5,${YT} H257`));
    add(tri(`M257,${YT} L251,${YT - 3} L251,${YT + 3} Z`));

    add(path(`M30,${YX} H155`));
    add(path(`M30,${YX} V75`));
    add(path(`M30,75 H40`));
    add(tri(`M46,75 L40,72 L40,78 Z`));
    add(path(`M30,175 H40`));
    add(tri(`M46,175 L40,172 L40,178 Z`));
    add(path(`M155,${YX} V${YB + 9}`));
    jdot(30, 175);

    cur = submotifGroup(svg, "flexible", [298, 66, 282, 158]);
    const FX0 = 302, FX1 = 578, fskew = 13;
    const fyc = (u) => 128 + 26 * Math.sin(2 * Math.PI * 0.92 * u + 0.5);
    const fhw = (u) => 29 - 9 * u;
    const FP = (u, v) => {
      const x = FX0 + (FX1 - FX0) * u, yC = fyc(u), h = fhw(u);
      const xf = x + fskew, yf = yC - h;
      const xn = x,         yn = yC + h;
      return [xf + (xn - xf) * v, yf + (yn - yf) * v];
    };
    const samp = (fn, n) => {
      let d = "";
      for (let i = 0; i <= n; i++) { const [x, y] = fn(i / n); d += `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)} `; }
      return d;
    };
    const alongU = (v, u0, u1, o) => path(samp((t) => FP(u0 + (u1 - u0) * t, v), 22), o);
    const acrossV = (u, v0, v1, o) => path(samp((t) => FP(u, v0 + (v1 - v0) * t), 6), o);
    const blockUV = (u0, u1, v0, v1, o) => {
      let d = samp((t) => FP(u0 + (u1 - u0) * t, v0), 8);
      d += samp((t) => FP(u1, v0 + (v1 - v0) * t), 6).replace("M", "L");
      d += samp((t) => FP(u1 - (u1 - u0) * t, v1), 8).replace("M", "L");
      d += samp((t) => FP(u0, v1 - (v1 - v0) * t), 6).replace("M", "L") + "Z";
      return path(d, o);
    };
    const THIN = { "stroke-width": "1" };
    const outlineD = samp((t) => FP(t, 0), 64) + samp((t) => FP(1 - t, 1), 64).replace("M", "L") + "Z";
    const rid = Math.random().toString(36).slice(2, 8);

    const fdefs = svgEl("defs", {});
    const blur = svgEl("filter", { id: `fsh-${rid}`, x: "-15%", y: "-15%", width: "140%", height: "170%" });
    blur.appendChild(svgEl("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "4.5" }));
    fdefs.appendChild(blur);
    add(fdefs);
    add(svgEl("path", { d: outlineD, transform: "translate(8,16)", fill: "currentColor", opacity: "0.22", filter: `url(#fsh-${rid})`, stroke: "none" }));

    add(svgEl("path", { d: outlineD, fill: "#ffffff", "fill-opacity": "0.82", stroke: "none" }));

    const VT = 0.17, VB = 0.83;
    const FINE = { "stroke-width": "0.7" };
    [0.30, 0.50, 0.72].forEach((u) => add(acrossV(u, VT, VB, { "stroke-width": "0.9" })));
    add(alongU(0.50, 0.06, 0.94, { "stroke-width": "0.9" }));

    add(blockUV(0.07, 0.28, VT, VB, THIN));
    [0.30, 0.42, 0.58, 0.70].forEach((v) => add(alongU(v, 0.085, 0.265, FINE)));

    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
      const u0 = 0.325 + c * 0.038, v0 = 0.24 + r * 0.20;
      add(blockUV(u0, u0 + 0.026, v0, v0 + 0.13, FINE));
    }

    for (let k = 0; k <= 12; k++) {
      const u = 0.525 + (0.705 - 0.525) * (k / 12);
      add(acrossV(u, 0.20, 0.46, { "stroke-width": "0.8" }));
      add(acrossV(u, 0.54, 0.80, { "stroke-width": "0.8" }));
    }

    add(blockUV(0.74, 0.93, VT, VB, THIN));
    for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
      const u0 = 0.77 + c * 0.075, v0 = 0.27 + r * 0.28;
      add(blockUV(u0, u0 + 0.05, v0, v0 + 0.18, FINE));
    }

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

    const D = { x: 60, y: 32, w: 480, h: 196 };
    svg.appendChild(rect(D.x, D.y, D.w, D.h, { rx: 6, ry: 6 }));

    svg.appendChild(tri(
      `M${D.x + 6},${D.y + 6} L${D.x + 18},${D.y + 6} L${D.x + 6},${D.y + 18} Z`
    ));

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

    const gA = submotifGroup(svg, "analog", [78, 58, 144, 144]);
    { const svg = gA;
    const A = { x: 80, y: 60, w: 140, h: 140 };
    svg.appendChild(rect(A.x, A.y, A.w, A.h, { rx: 2, ry: 2 }));

    const SCH = Object.assign({}, STROKE, { "stroke-width": "1.7" });
    const sch = (d) => svgEl("path", Object.assign({ d }, SCH));

    {
      const cx = A.x + 30;
      const cy = A.y + 30;
      const peakW = 2.5;
      const peakH = 4.5;
      const peaks = 6;
      const half = (peakW * peaks) / 2;

      const d = [`M${cx - half - 7},${cy}`, `L${cx - half},${cy}`];
      let dir = -1;
      for (let i = 0; i < peaks; i++) {
        d.push(`L${cx - half + (i + 0.5) * peakW},${cy + dir * peakH}`);
        d.push(`L${cx - half + (i + 1) * peakW},${cy}`);
        dir *= -1;
      }

      d.push(`L${cx + half + 7},${cy}`);
      svg.appendChild(sch(d.join(" ")));
    }

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

      svg.appendChild(sch(`M${cx},${cy + r - 3} L${cx},${cy - r + 4}`));
      svg.appendChild(tri(
        `M${cx},${cy - r + 2} L${cx - 3},${cy - r + 6} L${cx + 3},${cy - r + 6} Z`
      ));

      svg.appendChild(sch(`M${cx},${cy - r} L${cx},${cy - r - 6}`));
      svg.appendChild(sch(`M${cx},${cy + r} L${cx},${cy + r + 6}`));
    }

    {
      const cx = A.x + 110;
      const cy = A.y + 30;
      const gap = 2.5;
      const plateW = 10;

      svg.appendChild(sch(`M${cx - plateW},${cy - gap} L${cx + plateW},${cy - gap}`));
      svg.appendChild(sch(`M${cx - plateW},${cy + gap} L${cx + plateW},${cy + gap}`));

      svg.appendChild(sch(`M${cx},${cy - gap} L${cx},${cy - gap - 8}`));
      svg.appendChild(sch(`M${cx},${cy + gap} L${cx},${cy + gap + 8}`));
    }

    {
      const cx = A.x + 70;
      const cy = A.y + 70;
      const w = 36;
      const h = 30;

      svg.appendChild(sch(
        `M${cx - w / 2},${cy - h / 2} L${cx + w / 2},${cy} L${cx - w / 2},${cy + h / 2} Z`
      ));

      const inX0 = cx - w / 2 - 12;
      const inXEnd = cx - w / 2;
      const inYTop = cy - h / 4;
      const inYBot = cy + h / 4;
      svg.appendChild(sch(`M${inX0},${inYTop} L${inXEnd},${inYTop}`));
      svg.appendChild(sch(`M${inX0},${inYBot} L${inXEnd},${inYBot}`));

      svg.appendChild(sch(`M${inXEnd + 3},${inYTop - 3} L${inXEnd + 7},${inYTop - 3}`));

      svg.appendChild(sch(`M${inXEnd + 3},${inYBot - 3} L${inXEnd + 7},${inYBot - 3}`));
      svg.appendChild(sch(`M${inXEnd + 5},${inYBot - 5} L${inXEnd + 5},${inYBot - 1}`));

      svg.appendChild(sch(`M${cx + w / 2},${cy} L${cx + w / 2 + 12},${cy}`));
    }

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
    }

    const gC = submotifGroup(svg, "automation", [230, 60, 140, 140]);
    { const svg = gC;
    const C = { x: 230, y: 60, w: 140, h: 140 };
    svg.appendChild(rect(C.x, C.y, C.w, C.h, { rx: 2, ry: 2 }));

    const px = C.x + C.w / 2;
    const py = C.y + 22;
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

    const codeLines = [
      "import cdl_gen",
      "sram = cdl_gen.sram(",
      "  banks=12, cell=\"8T\",",
      "  vdd=0.6)",
      "sram.to_cdl()",
      "# \u2192 Cadence schematic",
    ];
    const codeX0 = C.x + 8;
    const codeY0 = C.y + 56;
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

    }

    const gB = submotifGroup(svg, "digital", [378, 58, 144, 144]);
    { const svg = gB;
    const B = { x: 380, y: 60, w: 140, h: 140 };
    svg.appendChild(rect(B.x, B.y, B.w, B.h, { rx: 2, ry: 2 }));

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

        svg.appendChild(svgEl("circle", Object.assign({ cx: mx, cy: mulY, r: r0 }, STROKE)));
        svg.appendChild(path(
          `M${mx - 2.5},${mulY - 2.5} L${mx + 2.5},${mulY + 2.5} ` +
          `M${mx + 2.5},${mulY - 2.5} L${mx - 2.5},${mulY + 2.5}`
        ));

        svg.appendChild(path(`M${mx},${mulY + r0} V${addY - r0}`));

        svg.appendChild(svgEl("circle", Object.assign({ cx: mx, cy: addY, r: r0 }, STROKE)));
        svg.appendChild(path(
          `M${mx - 2.5},${addY} H${mx + 2.5} ` +
          `M${mx},${addY - 2.5} V${addY + 2.5}`
        ));
      }
    }

    const ram = { x: B.x + 82, y: B.y + 22, cols: 4, rows: 6, w: 10, h: 13, gap: 2 };
    const arrW = ram.cols * ram.w + (ram.cols - 1) * ram.gap;
    const arrH = ram.rows * ram.h + (ram.rows - 1) * ram.gap;

    const rowDec = { x: ram.x - 10, y: ram.y,         w: 8,    h: arrH };
    const colDec = { x: ram.x,      y: ram.y - 10,    w: arrW, h: 8    };
    const ioReg  = { x: ram.x,      y: ram.y + arrH + 4, w: arrW, h: 10 };

    const thin = (d) => svgEl("path", {
      d, fill: "none", stroke: "currentColor",
      "stroke-width": "0.8", "stroke-linecap": "round",
    });

    svg.appendChild(rect(rowDec.x, rowDec.y, rowDec.w, rowDec.h, { rx: 1, ry: 1 }));
    for (let r = 0; r < ram.rows; r++) {
      const ly = ram.y + r * (ram.h + ram.gap) + ram.h / 2;
      svg.appendChild(thin(`M${rowDec.x + 2.5},${ly} H${rowDec.x + rowDec.w + 1}`));
    }

    svg.appendChild(rect(colDec.x, colDec.y, colDec.w, colDec.h, { rx: 1, ry: 1 }));
    for (let c = 0; c < ram.cols; c++) {
      const lx = ram.x + c * (ram.w + ram.gap) + ram.w / 2;
      svg.appendChild(thin(`M${lx},${colDec.y + 2.5} V${colDec.y + colDec.h + 1}`));
    }

    for (let r = 0; r < ram.rows; r++) {
      for (let c = 0; c < ram.cols; c++) {
        svg.appendChild(rect(
          ram.x + c * (ram.w + ram.gap),
          ram.y + r * (ram.h + ram.gap),
          ram.w, ram.h
        ));
      }
    }

    svg.appendChild(rect(ioReg.x, ioReg.y, ioReg.w, ioReg.h, { rx: 1, ry: 1 }));
    for (let c = 0; c < ram.cols; c++) {
      const lx = ram.x + c * (ram.w + ram.gap);
      svg.appendChild(rect(
        lx + 1.5, ioReg.y + 2, ram.w - 3, ioReg.h - 4,
        { rx: 0.5, ry: 0.5, "stroke-width": "0.8" }
      ));
    }
    }

    return svg;
  }

  const PATTERN_MAKERS = {
    application: makeApplicationPattern,
    system: makeSystemPattern,
    circuit: makeCircuitPattern,
  };

  function selectLayer(id) {
    hasInteracted = true;
    if (selectedLayer === id) return;
    selectedLayer = id;
    renderAll();
  }

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

    const inner = h("span", { class: "plane-3d", "aria-hidden": "true" });
    inner.appendChild(top);
    inner.appendChild(h("span", { class: "plane-side plane-side--right", "aria-hidden": "true" }));
    inner.appendChild(h("span", { class: "plane-side plane-side--front", "aria-hidden": "true" }));
    inner.appendChild(h("span", { class: "plane-glow", "aria-hidden": "true" }));
    btn.appendChild(inner);

    btn.addEventListener("focus", () => selectLayer(layer.id));

    return btn;
  }

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

  function renderPanel() {
    const layer = LAYERS.find(l => l.id === selectedLayer);
    const panel = document.getElementById("panel");
    panel.className = "panel panel--" + selectedLayer;
    panel.innerHTML = "";

    const head = h("div", { class: "panel-head" });
    const headRight = h("div");
    headRight.appendChild(h("h2", { class: "panel-title" }, layer.name));
    head.appendChild(headRight);
    panel.appendChild(head);

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

    if (ongoing) return card;

    const motifId = Object.keys(MOTIF_TAG).find((id) => MOTIF_TAG[id] === p.tag);
    const motifEl = motifId ? document.querySelector('.submotif[data-motif="' + motifId + '"]') : null;
    let hoverTimer;
    card.addEventListener("mouseenter", () => {
      if (hoverDisabled()) return;
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

  function positionTooltip(anchor) {
    const tip = document.getElementById("tooltip");
    const r = anchor.getBoundingClientRect();
    const tipR = tip.getBoundingClientRect();

    let left = r.left - tipR.width - 16;
    let top = r.top;
    let below = false;

    if (left < 8) {
      left = r.right + 16;
    }

    if (left + tipR.width > window.innerWidth - 8) {
      left = window.innerWidth - tipR.width - 8;
    }

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

    return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  }

  function stripLatex(s) {
    if (!s) return "";
    const SYMBOLS = {
      mu: "μ", Omega: "Ω", omega: "ω", pi: "π", alpha: "α", beta: "β",
      gamma: "γ", delta: "δ", theta: "θ", lambda: "λ", sigma: "σ", tau: "τ",
      times: "×", cdot: "·", pm: "±", approx: "≈", leq: "≤", geq: "≥",
      ll: "≪", gg: "≫", infty: "∞", degree: "°", deg: "°",
    };
    return s

      .replace(/\\sqrt\{\s*([^}]*)\s*\}/g, (_, x) => "√" + x)

      .replace(/\\(?:text|mathrm|mathbf|mathit|mathsf|mathtt)\{([^}]*)\}/g, "$1")

      .replace(/\\([a-zA-Z]+)/g, (_, name) => SYMBOLS[name] != null ? SYMBOLS[name] : "")

      .replace(/\$/g, "")
      .replace(/[{}]/g, "")
      .replace(/~/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

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

    tip.innerHTML = "";
    const head = h("div", { class: "tooltip-head" });
    head.appendChild(h("span", { class: "tooltip-source" },
      [h("span", { class: "dot" }), document.createTextNode(" Preview")]));
    head.appendChild(h("span", { class: "tooltip-loading" }, "Loading…"));
    tip.appendChild(head);
    tip.appendChild(h("div", { class: "tooltip-title" }, project.title));
    const metaEl = h("div", { class: "tooltip-meta" });
    if (isRepo) {

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

    fetchCrossref(project.doi).then(data => {
      if (!tip.classList.contains("is-open")) return;
      if (!data) {
        const loading = tip.querySelector(".tooltip-loading");
        if (loading) loading.textContent = "Local preview";
        return;
      }
      const title = stripLatex(stripHtml((data.title && data.title[0]) || "")) || project.title;
      const authorList = (data.author && data.author.length) ? data.author : project.authors;

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

      requestAnimationFrame(() => positionTooltip(anchor));
    });
  }

  function hideTooltip() {
    const tip = document.getElementById("tooltip");
    tip.classList.remove("is-open");
  }

  function setupParallax() {
    const stage = document.getElementById("stage");
    const world = document.getElementById("world");
    const callout = document.getElementById("callout");
    if (!stage || !world) return;
    if (TOUCH) return;
    if (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const MAX_Y = 11, MAX_X = 7;
    let raf = 0, tx = 0, ty = 0;
    function apply() {
      raf = 0;
      world.style.setProperty("--tilt-x", tx.toFixed(2) + "deg");
      world.style.setProperty("--tilt-y", ty.toFixed(2) + "deg");
    }
    stage.addEventListener("mousemove", (e) => {
      if (callout && callout.querySelector(".callout-card")) return;
      const r = stage.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      ty = nx * MAX_Y;
      tx = -ny * MAX_X;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    stage.addEventListener("mouseleave", () => {
      tx = ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  }

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

  function renderAll() {
    updateStage();
    renderPanel();
  }

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

      const svg = g.ownerSVGElement;
      svg.querySelectorAll(".submotif").forEach((s) => {
        s.classList.toggle("is-hi", s === g);
        s.classList.toggle("is-dim", s !== g);
      });

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

      clone.querySelectorAll(".motif-title").forEach((t) => t.remove());
      cs.appendChild(clone);
      card.appendChild(cs);
      callout.appendChild(card);
      callout.classList.add("is-active");

      const PAD = 12;
      let vb = MOTIF_CBOX[id] || box;
      try {
        const bb = clone.getBBox();
        if (bb.width > 1 && bb.height > 1)
          vb = [bb.x - PAD, bb.y - PAD, bb.width + 2 * PAD, bb.height + 2 * PAD];
      } catch (e) {  }
      cs.setAttribute("viewBox", vb.join(" "));

      if (!skipEmphasis) {
        const tag = MOTIF_TAG[id];
        if (tag) document.querySelectorAll('.project[data-tag="' + tag + '"]')
          .forEach((c) => c.classList.add("is-emphasised"));
      }
      drawConnector(g, card);

      const world = document.getElementById("world");
      if (world) world.addEventListener("transitionend",
        () => { if (current === g) drawConnector(g, card); }, { once: true });
    }

    const closestMotif = (el) => (el && el.closest ? el.closest(".submotif") : null);
    stage.addEventListener("mouseover", (e) => {
      if (pinned || hoverDisabled()) return;
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
      if (g && !isNarrow()) {
        if (g === current && pinned) { pinned = false; clearMotif(); }
        else { showMotif(g); pinned = true; }
      } else if (!g) {
        pinned = false;
        clearMotif();
      }
    });

    motifCallout = { show: showMotif, clear: clearMotif };
    if (NARROW_MQ && NARROW_MQ.addEventListener) {
      NARROW_MQ.addEventListener("change", (e) => {
        if (e.matches) { pinned = false; clearMotif(); }
      });
    }
  }

  function setupPlaneSelection() {
    const stage = document.getElementById("stage");
    if (!stage) return;
    const pick = (e) => {
      const p = e.target.closest && e.target.closest(".plane");
      if (p && p.dataset.layer) selectLayer(p.dataset.layer);
    };

    stage.addEventListener("mouseover", (e) => { if (pinned || hoverDisabled()) return; pick(e); });
    stage.addEventListener("click", pick);
  }

  function applyLayoutParam() {
    const lp = new URLSearchParams(location.search).get("layout");
    if (!lp) return;
    const root = document.querySelector(".root");
    if (root) root.classList.add("lay-" + lp);
  }

  async function init() {
    applyLayoutParam();
    buildStage();
    await loadProjects();
    renderAll();
    setupPlaneSelection();
    setupSubmotifs();
    setupParallax();
    hintSequence();

    const postHeight = () => {
      try {
        const root = document.querySelector(".root");

        const height = Math.ceil(
          root ? root.getBoundingClientRect().bottom + 24 : document.body.scrollHeight
        );
        window.parent.postMessage(
          { type: "tsirc-vision-stack-ready", height },
          "*"
        );
      } catch (e) {  }
    };
    postHeight();
    if (window.ResizeObserver) {
      new ResizeObserver(postHeight).observe(document.body);
    }
    window.addEventListener("resize", postHeight);

    window.addEventListener("scroll", hideTooltip, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
