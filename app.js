/* ========================================================
   ATLAS TEOLOGICO INTERACTIVO v4.0 — FUNCIONAL COMPLETO
   Motor de renderizado y logica de aplicacion.
   El contenido (iconos, BIBLE, STATIONS, EVENTS, QUAD) vive
   en data.js, cargado antes que este archivo en index.html.
   ======================================================== */


// Estado global
const state = {
  currentFilter: null,
  currentSearch: "",
};

/* ================================================
   FUNCIONES DE UTILIDAD
   ================================================ */

function getStation(id) {
  return STATIONS.find((s) => s.id === id);
}
function getEventByNumber(n) {
  return EVENTS.find((e) => e.n === n);
}
function getMaxEventsPerStation() {
  return Math.max(...STATIONS.map((s) => EVENTS.filter((e) => e.s === s.id).length));
}
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlightText(text, term) {
  if (!term || term.length < 2) return text;
  const regex = new RegExp(`(${escapeRegex(term)})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

/* ================================================
   D3.js GRAFO INTERACTIVO MEJORADO
   ================================================ */

let simulation, svg, g;

function initGraph() {
  const viewport = document.getElementById("graphViewport");
  if (!viewport || typeof d3 === "undefined") return;

  const width = viewport.offsetWidth;
  const height = viewport.offsetHeight;

  const nodes = STATIONS.map((s) => ({
    id: s.id,
    title: s.title,
    icon: s.icon,
    color: s.color,
    question: s.question,
  }));
  const links = CROSS_LINKS.map((link) => ({
    ...link,
    type: link.strength > 0.7 ? "seq" : "cross",
  }));

  d3.select("#graphSurface").html("");
  svg = d3
    .select("#graphSurface")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  g = svg.append("g");

  simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance((d) => (d.type === "seq" ? 130 : 170))
        .strength((d) => d.strength * 0.7),
    )
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide(70))
    .alpha(1)
    .alphaDecay(0.02);

  const link = g
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("class", (d) => `graph-link graph-link--${d.type}`)
    .attr("stroke-width", (d) => (d.type === "seq" ? 2.2 : 1.4))
    .attr("opacity", (d) => (d.type === "seq" ? 0.65 : 0.4));

  const node = g
    .selectAll(".graph-node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", (d) => `graph-node ${d.id === 0 ? "graph-node--center" : ""}`)
    .attr("data-station-id", (d) => d.id)
    .attr("tabindex", "0")
    .attr("role", "button")
    .attr("aria-label", (d) => `Estación ${d.id + 1}: ${d.title}`)
    .call(
      d3
        .drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded),
    )
    .on("mouseover", nodeMouseover)
    .on("mousemove", (event) => {
      const tooltip = document.getElementById("graphTooltip");
      if (tooltip && tooltip.classList.contains("visible")) {
        positionGraphTooltip(event, tooltip);
      }
    })
    .on("mouseout", nodeMouseout)
    .on("click", (e, d) => showStationDetail(d.id))
    .on("focus", nodeMouseover)
    .on("blur", nodeMouseout)
    .on("keydown", (e, d) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        showStationDetail(d.id);
      }
    });

  node
    .append("circle")
    .attr("class", "graph-node-glow")
    .attr("r", (d) => (d.id === 0 ? 55 : 42))
    .attr("fill", (d) => d.color);

  node
    .append("circle")
    .attr("class", "graph-node-ring")
    .attr("r", (d) => (d.id === 0 ? 46 : 33))
    .attr("fill", "none");

  node
    .append("circle")
    .attr("class", "graph-node-circle")
    .attr("r", (d) => (d.id === 0 ? 40 : 28))
    .attr("fill", (d) => d.color)
    .attr("stroke", (d) => (d.id === 0 ? "#8B2E2E" : "#232019"))
    .attr("stroke-width", (d) => (d.id === 0 ? 2.8 : 2));

  node
    .append("text")
    .attr("class", "graph-node-num")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("y", (d) => (d.id === 0 ? 2 : 0))
    .text((d) => d.id + 1);

  node
    .append("g")
    .attr("class", "graph-node-icon")
    .attr("transform", (d) => `translate(0, ${d.id === 0 ? 58 : 44})`)
    .each(function (d) {
      this.innerHTML = d.icon;
      const svgEl = this.querySelector("svg");
      if (svgEl) {
        const size = d.id === 0 ? 20 : 16;
        svgEl.setAttribute("width", size);
        svgEl.setAttribute("height", size);
        svgEl.setAttribute("x", -size / 2);
        svgEl.setAttribute("y", -size / 2);
      }
    });

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
  });

  svg.call(
    d3
      .zoom()
      .scaleExtent([0.4, 3])
      .on("zoom", (e) => g.attr("transform", e.transform)),
  );

  setTimeout(() => simulation.alpha(0.3).restart(), 100);
}

function dragStarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.4).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(event, d) {
  d.fx = Math.max(50, Math.min(svg.attr("width") - 50, event.x));
  d.fy = Math.max(50, Math.min(svg.attr("height") - 50, event.y));
}
function dragEnded(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function positionGraphTooltip(event, tooltipEl) {
  const margin = 12;
  const tooltipRect = tooltipEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = event.clientX + margin;
  let top = event.clientY + margin;

  if (left + tooltipRect.width > vw - margin) {
    left = event.clientX - tooltipRect.width - margin;
  }
  if (top + tooltipRect.height > vh - margin) {
    top = event.clientY - tooltipRect.height - margin;
  }
  if (left < margin) left = margin;
  if (top < margin) top = margin;

  tooltipEl.style.left = left + "px";
  tooltipEl.style.top = top + "px";
}

function nodeMouseover(event, d) {
  const tooltip = document.getElementById("graphTooltip");
  if (!tooltip) return;
  const count = EVENTS.filter((e) => e.s === d.id).length;
  tooltip.innerHTML = `<div class="tt-num">${d.id === 0 ? "★ CENTRO" : "Estación " + (d.id + 1)}</div><div class="tt-title">${d.icon} ${d.title}</div><div class="tt-question">${d.question}</div><div class="tt-count"><b>${count}</b> evento${count !== 1 ? "s" : ""}</div><div class="tt-hint">Click para explorar →</div>`;
  tooltip.classList.add("visible");
  const clientX = event.clientX;
  const clientY = event.clientY;
  const target = event.currentTarget;
  requestAnimationFrame(() => {
    if (typeof clientX === "number") {
      positionGraphTooltip({ clientX, clientY }, tooltip);
    } else {
      const rect = target.getBoundingClientRect();
      positionGraphTooltip({ clientX: rect.left + rect.width / 2, clientY: rect.bottom }, tooltip);
    }
  });

  highlightGraphConnections(d.id);
}

function nodeMouseout(event) {
  const tooltip = document.getElementById("graphTooltip");
  if (tooltip) tooltip.classList.remove("visible");
  clearGraphHighlight();
}

function highlightGraphConnections(stationId) {
  if (!g) return;
  const connectedIds = new Set([stationId]);
  CROSS_LINKS.forEach((l) => {
    if (l.source === stationId) connectedIds.add(l.target);
    if (l.target === stationId) connectedIds.add(l.source);
  });

  g.selectAll(".graph-node")
    .classed("dimmed", (d) => !connectedIds.has(d.id))
    .classed("graph-node--highlight", (d) => d.id === stationId);

  g.selectAll(".graph-link")
    .classed("highlighted", (d) => d.source.id === stationId || d.target.id === stationId)
    .classed("dimmed", (d) => d.source.id !== stationId && d.target.id !== stationId);
}

function clearGraphHighlight() {
  if (!g) return;
  g.selectAll(".graph-node").classed("dimmed", false).classed("graph-node--highlight", false);
  g.selectAll(".graph-link").classed("highlighted", false).classed("dimmed", false);
}

function highlightGraphNode(stationId) {
  if (!g) return;
  clearGraphHighlight();
  if (stationId === null) return;
  g.selectAll(".graph-node")
    .classed("dimmed", (d) => d.id !== stationId)
    .classed("graph-node--active", (d) => d.id === stationId);
}

/* ================================================
   VISTA DE DETALLE
   ================================================ */

let tabListenersSetup = false;
let refTooltipDocListenerSetup = false;

function showStationDetail(stationId) {
  const station = getStation(stationId);
  if (!station) return;

  const pageView = document.getElementById("pageView");
  if (!pageView) return;

  pageView.classList.add("active");
  document
    .querySelectorAll(".intro, .map-arg, .toolbar, .chip-row, .content-area")
    .forEach((el) => el?.classList.add("hidden-by-page"));
  document.getElementById("graphView").classList.remove("active");
  document.getElementById("stationsGrid").classList.remove("active");

  const scrollToDetail = () => {
    const header = document.querySelector(".app-header");
    const headerH = header ? header.offsetHeight : 0;
    // Measure against pageView (not sticky) — measuring the sticky pageNav
    // itself gives an unreliable rect once it has already "stuck", which
    // was leaving a blank gap above the detail view after navigating.
    const target = pageView.getBoundingClientRect().top + window.scrollY - headerH - 4;
    window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
  };
  // Let hidden elements fully collapse (CSS ~350ms), then measure and scroll
  requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(scrollToDetail, 360)));

  document.getElementById("pageTitle").innerHTML =
    `${station.icon} ${station.title}`;
  document.getElementById("pageQuestion").innerHTML =
    `<strong>Pregunta:</strong> ${station.question}`;
  document.getElementById("pagePos").textContent =
    `${station.id + 1} de ${STATIONS.length}`;
  document.getElementById("synthesisContent").innerHTML = station.synthesis;

  const quad = QUAD[station.id.toString()];
  if (quad) {
    const labels = [
      { n: "1", t: `${ICONS.swirl} PROBLEMA`, sub: "Diagnóstico de la realidad" },
      { n: "2", t: `${ICONS.bulb} SOLUCIÓN`, sub: "Intervención del Reino" },
      { n: "3", t: `${ICONS.compass} COMPRENSIÓN`, sub: "Transformación de la mente" },
      { n: "4", t: `${ICONS.sunrise} CONSUMACIÓN`, sub: "Punto final glorioso" },
    ];
    let html = `<div class="quad-intro"><h3 style="color:var(--card-color,#D8A753);margin:0 0 8px;">${ICONS.puzzle} El Esquema QUAD del Reino</h3><p class="small" style="color:var(--tinta-dim);margin:0;">4 dimensiones que explican la <strong>dinámica completa</strong> del Reino en esta estación.</p></div>`;
    html += '<div class="theology-schema">';
    quad.forEach((value, idx) => {
      const cell = typeof value === "string" ? { h: value, t: "" } : value;
      const cellH = cell.h
        .replace(/^🔄\s*/, ICONS.refresh + " ")
        .replace(/^💡\s*/, ICONS.bulb + " ")
        .replace(/^🧭\s*/, ICONS.compass + " ")
        .replace(/^✨\s*/, ICONS.sunrise + " ");
      html += `<div class="theo-cell" style="--c:${station.color || '#C75B2A'}">
<div class="theo-step-num">${labels[idx].n}</div>
<div class="theo-label">${labels[idx].t}</div>
<div class="theo-sub">${labels[idx].sub}</div>
<div class="theo-value"><strong>${cellH}</strong>${cell.t ? `<p class="theo-text">${cell.t}</p>` : ''}</div>
${idx < 3 ? '<div class="theo-arrow">→</div>' : ''}
</div>`;
    });
    html += "</div>";
    html += `<div class="theology-footer">
<div class="tf-glyph">⸻</div>
<p class="tf-main">${ICONS.refresh} Dinámica del Reino: <span class="tf-1">diagnóstico</span> → <span class="tf-2">intervención</span> → <span class="tf-3">comprensión</span> → <span class="tf-4">glorificación</span></p>
<p class="tf-small">Cada parte es absolutamente necesaria. Sin problema no hay solución. Sin cruz no hay gloria.</p>
</div>`;
    document.getElementById("theologyContent").innerHTML = html;
  }

  const stationEvents = EVENTS.filter((e) => e.s === stationId);
  let html = `<div class="evidence-intro"><div class="ev-glyph" style="color:${station.color || '#C75B2A'}">❖</div><h3 style="margin:0 0 6px;">${ICONS.clipboard} Línea de tiempo bíblica</h3><p class="small" style="color:var(--tinta-dim);margin:0 0 14px;"><strong>${stationEvents.length}</strong> enseñanza${stationEvents.length !== 1 ? 's' : ''} bíblica${stationEvents.length !== 1 ? 's' : ''} respaldan esta estación. Cada una: Enseñanza → Referencia → Foco completo.</p></div>`;
  html += '<div class="evidence-timeline">';
  if (stationEvents.length === 0) {
    html += '<div class="tl-empty">No hay eventos registrados en esta estación.</div>';
  } else {
    stationEvents.forEach((ev, i) => {
      html += `<div class="tl-item" style="--c:${station.color || '#C75B2A'};animation-delay:${i * 50}ms;">
<div class="tl-left">
  <div class="tl-dot"></div>
  <div class="tl-num">#${ev.n}</div>
</div>
<div class="tl-right">
  <div class="tl-head">
    <div class="tl-title">${ev.e}</div>
    <div class="tl-ref">${ICONS.book} ${ev.r}</div>
  </div>
  <div class="tl-focus-tag">FOCO TEOLÓGICO</div>
  <div class="tl-focus">${ev.f}</div>
</div>
</div>`;
    });
  }
  html += "</div>";
  html += `<div class="evidence-summary">
<div class="es-card"><div class="es-num">${stationEvents.length}</div><div class="es-lbl">ENSEÑANZAS BÍBLICAS</div></div>
<div class="es-card"><div class="es-num">3</div><div class="es-lbl">SINÓPTICOS + JUAN</div></div>
<div class="es-card"><div class="es-num">60-</div><div class="es-lbl">CAPÍTULOS CUBIERTOS</div></div>
</div>`;
  document.getElementById("evidencesContent").innerHTML = html;

  document.getElementById("pagePrevBtn").disabled = station.id === 0;
  document.getElementById("pageNextBtn").disabled =
    station.id === STATIONS.length - 1;
  document.getElementById("pagePrevBtn").onclick = () =>
    showStationDetail(station.id - 1);
  document.getElementById("pageNextBtn").onclick = () =>
    showStationDetail(station.id + 1);
  document.getElementById("pageBackBtn").onclick = backToAtlas;

  document
    .querySelectorAll(".detail-tab")
    .forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });
  document
    .querySelectorAll(".detail-panel")
    .forEach((panel) => panel.classList.remove("active"));
  const synthesisTab = document.querySelector('.detail-tab[data-tab="synthesis"]');
  synthesisTab.classList.add("active");
  synthesisTab.setAttribute("aria-selected", "true");
  document.getElementById("tabSynthesis").classList.add("active");

  if (!tabListenersSetup) {
    document.querySelectorAll(".detail-tab").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tabName = e.target.closest("button").dataset.tab;
        document
          .querySelectorAll(".detail-tab")
          .forEach((t) => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
          });
        document
          .querySelectorAll(".detail-panel")
          .forEach((p) => p.classList.remove("active"));
        const clickedTab = e.target.closest("button");
        clickedTab.classList.add("active");
        clickedTab.setAttribute("aria-selected", "true");
        document
          .getElementById(
            `tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`,
          )
          .classList.add("active");
      });
    });
    tabListenersSetup = true;
  }

  setupRefTooltips();
  augmentRefChips(document.getElementById("synthesisContent"));
  augmentRefChips(document.getElementById("theologyContent"));
  augmentRefChips(document.getElementById("evidencesContent"));
  applyReveals(document.getElementById("pageView"));
}

function backToAtlas() {
  document.getElementById("pageView").classList.remove("active");
  document
    .querySelectorAll(".intro, .map-arg, .toolbar, .chip-row, .content-area")
    .forEach((el) => el?.classList.remove("hidden-by-page"));
  const activeView = document.querySelector(".toggle-btn.active")?.dataset.view || "graph";
  if (activeView === "graph") {
    document.getElementById("graphView").classList.add("active");
    document.getElementById("stationsGrid").classList.remove("active");
  } else {
    document.getElementById("graphView").classList.remove("active");
    document.getElementById("stationsGrid").classList.add("active");
  }
  const scrollBack = () => {
    const header = document.querySelector(".app-header");
    const headerOffset = header ? header.offsetHeight + 12 : 20;
    const toolbar = document.querySelector(".toolbar");
    if (toolbar && toolbar.offsetParent !== null) {
      const rect = toolbar.getBoundingClientRect();
      const targetScroll = window.scrollY + rect.top - headerOffset;
      window.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  setTimeout(scrollBack, 380);
}

let _refTooltipEl = null;
function getRefTooltipEl() {
  if (_refTooltipEl) return _refTooltipEl;
  _refTooltipEl = document.createElement("div");
  _refTooltipEl.id = "refTooltip";
  _refTooltipEl.className = "ref-tooltip";
  document.body.appendChild(_refTooltipEl);
  return _refTooltipEl;
}
function positionRefTooltip(clientX, clientY, tooltipEl) {
  const margin = 12;
  const rect = tooltipEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let left = clientX + margin;
  let top = clientY + margin;
  if (left + rect.width > vw - margin) left = clientX - rect.width - margin;
  if (top + rect.height > vh - margin) top = clientY - rect.height - margin;
  if (left < margin) left = margin;
  if (top < margin) top = margin;
  tooltipEl.style.left = left + "px";
  tooltipEl.style.top = top + "px";
}
function openRefTooltip(ref, clientX, clientY) {
  const tooltip = getRefTooltipEl();
  const data = BIBLE[ref];
  if (!data) return;
  const verseText = data.text || data.short || "";
  const verseLabel = data.short ? `<div style="font-family:var(--font-mono);font-size:.72em;color:var(--gold-deep);margin-top:10px;font-weight:700;letter-spacing:.05em;">※ ${data.short}</div>` : "";
  tooltip.innerHTML =
    `<div class="ref-tooltip-header">${ICONS.book} ${ref}</div>` +
    `<div class="ref-tooltip-body">${verseText}</div>` +
    verseLabel;
  tooltip.classList.add("visible");
  requestAnimationFrame(() => positionRefTooltip(clientX, clientY, tooltip));
}
function closeRefTooltip() {
  const t = document.getElementById("refTooltip");
  if (t) t.classList.remove("visible");
}
function setupRefTooltips() {
  getRefTooltipEl();
  const targets = document.querySelectorAll(".ref-chip, .ref-hoverable");
  targets.forEach((el) => {
    let ref = el.dataset.ref || el.textContent.trim();
    const refMatch = ref.match(/([0-9]*\s*[A-ZÁÉÍÓÚÑa-záéíóúñ]+\s*\d+:\d+[a-z]?(?:[-–]\d+)?(?:,\s*\d+:\d+)?)/);
    if (refMatch) ref = refMatch[1];
    let activeTouch = false;
    el.addEventListener("mouseenter", (e) => {
      if (activeTouch) return;
      const rect = el.getBoundingClientRect();
      openRefTooltip(ref, rect.left + rect.width / 2, rect.bottom);
    });
    el.addEventListener("mousemove", (e) => {
      const tip = document.getElementById("refTooltip");
      if (tip && tip.classList.contains("visible")) {
        positionRefTooltip(e.clientX, e.clientY, tip);
      }
    });
    el.addEventListener("mouseleave", closeRefTooltip);
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const tip = document.getElementById("refTooltip");
      if (tip && tip.classList.contains("visible")) closeRefTooltip();
      else openRefTooltip(ref, e.clientX, e.clientY);
    });
    el.addEventListener("touchstart", (e) => {
      activeTouch = true;
      const touch = e.touches[0];
      openRefTooltip(ref, touch.clientX, touch.clientY);
      setTimeout(() => { activeTouch = false; }, 600);
    }, { passive: true });
  });
  if (!refTooltipDocListenerSetup) {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".ref-chip, .ref-hoverable, .ref-tooltip")) closeRefTooltip();
    });
    refTooltipDocListenerSetup = true;
  }
}

/* ── Post-process: inyecta data-ref en .ref-chip a partir del texto (regex robusto) ── */
const REF_REGEX = /([0-9]*\s*[A-ZÁÉÍÓÚÑa-záéíóúñ]+\s*\d+:\d+[a-z]?(?:[-–]\d+)?(?:,\s*\d+:\d+)?)/;
function augmentRefChips(container) {
  if (!container) return;
  container.querySelectorAll(".ref-chip").forEach((chip) => {
    if (chip.dataset.ref && chip.dataset.ref.length > 0) return;
    const text = chip.textContent.trim();
    const m = text.match(REF_REGEX);
    if (m && BIBLE[m[1]]) chip.dataset.ref = m[1];
    else if (BIBLE[text]) chip.dataset.ref = text;
  });
}

/* ════════════════════════════════════════════════
   SISTEMA DE CALIBRACIÓN EPISTEMOLÓGICA
   Metadatos de los 6 niveles en EPI_TAGS (data.js). Aquí solo vive
   el renderizado: la insignia inline que se pega en el contenido de
   una estación, y el panel-leyenda que explica las seis.
   ════════════════════════════════════════════════ */

/* epiTag() vive en data.js, no aquí: las estaciones de STATIONS la invocan
   dentro de sus propias template strings (`${epiTag("exegesis")}...`), y
   data.js se ejecuta antes que este archivo, así que la función tiene que
   existir ya en ese momento. */

function renderEpiLegend() {
  const panel = document.getElementById("epiLegendPanel");
  if (!panel) return;
  panel.innerHTML = Object.entries(EPI_TAGS)
    .map(([key, t]) => {
      const iconSvg = ICONS[t.icon] || "";
      return (
        `<div class="epi-legend-item">` +
        `<span class="epi-tag epi-${key}">${iconSvg}${t.label}</span>` +
        `<p>${t.desc}</p>` +
        `</div>`
      );
    })
    .join("");
}

function renderGlossary() {
  const panel = document.getElementById("glossaryPanel");
  if (!panel || typeof GLOSSARY === "undefined") return;
  panel.innerHTML = GLOSSARY.map(
    (g) =>
      `<div class="glossary-item">` +
      `<span class="glossary-term">${g.term}</span>` +
      `<span class="glossary-sub">${g.sub}</span>` +
      `<p class="glossary-def">${g.def}</p>` +
      `</div>`,
  ).join("");
}

/* Mecanismo compartido: botón que abre/cierra un panel desplegable,
   se cierra al hacer clic fuera o al pulsar Escape. Usado por la leyenda
   de niveles de certeza y por el glosario. */
function setupPanelToggle(btnId, panelId) {
  const btn = document.getElementById(btnId);
  const panel = document.getElementById(panelId);
  if (!btn || !panel) return;

  const close = () => {
    panel.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };
  const toggle = () => {
    const willOpen = !panel.classList.contains("open");
    panel.classList.toggle("open", willOpen);
    btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle();
  });
  document.addEventListener("click", (e) => {
    if (!panel.classList.contains("open")) return;
    if (!panel.contains(e.target) && e.target !== btn) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) {
      close();
      btn.focus();
    }
  });
}

/* ── Scroll cinematic + nav shadow + progress bar ── */
function initCinematicScroll() {
  if (!document.getElementById("scrollProgress")) {
    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
  }
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement;
      const pct = h.scrollTop / Math.max(1, (h.scrollHeight - h.clientHeight));
      const bar = document.getElementById("scrollProgress");
      if (bar) bar.style.width = (pct * 100).toFixed(2) + "%";
      const pageNav = document.getElementById("pageNav");
      if (pageNav) {
        const header = document.querySelector(".app-header");
        const threshold = (header?.offsetHeight || 60) + 4;
        pageNav.classList.toggle("is-scrolled", window.scrollY > threshold);
      }
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── IntersectionObserver para reveals narrativos ── */
let _revealObserver = null;
function initRevealObserver() {
  if (_revealObserver) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  _revealObserver = io;
}
/* Escalonar solo tiene sentido dentro de rejillas y listas, donde varios
   hermanos cruzan el umbral a la vez. En prosa corrida cada párrafo lo cruza
   por separado, así que un retardo por índice no se leería como ritmo, sino
   como lentitud. Fuera de estos contenedores, --reveal-i se queda en 0. */
const STAGGER_PARENTS = [
  ".stations-grid", ".theology-schema", ".evidence-timeline",
  ".evidence-summary", ".values-grid", ".flow-row", ".card-fused",
  ".two-col", ".three-col", ".four-col", ".six-col",
].join(",");

function staggerIndex(el) {
  const parent = el.parentElement;
  if (!parent || !parent.matches(STAGGER_PARENTS)) return 0;
  // Tope de 6: en una lista larga, el último elemento no debe esperar medio
  // segundo después del primero solo por estar más abajo en el DOM.
  return Math.min([...parent.children].indexOf(el), 6);
}

function applyReveals(container = document) {
  if (!_revealObserver) initRevealObserver();
  const io = _revealObserver;
  const selectors = [
    ".syn-block h3", ".syn-block h4", ".syn-block p", ".syn-block blockquote",
    ".syn-block ul", ".syn-block ol",
    ".feature-card", ".flow-row", ".flow-step", ".kpi-card", ".val-chip",
    ".big-quote", ".gold-divider",
    ".theology-schema .theo-cell", ".quad-intro", ".theology-footer",
    ".evidence-intro", ".evidence-timeline .tl-item", ".evidence-summary .es-card",
    // .station-card NO va aquí: renderStationsGrid() ya la hace entrar con su
    // propio escalonado vía la clase .visible. Tenerla en las dos listas le
    // daba dos entradas contradictorias (.visible y .reveal .reveal-scale)
    // resueltas por orden de aparición en el CSS, no por intención.
  ];
  container.querySelectorAll(selectors.join(",")).forEach((el) => {
    if (el.classList.contains("reveal") || el.classList.contains("reveal-scale") ||
        el.classList.contains("reveal-left") || el.classList.contains("reveal-right")) return;
    const tag = el.tagName.toLowerCase();
    let cls = "reveal";
    if (tag === "blockquote") cls = "reveal-scale";
    else if (el.classList.contains("tl-item")) cls = "reveal-left";
    else if (el.classList.contains("theo-cell")) cls = "reveal";
    el.classList.add(...cls.split(" "));
    el.style.setProperty("--reveal-i", staggerIndex(el));
    io.observe(el);
  });
}

/* ================================================
   CUADRÍCULA DE ESTACIONES MEJORADA
   ================================================ */

function renderStationsGrid() {
  const grid = document.getElementById("stationsGrid");
  if (!grid) return;
  const maxEvents = getMaxEventsPerStation();

  grid.innerHTML = STATIONS.map(
    (s) => {
      const events = EVENTS.filter((e) => e.s === s.id);
      const densityPct = Math.round((events.length / maxEvents) * 100);
      return `
    <div class="station-card" data-station-id="${s.id}" style="--card-color: ${s.color}">
      <div class="sc-head"><div class="sc-num">${s.id + 1}</div><div><div class="sc-title">${s.icon} ${s.title}</div></div></div>
      <div class="sc-question">${s.question}</div>
      <div class="sc-count"><b>${events.length}</b> evento${events.length !== 1 ? "s" : ""}</div>
      <div class="density-bar" title="Densidad de eventos"><div class="density-fill" style="width: ${densityPct}%; background: ${s.color}"></div></div>
      <button class="sc-goto" onclick="showStationDetail(${s.id})">Explorar estación →</button>
    </div>
    `;
    },
  ).join("");

  requestAnimationFrame(() => {
    const cards = grid.querySelectorAll(".station-card");
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("visible"), i * 50);
    });
    applyReveals(grid);
  });
}

function applyFilterAndSearchToGrid() {
  const cards = document.querySelectorAll(".station-card");
  const term = state.currentSearch.toLowerCase();
  let hasVisible = false;

  cards.forEach((card) => {
    const stationId = parseInt(card.dataset.stationId);
    const station = getStation(stationId);
    const events = EVENTS.filter((e) => e.s === stationId);

    let matchesFilter = state.currentFilter === null || state.currentFilter === stationId;
    let matchesSearch = true;

    if (term.length >= 2) {
      const stationMatch =
        station.title.toLowerCase().includes(term) ||
        station.question.toLowerCase().includes(term);
      const eventMatch = events.some(
        (e) =>
          e.e.toLowerCase().includes(term) ||
          e.r.toLowerCase().includes(term) ||
          e.f.toLowerCase().includes(term),
      );
      matchesSearch = stationMatch || eventMatch;

      const scTitle = card.querySelector(".sc-title");
      const scQuestion = card.querySelector(".sc-question");
      if (scTitle) scTitle.innerHTML = `${station.icon} ${highlightText(station.title, term)}`;
      if (scQuestion) scQuestion.innerHTML = highlightText(station.question, term);
    } else {
      const scTitle = card.querySelector(".sc-title");
      const scQuestion = card.querySelector(".sc-question");
      if (scTitle) scTitle.innerHTML = `${station.icon} ${station.title}`;
      if (scQuestion) scQuestion.innerHTML = station.question;
    }

    const visible = matchesFilter && matchesSearch;
    card.classList.toggle("hidden", !visible);
    card.classList.toggle("highlight", term.length >= 2 && matchesSearch && matchesFilter);
    if (visible) hasVisible = true;
  });

  const grid = document.getElementById("stationsGrid");
  let noResults = grid.querySelector(".no-results");
  if (!hasVisible) {
    if (!noResults) {
      noResults = document.createElement("div");
      noResults.className = "no-results";
      grid.appendChild(noResults);
    }
    noResults.innerHTML = `${ICONS.search} No se encontraron resultados para <strong>"${state.currentSearch}"</strong><br><span style="font-size: 0.9em; margin-top: 8px; display: block;">Prueba con otro término o limpia la búsqueda</span>`;
  } else if (noResults) {
    noResults.remove();
  }
}

/* ================================================
   CHIPS Y BÚSQUEDA COMPLETOS
   ================================================ */

function renderChips() {
  const chipRow = document.getElementById("chipRow");
  if (!chipRow) return;
  chipRow.innerHTML =
    `<button class="chip ${state.currentFilter === null ? "active" : ""}" onclick="filterByStation(null)"
      style="${state.currentFilter === null ? 'background:linear-gradient(135deg,var(--tinta),var(--ink-hot))!important;color:var(--papel)!important;--chip-shadow:rgba(27,13,3,.35);' : ''}">
      ${ICONS.globe} Todas
    </button>` +
    STATIONS.map(
      (s) => {
        const isActive = state.currentFilter === s.id;
        return `
    <button class="chip ${isActive ? "active" : ""}"
      data-station-id="${s.id}"
      onclick="filterByStation(${s.id})"
      style="${isActive ? `background:linear-gradient(135deg, ${s.color}, rgba(0,0,0,0.55))!important;--chip-shadow:${s.color}99;` : ''}">
      ${s.icon} ${s.title.length > 26 ? s.title.substring(0, 24) + "…" : s.title}
    </button>`;
      },
    ).join("");
}

function filterByStation(stationId) {
  state.currentFilter = stationId;
  renderChips();
  highlightGraphNode(stationId);
  applyFilterAndSearchToGrid();

  if (stationId !== null) {
    const gridActive = document.getElementById("toggleGrid")?.classList.contains("active");
    if (gridActive) {
      const card = document.querySelector(`.station-card[data-station-id="${stationId}"]`);
      if (card) {
        setTimeout(() => {
          const header = document.querySelector(".app-header");
          const headerOffset = header ? header.offsetHeight + 20 : 30;
          const rect = card.getBoundingClientRect();
          const targetScroll = window.scrollY + rect.top - headerOffset;
          window.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
        }, 120);
      }
    }
  }
}

function handleSearch(term) {
  state.currentSearch = term;
  const resultHint = document.getElementById("resultHint");
  const clearBtn = document.getElementById("clearBtn");

  // Mostrar/ocultar botón limpiar — usa clase .is-visible del CSS premium
  if (clearBtn) {
    clearBtn.classList.toggle("is-visible", !!(term && term.length > 0));
    clearBtn.style.cssText = "";
  }

  if (term && term.length >= 2 && state.currentFilter !== null) {
    state.currentFilter = null;
    renderChips();
    highlightGraphNode(null);
  }

  if (!term || term.length < 2) {
    if (resultHint) {
      resultHint.classList.remove("is-visible");
      resultHint.style.cssText = "";
      resultHint.textContent = "";
    }
  } else {
    const filteredEvents = state.currentFilter !== null
      ? EVENTS.filter((e) => e.s === state.currentFilter)
      : EVENTS;
    const filteredStations = state.currentFilter !== null
      ? STATIONS.filter((s) => s.id === state.currentFilter)
      : STATIONS;

    const results = filteredEvents.filter(
      (e) =>
        e.e.toLowerCase().includes(term.toLowerCase()) ||
        e.r.toLowerCase().includes(term.toLowerCase()) ||
        e.f.toLowerCase().includes(term.toLowerCase()),
    );
    const stationResults = filteredStations.filter(
      (s) =>
        s.title.toLowerCase().includes(term.toLowerCase()) ||
        s.question.toLowerCase().includes(term.toLowerCase()),
    );
    const total = results.length + stationResults.length;
    if (resultHint) {
      const filterNote = state.currentFilter !== null
        ? ` (filtro)`
        : "";
      resultHint.textContent = `${total} coincidencia${total !== 1 ? "s" : ""}${filterNote}`;
      resultHint.classList.add("is-visible");
      resultHint.style.cssText = "";
      resultHint.style.background = total > 0
        ? "linear-gradient(135deg, rgba(212,167,83,0.14), rgba(139,46,46,0.10))"
        : "linear-gradient(135deg, rgba(139,46,46,0.10), rgba(0,0,0,0.08))";
      resultHint.style.color = total > 0 ? "var(--gold-deep)" : "var(--sello)";
    }
  }

  applyFilterAndSearchToGrid();
}

function setupViewToggle() {
  document.getElementById("toggleGraph")?.addEventListener("click", () => {
    document.getElementById("graphView").classList.add("active");
    document.getElementById("stationsGrid").classList.remove("active");
    document.getElementById("toggleGraph").classList.add("active");
    document.getElementById("toggleGraph").setAttribute("aria-selected", "true");
    document.getElementById("toggleGrid").classList.remove("active");
    document.getElementById("toggleGrid").setAttribute("aria-selected", "false");
    if (typeof d3 !== "undefined" && !simulation) {
      setTimeout(initGraph, 50);
    }
  });

  document.getElementById("toggleGrid")?.addEventListener("click", () => {
    document.getElementById("graphView").classList.remove("active");
    document.getElementById("stationsGrid").classList.add("active");
    document.getElementById("toggleGraph").classList.remove("active");
    document.getElementById("toggleGraph").setAttribute("aria-selected", "false");
    document.getElementById("toggleGrid").classList.add("active");
    document.getElementById("toggleGrid").setAttribute("aria-selected", "true");
  });
}

/* ================================================
   WINDOW RESIZE HANDLER
   ================================================ */

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (typeof d3 !== "undefined") {
      initGraph();
    }
  }, 250);
});

/* ================================================
   INICIALIZACIÓN
   ================================================ */

function initApp() {
  console.log("✓ Iniciando Atlas Teológico v4.0...");

  renderChips();
  renderStationsGrid();
  setupViewToggle();
  renderEpiLegend();
  setupPanelToggle("epiLegendToggle", "epiLegendPanel");
  renderGlossary();
  setupPanelToggle("glossaryToggle", "glossaryPanel");

  const searchInput = document.getElementById("freeSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        handleSearch("");
      }
    });
  }

  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn)
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      handleSearch("");
      state.currentSearch = "";
      document.getElementById("resultHint").textContent = "";
      applyFilterAndSearchToGrid();
    });

  if (typeof d3 !== "undefined") {
    setTimeout(initGraph, 100);
    console.log("✓ D3.js listo — grafo inicializando...");
  } else {
    console.warn("⚠ D3.js no cargado — grafo no disponible");
  }

  setupRefTooltips();
  augmentRefChips(document.body);

  // Font size selector for synthesis
  const fontSizeToggle = document.getElementById("fontSizeToggle");
  const proseEl = document.getElementById("synthesisContent");

  if (fontSizeToggle && proseEl) {
    fontSizeToggle.addEventListener("click", (e) => {
      const btn = e.target.closest(".font-size-btn");
      if (!btn) return;

      const size = btn.dataset.size; // "small" | "medium" | "large"
      fontSizeToggle
        .querySelectorAll(".font-size-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      proseEl.classList.remove("size-small", "size-medium", "size-large");
      proseEl.classList.add(`size-${size}`);
      proseEl.style.fontSize = ""; // clear any stale inline override

      try {
        localStorage.setItem("fontSizePreference", size);
      } catch (_) {}
    });

    const savedSize = localStorage.getItem("fontSizePreference") || "medium";
    proseEl.classList.remove("size-small", "size-medium", "size-large");
    proseEl.classList.add(`size-${savedSize}`);
    fontSizeToggle
      .querySelectorAll(".font-size-btn")
      .forEach((b) => b.classList.remove("active"));
    fontSizeToggle
      .querySelector(`[data-size="${savedSize}"]`)
      ?.classList.add("active");
  }

  initCinematicScroll();
  initRevealObserver();
  applyReveals();

  console.log("✓ Atlas Teológico v4.0 ¡LISTO!");
  console.log(`  • ${STATIONS.length} estaciones cargadas`);
  console.log(`  • ${EVENTS.length} enseñanzas bíblicas`);
  console.log(`  • ${CROSS_LINKS.length} conexiones entre estaciones`);
}

  // Fix: logo/brand lleva al inicio (listener en document, delegado al #brandHome)
document.addEventListener("click", (e) => {
  if (e.target.closest("#brandHome")) {
    const pageView = document.getElementById("pageView");
    if (pageView && pageView.classList.contains("active")) {
      backToAtlas();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
