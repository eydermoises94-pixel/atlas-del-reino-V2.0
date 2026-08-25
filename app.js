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

/* Progreso de lectura: qué estaciones ha visitado ya el usuario,
   persistido en localStorage (mismo mecanismo que fontSizePreference). */
function getVisitedStations() {
  try {
    return new Set(JSON.parse(localStorage.getItem("visitedStations") || "[]"));
  } catch (_) {
    return new Set();
  }
}
function markStationVisited(stationId) {
  const visited = getVisitedStations();
  if (visited.has(stationId)) return;
  visited.add(stationId);
  try {
    localStorage.setItem("visitedStations", JSON.stringify([...visited]));
  } catch (_) {}
  applyVisitedMarkers();
}
function applyVisitedMarkers() {
  const visited = getVisitedStations();
  document.querySelectorAll(".station-card").forEach((card) => {
    card.classList.toggle("is-visited", visited.has(parseInt(card.dataset.stationId, 10)));
  });
  if (g) {
    g.selectAll(".graph-node").classed("is-visited", (d) => visited.has(d.id));
  }
}

/* Rail de 13 segmentos en la cabecera de cada estación: posición actual +
   progreso de lectura + navegación directa, en una sola franja de 44px.
   A diferencia de un indicador que solo marca "todo lo anterior al índice
   actual" (posición disfrazada de progreso), este usa getVisitedStations()
   — el mismo dato real que ya alimenta la marca "✓ visitada" de las
   tarjetas y el grafo — así que un segmento solo se enciende si esa
   estación se abrió de verdad, no porque esté numéricamente antes. */
function hexToRgba(hex, alpha) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}
function renderStationRail(currentId) {
  const rail = document.getElementById("stationRail");
  if (!rail) return;
  const visited = getVisitedStations();
  rail.innerHTML = STATIONS.map((s) => {
    const isCurrent = s.id === currentId;
    const isVisited = visited.has(s.id);
    const color = s.color || "#C75B2A";
    const bg = isCurrent ? color : isVisited ? hexToRgba(color, 0.55) : "";
    const state = isCurrent ? "actual" : isVisited ? "visitada" : "sin visitar";
    return `<button
        type="button"
        class="rail-seg${isCurrent ? " is-current" : ""}${isVisited ? " is-visited" : ""}"
        role="tab"
        aria-selected="${isCurrent}"
        aria-label="Estación ${s.id + 1}: ${s.title} — ${state}"
        title="${s.id + 1}. ${s.title}"
        data-station-id="${s.id}"
      ><span class="rail-seg-bar" style="${bg ? `background:${bg}` : ""}"></span></button>`;
  }).join("");
  rail.querySelectorAll(".rail-seg").forEach((btn) => {
    btn.addEventListener("click", () => {
      showStationDetail(parseInt(btn.dataset.stationId, 10));
    });
  });
}

/* ================================================
   FUNCIONES DE UTILIDAD
   ================================================ */

/* C19: la búsqueda también mira dentro del contenido de la estación
   (synthesis), no solo título/pregunta. Se cachea el texto plano por
   estación porque extraerlo de HTML en cada pulsación de tecla sería
   trabajo repetido innecesario sobre los mismos 13 bloques. */
const _synthesisTextCache = new Map();
function getSynthesisPlainText(station) {
  if (_synthesisTextCache.has(station.id)) return _synthesisTextCache.get(station.id);
  const div = document.createElement("div");
  div.innerHTML = station.synthesis || "";
  const text = (div.textContent || "").toLowerCase();
  _synthesisTextCache.set(station.id, text);
  return text;
}
function stationMatchesSearch(station, lowerTerm) {
  return (
    station.title.toLowerCase().includes(lowerTerm) ||
    station.question.toLowerCase().includes(lowerTerm) ||
    getSynthesisPlainText(station).includes(lowerTerm)
  );
}

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
  applyVisitedMarkers();
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

/* Atenúa en el grafo los nodos que no coinciden con la búsqueda libre,
   con el mismo criterio de coincidencia usado para el contador de
   resultados y para la cuadrícula (título, pregunta o eventos). */
function applySearchToGraph(term) {
  if (!g) return;
  if (!term || term.length < 2) {
    g.selectAll(".graph-node").classed("dimmed", false);
    return;
  }
  const lower = term.toLowerCase();
  g.selectAll(".graph-node").classed("dimmed", (d) => {
    const station = getStation(d.id);
    const events = EVENTS.filter((e) => e.s === d.id);
    const eventMatch = events.some(
      (e) =>
        e.e.toLowerCase().includes(lower) ||
        e.r.toLowerCase().includes(lower) ||
        e.f.toLowerCase().includes(lower),
    );
    return !(stationMatchesSearch(station, lower) || eventMatch);
  });
}

