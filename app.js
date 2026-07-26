const stationsData = [
  {
    id: "E01",
    num: "01",
    title: "Proclamación en Galilea",
    passage: "Mc 1:14-15; Mt 4:17",
    greek: "καιρός (kairos), ἤγγικεν (engiken)",
    summary: "Jesús inicia su ministerio anunciando que el tiempo del cumplimiento ha llegado y el Reino de Dios se ha acercado.",
    exegetical: {
      text: "El tiempo se ha cumplido; el Reino de Dios se ha acercado. Arrepentíos y creed en el Evangelio.",
      greekAnalysis: "καιρός (kairos): tiempo decisivo señalado por Dios. ἤγγικεν (engiken): acercarse, hacerse presente.",
      historical: "El anuncio aparece dentro del contexto judío del Segundo Templo, marcado por expectativas de restauración del gobierno divino.",
      theology: "Jesús no anuncia simplemente una realidad futura celestial, sino la irrupción presente de la soberanía de Dios.",
      connections: ["E02 — Manifiesto de Nazaret", "E03 — Conflicto con el dominio del Mal", "E12 — Consumación futura"],
      sources: ["Marcos 1:14-15", "Mateo 4:17", "Daniel 7:13-14"]
    },
    answers: {
      P1: { type: "primary", text: "El Reino es la irrupción de la soberanía redentora de Dios en la historia." },
      P2: { type: "secondary", text: "Llega mediante el cumplimiento profético y la llamada al arrepentimiento." },
      P3: { type: "secondary", text: "Entran quienes responden con arrepentimiento y fe." }
    }
  },
  {
    id: "E02",
    num: "02",
    title: "El Manifiesto de Nazaret",
    passage: "Lc 4:16-21",
    greek: "ἄφεσις (aphesis), πτωχοί (ptōchoi)",
    summary: "Jesús interpreta su misión desde Isaías 61 como inauguración del Jubileo mesiánico.",
    exegetical: {
      text: "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas noticias a los pobres.",
      greekAnalysis: "ἄφεσις (aphesis): liberación, cancelación, restauración. πτωχοί (ptōchoi): pobres, necesitados.",
      historical: "Isaías 61 conecta la acción de Dios con restauración, liberación y renovación del pueblo.",
      theology: "El Reino se manifiesta como restauración integral bajo el gobierno del Mesías.",
      connections: ["E01 — Proclamación inicial", "E05 — Vida ética del Reino"],
      sources: ["Lucas 4:16-21", "Isaías 61:1-2"]
    },
    answers: {
      P1: { type: "primary", text: "El Reino trae liberación integral y restauración." },
      P3: { type: "primary", text: "Los pobres y necesitados aparecen como destinatarios prioritarios." },
      P6: { type: "secondary", text: "Promete el año agradable del Señor." }
    }
  },
  {
    id: "E03",
    num: "03",
    title: "Conflicto Belcebú y Exorcismos",
    passage: "Mt 12:22-29; Lc 11:14-22",
    greek: "ἔφθασεν (ephthasen)",
    summary: "Los exorcismos muestran que el Reino invade el dominio del Mal.",
    exegetical: {
      text: "Pero si yo por el Espíritu de Dios echo fuera los demonios, ciertamente ha llegado a vosotros el Reino de Dios.",
      greekAnalysis: "ἔφθασεν (ephthasen): ha llegado, ha irrumpido.",
      historical: "Los exorcismos de Jesús deben entenderse dentro del conflicto apocalíptico entre Dios y las fuerzas del mal.",
      theology: "El Reino se demuestra como poder activo que derrota la esclavitud espiritual.",
      connections: ["E01 — Proclamación", "E06 — Crecimiento del Reino"],
      sources: ["Mateo 12:22-29", "Lucas 11:14-22"]
    },
    answers: {
      P1: { type: "secondary", text: "El Reino manifiesta el poder vencedor de Dios." },
      P2: { type: "primary", text: "Llega mediante la derrota del adversario y la liberación humana." }
    }
  },
  {
    id: "E04",
    num: "04",
    title: "Nicodemo",
    passage: "Jn 3:1-12",
    greek: "ἄνωθεν (anōthen), πνεῦμα (pneuma)",
    summary: "Jesús explica que la entrada al Reino requiere una transformación espiritual profunda.",
    exegetical: {
      text: "El que no naciere de nuevo no puede ver el Reino de Dios.",
      greekAnalysis: "ἄνωθεν (anōthen): de arriba, desde lo alto. πνεῦμα (pneuma): Espíritu.",
      historical: "El diálogo refleja preguntas judías sobre la acción escatológica de Dios y la renovación del pueblo.",
      theology: "El Reino exige una nueva existencia producida por Dios.",
      connections: ["E08 — Modelo del niño", "E09 — Renuncia a los bienes"],
      sources: ["Juan 3:1-12"]
    },
    answers: {
      P3: { type: "primary", text: "Solo entra quien nace de arriba por el Espíritu." },
      P6: { type: "secondary", text: "Promete vida eterna." }
    }
  },
  {
    id: "E05",
    num: "05",
    title: "Sermón de la Montaña",
    passage: "Mt 5-7",
    greek: "δικαιοσύνη (dikaiosynē), ἀγάπη (agapē)",
    summary: "La Carta Magna ética del Reino.",
    exegetical: {
      text: "Buscad primeramente el Reino de Dios y su justicia.",
      greekAnalysis: "δικαιοσύνη (dikaiosynē): justicia, rectitud conforme a la voluntad de Dios.",
      historical: "Jesús presenta la ética del Reino dentro del marco de la tradición de Israel y la expectativa del reinado divino.",
      theology: "El Reino transforma la conducta humana desde el corazón y no solamente desde normas externas.",
      connections: ["E01 — Proclamación del Reino", "E08 — Humildad como acceso", "E13 — Juicio definitivo"],
      sources: ["Mateo 5-7", "Mateo 6:33"]
    },
    answers: {
      P4: { type: "primary", text: "El Reino se vive mediante una justicia superior y una ética transformada." }
    }
  },
  {
    id: "E06",
    num: "06",
    title: "Sembrador y Semilla",
    passage: "Mt 13:1-23",
    greek: "αὐτομάτη (automatē)",
    summary: "El Reino posee una dinámica interna de crecimiento.",
    exegetical: {
      text: "El Reino de los cielos es semejante a un hombre que sembró buena semilla en su campo.",
      greekAnalysis: "αὐτομάτη (automatē): por sí mismo, espontáneamente.",
      historical: "Las parábolas del Reino responden a la aparente contradicción entre la llegada del Reino y su crecimiento aparentemente oculto.",
      theology: "El crecimiento del Reino depende de la acción soberana de Dios.",
      connections: ["E03 — Victoria sobre el Mal", "E07 — Crecimiento silencioso"],
      sources: ["Mateo 13:1-23", "Marcos 4:26-29"]
    },
    answers: {
      P5: { type: "primary", text: "Crece por la potencia propia de la semilla sembrada." }
    }
  },
  {
    id: "E07",
    num: "07",
    title: "Mostaza y Levadura",
    passage: "Mt 13:31-33",
    greek: "μικρότερον (mikroteron), ζύμη (zymē)",
    summary: "El Reino comienza pequeño pero transforma completamente.",
    exegetical: {
      text: "El Reino de los cielos es semejante al grano de mostaza.",
      greekAnalysis: "ζύμη (zymē): levadura, influencia transformadora interna.",
      historical: "Las imágenes agrícolas muestran una inversión de expectativas sobre cómo actuaría el Reino de Dios.",
      theology: "Dios obra mediante procesos aparentemente pequeños hasta alcanzar una plenitud final.",
      connections: ["E06 — Semilla", "E11 — Consumación"],
      sources: ["Mateo 13:31-33"]
    },
    answers: {
      P5: { type: "primary", text: "Crece desde lo insignificante hasta abarcarlo todo." }
    }
  },
  {
    id: "E08",
    num: "08",
    title: "El Niño como Modelo",
    passage: "Mt 18:1-5",
    greek: "παιδίον (paidion)",
    summary: "Jesús redefine quién pertenece al Reino.",
    exegetical: {
      text: "Si no os volvéis y os hacéis como niños, no entraréis en el Reino de los cielos.",
      greekAnalysis: "παιδίον (paidion): niño pequeño, símbolo de dependencia y humildad.",
      historical: "En el mundo antiguo los niños tenían bajo estatus social, haciendo la enseñanza radical.",
      theology: "El acceso al Reino requiere humildad, dependencia y una nueva orientación del corazón.",
      connections: ["E04 — Nuevo nacimiento", "E05 — Justicia del Reino"],
      sources: ["Mateo 18:1-5"]
    },
    answers: {
      P3: { type: "primary", text: "El acceso requiere humildad y dependencia." }
    }
  },
  {
    id: "E09",
    num: "09",
    title: "El Joven Rico",
    passage: "Mt 19:16-30",
    greek: "παλιγγενεσία (palingenesia)",
    summary: "El Reino confronta la seguridad basada en riquezas.",
    exegetical: {
      text: "Para los hombres esto es imposible; mas para Dios todo es posible.",
      greekAnalysis: "παλιγγενεσία (palingenesia): renovación, regeneración, nueva creación.",
      historical: "La riqueza era frecuentemente asociada con bendición divina, por eso la enseñanza de Jesús resulta provocadora.",
      theology: "El Reino exige una lealtad superior al valor de cualquier posesión.",
      connections: ["E08 — Humildad", "E10 — Don gratuito del Padre"],
      sources: ["Mateo 19:16-30"]
    },
    answers: {
      P6: { type: "primary", text: "Promete la renovación futura y la restauración." }
    }
  },
  {
    id: "E10",
    num: "10",
    title: "El Rebaño Pequeño",
    passage: "Lc 12:32-34",
    greek: "εὐδόκησεν (eudokēsen)",
    summary: "El Padre concede el Reino por su voluntad.",
    exegetical: {
      text: "No temáis, manada pequeña, porque a vuestro Padre le ha placido daros el Reino.",
      greekAnalysis: "εὐδόκησεν (eudokēsen): tuvo a bien, se complació.",
      historical: "Jesús presenta el Reino como don divino recibido por una comunidad dependiente de Dios.",
      theology: "El Reino no es conquistado por mérito humano sino recibido como regalo del Padre.",
      connections: ["E09 — Renuncia a las seguridades", "E13 — Herencia final"],
      sources: ["Lucas 12:32-34"]
    },
    answers: {
      P6: { type: "primary", text: "El Reino es un regalo seguro del Padre." }
    }
  },
  {
    id: "E11",
    num: "11",
    title: "Cizaña y Red",
    passage: "Mt 13:24-30; 47-50",
    greek: "συντέλεια (synteleia)",
    summary: "El Reino avanza mientras espera la separación final.",
    exegetical: {
      text: "La siega es el fin del siglo; y los segadores son los ángeles.",
      greekAnalysis: "συντέλεια (synteleia): consumación, conclusión de una etapa.",
      historical: "Las parábolas responden a la pregunta de por qué el mal continúa mientras Dios reina.",
      theology: "El Reino ya está presente pero espera su manifestación definitiva.",
      connections: ["E07 — Crecimiento", "E12 — Consumación futura"],
      sources: ["Mateo 13:24-30", "Mateo 13:47-50"]
    },
    answers: {
      P7: { type: "primary", text: "Culmina con la consumación del siglo." }
    }
  },
  {
    id: "E12",
    num: "12",
    title: "Discurso Escatológico",
    passage: "Mt 24",
    greek: "παρουσία (parousia)",
    summary: "El Rey será manifestado públicamente.",
    exegetical: {
      text: "Entonces aparecerá la señal del Hijo del Hombre en el cielo.",
      greekAnalysis: "παρουσία (parousia): presencia, llegada oficial, manifestación.",
      historical: "El discurso combina profecía sobre Jerusalén y expectativa futura de la venida del Hijo del Hombre.",
      theology: "La historia culmina con la revelación pública del gobierno de Dios.",
      connections: ["E11 — Espera y separación", "E13 — Juicio final"],
      sources: ["Mateo 24", "Daniel 7:13-14"]
    },
    answers: {
      P7: { type: "primary", text: "Termina con la venida gloriosa del Rey." }
    }
  },
  {
    id: "E13",
    num: "13",
    title: "Juicio de las Naciones",
    passage: "Mt 25:31-46",
    greek: "ἐλάχιστοι (elachistoi)",
    summary: "El juicio revela la verdadera relación con el Rey.",
    exegetical: {
      text: "Cuando el Hijo del Hombre venga en su gloria, entonces se sentará en su trono de gloria.",
      greekAnalysis: "ἐλάχιστοι (elachistoi): los más pequeños, los insignificantes.",
      historical: "El juicio final presenta al Rey identificándose con los vulnerables.",
      theology: "La culminación del Reino revela la justicia definitiva de Dios.",
      connections: ["E12 — Venida del Rey", "E05 — Justicia del Reino"],
      sources: ["Mateo 25:31-46"]
    },
    answers: {
      P7: { type: "primary", text: "El Reino culmina en juicio y separación definitiva." }
    }
  }
];

