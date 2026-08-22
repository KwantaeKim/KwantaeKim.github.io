(function () {
  "use strict";

  let PROJECTS = { application: [], system: [], circuit: [] };
  async function loadProjects() {
    try {
      const res = await fetch("projects.json", { cache: "no-cache" });
      if (res.ok) PROJECTS = await res.json();
    } catch (e) { console.warn("projects.json load failed:", e); }
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
    biomedical: "Bioimpedance",
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
    "audio-ai": "Audio", "bioimpedance": "Bioimpedance",
    "gru": "Algorithm", "flexible": "Flexible",
    "analog": "Analog", "automation": "Automation", "digital": "Digital",
  };

  const MOTIF_TAG = {
    "audio-ai": "audio", "bioimpedance": "biomedical",
    "gru": "algorithm", "flexible": "flexible",
    "analog": "analog", "automation": "automation", "digital": "digital",
  };

  const MOTIF_CBOX = {
    "gru": [56.7, 46, 194.7, 124.2],
    "audio-ai": [46.2, 59.8, 215.6, 69.1],
    "bioimpedance": [337.9, 56, 212.3, 98.3],
    "flexible": [279, 41.5, 291.6, 157],
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
    const label = (x, y, str, fs) => {
      const t = svgEl("text", { x, y, "font-size": fs || 12, "text-anchor": "middle", fill: "currentColor" });
      t.textContent = str;
      return t;
    };
    let cur = svg;
    const add = (el) => cur.appendChild(el);

    cur = submotifGroup(svg, "audio-ai", [44, 26, 220, 107]);
    add(label(154, 38, "Audio", 16)).setAttribute("class", "motif-title");
    add(svgEl("image", { href: "audio.svg", x: 46.2, y: 59.8, width: 215.6, height: 69.1 }));

    cur = submotifGroup(svg, "bioimpedance", [336, 26, 216, 130]);
    add(label(444, 38, "Bioimpedance", 16)).setAttribute("class", "motif-title");
    add(svgEl("image", { href: "bioz.svg", x: 337.9, y: 56, width: 212.3, height: 98.3 }));

    return svg;
  }

  function makeSystemPattern() {
    const svg = svgEl("svg", {
      viewBox: "0 0 600 260",
      preserveAspectRatio: "none",
      class: "plane-pattern",
    });
    const label = (x, y, str, fs) => {
      const t = svgEl("text", {
        x, y, "font-size": fs || 12, "text-anchor": "middle", fill: "currentColor",
      });
      t.textContent = str;
      return t;
    };
    let cur = svg;
    const add = (el) => cur.appendChild(el);

    cur = submotifGroup(svg, "gru", [52, 28, 204, 146]);
    add(label(154, 40, "GRU", 16)).setAttribute("class", "motif-title");
    add(svgEl("image", { href: "gru.svg", x: 56.7, y: 46, width: 194.7, height: 124.2 }));

    cur = submotifGroup(svg, "flexible", [277, 39, 296, 179]);
    add(svgEl("image", { href: "flexible.svg", x: 261.4, y: 24.7, width: 319.5, height: 184.2 }));
    add(label(440, 214, "Flexible Chip", 16)).setAttribute("class", "motif-title");

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
    gA.appendChild(svgEl("image", { href: "analog.svg", x: 80, y: 60, width: 140, height: 140 }));

    const gC = submotifGroup(svg, "automation", [230, 60, 140, 140]);
    gC.appendChild(svgEl("image", { href: "automation.svg", x: 230, y: 60, width: 140, height: 140 }));

    const gB = submotifGroup(svg, "digital", [378, 58, 144, 144]);
    { const svg = gB;
    const B = { x: 380, y: 60, w: 140, h: 140 };
    svg.appendChild(rect(B.x, B.y, B.w, B.h, {
      rx: 4.1, ry: 4.1, "stroke-width": "1.95",
    }));

    const pe = { x: B.x + 14, y: B.y + 18, cols: 2, rows: 3, w: 24, h: 30, gap: 5 };
    for (let r = 0; r < pe.rows; r++) {
      for (let c = 0; c < pe.cols; c++) {
        const cx = pe.x + c * (pe.w + pe.gap);
        const cy = pe.y + r * (pe.h + pe.gap);
        svg.appendChild(rect(cx, cy, pe.w, pe.h, { rx: 2, ry: 2 }));

        const mx = cx + pe.w / 2;
        const mulY = cy + 9.5;
        const addY = cy + 21;
        const r0 = 4.5;

        svg.appendChild(svgEl("circle", Object.assign({ cx: mx, cy: mulY, r: r0 }, STROKE)));
        svg.appendChild(path(
          `M${mx - 2.8},${mulY - 2.8} L${mx + 2.8},${mulY + 2.8} ` +
          `M${mx + 2.8},${mulY - 2.8} L${mx - 2.8},${mulY + 2.8}`
        ));

        svg.appendChild(path(`M${mx},${mulY + r0} V${addY - r0}`));

        svg.appendChild(svgEl("circle", Object.assign({ cx: mx, cy: addY, r: r0 }, STROKE)));
        svg.appendChild(path(
          `M${mx - 2.8},${addY} H${mx + 2.8} ` +
          `M${mx},${addY - 2.8} V${addY + 2.8}`
        ));
      }
    }

    const ram = { x: B.x + 82, y: B.y + 22, cols: 3, rows: 4, w: 14, h: 17, gap: 3 };
    const arrW = ram.cols * ram.w + (ram.cols - 1) * ram.gap;
    const arrH = ram.rows * ram.h + (ram.rows - 1) * ram.gap;

    const rowDec = { x: ram.x - 10, y: ram.y,         w: 8,    h: arrH };
    const colDec = { x: ram.x,      y: ram.y - 10,    w: arrW, h: 8    };
    const ioReg  = { x: ram.x,      y: ram.y + arrH + 4, w: arrW, h: 10 };

    const thin = (d) => svgEl("path", {
      d, fill: "none", stroke: "currentColor",
      "stroke-width": "1", "stroke-linecap": "round",
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
        { rx: 0.5, ry: 0.5, "stroke-width": "1" }
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
    const accepted = p.status === "accepted";

    const card = (ongoing || accepted)
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
    } else if (accepted) {
      doi.appendChild(h("span", { class: "project-doi-key" }, "ACCEPTED"));
      doi.appendChild(h("span", { class: "project-doi-val" }, "to appear"));
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

    if (ongoing || accepted) return card;

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
      const IMAGE_MOTIF = id === "gru" || id === "analog" || id === "flexible" || id === "automation" || id === "digital" || id === "audio-ai" || id === "bioimpedance";
      const cs = svgEl("svg", {
        class: "callout-svg" + (IMAGE_MOTIF ? " callout-svg--tall" : ""),
        preserveAspectRatio: "xMidYMid meet",
      });
      // per-motif caps chosen so both Visio drawings display at the same scale
      if (IMAGE_MOTIF) cs.style.setProperty("--callout-maxh", id === "gru" ? "354px" : "520px");
      const clone = g.cloneNode(true);
      clone.classList.remove("is-hi", "is-dim");
      const hit = clone.querySelector("rect");
      if (hit && hit.getAttribute("fill") === "transparent") hit.remove();

      clone.querySelectorAll(".motif-title").forEach((t) => t.remove());
      cs.appendChild(clone);
      card.appendChild(cs);
      callout.appendChild(card);
      callout.classList.add("is-active");

      const PAD = IMAGE_MOTIF ? 4 : 12;
      let vb = MOTIF_CBOX[id] || box;
      // flexible.svg has canvas margins inside the image element, so its
      // MOTIF_CBOX is the measured artwork box — don't widen it to the bbox
      if (id !== "flexible") {
        try {
          const bb = clone.getBBox();
          if (bb.width > 1 && bb.height > 1)
            vb = [bb.x - PAD, bb.y - PAD, bb.width + 2 * PAD, bb.height + 2 * PAD];
        } catch (e) {  }
      }
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