/* ================================================
   VISTA DE DETALLE
   ================================================ */

let tabListenersSetup = false;
let refTooltipDocListenerSetup = false;

/* Pestaña "Resumen" — armazón estructural para contenido pendiente de
   redacción editorial (D23/D26/D27/D28 del encargo a Agente 2, ver
   ENCARGO_AGENTE_2_CONTENIDO.md). Lee campos opcionales en STATIONS que
   hoy no existen todavía: resumenLinea, audiencia, preguntasReflexion
   (array), fraseCitable. Mientras no se añadan, se muestra un estado
   vacío explícito en vez de fabricar contenido — cada bloque se pinta
   de forma independiente, así que Agente 2 puede ir rellenando estación
   a estación sin que el resto quede a medias. */
function renderResumenTab(station) {
  const hasAny =
    station.resumenLinea ||
    station.audiencia ||
    (station.preguntasReflexion && station.preguntasReflexion.length) ||
    station.fraseCitable;

  if (!hasAny) {
    return `<div class="resumen-empty">
      <p>${ICONS.compass || ""} Esta sección está pendiente de contenido editorial (resumen de una línea, nota de audiencia, preguntas de reflexión y frase citable).</p>
    </div>`;
  }

  let html = '<div class="resumen-block">';
  if (station.resumenLinea) {
    html += `<p class="resumen-linea">${station.resumenLinea}</p>`;
  }
  if (station.audiencia) {
    html += `<div class="resumen-audiencia"><h4>¿Para quién es esta estación?</h4><p>${station.audiencia}</p></div>`;
  }
  if (station.preguntasReflexion && station.preguntasReflexion.length) {
    html += `<div class="resumen-preguntas"><h4>Preguntas para reflexionar</h4><ul>${station.preguntasReflexion
      .map((q) => `<li>${q}</li>`)
      .join("")}</ul></div>`;
  }
  if (station.fraseCitable) {
    html += `<blockquote class="resumen-citable">${station.fraseCitable}</blockquote>`;
  }
  html += "</div>";
  return html;
}

function showStationDetail(stationId) {
  const station = getStation(stationId);
  if (!station) return;

  const pageView = document.getElementById("pageView");
  if (!pageView) return;

  markStationVisited(stationId);

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
    `Estación ${station.id + 1} de ${STATIONS.length}`;
  document.getElementById("pagePos").dataset.stationId = station.id;
  renderStationRail(station.id);
  document.getElementById("resumenContent").innerHTML = renderResumenTab(station);
  document.getElementById("synthesisContent").innerHTML = station.synthesis;
  linkGlossaryTerms(document.getElementById("synthesisContent"));

  // C22: el párrafo de transición al final de cada estación (ya presente
  // en el contenido, data.js) pasa a ser un enlace real a la siguiente,
  // sin tocar el texto — solo se añade el comportamiento.
  const transitionEl = document.querySelector("#synthesisContent .station-transition");
  if (transitionEl && station.id < STATIONS.length - 1) {
    transitionEl.classList.add("is-clickable");
    transitionEl.setAttribute("role", "button");
    transitionEl.setAttribute("tabindex", "0");
    transitionEl.setAttribute("aria-label", `Ir a la estación ${station.id + 2}`);
    const goNext = () => showStationDetail(station.id + 1);
    transitionEl.addEventListener("click", goNext);
    transitionEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
    });
  }

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

  // Deep-link: permite compartir/recargar un enlace directo a esta
  // estación. history.replaceState en vez de asignar location.hash para
  // no generar una entrada de historial por cada estación visitada.
  history.replaceState(null, "", `#estacion-${station.id + 1}`);

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

  // El título recibe el foco (tabindex="-1" en el HTML: no entra en el
  // orden de tabulación normal, solo es destino explícito de navegación)
  // para que quien navega por teclado no quede anclado a un nodo del
  // grafo que un instante después queda oculto.
  document.getElementById("pageTitle")?.focus({ preventScroll: true });
}