const kingdomConnections = [
  ["E01", "E02"],
  ["E01", "E03"],
  ["E01", "E12"],
  ["E02", "E05"],
  ["E03", "E06"],
  ["E04", "E08"],
  ["E05", "E09"],
  ["E06", "E07"],
  ["E07", "E11"],
  ["E11", "E12"],
  ["E12", "E13"]
];

function renderMatrix() {
  const tbody = document.getElementById("matrixBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  stationsData.forEach(st => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${st.num}. ${st.title}</strong><div>${st.passage}</div></td>
      ${["P1", "P2", "P3", "P4", "P5", "P6", "P7"].map(axis => {
        const answer = st.answers[axis];
        return `<td>${answer ? `<span class="tag ${answer.type}">${axis}</span><div>${answer.text}</div>` : ""}</td>`;
      }).join("")}
    `;
    tbody.appendChild(row);
  });
}

function renderNarrative() {
  const container = document.getElementById("narrativeView");
  if (!container) return;
  container.innerHTML = stationsData.map(st => `
    <div class="narrative-card">
      <h3>ESTACIÓN ${st.num}<br>${st.title}</h3>
      <p><strong>${st.passage}</strong></p>
      <p>${st.summary}</p>
      <p><strong>Concepto griego:</strong> ${st.greek}</p>
    </div>
  `).join("");
}

function renderMapStations() {
  const container = document.getElementById("mapStations");
  if (!container) return;
  container.innerHTML = stationsData.map(st => `
    <div class="narrative-card">
      <h3>${st.id} - ${st.title}</h3>
      <p>${st.passage}</p>
      <p>${st.summary}</p>
    </div>
  `).join("");
}

function renderGraph() {
  const svg = document.getElementById("kingdomGraph");
  if (!svg) return;

  svg.innerHTML = "";
  const width = svg.clientWidth || 800;
  const height = svg.clientHeight || 700;
  const center = { x: width / 2, y: height / 2 };

  svg.innerHTML += `
    <g class="node center-node">
      <circle cx="${center.x}" cy="${center.y}" r="70"></circle>
      <text x="${center.x}" y="${center.y - 10}">Βασιλεία</text>
      <text x="${center.x}" y="${center.y + 15}">Reino de Dios</text>
    </g>
  `;

  const radius = Math.min(width, height) * 0.36;
  const positions = {};

  stationsData.forEach((st, index) => {
    const angle = (index / stationsData.length) * Math.PI * 2 - Math.PI / 2;
    positions[st.id] = {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  });

  kingdomConnections.forEach(([from, to]) => {
    const a = positions[from];
    const b = positions[to];
    if (!a || !b) return;
    svg.innerHTML += `<line class="connection" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"></line>`;
  });

  stationsData.forEach(st => {
    const pos = positions[st.id];
    if (!pos) return;
    svg.innerHTML += `
      <g class="node" onclick="openStation('${st.id}')">
        <circle cx="${pos.x}" cy="${pos.y}" r="45"></circle>
        <text x="${pos.x}" y="${pos.y - 5}">${st.id}</text>
        <text x="${pos.x}" y="${pos.y + 15}">${st.title.substring(0, 14)}</text>
      </g>
    `;
  });
}

function openStation(id) {
  const st = stationsData.find(x => x.id === id);
  const panel = document.getElementById("detailContent");
  if (!st || !panel) return;

  panel.innerHTML = `
    <h2>${st.title}</h2>
    <p class="reference">${st.passage}</p>
    <p>${st.summary}</p>
    <hr>
    <h3>Texto</h3>
    <p>${st.exegetical.text}</p>
    <h3>Griego</h3>
    <p>${st.exegetical.greekAnalysis}</p>
    <h3>Contexto histórico</h3>
    <p>${st.exegetical.historical}</p>
    <h3>Teología</h3>
    <p>${st.exegetical.theology}</p>
    <h3>Conexiones</h3>
    <ul>${st.exegetical.connections.map(item => `<li>${item}</li>`).join("")}</ul>
    <h3>Fuentes</h3>
    <ul>${st.exegetical.sources.map(item => `<li>${item}</li>`).join("")}</ul>
    <hr>
    <button class="view-btn" type="button" onclick="changeView('matrix', event)">Ver en matriz</button>
  `;
}

function applyFilters() {
  const axis = document.getElementById("axisFilter")?.value || "all";
  const type = document.getElementById("typeFilter")?.value || "all";

  document.querySelectorAll("#matrixBody tr").forEach((row, index) => {
    const station = stationsData[index];
    let show = true;
    if (axis !== "all") show = !!station.answers[axis];
    if (type !== "all" && show) show = Object.values(station.answers).some(x => x.type === type);
    row.style.display = show ? "" : "none";
  });
}