function backToAtlas() {
  document.getElementById("pageView").classList.remove("active");
  document.body.classList.remove("reading-mode");
  document.getElementById("readingModeToggle")?.setAttribute("aria-pressed", "false");
  history.replaceState(null, "", location.pathname + location.search);
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

  // Devuelve el foco al control de vista activo (grafo/cuadrícula) en vez
  // de dejarlo en el botón "Atlas" que un instante después puede quedar
  // fuera de la vista visible.
  document.querySelector(".toggle-btn.active")?.focus({ preventScroll: true });
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

function glossarySlug(term) {
  return term
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderGlossary() {
  const panel = document.getElementById("glossaryPanel");
  if (!panel || typeof GLOSSARY === "undefined") return;
  panel.innerHTML = GLOSSARY.map(
    (g) =>
      `<div class="glossary-item" id="gloss-${glossarySlug(g.term)}">` +
      `<span class="glossary-term">${g.term}</span>` +
      `<span class="glossary-sub">${g.sub}</span>` +
      `<p class="glossary-def">${g.def}</p>` +
      `</div>`,
  ).join("");
}

/* D24: enlaza in-line, dentro de la prosa de la estación, la primera
   aparición de cada término que ya existe en GLOSSARY — sin añadir
   términos nuevos, solo comportamiento sobre el texto existente.
   Recorre nodos de texto (no regex sobre el HTML) para no romper
   etiquetas ni volver a envolver contenido ya envuelto (epi-tag, kw…). */
function linkGlossaryTerms(container) {
  if (!container || typeof GLOSSARY === "undefined") return;
  const linkedAlready = new Set();
  GLOSSARY.forEach((g) => {
    if (linkedAlready.has(g.term)) return;
    const re = new RegExp(`\\b(${escapeRegex(g.term)})\\b`, "i");
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!re.test(node.nodeValue)) return NodeFilter.FILTER_SKIP;
        const p = node.parentElement;
        if (p && (p.closest(".gloss-link") || p.closest(".epi-tag") || p.closest("h3, h4, h5")))
          return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const node = walker.nextNode();
    if (!node) return;
    const match = node.nodeValue.match(re);
    if (!match) return;
    const before = node.nodeValue.slice(0, match.index);
    const after = node.nodeValue.slice(match.index + match[0].length);
    const span = document.createElement("span");
    span.className = "gloss-link";
    span.setAttribute("role", "button");
    span.setAttribute("tabindex", "0");
    span.dataset.term = g.term;
    span.textContent = match[0];
    const parent = node.parentNode;
    parent.insertBefore(document.createTextNode(before), node);
    parent.insertBefore(span, node);
    parent.insertBefore(document.createTextNode(after), node);
    parent.removeChild(node);
    linkedAlready.add(g.term);
  });
}

function openGlossaryTerm(term) {
  const btn = document.getElementById("glossaryToggle");
  const panel = document.getElementById("glossaryPanel");
  if (!btn || !panel) return;
  panel.classList.add("open");
  btn.setAttribute("aria-expanded", "true");
  const item = document.getElementById(`gloss-${glossarySlug(term)}`);
  if (item) {
    item.scrollIntoView({ block: "nearest" });
    item.classList.add("gloss-flash");
    setTimeout(() => item.classList.remove("gloss-flash"), 1200);
  }
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

/* Alto contraste, modo oscuro y modo lectura — mismo patrón que el
   selector de tamaño de fuente: clase + persistencia en localStorage
   (excepto modo lectura, que es un estado de sesión, no una preferencia
   permanente). */
function setupDisplayToggles() {
  const hcBtn = document.getElementById("highContrastToggle");
  if (hcBtn) {
    const applyHc = (on) => {
      document.documentElement.classList.toggle("hc-mode", on);
      hcBtn.setAttribute("aria-pressed", on ? "true" : "false");
    };
    let hcOn = false;
    try {
      hcOn = localStorage.getItem("highContrast") === "1";
    } catch (_) {}
    applyHc(hcOn);
    hcBtn.addEventListener("click", () => {
      hcOn = !hcOn;
      applyHc(hcOn);
      try {
        localStorage.setItem("highContrast", hcOn ? "1" : "0");
      } catch (_) {}
    });
  }

  const darkBtn = document.getElementById("darkModeToggle");
  if (darkBtn) {
    const applyDark = (on) => {
      document.documentElement.setAttribute("data-theme", on ? "dark" : "light");
      darkBtn.setAttribute("aria-pressed", on ? "true" : "false");
    };
    let darkOn = false;
    try {
      darkOn = localStorage.getItem("theme") === "dark";
    } catch (_) {}
    applyDark(darkOn);
    darkBtn.addEventListener("click", () => {
      darkOn = !darkOn;
      applyDark(darkOn);
      try {
        localStorage.setItem("theme", darkOn ? "dark" : "light");
      } catch (_) {}
    });
  }

  const readingBtn = document.getElementById("readingModeToggle");
  if (readingBtn) {
    readingBtn.addEventListener("click", () => {
      const on = document.body.classList.toggle("reading-mode");
      readingBtn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
}

/* G3: swipe horizontal para pasar de estación dentro del detalle, como
   complemento táctil a los botones ← Anterior / Siguiente → (no los
   sustituye). Ignora el gesto si empieza dentro de una franja que ya
   tiene su propio scroll horizontal (las tabs) o si el movimiento es
   más vertical que horizontal (para no robarle el scroll de la página
   a quien solo está leyendo). */
function setupStationSwipe() {
  const pageView = document.getElementById("pageView");
  if (!pageView) return;
  let startX = 0, startY = 0, tracking = false;

  pageView.addEventListener(
    "touchstart",
    (e) => {
      if (e.target.closest(".detail-tabs, .gloss-link, .ref-hoverable, a, button")) {
        tracking = false;
        return;
      }
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );

  pageView.addEventListener(
    "touchend",
    (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const currentId = parseInt(document.getElementById("pagePos").dataset.stationId, 10);
      if (Number.isNaN(currentId)) return;
      if (dx < 0 && currentId < STATIONS.length - 1) showStationDetail(currentId + 1);
      else if (dx > 0 && currentId > 0) showStationDetail(currentId - 1);
    },
    { passive: true },
  );
}

/* ── Scroll cinematic + nav shadow + progress bar ── */
function initCinematicScroll() {
  if (!document.getElementById("scrollProgress")) {
    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
  }
  const updateHeaderHeightVar = () => {
    const header = document.querySelector(".app-header");
    document.documentElement.style.setProperty("--header-h", `${header?.offsetHeight || 64}px`);
  };
  updateHeaderHeightVar();
  window.addEventListener("resize", updateHeaderHeightVar, { passive: true });

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
      // G1: toolbar compacta al bajar (solo tiene efecto visual en el
      // breakpoint móvil, donde .toolbar es sticky — ver style.css).
      document.querySelector(".toolbar")?.classList.toggle("is-compact", window.scrollY > 40);

      // G2: botón flotante "volver arriba" — solo dentro del detalle de
      // una estación y solo cuando ya se ha bajado lo suficiente para
      // que merezca la pena (evita el ruido de mostrarlo siempre).
      const backToTop = document.getElementById("backToTopBtn");
      if (backToTop) {
        const inStation = document.getElementById("pageView")?.classList.contains("active");
        backToTop.hidden = !(inStation && window.scrollY > 600);
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
      const eventMatch = events.some(
        (e) =>
          e.e.toLowerCase().includes(term) ||
          e.r.toLowerCase().includes(term) ||
          e.f.toLowerCase().includes(term),
      );
      matchesSearch = stationMatchesSearch(station, term) || eventMatch;

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
    const stationResults = filteredStations.filter((s) =>
      stationMatchesSearch(s, term.toLowerCase()),
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
  applySearchToGraph(term);
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
  applyVisitedMarkers();
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

  // G4: en móvil, el grafo (arrastrar + zoom con el dedo) es más difícil
  // de manejar que en escritorio; la cuadrícula ya es la alternativa
  // natural, así que arranca ahí. El grafo se inicializa bajo demanda
  // (setupViewToggle) en cuanto alguien lo pide explícitamente.
  const startsOnMobile = window.matchMedia("(max-width: 640px)").matches;
  if (startsOnMobile) {
    document.getElementById("toggleGrid")?.click();
  } else if (typeof d3 !== "undefined") {
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

  setupDisplayToggles();

  document.getElementById("readInOrderBtn")?.addEventListener("click", () => showStationDetail(0));
  document.getElementById("heroStartBtn")?.addEventListener("click", () => showStationDetail(0));
  document.getElementById("heroExploreBtn")?.addEventListener("click", () => {
    const target = document.getElementById("mapArg");
    if (!target) return;
    const header = document.querySelector(".app-header");
    const headerH = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });

  setupStationSwipe();

  document.getElementById("backToTopBtn")?.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  const graphHint = document.getElementById("graphOnboardHint");
  if (graphHint) {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem("graphHintDismissed") === "1";
    } catch (_) {}
    if (dismissed) graphHint.hidden = true;
    document.getElementById("graphOnboardHintClose")?.addEventListener("click", () => {
      graphHint.hidden = true;
      try {
        localStorage.setItem("graphHintDismissed", "1");
      } catch (_) {}
    });
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest(".gloss-link");
    if (link) openGlossaryTerm(link.dataset.term);
  });
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.closest(".gloss-link")) {
      e.preventDefault();
      openGlossaryTerm(e.target.closest(".gloss-link").dataset.term);
    }
  });

  initCinematicScroll();
  initRevealObserver();
  applyReveals();

  // Abre directamente la estación indicada en la URL, si la hay
  // (enlace compartido o recarga de página con #estacion-N).
  const hashMatch = location.hash.match(/^#estacion-(\d+)$/);
  if (hashMatch) {
    const stationId = parseInt(hashMatch[1], 10) - 1;
    if (getStation(stationId)) showStationDetail(stationId);
  }

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