function setMainView(view) {
  document.querySelectorAll(".view-btn[data-view]").forEach(btn => {
    const active = btn.dataset.view === view;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.querySelector(".matrix-container")?.classList.toggle("hidden", view !== "matrix");
  document.getElementById("narrativeView")?.classList.toggle("hidden", view !== "narrative");
  document.getElementById("networkView")?.classList.toggle("hidden", view !== "graph");
}

function changeView(view, event) {
  if (event?.target) {
    document.querySelectorAll(".view-btn[data-view]").forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });
    event.target.classList.add("active");
    event.target.setAttribute("aria-pressed", "true");
  }

  setMainView(view);

  if (view === "narrative") renderNarrative();
  if (view === "graph") toggleNetworkView("map");
}

function toggleNetworkView(view, event) {
  const mapView = document.getElementById("mapView");
  const graphView = document.getElementById("graphView");
  const mapToggle = document.getElementById("mapToggle");
  const graphToggle = document.getElementById("graphToggle");

  if (!mapView || !graphView || !mapToggle || !graphToggle) return;

  const showMap = view === "map";
  mapView.classList.toggle("hidden", !showMap);
  graphView.classList.toggle("hidden", showMap);

  mapToggle.classList.toggle("active", showMap);
  graphToggle.classList.toggle("active", !showMap);

  mapToggle.setAttribute("aria-pressed", showMap ? "true" : "false");
  graphToggle.setAttribute("aria-pressed", !showMap ? "true" : "false");

  if (showMap) renderMapStations();
  else renderGraph();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMatrix();

  document.getElementById("searchInput")?.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    document.querySelectorAll("#matrixBody tr").forEach((row, index) => {
      const data = JSON.stringify(stationsData[index]).toLowerCase();
      row.style.display = data.includes(value) ? "" : "none";
    });
  });

  document.getElementById("axisFilter")?.addEventListener("change", applyFilters);
  document.getElementById("typeFilter")?.addEventListener("change", applyFilters);

  setMainView("matrix");
});