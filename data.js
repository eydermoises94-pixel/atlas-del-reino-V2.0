/* ========================================================
   ATLAS TEOLOGICO INTERACTIVO — DATOS DE CONTENIDO
   Iconos editoriales, referencias biblicas, las 13 estaciones,
   eventos y esquemas QUAD. Contenido teologico puro, separado
   del motor de renderizado (app.js). Editar aqui para anadir
   o corregir estaciones sin tocar la logica de la aplicacion.
   ======================================================== */

/* ═══════════════════════════════════════════════════
   CATÁLOGO DE ÍCONOS EDITORIALES SVG (reemplaza emojis)
   Estilo: trazo editorial, 24x24, stroke 1.8, linea-roja
   ═══════════════════════════════════════════════════ */
const svgWrap = (paths, extra = "") =>
  `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${paths}</svg>`;
const ICONS = {
  crownId:    svgWrap('<path d="M3 11l4-5 5 3 5-3 4 5-2 8H5L3 11z"/><path d="M3 19h18"/><path d="M12 3v4"/>'),
  alert:      svgWrap('<path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
  hourglass:  svgWrap('<path d="M5 3h14v3a7 7 0 0 0-4 6 7 7 0 0 0 4 6v3H5v-3a7 7 0 0 0 4-6 7 7 0 0 0-4-6V3z"/><path d="M5 9h14"/><path d="M5 15h14"/>'),
  door:       svgWrap('<path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M11 14h.01"/><path d="M15 7h-2"/>'),
  heart:      svgWrap('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
  seedling:   svgWrap('<path d="M2 20h20"/><path d="M7 20v-4a4 4 0 0 1 4-4h2"/><path d="M17 20v-4a4 4 0 0 0-4-4"/><path d="M13 12V5.5A2.5 2.5 0 0 1 15.5 3H17"/><path d="M13 12a3 3 0 0 0 3-3V7"/>'),
  spark:      svgWrap('<path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M5.6 5.6l2.8 2.8"/><path d="M15.6 15.6l2.8 2.8"/><path d="M5.6 18.4l2.8-2.8"/><path d="M15.6 8.4l2.8-2.8"/>'),
  sword:      svgWrap('<path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/>'),
  cross:      svgWrap('<path d="M10 2h4v7h5v4h-5v8h-4v-8H5V9h5V2z"/>'),
  sunrise:    svgWrap('<path d="M2 19h20"/><path d="M12 3v6"/><path d="M5 12l-3 3"/><path d="M19 12l3 3"/><path d="M7 12a5 5 0 0 1 10 0"/><path d="M12 22a7 7 0 0 0 7-7H5a7 7 0 0 0 7 7z"/>'),
  scroll:     svgWrap('<path d="M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 1-2 2h14"/><path d="M20 5V3h-2"/><path d="M4 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6v18z"/><path d="M8 7h6"/><path d="M8 11h6"/><path d="M8 15h4"/>'),
  globe:      svgWrap('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>'),
  crownGlory: svgWrap('<path d="M2 11l4-4 3 3 3-4 3 4 3-3 4 4-3 9H5L2 11z"/><path d="M3 18h18"/><path d="M12 2v4"/><path d="M19 4l-2 2"/><path d="M5 4l2 2"/>'),
  globe2:     svgWrap('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>'),
  bolt:       svgWrap('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'),
  refresh:    svgWrap('<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>'),
  search:     svgWrap('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>'),
  check:      svgWrap('<path d="M20 6 9 17l-5-5"/>'),
  wheat:      svgWrap('<path d="M2 22h20"/><path d="M12 22V8"/><path d="M8 12a3 3 0 1 1 4-4 3 3 0 0 1 0 6a3 3 0 0 1-4-4a3 3 0 0 1 0-6"/><path d="M16 12a3 3 0 1 0-4-4 3 3 0 0 0 0 6 3 3 0 0 0 4-4 3 3 0 0 0 0-6"/>'),
  boom:       svgWrap('<path d="M12 3v5"/><path d="M3 12h5"/><path d="M16 12h5"/><path d="M12 16v5"/><path d="M5.6 5.6l3.5 3.5"/><path d="M14.9 14.9l3.5 3.5"/><path d="M5.6 18.4l3.5-3.5"/><path d="M14.9 9.1l3.5-3.5"/><circle cx="12" cy="12" r="3.5"/>'),
  mountain:   svgWrap('<path d="M3 20l6-10 4 6 3-4 5 8H3z"/>'),
  eye:        svgWrap('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  target:     svgWrap('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'),
  diamond:    svgWrap('<path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20"/><path d="M6 3l-4 6"/><path d="M18 3l4 6"/>'),
  net:        svgWrap('<path d="M2 12a10 10 0 0 0 20 0"/><path d="M2 12a10 10 0 0 1 20 0"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2a10 10 0 0 0 0 20"/><circle cx="12" cy="12" r="1"/>'),
  signal:     svgWrap('<path d="M3 18h.01"/><path d="M8 18a3 3 0 0 1 6 0"/><path d="M13 18a8 8 0 0 1 8 8"/><path d="M3 26a8 8 0 0 1 8-8"/>'),
  chalice:    svgWrap('<path d="M4 3h16v5a6 6 0 0 1-12 0V3z"/><path d="M12 14v7"/><path d="M8 21h8"/>'),
  wave:       svgWrap('<path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/>'),
  swirl:      svgWrap('<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 9 9c0 5-4 9-9 9-3 0-5-2-5-5s2-4 5-4c1.5 0 3 1 3 3"/>'),
  flag:       svgWrap('<path d="M4 22V3"/><path d="M4 5h12l-2 4 2 4H4"/>'),
  fire:       svgWrap('<path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-2 0-4 0-7z"/><path d="M8 17a4 4 0 0 0 8 0"/>'),
  skull:      svgWrap('<circle cx="12" cy="10" r="7"/><circle cx="9" cy="10" r="1.2" fill="currentColor"/><circle cx="15" cy="10" r="1.2" fill="currentColor"/><path d="M9 15h6v4H9v2H8v-2H7v-4h2z"/>'),
  book:       svgWrap('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
  compass:    svgWrap('<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>'),
  hands:      svgWrap('<path d="M8 9V5a2 2 0 0 1 4 0v8"/><path d="M12 13V4a2 2 0 0 1 4 0v9"/><path d="M16 13V7a2 2 0 0 1 4 0v9a7 7 0 0 1-7 7H9a4 4 0 0 1-4-4v-5a2 2 0 0 1 4 0"/>'),
  child:      svgWrap('<circle cx="12" cy="5" r="3"/><path d="M12 8v5"/><path d="M8 12l4 1 4-1"/><path d="M10 22V13h4v9"/>'),
  pulse:      svgWrap('<path d="M2 12h4l2-6 4 12 3-9 2 3h5"/>'),
  dove:       svgWrap('<path d="M20 10a6 6 0 0 1-8 5.65L10 20h4l3-3c1.5 1 4 1 5-1 2-5-1-8-2-6z"/><path d="M12 15.65A6 6 0 0 1 4 10c0-3 2-5 5-5 3 0 5 3 5 5"/>'),
  columns:    svgWrap('<path d="M2 3h20v2H2z"/><path d="M2 21h20v1H2z"/><path d="M5 5v15"/><path d="M12 5v15"/><path d="M19 5v15"/>'),
  pawn:       svgWrap('<circle cx="12" cy="5" r="2"/><path d="M10 8h4v4h-1v2h1v3H9v-3h1v-2H9V8h1z"/><path d="M6 21h12v-1H6z"/>'),
  clock:      svgWrap('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  map:        svgWrap('<path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z"/><path d="M9 3v16"/><path d="M15 5v16"/>'),
  shuffle:    svgWrap('<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>'),
  tree:       svgWrap('<path d="M12 2l5 7h-2l3 6h-2l3 5H5l3-5H9l3-6H10z"/><path d="M12 23v-5"/>'),
  bulb:       svgWrap('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 1 6 6c0 2-1 3-2 4l-1 2H9l-1-2c-1-1-2-2-2-4a6 6 0 0 1 6-6z"/>'),
  puzzle:     svgWrap('<path d="M19 4h-5a2 2 0 0 1 0-4 2 2 0 0 1 0 4"/><path d="M20 9v5a2 2 0 0 1 4 0 2 2 0 0 1-4 0"/><path d="M15 20h-5a2 2 0 0 1 0 4 2 2 0 0 1 0-4"/><path d="M4 15v-5a2 2 0 0 1-4 0 2 2 0 0 1 4 0"/><path d="M4 9h5a2 2 0 0 0 0-4 2 2 0 0 0 0 4h5v5a2 2 0 0 0 4 0V9h5v5a2 2 0 0 0 0 4v5h-5a2 2 0 0 0 0 4v-5h-5v5a2 2 0 0 0-4 0v-5H4z"/>'),
  clipboard:  svgWrap('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M8 11h8"/><path d="M8 15h8"/>'),
  balance:    svgWrap('<path d="M12 3v18"/><path d="M3 8h4l3 9H3L3 8z"/><path d="M17 8h4l-3 9h-4L17 8z"/><path d="M5 8l7-5 7 5"/>'),
  network:    svgWrap('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.2 7.3l7.6 0"/><path d="M7.3 8.2l3.5 7.6"/><path d="M16.7 8.2l-3.5 7.6"/>'),
  church:     svgWrap('<path d="M12 2v4"/><path d="M10 4h4"/><path d="M4 21V11l8-6 8 6v10"/><path d="M4 21h16"/><path d="M10 21v-6h4v6"/>')
};
const stationIcons = [
  ICONS.crownId, ICONS.alert, ICONS.hourglass, ICONS.door, ICONS.heart,
  ICONS.seedling, ICONS.spark, ICONS.sword, ICONS.cross, ICONS.sunrise,
  ICONS.scroll, ICONS.globe, ICONS.crownGlory
];

/* ═══════════════════════════════════════════════════
   SISTEMA DE CALIBRACIÓN EPISTEMOLÓGICA
   Seis niveles de certeza para transparentar al lector si una
   afirmación es cita bíblica directa, inferencia exegética,
   síntesis propia, lectura pentecostal, énfasis IPHC o recurso
   pedagógico del Atlas. Fuente única de verdad para las etiquetas:
   epiTag() y renderEpiLegend() en app.js leen de aquí.
   El texto de "desc" es contenido teológico — su redacción final
   la decide Moisés / Agente 2, no este archivo de infraestructura.
   ═══════════════════════════════════════════════════ */
const EPI_TAGS = {
  texto: {
    icon: "book", label: "Texto bíblico", full: "Texto bíblico directo",
    desc: "Cita o afirmación literal de las Escrituras.",
  },
  exegesis: {
    icon: "search", label: "Exégesis", full: "Inferencia exegética",
    desc: "Conclusión derivada del método histórico-gramatical sobre un texto concreto.",
  },
  sintesis: {
    icon: "network", label: "Síntesis", full: "Síntesis teológica",
    desc: "Elaboración sistemática que conecta varios textos o estaciones del Atlas.",
  },
  pentecostal: {
    icon: "fire", label: "Pentecostal", full: "Perspectiva pentecostal",
    desc: "Lectura propia de la tradición pentecostal / carismática amplia.",
  },
  iphc: {
    icon: "church", label: "IPHC", full: "Énfasis doctrinal IPHC",
    desc: "Punto alineado explícitamente con los Artículos de Fe de la IPHC.",
  },
  atlas: {
    icon: "compass", label: "Atlas", full: "Propuesta del Atlas",
    desc: "Esquema pedagógico o metáfora explicativa propia de este proyecto, no un dato textual directo.",
  },
};

/* Inserta esto dentro de cualquier synthesis de STATIONS, p.ej.:
   `<p>${epiTag("exegesis")} El perfecto ēngiken indica...</p>`
   Vive aquí y no en app.js porque STATIONS se evalúa en cuanto data.js se
   carga, antes de que app.js exista: la función tiene que estar disponible
   ya en este archivo. Es una función pura (sin DOM), por eso puede vivir
   en el archivo de contenido sin romper la separación datos/lógica. */
function epiTag(key) {
  const t = EPI_TAGS[key];
  if (!t) return "";
  const iconSvg = ICONS[t.icon] || "";
  return (
    `<span class="epi-tag epi-${key}" tabindex="0" role="button" ` +
    `aria-label="${t.full}: ${t.desc}" title="${t.desc}">` +
    `${iconSvg}${t.label}</span>`
  );
}

// 📖 DATOS BÍBLICOS — Referencia + Texto completo (RVR estilizado)
const BIBLE = {
  "Mt 3:13-17": { short: "Bautismo · Trinidad", text: "«Yo necesito ser bautizado por ti, ¿y tú vienes a mí?» Respondiendo Jesús, le dijo: «Deja ahora, porque así conviene que cumplamos toda justicia.» Entonces Juan lo permitió. Jesús, después que fue bautizado, subió inmediatamente del agua; y he aquí, los cielos le fueron abiertos, y vio al Espíritu de Dios que descendía como paloma y venía sobre él. Y hubo una voz de los cielos: «Este es mi Hijo amado, en quien tengo complacencia.»" },
  "Mt 17:1-9": { short: "Transfiguración · Gloria", text: "«De cierto os digo que hay algunos de los que están aquí, que no gustarán la muerte hasta que vean al Hijo del Hombre viniendo en su reino.» Seis días después, Jesús tomó a Pedro, a Santiago y a Juan su hermano, y los llevó aparte a un monte alto; y fue transfigurado delante de ellos. Su rostro brilló como el sol, y sus vestiduras se hicieron blancas como la luz." },
  "Jn 6:35-58": { short: "Pan de vida", text: "Jesús les dijo: «Yo soy el pan de vida; el que a mí viene, nunca tendrá hambre; y el que en mí cree, no tendrá sed jamás. Porque el pan de Dios es aquel que descendió del cielo y da vida al mundo. (…) Mis palabras son espíritu y son vida.»" },
  "Jn 14:6": { short: "Camino, verdad, vida", text: "Jesús le dijo: «Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.»" },
  "Jn 14:9": { short: "Ver al Padre", text: "«Tanto tiempo hace que estoy con vosotros, ¿y no me has conocido, Felipe? El que me ha visto a mí, ha visto al Padre; ¿cómo, pues, dices tú: Muéstranos al Padre?»" },
  "Jn 10:30-38": { short: "Unidad con el Padre", text: "«Yo y el Padre uno somos.» Entonces los judíos volvieron a tomar piedras para apedrearle. Jesús les respondió: «Muchas buenas obras he mostrado a vosotros de parte del Padre; ¿por cuál de ellas me apedreas?»" },
  "Mt 9:1-8": { short: "Parálisis · Perdón", text: "Subiendo Jesús a la barca pasó al otro lado, y vino a su ciudad. Y he aquí, trajeron a él a un paralítico tendido en una cama. Al ver Jesús la fe de ellos, dijo al paralítico: «Ten ánimo, hijo; tus pecados te son perdonados.»" },
  "Mt 8:28-34": { short: "Gadareno · Liberación", text: "Cuando llegó Jesús al otro lado, al país de los gadarenos, le salieron al encuentro dos endemoniados que salían de los sepulcros, fieros en gran manera, de modo que nadie podía pasar por aquel camino. Y gritaron: «¿Qué tienes con nosotros, Jesús, Hijo de Dios? ¿Has venido aquí para atormentarnos antes de tiempo?»" },
  "Mt 9:18-26": { short: "Jairo · Flujo sangre", text: "Mientras él les decía estas cosas, vino uno de los principales de la sinagoga y le adoró diciendo: «Mi hija acaba de morir; pero ven y pon tu mano sobre ella, y vivirá.» Y una mujer que padecía flujo de sangre desde doce años, se acercó por detrás y tocó el borde de su manto. «Tu fe te ha salvado», le dijo Jesús." },
  "Jn 11:1-44": { short: "Lázaro · Resurrección", text: "Jesús, profundamente conmovido en el espíritu, se acercó a la tumba (era una cueva con una piedra puesta delante). Dijo Jesús: «Quitad la piedra.» Y cuando le quitaron, levantó los ojos a lo alto y dijo: «Lázaro, sal fuera.» Y el que había muerto salió, atado las manos y los pies con vendas." },
  "Lc 15:11-32": { short: "Hijo Pródigo", text: "«Hijo, tú siempre estás conmigo, y todo lo que tengo es tuyo; mas convenía alegrarnos y regocijarnos, porque este tu hermano estaba muerto, y ha vuelto a la vida; estaba perdido, y ha sido hallado.»" },
  "Lc 5:32": { short: "Llamar a pecadores", text: "«No he venido a llamar a justos, sino a pecadores al arrepentimiento.»" },
  "Mc 1:23": { short: "Espíritu inmundo", text: "Había en la sinagoga un hombre con espíritu inmundo, que exclamó a gran voz: «¡Déjanos en paz! ¿Qué tienes con nosotros, Jesús Nazareno? ¿Has venido a destruirnos? Sé quién eres: el Santo de Dios.»" },
  "Mc 1:34": { short: "Sanó muchos enfermos", text: "Sanó también a muchos que padecían de diversas enfermedades, y echó fuera a muchos demonios; y no permitía que los demonios hablaran, porque le conocían." },
  "Jn 11:25": { short: "Yo soy la resurrección", text: "Jesús le dijo: «Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá. Y todo aquel que vive y cree en mí, no morirá eternamente.»" },
  "Lc 4:18": { short: "Pobre evangelizado", text: "«El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; me ha enviado a proclamar libertad a los cautivos y recuperación de la vista a los ciegos, a poner en libertad a los oprimidos.»" },
  "Lc 19:10": { short: "Buscar y salvar", text: "«Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.»" },
  "Mc 1:15": { short: "Kairos cumplido", text: "«El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos y creed en el evangelio.»" },
  "Lc 4:16-21": { short: "Nazaret · Año favor", text: "Vino a Nazaret, donde se había criado; y el día de reposo entró en la sinagoga y se levantó a leer. «Este día se ha cumplido esta Escritura que acabáis de oír.»" },
  "Lc 17:20-21": { short: "Reino entre vosotros", text: "Preguntado por los fariseos: «¿Cuándo vendrá el reino de Dios?», les respondió: «El reino de Dios no vendrá con señal visible; ni dirán: Mirad aquí, o mirad allá. Porque he aquí, el reino de Dios está entre vosotros.»" },
  "Lc 17:21": { short: "Reino dentro", text: "«Porque he aquí, el reino de Dios está entre vosotros.»" },
  "Mt 21:33-46": { short: "Labradores malvados", text: "«Por tanto, os digo que el reino de Dios será quitado de vosotros, y será dado a gente que produzca los frutos de él. Y el que cayere sobre esta piedra será quebrantado; y sobre quien ella cayere, será desmenuzado.»" },
  "Mt 6:9-13": { short: "Padrenuestro", text: "Vosotros, pues, oraréis así: «Padre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Hágase tu voluntad, como en el cielo, también en la tierra. El pan nuestro de cada día, dánoslo hoy. Y perdona nuestras deudas, como también nosotros perdonamos a nuestros deudores.»" },
  "Jn 3:1-21": { short: "Nacer de nuevo", text: "Jesús le respondió: «De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios.» Le respondió Nicodemo: «¿Cómo puede un hombre nacer siendo viejo?»" },
  "Jn 3:3": { short: "Ver el Reino", text: "«De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios.»" },
  "Mt 19:13-15": { short: "Niños · Reino", text: "Entonces le fueron presentados unos niños, para que pusiese las manos sobre ellos y orase; mas los discípulos les reñían. Pero Jesús les dijo: «Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de los cielos.»" },
  "Mc 10:15": { short: "Recibir como niño", text: "«De cierto os digo: cualquiera que no reciba el reino de Dios como un niño, de ninguna manera entrará en él.»" },
  "Lc 19:1-10": { short: "Zaqueo", text: "«Zaqueo, date prisa, desciende, porque hoy es necesario que pose yo en tu casa.» Entonces él descendió apresuradamente, y le recibió gozoso. Y Zaqueo dijo al Señor: «He aquí, Señor, la mitad de mis bienes doy a los pobres; y si en algo he defraudado a alguno, lo vuelvo con el cuádruple.»" },
  "Jn 7:53-8:11": { short: "Mujer adúltera", text: "Jesús le dijo: «Yo tampoco te condeno; vete, y no peques más.»" },
  "Mt 19:16-30": { short: "Joven rico", text: "«Si quieres ser perfecto, anda, vende lo que tienes, y dalo a los pobres, y tendrás tesoro en los cielos; y ven y sígueme.» El joven, oyendo esto, se fue triste, porque tenía muchas posesiones." },
  "Mt 8:5-13": { short: "Centurión", text: "«Señor, no soy digno de que entres bajo mi techo; solamente di la palabra, y mi criado sanará. Porque yo también soy hombre bajo autoridad, y tengo bajo mis órdenes soldados.»" },
  "Mt 5:3-12": { short: "Bienaventuranzas", text: "«Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos. Bienaventurados los que lloran, porque ellos recibirán consolación. Bienaventurados los mansos, porque ellos recibirán la tierra por heredad. Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.»" },
  "Mt 5:21-48": { short: "Antítesis", text: "«Oísteis que fue dicho a los antiguos: No matarás; y cualquiera que matare será culpable de juicio. Pero yo os digo que cualquiera que se enoje contra su hermano, será culpable de juicio.»" },
  "Mt 5:43-48": { short: "Amor al enemigo", text: "«Oísteis que fue dicho: Amarás a tu prójimo, y aborrecerás a tu enemigo. Pero yo os digo: Amad a vuestros enemigos, bendecid a los que os maldicen, haced bien a los que os aborrecen, y orad por los que os ultrajan y os persiguen.»" },
  "Mt 18:21-35": { short: "Perdón sin límite", text: "«Señor, ¿cuántas veces perdonaré a mi hermano que peque contra mí? ¿Hasta siete?» Jesús le dijo: «No te digo hasta siete, sino aun hasta setenta veces siete.»" },
  "Mt 22:34-40": { short: "Gran Mandamiento", text: "«Oye, Israel, el Señor nuestro Dios, el Señor uno es. Y amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente. Este es el primero y grande mandamiento. Y el segundo es semejante: Amarás a tu prójimo como a ti mismo. De estos dos mandamientos cuelga toda la ley y los profetas.»" },
  "Jn 13:1-17": { short: "Lavado de pies", text: "«Si yo, el Señor y el Maestro, he lavado vuestros pies, vosotros también debéis lavar los pies los unos a los otros. Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis.»" },
  "Mt 13:1-23": { short: "Sembrador", text: "«El sembrador salió a sembrar su semilla. Y mientras sembraba, parte cayó junto al camino, y vinieron las aves y la devoraron. Otra parte cayó en pedregales (…) mas otra parte cayó en buena tierra, y dio fruto, cuál a ciento, cuál a sesenta, y cuál a treinta por uno.»" },
  "Mt 13:31-32": { short: "Grano mostaza", text: "«El reino de los cielos es semejante a un grano de mostaza, que un hombre tomó y sembró en su campo; el cual es a la verdad la más pequeña de todas las semillas; pero cuando ha crecido, es la mayor de las hortalizas, y se hace árbol, de modo que vienen las aves del cielo y hacen nidos en sus ramas.»" },
  "Mt 13:33": { short: "Levadura", text: "«El reino de los cielos es semejante a la levadura, que una mujer tomó y metió en tres medidas de harina, hasta que todo se fermentó.»" },
  "Mt 13:44-46": { short: "Tesoro · Perla", text: "«El reino de los cielos es semejante a un tesoro escondido en un campo, el cual un hombre halla, y lo esconde de nuevo; y gozoso de ese hallazgo va y vende todo lo que tiene, y compra aquel campo.»" },
  "Mt 13:47-50": { short: "Red", text: "«El reino de los cielos es semejante a una red, que echada en el mar, recoge de toda clase de peces; que cuando se llena, la sacan a la orilla, y sentados recogen lo bueno en vasijas, y echan lo malo.»" },
  "Mc 4:26-29": { short: "Crecimiento auto", text: "«Así es el reino de Dios: como cuando un hombre echa semilla en la tierra, y duerme y se levanta de noche y de día, y la semilla brota y crece, sin que él sepa cómo. Porque de por sí la tierra da fruto: primero hierba, luego espiga, después grano lleno en la espiga.»" },
  "Mt 13:24-43": { short: "Trigo y cizaña", text: "«El que siembra la buena semilla es el Hijo del Hombre; el campo es el mundo; la buena semilla son los hijos del reino; la cizaña son los hijos del malo; el enemigo que la sembró es el diablo.»" },
  "Jn 5:1-18": { short: "Betesda", text: "«Levántate, toma tu lecho, y anda. El que me envió, conmigo es. Y así como el Padre levanta a los muertos, y les da vida, así también el Hijo a los que quiere da vida.»" },
  "Jn 9:1-41": { short: "Ciego nacimiento", text: "«Yo soy la luz del mundo. Me es necesario hacer las obras del que me envió, entre tanto que es de día; la noche viene, cuando nadie puede trabajar. Mientras estoy en el mundo, soy la luz del mundo.»" },
  "Mc 1:21-28": { short: "Capernaum · Endemoniado", text: "Y entraron en Capernaúm; y el día de reposo, entrando luego en la sinagoga, enseñaba. Y todos se maravillaban de su doctrina, porque les enseñaba como quien tiene autoridad, y no como los escribas." },
  "Mt 8:23-27": { short: "Tormenta calmada", text: "«¿Por qué tenéis miedo, oh hombres de poca fe?» Levantándose entonces, reprendió a los vientos y al mar, y se hizo una gran calma. Y los hombres se maravillaron diciendo: «¿Quién es éste, que aun los vientos y el mar le obedecen?»" },
  "Mt 14:13-21": { short: "Multiplicación panes", text: "Tomó Jesús los cinco panes y los dos peces, y mirando al cielo, bendijo, y partió los panes, y dio a los discípulos; y los discípulos a las multitudes. Y comieron todos, y se saciaron; y recogieron lo que sobró de los pedazos, doce cestas llenas." },
  "Mt 14:22-33": { short: "Caminar aguas", text: "Y en la cuarta vigilia de la noche, Jesús vino a ellos andando sobre el mar. Al verle ellos, se turbaron, diciendo: «¡Es un fantasma!» Y dieron voces de miedo. Pero Jesús les habló luego: «¡Tened ánimo! Yo soy, no temáis.»" },
  "Mt 9:9-13": { short: "Publicanos · Cena", text: "«No necesitan médico los sanos, sino los enfermos. Id pues, y aprended lo que significa: Misericordia quiero, y no sacrificio. Porque no he venido a llamar a justos, sino a pecadores al arrepentimiento.»" },
  "Mt 9:20-22": { short: "Hemorroísa", text: "Jesús, volviéndose y viéndola, dijo: «Ten ánimo, hija; tu fe te ha salvado.» Y la mujer fue salva desde aquella hora." },
  "Jn 2:13-22": { short: "Templo purificado", text: "Y halló en el templo a los que vendían bueyes, ovejas y palomas, y a los cambistas allí sentados. Y haciendo un azote de cuerdas, sacó a todos del templo." },
  "Mt 12:1-14": { short: "Sábado", text: "«Porque el Hijo del Hombre es Señor del sábado.»" },
  "Mt 12:22-37": { short: "Blasfemia Espíritu", text: "«Mas si yo por el Espíritu de Dios echo fuera los demonios, luego el reino de Dios ha llegado a vosotros. Cualquier pecado y blasfemia será perdonado a los hombres; mas la blasfemia contra el Espíritu no les será perdonada.»" },
  "Mt 12:28": { short: "Reino ha llegado", text: "«Pero si yo por el Espíritu de Dios echo fuera los demonios, luego el reino de Dios ha llegado a vosotros.»" },
  "Mt 12:38-45": { short: "Señal del cielo", text: "«La generación mala y adúltera pide señal; y no le será dada señal, sino la de Jonás el profeta. Porque como estuvo Jonás tres días y tres noches en el vientre del gran pez, así estará el Hijo del Hombre tres días y tres noches en el corazón de la tierra.»" },
  "Mt 23:1-39": { short: "Siete ayes", text: "«Ay de vosotros, escribas y fariseos, hipócritas! porque cerráis el reino de los cielos delante de los hombres; pues ni entráis vosotros, ni dejáis entrar a los que están a punto de entrar.»" },
  "Mt 26:57-68": { short: "Sanedrín", text: "«¿Qué pensáis?» Ellos respondieron: «Reo es de muerte.» Entonces escupieron en su rostro, y le dieron de puñetazos; y otros le abofeteaban, diciendo: «Profetízanos, Cristo: ¿quién es el que te ha herido?»" },
  "Mt 27:11-26": { short: "Pilato", text: "«¿Eres tú el Rey de los judíos?» Pilato les dijo: «¿Queréis, pues, que suelte al Rey de los judíos?» Y le respondieron: «¡Este, no, sino Barrabás!»" },
  "Mt 16:21-23": { short: "Pasión predicha", text: "«El Hijo del Hombre debe padecer mucho de los ancianos, y de los principales sacerdotes y de los escribas, y ser muerto, y ser levantado el tercer día.» Pero Pedro, tomándole aparte, le comenzó a increpar: «¡Señor, ten compasión de ti!; en ninguna manera te sucederá esto.»" },
  "Mt 26:36-46": { short: "Getsemaní", text: "«Padre mío, si es posible, pase de mí esta copa; pero no sea como yo quiero, sino como tú.» Y volvió otra vez por segunda vez, orando: «Padre mío, si no puede pasar de mí esta copa sin que yo la beba, hágase tu voluntad.»" },
  "Mt 27:32-56": { short: "Crucifixión", text: "Y crucificaron a Jesús entre dos ladrones, uno a su derecha y otro a su izquierda. Y decía: «Dios mío, Dios mío, ¿por qué me has desamparado?»" },
  "Lc 23:34-43": { short: "Palabras cruz", text: "«Padre, perdónalos, porque no saben lo que hacen.» Y Jesús le dijo: «De cierto te digo que hoy estarás conmigo en el paraíso.»" },
  "Mt 27:51": { short: "Velo rasgado", text: "Y he aquí, el velo del templo se rasgó en dos, de arriba abajo; y la tierra tembló, y las rocas se partieron." },
  "Jn 12:24": { short: "Grano cae y muere", text: "«De cierto, de cierto os digo: Que si el grano de trigo no cae en la tierra y muere, queda solo; pero si muere, lleva mucho fruto.»" },
  "Col 2:15": { short: "Triunfando en cruz", text: "Desarmó a los principados y a las potestades, los exhibió públicamente, triunfando sobre ellos en la cruz." },
  "2 Co 5:21": { short: "Hecho pecado por nosotros", text: "Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos hechos justicia de Dios en él." },
  "1 P 2:24": { short: "Llevó nuestros pecados", text: "Quien llevó él mismo nuestros pecados en su cuerpo sobre el madero, para que nosotros, estando muertos a los pecados, vivamos a la justicia; y por cuya herida fuisteis sanados." },
  "Ef 1:7": { short: "Redención por su sangre", text: "En quien tenemos redención por su sangre, el perdón de pecados según las riquezas de su gracia." },
  "Ro 3:25": { short: "Propiciación por la fe", text: "A quien Dios puso como propiciación por medio de la fe en su sangre, para manifestar su justicia, a causa de haber pasado por alto, en su paciencia, los pecados pasados." },
  "Heb 10:19-20": { short: "Camino nuevo y vivo", text: "Teniendo libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo, por el camino nuevo y vivo que él nos abrió a través del velo, esto es, de su carne." },
  "Gá 5:22-23": { short: "Fruto del Espíritu", text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley." },
  "1 Co 3:6-7": { short: "Dios da el crecimiento", text: "Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios. Así que ni el que planta es algo, ni el que riega, sino Dios, que da el crecimiento." },
  "Mt 28:1-10": { short: "Resurrección", text: "Mas el ángel, respondiendo, dijo a las mujeres: «No temáis vosotras; porque yo sé que buscáis a Jesús, el que fue crucificado. No está aquí, porque ha resucitado, como dijo. Venid, ved el lugar donde fue puesto el Señor.»" },
  "Mt 28:16-20": { short: "Gran Comisión", text: "Toda potestad me es dada en el cielo y en la tierra. Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado." },
  "Mt 28:18": { short: "Toda potestad", text: "«Toda potestad me es dada en el cielo y en la tierra.»" },
  "Fil 2:9": { short: "Nombre sobre todo nombre", text: "Por lo cual Dios también le exaltó hasta lo sumo, y le dio un nombre que es sobre todo nombre." },
  "Jn 20:24-29": { short: "Tomás", text: "Tomás respondió y le dijo: «¡Señor mío, y Dios mío!» Jesús le dijo: «Porque me has visto has creído; bienaventurados los que no vieron, y creyeron.»" },
  "Lc 24:13-35": { short: "Emaús", text: "Entonces les abrió el entendimiento, para que comprendiesen las Escrituras; y les dijo: «¿No era necesario que el Cristo padeciese estas cosas, y entrase en su gloria?» Y sus ojos se abrieron, y le conocieron." },
  "Hch 1:3": { short: "40 días · Reino", text: "A quienes también, después de haber padecido, se presentó vivo con muchas pruebas indubitables, apareciéndoseles durante cuarenta días y hablándoles de lo concerniente al reino de Dios." },
  "Hch 1:6-8": { short: "Restauración Israel", text: "«Señor, ¿restaurarás el reino a Israel en este tiempo?» Y les dijo: «No os toca a vosotros saber los tiempos o las sazones, que el Padre puso en su sola potestad; pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.»" },
  "Hch 1:8": { short: "Testigos hasta lo último", text: "«Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.»" },
  "Lc 24:50-53": { short: "Ascensión", text: "Y llevólos hasta Betania, y alzando sus manos, los bendijo. Y aconteció que mientras los bendecía, se separó de ellos, y fue llevado arriba al cielo. Y ellos, adorándole, volvieron a Jerusalén con gran gozo, y estaban siempre en el templo alabando y bendiciendo a Dios." },
  "Lc 10:25-37": { short: "Buen Samaritano", text: "«Y he aquí, un cierto samaritano, que iba de camino, vino cerca de él, y viéndole, fue movido a misericordia; y acercándose, vendó sus heridas, echando en ellas aceite y vino; y cargándole en su propia bestia, le llevó a una posada, y cuidó de él.»" },
  "Jn 14:15-26": { short: "Promesa Espíritu", text: "«Y yo rogaré al Padre, y os dará otro Consolador, para que esté con vosotros para siempre: el Espíritu de verdad, al cual el mundo no puede recibir, porque no le ve, ni le conoce; pero vosotros le conocéis, porque mora con vosotros, y estará en vosotros.»" },
  "Jn 14:12": { short: "Mayores obras", text: "«De cierto, de cierto os digo: El que en mí cree, las obras que yo hago, él las hará también; y mayores que éstas hará, porque yo voy al Padre.»" },
  "Mc 16:15": { short: "Predicad evangelio", text: "«Id por todo el mundo y predicad el evangelio a toda criatura.»" },
  "Mt 25:31-46": { short: "Ovejas · Cabritos", text: "«Cuando el Hijo del Hombre venga en su gloria, y todos los santos ángeles con él, entonces se sentará en su trono de gloria, y serán reunidas delante de él todas las naciones; y apartará los unos de los otros, como aparta el pastor las ovejas de los cabritos.»" },
  "Mt 24:29-31": { short: "Segunda venida", text: "«Inmediatamente después de la tribulación de aquellos días, el sol se oscurecerá, y la luna no dará su resplandor, y las estrellas caerán del cielo, y las potencias de los cielos serán conmovidas. Entonces aparecerá la señal del Hijo del Hombre en el cielo; y entonces lamentarán todas las tribus de la tierra.»" },
  "Jn 5:24-30": { short: "Juicio final", text: "«De cierto, de cierto os digo: Que el que oye mi palabra, y cree al que me envió, tiene vida eterna; y no vendrá a condenación, mas ha pasado de muerte a vida. Porque el Padre no juzga a nadie, sino que todo el juicio ha dado al Hijo.»" },
  "Ap 21:1-5": { short: "Nuevo cielo · tierra", text: "Vi un cielo nuevo y una tierra nueva; porque el primer cielo y la primera tierra pasaron, y el mar ya no existía más. Y el que estaba sentado en el trono dijo: «He aquí, yo hago nuevas todas las cosas.» Y me dijo: «Escribe; porque estas palabras son fieles y verdaderas.»" },
  "Ap 21:5": { short: "Nuevas todas cosas", text: "Y el que estaba sentado en el trono dijo: «He aquí, yo hago nuevas todas las cosas.»" },
  "Mt 8:11-12": { short: "Banquete escatológico", text: "«Os digo que muchos vendrán del oriente y del occidente, y se sentarán a la mesa con Abraham, Isaac y Jacob en el reino de los cielos; mas los hijos del reino serán echados a las tinieblas de afuera; allí será el llorar y el crujir de dientes.»" },
  "Ap 11:15": { short: "Reino eterno", text: "El séptimo ángel tocó la trompeta, y hubo grandes voces en el cielo, que decían: «¡El reino del mundo ha venido a ser de nuestro Señor y de su Cristo; y él reinará por los siglos de los siglos!»" },
  "Mc 3:27": { short: "Atar al hombre fuerte", text: "«Nadie puede entrar en la casa del hombre fuerte para saquearle sus bienes, sin atar primero al hombre fuerte; y entonces saqueará su casa.»" },
  "Lc 15:7": { short: "Arrepentido más alegre", text: "Os digo que así habrá más gozo en el cielo por un pecador que se arrepiente, que por noventa y nueve justos que no necesitan arrepentimiento." },
  "Ro 11:17-24": { short: "Injertados en la raíz", text: "Pues si algunas de las ramas fueron desgajadas, y tú, siendo olivo silvestre, has sido injertado en lugar de ellas, y hecho participante de la raíz y de la rica savia del olivo, no te jactes contra las ramas; y si te jactas, sabe que no sustentas tú a la raíz, sino la raíz a ti." },
  "Ef 2:14-16": { short: "Un solo hombre nuevo", text: "Porque él es nuestra paz, que de ambos pueblos hizo uno, derribando la pared intermedia de separación... para crear en sí mismo de los dos un solo y nuevo hombre, haciendo la paz, y mediante la cruz reconciliar con Dios a ambos en un solo cuerpo, matando en ella las enemistades." },
  "1 Co 15:24-25": { short: "Entrega final del Reino", text: "Luego el fin, cuando entregue el reino al Dios y Padre, cuando haya suprimido todo dominio, toda autoridad y potencia. Porque es necesario que él reine hasta que haya puesto a todos sus enemigos debajo de sus pies." },
  "Ro 11:25-27": { short: "Todo Israel será salvo", text: "Porque no quiero, hermanos, que ignoréis este misterio... que ha acontecido a Israel endurecimiento en parte, hasta que haya entrado la plenitud de los gentiles; y luego todo Israel será salvo, como está escrito: Vendrá de Sion el Libertador, que apartará de Jacob la impiedad." },
};

/* 📚 GLOSARIO — términos hebreos/griegos y conceptos clave que aparecen a lo
   largo de las 13 estaciones. Las definiciones son un resumen del propio
   contenido de STATIONS (no añaden datos teológicos nuevos): sirven como
   referencia rápida para quien no viene de formación bíblica. */
const GLOSSARY = [
  {
    term: "Malkut Shamayim",
    sub: "hebreo · también basileia tou theou (griego)",
    def: "«Reino de los cielos» / «reino de Dios». En el judaísmo del Segundo Templo no designaba principalmente un lugar, sino el reinado activo de Dios: su soberanía dinámica ejercida sobre la creación.",
  },
  {
    term: "Ēngiken",
    sub: "griego, perfecto verbal",
    def: "«Se ha acercado». Indica que el Reino ha irrumpido decisivamente en la persona de Jesús — no una promesa meramente futura, pero tampoco una llegada ya cerrada y completa.",
  },
  {
    term: "Kairos",
    sub: "griego",
    def: "El tiempo oportuno y cualitativo que se ha cumplido, distinto del tiempo cronológico (chronos). «El tiempo se ha cumplido, y el reino de Dios se ha acercado» (Mc 1:15).",
  },
  {
    term: "Metanoia",
    sub: 'griego, <span lang="el">μετάνοια</span> · heb. šûb, <span lang="he" dir="rtl">שׁוּב</span>',
    def: "No es un cálculo mental (nous) ni un remordimiento: en su trasfondo veterotestamentario designa un giro completo de dirección vital — dejar un rumbo y tomar otro.",
  },
  {
    term: "Ya / Todavía no",
    sub: "tensión escatológica",
    def: "El Reino opera en dos registros a la vez: ya inaugurado en la cruz y la resurrección, pero todavía no consumado en la segunda venida. Entre medias está el tiempo de la gracia.",
  },
  {
    term: "Entos hymōn",
    sub: "griego, Lc 17:21",
    def: "«En medio / dentro de vosotros». El Reino como realidad que ya se toca en la persona de Jesús, no solo una esperanza futura.",
  },
  {
    term: "Sēmeia",
    sub: "griego, «señales»",
    def: "Los milagros no son espectáculos para impresionar: son señales del reinado de Dios irrumpiendo en la realidad caída, anticipos de la renovación cósmica futura.",
  },
  {
    term: "Kyrios",
    sub: "griego, «Señor»",
    def: "Título usado en la Septuaginta (LXX) para traducir YHWH mismo. El Nuevo Testamento lo aplica, sin reservas, al Jesús resucitado.",
  },
  {
    term: "Euangelion",
    sub: "griego, «buenas noticias»",
    def: "El mensaje que se proclama: el Reino ya avanza porque el Rey ya está reinando. La misión da testimonio de esa realidad, no la «construye».",
  },
  {
    term: "Mathēteúsate",
    sub: "griego, imperativo",
    def: "«Haced discípulos» — el único verbo en modo imperativo de la Gran Comisión (Mt 28:16-20). Yendo, bautizando y enseñando son participios que describen cómo se cumple ese mandato.",
  },
  {
    term: "El hombre fuerte",
    sub: "imagen de Mc 3:27",
    def: "Jesús no negocia con los poderes que atan a la humanidad: los saquea, tras atar primero al «hombre fuerte». La cruz es el momento en que ese poder queda atado definitivamente.",
  },
  {
    term: "Ethos del Reino",
    sub: "carácter interior",
    def: "La revolución de valores que el Reino produce en el corazón humano desde adentro hacia afuera — distinta al ethos del Imperio romano o al de la religión farisaica.",
  },
];

// 🗺️ 13 ESTACIONES TEOLÓGICAS (Contenido EXACTO del documento Arquitectura del Reino)
const STATIONS = [
  {
    id: 0,
    title: "El Centro Absoluto: La Identidad del Rey",
    question: "¿Quién es el Rey y qué revela sobre Dios?",
    color: "#C75B2A",
    icon: stationIcons[0],
    resumenLinea: "El Reino de Dios no es primero un territorio ni un programa, sino una persona: donde Jesús reina, Dios está reinando.",
    audiencia: "El punto de partida obligado del Atlas. Útil si preparas una enseñanza sobre la identidad de Jesús, o si necesitas responder a quien reduce el Reino a un proyecto social o a un destino en el más allá.",
    preguntasReflexion: [
      "Si el Reino es ante todo una persona y no un sistema, ¿qué cambia en la forma en que hablas de él a alguien que no cree?",
      "¿Qué imagen de Dios traías antes de mirar el rostro de Jesús, y en qué punto concreto la corrige?",
      "Reconocer al Rey no es solo admitirlo: es someterse. ¿Dónde te cuesta hoy ese sometimiento?",
    ],
    fraseCitable: "El Reino no es un lugar al que se llega. Es un Rey al que se reconoce.",
    synthesis: `<div class="syn-block" style="--card-color:#C75B2A">
<div class="big-num">01</div>
<h3>${ICONS.globe2} La Persona, no el territorio</h3>
<p>El <span class="kw kw-rey">Reino de Dios</span> no es primero un territorio, una institución o una doctrina abstracta. Es, ante todo, una <span class="kw kw-sello">persona</span>. Jesús no anuncia el Reino como un sistema externo que vendrá después de Él; <strong>lo encarna</strong>. En su persona, palabra y obra, <span class="kw kw-gracia">Dios mismo</span> está reinando activamente en la historia humana.</p>
<div class="gold-divider"><span>${ICONS.crownId}</span></div>
<div class="feature-card"><span class="fc-tag">${ICONS.scroll} · Contexto bíblico</span>
<h4>Malkut Shamayim: Reinado activo</h4>
<p>${epiTag("exegesis")} En el judaísmo del Segundo Templo, la frase <em>malkut shamayim</em> (reino de los cielos) y su equivalente griego <em>basileia tou theou</em> no designaban principalmente un lugar geográfico, sino el <span class="kw kw-foco">reinado activo</span> de Dios: la soberanía dinámica divina que se ejerce sobre la creación — aunque el judaísmo del Segundo Templo albergaba varias corrientes sobre cómo y cuándo ese reinado se manifestaría. Jesús toma esta expectativa milenaria y la cumple en sí mismo. ${epiTag("sintesis")} El Reino es inseparable de la persona del Rey: en Jesús, el gobierno redentor de Dios irrumpe de manera decisiva.</p>
</div>
<h3>${ICONS.bolt} El Reino ha llegado ya</h3>
<p>${epiTag("exegesis")} El perfecto griego <em>ēngiken</em> ("se ha acercado") indica que el Reino <span class="kw kw-sello">ha irrumpido decisivamente</span> en la persona de Jesús, manteniendo una tensión entre presencia actual y consumación venidera — no una promesa meramente futura, pero tampoco una llegada ya cerrada y completa. La identidad del Rey es el <span class="kw kw-foco">eje gravitacional</span> de todo el sistema; sin ella, nada tiene sentido. <em>"El que me ha visto a mí, ha visto al Padre"</em> <span class="ref-chip">Jn 14:9</span>.</p>
<div class="flow-fused">
<div class="flow-fused-item"><span class="fs-num">1</span><h5>Anuncia</h5><p>Que Dios está reinando ya</p></div>
<div class="flow-fused-divider" aria-hidden="true">→</div>
<div class="flow-fused-item"><span class="fs-num">2</span><h5>Inaugura</h5><p>El reinado mismo en su persona</p></div>
<div class="flow-fused-divider" aria-hidden="true">→</div>
<div class="flow-fused-item"><span class="fs-num">3</span><h5>Transforma</h5><p>La comprensión de quién es Dios</p></div>
<div class="flow-fused-divider" aria-hidden="true">→</div>
<div class="flow-fused-item"><span class="fs-num">4</span><h5>Consumará</h5><p>Señorío universal sobre todo</p></div>
</div>
<blockquote>"Yo y el Padre uno somos." <span class="ref-chip">Jn 10:30-38</span></blockquote>
<div class="kpi-duo" style="margin-top:12px;">
<div class="kpi-duo-item"><h4>${ICONS.target} Identidad revelada</h4><p>En el Bautismo y la Transfiguración el Padre mismo certifica la identidad del Hijo con voz audible desde el cielo.</p><p class="small"><span class="ref-chip">Mt 3:13-17</span> · <span class="ref-chip">Mt 17:1-9</span></p></div>
<div class="kpi-duo-divider" aria-hidden="true"></div>
<div class="kpi-duo-item"><h4>${ICONS.chalice} Pan de vida</h4><p>${epiTag("exegesis")} El Rey se da a sí mismo como alimento. <em>Comer su carne y beber su sangre</em> no es metáfora vacía sino comunión vital, espiritual y real con Él.</p><p class="small"><span class="ref-chip">Jn 6:35-58</span></p></div>
</div>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Reconocer al Rey es el punto de partida, pero no basta por sí solo: la siguiente estación examina la <strong>condición humana</strong> que hace indispensable su llegada.</p>
</div>`,
  },
  {
    id: 1,
    title: "La Necesidad del Reino",
    question: "¿Qué condición humana hace necesaria su llegada?",
    color: "#8B8680",
    icon: stationIcons[1],
    resumenLinea: "El Reino no es una mejora opcional de la vida humana, sino una intervención de emergencia sobre una esclavitud que va más allá de lo político.",
    audiencia: "Especialmente útil para predicar sobre el pecado sin reducirlo a moralismo individual, y para responder a quien espera del evangelio solo liberación social o solo salvación interior.",
    preguntasReflexion: [
      "De los seis diagnósticos (pecado, demonios, enfermedad, muerte, injusticia, alienación), ¿cuál tiende a ignorar tu comunidad, y por qué precisamente ese?",
      "¿En qué te pareces al que espera un Mesías que expulse a Roma, es decir, que resuelva tu problema visible sin tocar el profundo?",
      "Si cada milagro es a la vez compasión y diagnóstico, ¿qué está diagnosticando Dios en lo que hoy te duele?",
    ],
    fraseCitable: "El enemigo nunca fue solo Roma. Por eso la liberación no podía venir de un ejército.",
    synthesis: `<div class="syn-block" style="--card-color:#8B8680">
<div class="big-num">02</div>
<h3>${ICONS.alert} Intervención de emergencia</h3>
<p>El <span class="kw kw-rey">Reino</span> no es un lujo espiritual opcional ni una mejora moral. Es una <span class="kw kw-foco">intervención de emergencia</span>. La humanidad vive bajo una <strong>esclavitud multidimensional</strong> que Jesús diagnostica con precisión clínica. ${epiTag("atlas")} El Atlas agrupa esa esclavitud en seis diagnósticos distintos, todos convergiendo en la misma raíz.</p>
<div class="gold-divider"><span>${ICONS.diamond}</span></div>
<div class="flow-row">
<div class="flow-step"><span class="fs-num">①</span><h5>Pecado</h5><p><span class="kw kw-sello">Ruptura del pacto</span> con el Creador, que desintegra la identidad.</p><p class="small"><span class="ref-chip">Lc 5:32</span></p></div>
<div class="flow-step"><span class="fs-num">②</span><h5>Demonios</h5><p>Poderes espirituales operando como señores usurpadores en territorios humanos.</p><p class="small"><span class="ref-chip">Mc 1:23</span></p></div>
<div class="flow-step"><span class="fs-num">③</span><h5>Enfermedad</h5><p>El cuerpo como campo de batalla del <span class="kw kw-gracia">mundo caído</span> sobre la carne.</p><p class="small"><span class="ref-chip">Mc 1:34</span></p></div>
<div class="flow-step"><span class="fs-num">④</span><h5>Muerte</h5><p>El <span class="kw kw-sello">enemigo final</span> que despoja al ser humano de su futuro.</p><p class="small"><span class="ref-chip">Jn 11:25</span></p></div>
<div class="flow-step"><span class="fs-num">⑤</span><h5>Injusticia</h5><p>Estructuras sociales que oprimen pobres, cautivos y marginados.</p><p class="small"><span class="ref-chip">Lc 4:18</span></p></div>
<div class="flow-step"><span class="fs-num">⑥</span><h5>Alienación</h5><p>El ser humano perdido respecto a su origen y su destino eterno.</p><p class="small"><span class="ref-chip">Lc 19:10</span></p></div>
</div>
<div class="feature-card"><span class="fc-tag">${ICONS.search} · Diagnóstico profundo</span>
<h4>Más allá de Roma</h4>
<p>Una corriente dominante de la expectativa mesiánica del Segundo Templo esperaba liberación de la ocupación romana. Jesús <span class="kw kw-foco">amplía radicalmente</span> el horizonte: la opresión verdadera es <em>más profunda</em> que la política. El enemigo no es solo Roma; es <strong>Satanás, el pecado y la muerte misma</strong> — poderes invisibles que ningún ejército humano puede derrotar. Por eso el Reino necesita traer un poder que no viene de este mundo.</p>
</div>
<h3>${ICONS.signal} El milagro como diagnóstico</h3>
<p>Cada milagro es simultáneamente un acto de compasión <em>y</em> un diagnóstico. Al sanar a un leproso, demuestra que el Reino tiene poder para tocar lo que la religión consideraba <span class="kw kw-pacto">inmundo e irreparable</span>. Al resucitar a Lázaro, demuestra que incluso el enemigo final tiene fecha de vencimiento.</p>
<div class="two-col" style="margin-top:10px;">
<blockquote>"No he venido a llamar a justos, sino a pecadores al arrepentimiento." <span class="ref-chip">Lc 5:32</span></blockquote>
<blockquote>"El Hijo del Hombre vino a buscar y a salvar lo que se había perdido." <span class="ref-chip">Lc 19:10</span></blockquote>
</div>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Diagnosticada la crisis, queda preguntar cuándo y cómo llega el remedio: la siguiente estación examina la <strong>llegada del Reino</strong> en el tiempo.</p>
</div>`,
  },
  {
    id: 2,
    title: "La Llegada del Reino",
    question: "¿Cómo llega el Reino y qué significa su anuncio?",
    color: "#2E5A6B",
    icon: stationIcons[2],
    resumenLinea: "El Reino ya ha irrumpido en la historia con Jesús, pero todavía no se ha consumado: entre esos dos extremos vivimos nosotros.",
    audiencia: "La estación de referencia para enseñar el «ya pero todavía no». Útil cuando te preguntan por qué el mundo sigue igual si el Reino ya llegó, o cuando alguien vive la fe solo como espera del futuro.",
    preguntasReflexion: [
      "¿Vives más instalado en el «ya» (esperando que todo funcione ahora) o en el «todavía no» (aplazándolo todo al cielo)? ¿Qué te desequilibra hacia ese lado?",
      "Jesús leyó Isaías 61 y dijo que se cumplía ese mismo día. ¿Qué promesa de Dios te cuesta creer que sea para hoy y no solo para el final?",
      "El tiempo entre ambos extremos es tiempo de gracia, no de vacío. ¿Para qué crees que Dios te está dando concretamente este tiempo?",
    ],
    fraseCitable: "«El tiempo se ha cumplido» no es un consejo moral: es una declaración de guerra contra el antiguo orden.",
    synthesis: `<div class="syn-block" style="--card-color:#2E5A6B">
<div class="big-num">03</div>
<h3>${ICONS.hourglass} Kairos: El tiempo se ha cumplido</h3>
<p>El anuncio inaugural en Marcos 1:15 no es un capítulo más de la historia; es un evento <span class="kw kw-foco">kairológico</span> decisivo — un giro de la historia humana en un solo verso. <em>"El tiempo se ha cumplido, y el reino de Dios se ha acercado"</em> <span class="ref-chip">Mc 1:15</span>. No es un consejo moral ni una recomendación piadosa. Es una <strong>declaración de guerra contra el antiguo orden</strong>. ${epiTag("atlas")}</p>
<div class="gold-divider"><span>${ICONS.clock}</span></div>
<h4>${ICONS.book} Lectura de Nazaret: Manifiesto inaugural</h4>
<p>En la sinagoga de su pueblo, Jesús toma el rollo de Isaías 61 y lee un solo verso, y luego cierra el libro y dice una frase que hace estremecer a todos los presentes: <em>"Este día se ha cumplido esta Escritura que acabáis de oír"</em> <span class="ref-chip">Lc 4:16-21</span>. En ese acto, el <span class="kw kw-pacto">Año del favor del Señor</span> deja de ser profecía para convertirse en evento histórico.</p>
<div class="two-col" style="margin-top:16px;">
<div class="kpi-card" style="border-color:#2E5A6B"><h4>${ICONS.check} PRESENTE</h4><p>"El reino de Dios está <span class="kw kw-rey">entre vosotros</span>" <span class="ref-chip">Lc 17:21</span>.</p><p class="small"><em>Entos hymōn</em>: en medio / dentro de vosotros. Una realidad que <em>tocan</em>, no solo esperan.</p></div>
<div class="kpi-card" style="border-color:#C75B2A"><h4>${ICONS.sunrise} FUTURO</h4><p>"Vendrá el Hijo del Hombre en su <span class="kw kw-rey">gloria</span>" <span class="ref-chip">Mt 25:31</span>.</p><p class="small">Manifestación visible, definitiva y pública, para que toda rodilla se doble y toda lengua confiese.</p></div>
</div>
<div class="feature-card"><span class="fc-tag">${ICONS.wheat} · Paradoja central</span>
<h4>Ya, pero todavía no</h4>
<p>El Reino opera simultáneamente en dos registros: ya <em>inaugurado</em> en la cruz y la resurrección, pero <em>todavía no</em> consumado en la segunda venida. Entre medias está el tiempo de la <span class="kw kw-gracia">gracia</span>: el tiempo en el que el mensaje del Reino se proclama y el arrepentimiento sigue siendo posible. Este intervalo es el <em>siglo presente</em> que vivimos ahora.</p>
</div>
<h3>${ICONS.tree} Semilla plantada</h3>
<p>Como una semilla que ya contiene el árbol pero aún no lo manifiesta. El Reino es una realidad que se <span class="kw kw-foco">superpone</span> al mundo caído, penetrándolo como la levadura en la masa, operando de manera oculta y silenciosa, pero irreversiblemente, hasta el día del banquete final <span class="ref-chip">Mt 8:11-12</span>.</p>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Que el Reino haya llegado no lo hace automático para nadie: la siguiente estación pregunta cómo <strong>entra una persona</strong> concreta en él.</p>
</div>`,
  },
  {
    id: 3,
    title: "La Entrada al Reino",
    question: "¿Cómo entra una persona en el Reino?",
    color: "#5D7A6B",
    icon: stationIcons[3],
    resumenLinea: "No se entra al Reino por mérito, linaje ni religión, sino por un giro completo de dirección vital que Dios mismo hace posible.",
    audiencia: "Útil para predicar sobre conversión y arrepentimiento sin caer en el moralismo, y para enseñar por qué el arrepentimiento bíblico es un cambio de rumbo, no un sentimiento de culpa.",
    preguntasReflexion: [
      "Si metanoia es girar de dirección y no solo lamentar lo hecho, ¿en qué dirección ibas antes y en cuál vas ahora? ¿Se nota en algo concreto?",
      "El joven rico se fue triste porque su seguridad estaba en otro sitio. ¿Cuál es hoy tu seguridad alternativa, la que no querrías soltar?",
      "Recibir el Reino como un niño es aceptar que no puedes ganártelo. ¿Dónde sigues intentando pagarle a Dios lo que ya te dio gratis?",
    ],
    fraseCitable: "El centurión pagano entró fácil y el joven rico se fue triste. La entrada nunca dependió del currículum.",
    synthesis: `<div class="syn-block" style="--card-color:#5D7A6B">
<div class="big-num">04</div>
<h3>${ICONS.door} No por logros, por reorientación</h3>
<p>La entrada al <span class="kw kw-rey">Reino</span> <strong>no</strong> es por nacimiento, raza, logros intelectuales, acumulación de bienes ni observancia religiosa perfecta. Es por una <span class="kw kw-foco">reorientación radical del ser</span> completo. ${epiTag("atlas")} El Atlas agrupa esta reorientación en cuatro condiciones recurrentes que Jesús ilustra a lo largo de todo su ministerio.</p>
<div class="gold-divider"><span>${ICONS.target}</span></div>
<div class="flow-row">
<div class="flow-step"><span class="fs-num">①</span><h5>Metanoia</h5><p><em>Metanoia</em> (<span lang="el">μετάνοια</span>) no es un cálculo de "mente" (<em>nous</em>): en su trasfondo veterotestamentario (heb. <em>šûb</em>, <span lang="he" dir="rtl">שׁוּב</span> = "volverse, girar") designa un <span class="kw kw-gracia">giro completo de dirección vital</span> — dejar un rumbo y tomar otro, no un remordimiento ni un cambio de opinión.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">②</span><h5>Pistis</h5><p>No es asentimiento intelectual. Es <span class="kw kw-sello">confianza radical</span> que abandona toda otra seguridad como la del centurión romano.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">③</span><h5>Nuevo nacimiento</h5><p>"El que no naciere de nuevo, no puede ver el Reino" <span class="ref-chip">Jn 3:3</span>. Regeneración por el Espíritu, no por carne.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">④</span><h5>Dependencia infantil</h5><p>"Si no recibes el Reino como un niño pequeño, no entrarás" <span class="ref-chip">Mc 10:15</span>. Dependencia total, no inocencia.</p></div>
</div>
<div class="two-col" style="margin-top:18px;">
<div class="feature-card"><span class="fc-tag">${ICONS.child} · Modelo de recepción</span>
<h4>La paradoja de los niños</h4>
<p>Los niños, en el mundo antiguo, no tenían estatus social, ni poder, ni patrimonio, ni capacidad de negociar. Precisamente por eso son el espejo perfecto del modo de entrada al Reino: el <span class="kw kw-pacto">Rey</span> se entrega a los que no pueden ganarse su favor ni comprarlo con méritos.</p>
</div>
<div class="feature-card" style="border-left-color:#C75B2A;"><span class="fc-tag" style="color:#C75B2A">${ICONS.pawn} · Contraejemplos</span>
<h4>Quiénes tienen dificultad</h4>
<p>El joven rico se va triste: su riqueza es su seguridad. Los líderes religiosos prefieren su posición legalista. El centurión —paganísimo— es el que sí entra fácil, porque entiende la <span class="kw kw-sello">autoridad</span> delegada.</p>
<p class="small" style="margin-top:8px;"><span class="ref-chip">Mt 19:16-30</span> · <span class="ref-chip">Mt 8:5-13</span></p>
</div>
</div>
<h3>${ICONS.hands} Puertas ilustradas</h3>
<p>Cada conversión narrativa en los evangelios pinta una faceta de la entrada: <strong>Zaqueo</strong> (el rico corrupto que re-distribuye), <strong>la mujer adúltera</strong> (la avergonzada que recibe perdón sin culpa), <strong>el hijo pródigo</strong> (el que se fue lejos y vuelve con manos vacías) <span class="ref-chip">Lc 15:11-32</span> — todos pintan el mismo retrato: <em>gracia</em> que llega primero, y transformación que sigue después.</p>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Entrar en el Reino es solo el umbral: la siguiente estación explora qué <strong>transformación interior</strong> produce en quien ya ha entrado.</p>
</div>`,
  },
  {
    id: 4,
    title: "La Naturaleza Interna del Reino",
    question: "¿Qué transformación produce el Reino en la persona?",
    color: "#8B7355",
    icon: stationIcons[4],
    resumenLinea: "La ética del Reino no es un código más exigente que cumplir con fuerza de voluntad, sino una vida que el Espíritu genera desde dentro.",
    audiencia: "Para enseñar el Sermón del Monte sin convertirlo en una carga imposible, y para quien se pregunta por qué fracasa intentando ser mejor cristiano a base de esfuerzo.",
    preguntasReflexion: [
      "De los seis valores cardinales (justicia, amor al enemigo, perdón, servicio, humildad, santidad), ¿cuál es hoy el más incómodo en tu vida? ¿Qué lo hace incómodo?",
      "Jesús lleva el mandato del acto al corazón: del puño al odio, de la mirada al deseo. ¿Qué cambia si Dios juzga ahí y no solo en lo visible?",
      "¿Estás intentando producir fruto o estás permaneciendo en quien lo produce? ¿Cómo distingues una cosa de la otra en tu semana real?",
    ],
    fraseCitable: "Amar al enemigo no es un mandato que se cumple apretando los dientes. Es fruto que el Espíritu produce.",
    synthesis: `<div class="syn-block" style="--card-color:#8B7355">
<div class="big-num">05</div>
<h3>${ICONS.boom} Revolución de Valores</h3>
<p>El Reino no es un cambio externo de circunstancias, sino una <span class="kw kw-foco">revolución de valores</span> que reconfigura el corazón humano desde adentro hacia afuera. El <em>ethos</em> del Reino se parece muy poco al <em>ethos</em> del Imperio Romano o al <em>ethos</em> de la religión farisaica: es una inversión radical de lo que el mundo considera <em>sensato</em>.</p>
<div class="gold-divider"><span>${ICONS.mountain}</span></div>
<div class="feature-card" style="border-left-color:#8B7355;"><span class="fc-tag" style="color:#8B7355">${ICONS.flag} · Manifiesto ético</span>
<h4>Bienaventuranzas: los primeros serán los últimos</h4>
<p>En el monte, Jesús despliega el código ético completo del Reino con ocho <em>beatitudes</em> (bienaventuranzas) que descolocan a todo oyente de la época. Los pobres en espíritu <strong>poseen</strong> el Reino; los que lloran <strong>serán consolados</strong>; los mansos <strong>heredarán la tierra</strong>; los hambrientos y sedientos de <span class="kw kw-glosa">justicia</span> <strong>serán saciados</strong> <span class="ref-chip">Mt 5:3-12</span>. Cada frase es una bomba contra el statu quo.</p>
</div>
<h3>${ICONS.eye} Antítesis: Interiorización de la Ley</h3>
<p>${epiTag("exegesis")} Jesús no abroga la Ley; la <span class="kw kw-sello">interioriza y profundiza</span> hasta la médula. Las antítesis del sermón son sistemáticas: el <em>asesinato</em> no empieza en el puño, sino en el <strong>odio</strong> del corazón; el <em>adulterio</em> no empieza en el cuerpo, sino en la <strong>mirada</strong> codiciosa; la <em>venganza</em> —aceptada por lex talionis— es reemplazada por <strong>amor al enemigo</strong> <span class="ref-chip">Mt 5:21-48</span>.</p>
<div class="three-col" style="margin:16px 0 6px;">
<div class="kpi-card"><h5>${ICONS.sword} · Asesinato</h5><p>No matarás → <strong>ni odiarás a tu hermano en el corazón.</strong></p></div>
<div class="kpi-card"><h5>${ICONS.eye} · Adulterio</h5><p>No fornicarás → <strong>ni mirarás con concupiscencia.</strong></p></div>
<div class="kpi-card"><h5>${ICONS.bolt} · Venganza</h5><p>Ojo por ojo → <strong>amor a quien te odia y persigue.</strong></p></div>
</div>
<div class="feature-card" style="border-left-color:#8B7355;"><span class="fc-tag" style="color:#8B7355">${ICONS.spark} · El poder detrás del mandato</span>
<h4>No autoesfuerzo: fruto del Espíritu</h4>
<p>${epiTag("pentecostal")} Un código tan exigente —amar al enemigo, perdonar sin límite, purificar el corazón— sería una carga imposible si dependiera solo de la voluntad humana. El Nuevo Testamento no lo entrega como autoesfuerzo moral: es <span class="kw kw-gracia">fruto del Espíritu</span> <span class="ref-chip">Gá 5:22-23</span> que el Reino produce en quien ha nacido de nuevo <span class="ref-chip">Jn 3:3</span>. La ética del Reino no es primero un mandato que cumplir, sino una vida que el Espíritu genera desde dentro.</p>
</div>
<h3>${ICONS.pulse} Valores cardinales del ciudadano</h3>
<p>${epiTag("atlas")} Seis ejes que aparecen una y otra vez, y que <em>todo</em> habitante del Reino debe llevar encarnados. No son deberes opcionales: son, metafóricamente, los <em>genes</em> de la nueva identidad.</p>
<div class="values-grid">
<div class="val-chip">${ICONS.target} <span class="kw kw-glosa">Justicia</span> superior</div>
<div class="val-chip">${ICONS.heart} <span class="kw kw-gracia">Amor</span> al enemigo</div>
<div class="val-chip">${ICONS.dove} <span class="kw kw-gracia">Perdón</span> (70x7)</div>
<div class="val-chip">${ICONS.hands} <span class="kw kw-pacto">Servicio</span> humilde</div>
<div class="val-chip">${ICONS.child} <span class="kw kw-rey">Humildad</span> radical</div>
<div class="val-chip">${ICONS.crownId} <span class="kw kw-sello">Santidad</span> del corazón</div>
</div>
<blockquote style="margin-top:20px;">"Bienaventurados los limpios de corazón, porque ellos verán a Dios." <span class="ref-chip">Mt 5:8</span></blockquote>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Esa revolución interior no permanece estática: la siguiente estación muestra cómo el Reino, una vez sembrado en el corazón, <strong>crece y se expande</strong>.</p>
</div>`,
  },
  {
    id: 5,
    title: "La Dinámica de Crecimiento del Reino",
    question: "¿Cómo crece y se expande el Reino?",
    color: "#6B8E4E",
    icon: stationIcons[5],
    resumenLinea: "El Reino crece como la semilla y la levadura: pequeño al principio, oculto en el proceso, irreversible al final, y nunca por la fuerza.",
    audiencia: "Muy útil para pastores de congregaciones pequeñas o en etapas de aparente estancamiento, y para enseñar las parábolas de Mateo 13 como un solo movimiento en vez de seis relatos sueltos.",
    preguntasReflexion: [
      "El sembrador esparce la misma semilla en todos los suelos. ¿Qué te libera —y qué te exige— saber que el resultado no depende de tu técnica?",
      "La levadura trabaja sin hacer ruido y no se ve hasta que ya ha transformado la masa. ¿Qué obra silenciosa de Dios estás tentado a dar por muerta por falta de resultados visibles?",
      "Si el Reino crece «sin que él sepa cómo», ¿qué parte de tu trabajo es sembrar y regar, y qué parte estás intentando hacer tú en lugar de Dios?",
    ],
    fraseCitable: "El Reino no avanza haciendo ruido. Avanza como la levadura: cuando se nota, ya ha transformado toda la masa.",
    synthesis: `<div class="syn-block" style="--card-color:#6B8E4E">
<div class="big-num">06</div>
<h3>${ICONS.seedling} Crecimiento orgánico, no político</h3>
<p>El crecimiento del <span class="kw kw-rey">Reino</span> no avanza por fuerza política, conquista militar, manipulación de masas o conquista de poderes. Es <span class="kw kw-foco">orgánico, oculto e inevitable</span>. Jesús enseña la dinámica del crecimiento <em>casi enteramente</em> por medio de parábolas agrícolas: imágenes de <em>tierra, semilla, fermentación, cosecha</em>.</p>
<div class="gold-divider"><span>${ICONS.wheat}</span></div>
<h4>${ICONS.book} Parábolas del crecimiento — Cinco movimientos</h4>
<p>El sermón en parábolas (Mateo 13 / Marcos 4 / Lucas 8) es el pasaje más extenso y programático donde Jesús explica <em>cómo</em> se expande su Reino. Cada parábola revela un <strong>momento distinto</strong> de la misma historia:</p>
<div class="card-fused" style="margin-top:10px;">
<div class="card-fused-item"><span class="fc-tag" style="color:#6B8E4E">01 · SEMBRADOR</span>
<h5>Receptividad, no coerción</h5>
<p>La semilla es la <em>palabra del Reino</em>. El crecimiento depende de la <span class="kw kw-gracia">receptividad del suelo</span> del corazón, no de la fuerza del sembrador. El <em>mismo</em> mensaje produce frutos de 30, 60 y 100 por uno.</p>
<p class="small"><span class="ref-chip">Mt 13:1-23</span></p>
</div>
<div class="card-fused-item"><span class="fc-tag" style="color:#4A7B3A">02 · MOSTAZA</span>
<h5>Insignificancia inicial</h5>
<p>La semilla <em>más pequeña</em> de todas las hortalizas llega a ser un árbol tan grande que las aves vienen a anidar. El Reino empieza en aparente <span class="kw kw-foco">insignificancia</span>, pero termina transformando la ecología entera.</p>
<p class="small"><span class="ref-chip">Mt 13:31-32</span></p>
</div>
<div class="card-fused-item"><span class="fc-tag" style="color:#8B9E4E">03 · LEVADURA</span>
<h5>Transformación total oculta</h5>
<p>Una bola de levadura, escondida en tres medidas de harina (≈50 libras / 23 kg), fermenta <em>toda la masa</em> sin hacer ruido. Así es el Reino: no anuncia su acción, pero lo <span class="kw kw-sello">penetra todo</span> desde adentro.</p>
<p class="small"><span class="ref-chip">Mt 13:33</span></p>
</div>
<div class="card-fused-item"><span class="fc-tag" style="color:#6B6E2E">04 · TESORO · PERLA</span>
<h5>Valor inestimable</h5>
<p>Un campesino halla un tesoro y <em>vende todo lo que tiene</em> para comprar el campo. Un mercader halla una perla de gran precio y <em>vende</em> todo. La <span class="kw kw-gracia">gracia</span> es hallazgo gratuito que genera <strong>entrega radical</strong>.</p>
<p class="small"><span class="ref-chip">Mt 13:44-46</span></p>
</div>
<div class="card-fused-item"><span class="fc-tag" style="color:#4E8E6E">05 · RED</span>
<h5>Cosecha universal y juicio</h5>
<p>Una red echa al mar recoge toda clase de peces. Los buenos en cestas, los malos echados. Hay un <em>juicio final</em> inevitable, donde la <span class="kw kw-glosa">separación</span> se vuelve visible y eterna.</p>
<p class="small"><span class="ref-chip">Mt 13:47-50</span></p>
</div>
<div class="card-fused-item"><span class="fc-tag" style="color:#8E6E4E">· BONUS · CRECIMIENTO AUTO</span>
<h5>Misterio independiente</h5>
<p>"Echa la semilla, duerme, levanta; la semilla brota y crece sin que él sepa cómo" <span class="ref-chip">Mc 4:26-29</span>. El Reino <em>crece solo</em>: el obrero siembra y riega, pero Dios es quien da el crecimiento <span class="ref-chip">1 Co 3:6-7</span>.</p>
</div>
</div>
<div class="feature-card" style="margin-top:22px;"><span class="fc-tag">${ICONS.refresh} · Patrón unificado</span>
<h4>Un solo movimiento en cinco actos</h4>
<p><span class="kw kw-foco">Pequeñez</span> invisible → <span class="kw kw-foco">ocultamiento</span> aparente → <span class="kw kw-sello">transformación total</span> del entorno → <span class="kw kw-glosa">juicio</span> y separación final. ${epiTag("atlas")} Es el patrón que atraviesa estas cinco parábolas del crecimiento; no todas las parábolas de Jesús siguen este mismo guion — las hay de otro tipo, como la del Buen Samaritano o los Talentos.</p>
</div>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Un Reino que crece deja huellas comprobables en el mundo: la siguiente estación recoge las <strong>señales visibles</strong> que lo evidencian.</p>
</div>`,
  },
  {
    id: 6,
    title: "Las Señales Visibles del Reino",
    question: "¿Cómo se manifiesta visiblemente el Reino?",
    color: "#4A7B8C",
    icon: stationIcons[6],
    resumenLinea: "Los milagros no son espectáculos que validan a un predicador: son señales que muestran cómo es el mundo cuando Dios reina sin oposición.",
    audiencia: "Clave en contexto pentecostal para enseñar lo milagroso sin sensacionalismo y sin apagarlo, y para responder a quien pregunta por qué no todos sanan si el Reino ya llegó.",
    preguntasReflexion: [
      "Si la señal no es el punto sino la evidencia, ¿qué buscas tú cuando pides un milagro: el poder o al Rey que lo ejerce?",
      "Compartir mesa con los excluidos era en el mundo antiguo un acto de alianza. ¿Con quién tendría que sentarse hoy tu iglesia para que esa señal se viera?",
      "Las señales anticipan la restauración final, no la completan todavía. ¿Cómo se sostiene la fe cuando la señal que esperabas no llega?",
    ],
    fraseCitable: "Cada sanidad es una muestra pequeña de cómo será el mundo entero cuando el Rey reine sin oposición.",
    synthesis: `<div class="syn-block" style="--card-color:#4A7B8C">
<div class="big-num">07</div>
<h3>${ICONS.target} Sēmeia: Señales, no espectáculos</h3>
<p>Los milagros no son espectáculos para impresionar multitudes ni generar <em>fama</em>. Son <span class="kw kw-foco">señales</span> (<em>sēmeia</em>) del reinado de Dios irrumpiendo en la realidad caída. Cada sanidad, exorcismo, dominio sobre la naturaleza y mesa compartida es una <span class="kw kw-rey">anticipación</span> de la renovación cósmica futura: una pequeña muestra de cómo <em>es</em> el mundo cuando Dios está reinando sin oposición.</p>
<div class="gold-divider"><span>${ICONS.signal}</span></div>
<div class="two-col" style="margin:0 0 14px;">
<div class="feature-card" style="border-left-color:#4A7B8C;"><span class="fc-tag" style="color:#4A7B8C">${ICONS.book} · Gramática de la señal</span>
<h4>Dunameis y sēmeia: el poder del Reino adelantado</h4>
<p>${epiTag("exegesis")} Los milagros — <em>dynameis</em> ("obras de poder") en los sinópticos, <em>sēmeia</em> ("señales") en Juan — son anticipos del poder del Reino que irrumpen en la historia, señalando la derrota final del mal, no su erradicación completa ya. Los evangelios presentan <em>al menos cinco categorías</em> de señales, cada una de las cuales corresponde a una dimensión diferente de la <span class="kw kw-sello">redención</span> que el Reino inaugura. Ninguna es <em>aleatoria</em>: todas juntas apuntan a que la Nueva Creación <em>ya está aquí</em> en germen.</p>
</div>
<div class="feature-card" style="border-left-color:#D4A855;"><span class="fc-tag" style="color:#A86C1A">${ICONS.bolt} · Autoridad validada</span>
<h4>Milagro = Credencial visible</h4>
<p>"Si por el Espíritu de Dios echo fuera los demonios, <strong>entonces el Reino de Dios ha llegado ya a vosotros</strong>" <span class="ref-chip">Mt 12:28</span>. La señal <em>no es el punto</em>; es la <em>evidencia</em> de que una realidad más fuerte está operando en el mundo.</p>
</div>
</div>
<div class="card-fused">
<div class="card-fused-item"><h5>${ICONS.heart} · Sanidades</h5><p>Acto de <em>guerra</em> contra las consecuencias del pecado. Cada cuerpo sanado es una <span class="kw kw-gracia">restauración</span> al diseño original del Creador. ${epiTag("sintesis")} El Reino inicia hoy esa restauración, cuya plenitud llegará en la consumación final.</p></div>
<div class="card-fused-item"><h5>${ICONS.skull} · Exorcismos</h5><p>"Atando al hombre fuerte para saquear su casa" <span class="ref-chip">Mc 3:27</span>. Cada liberación demuestra que <span class="kw kw-sello">Satanás ha sido derrotado de facto</span>, aunque la sentencia final esté pendiente.</p></div>
<div class="card-fused-item"><h5>${ICONS.crownGlory} · Perdón de pecados</h5><p>Jesús perdona <em>de visu</em> al paralítico <span class="ref-chip">Mt 9:1-8</span>: algo que <em>solo Dios puede hacer</em>. La <em>sanidad física</em> funciona como <em>aval visible</em> de su <em>autoridad espiritual</em>.</p></div>
<div class="card-fused-item"><h5>${ICONS.chalice} · Mesa con marginados</h5><p>Come con publicanos y pecadores <span class="ref-chip">Mt 9:9-13</span>. La <em>mesa compartida</em> en el mundo antiguo <em>es</em> alianza. Invitar a un marginado a tu mesa es <em>restaurarle la dignidad perdida</em>.</p></div>
<div class="card-fused-item"><h5>${ICONS.wave} · Dominio naturaleza</h5><p>Tormenta calmada, panes multiplicados, caminar sobre aguas. Muestra soberanía sobre la <span class="kw kw-rey">creación entera</span>: el Rey gobierna no solo sobre hombres, sino sobre la materia misma.</p></div>
<div class="card-fused-item"><h5>${ICONS.book} · Signos de Jn</h5><p>Juan organiza su evangelio en torno a <em>siete sēmeia</em> (agua en vino, hijo del oficial, paralítico de Betesda, panes, caminar sobre el agua, ciego de nacimiento, Lázaro) — una serie <em>distinta</em> de las siete afirmaciones <em>"Yo soy…"</em> (pan de vida, luz del mundo, puerta, buen pastor, resurrección, camino/verdad/vida, vid verdadera). Ambas revelan al Rey, pero no se corresponden una a una.</p></div>
</div>
<blockquote style="margin-top:18px;">"Esta generación mala y adúltera pide señal; y no le será dada señal, sino la señal del profeta Jonás" <span class="ref-chip">Mt 12:38-45</span>.</blockquote>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Pero toda señal visible del Reino provoca también resistencia: la siguiente estación aborda el <strong>conflicto</strong> que desata.</p>
</div>`,
  },
  {
    id: 7,
    title: "El Conflicto del Reino",
    question: "¿Por qué el Reino encuentra oposición?",
    color: "#7A5C5C",
    icon: stationIcons[7],
    resumenLinea: "El Reino encuentra oposición en tres frentes a la vez —espiritual, religioso y político— porque ningún poder cede su territorio sin lucha.",
    audiencia: "Útil para predicar sobre guerra espiritual sin caer ni en el sensacionalismo demonológico ni en la negación, y para acompañar a quien sufre oposición precisamente por hacer el bien.",
    preguntasReflexion: [
      "De los tres frentes, ¿cuál reconoce con más facilidad tu tradición y cuál prefiere no nombrar? ¿Qué se pierde al ignorarlo?",
      "La oposición más dura a Jesús vino del sistema religioso, no del Imperio. ¿Qué te dice eso sobre los riesgos de la religión bien organizada, incluida la tuya?",
      "Si el resultado ya está decidido en la cruz pero la batalla sigue desplegándose, ¿cómo cambia eso la forma en que enfrentas tu conflicto actual?",
    ],
    fraseCitable: "Jesús no negocia con los principados: los saquea. Pero primero ata al hombre fuerte.",
    synthesis: `<div class="syn-block" style="--card-color:#7A5C5C">
<div class="big-num">08</div>
<h3>${ICONS.swirl} Guerra espiritual real, no metáfora</h3>
<p>El <span class="kw kw-rey">Reino</span> exige del discípulo una <strong>lealtad suprema</strong> a Dios que entra en conflicto con cualquier poder humano que pretenda absolutizarse — no con la convivencia cívica en sí. ${epiTag("exegesis")} Tras esa lealtad hay una guerra espiritual real, con frentes bien definidos, y un resultado histórico ya <em>decidido</em> en la cruz, pero cuya aplicación sigue <em>desplegándose</em> en el presente. <span class="kw kw-sello">Satanás no cede su territorio sin lucha</span>.</p>
<div class="gold-divider"><span>${ICONS.sword}</span></div>
<h4>${ICONS.fire} Tres frentes de oposición simultáneos</h4>
<p>El conflicto no es monolítico: se despliega en tres planos a la vez, cada uno operando por encima del anterior. El evangelio sin <em>teoría del conflicto</em> es una colección de sentimientos bonitos sin carne.</p>
<div class="three-col">
<div class="kpi-card" style="border-color:#3A1E1E"><h5>${ICONS.skull} · FRENTE ESPIRITUAL</h5><p>Los demonios reconocen a Jesús <em>inmediatamente</em>: "¿Qué tienes con nosotros, Jesús Nazareno? Sé quién eres: el Santo de Dios" <span class="ref-chip">Mc 1:23</span>. Saben perfectamente que ha venido a <strong>despojarlos y destruirlos</strong>. Cada exorcismo es una batalla territorial.</p></div>
<div class="kpi-card" style="border-color:#5C4040"><h5>${ICONS.scroll} · FRENTE RELIGIOSO</h5><p>Fariseos, escribas, sacerdotes, sanedrín. Jesús confronta su <span class="kw kw-foco">hipocresía, legalismo y exclusión</span>. Sus siete ayes <span class="ref-chip">Mt 23:1-39</span> no son un arranque de ira: son una <em>sentencia pública</em> contra un sistema religioso que se convirtió en barrera para el Reino.</p></div>
<div class="kpi-card" style="border-color:#7A5C5C"><h5>${ICONS.columns} · FRENTE POLÍTICO</h5><p>Poncio Pilato, el representante del Imperio. La tensión inevitable entre el <span class="kw kw-rey">Reino de Dios</span> y <strong>todo poder humano</strong>. La pregunta de Pilato <em>"¿Eres rey de los judíos?"</em> <span class="ref-chip">Mt 27:11-26</span> es la misma que enfrentarán generaciones de creyentes en los siglos siguientes, en sucesivas oleadas de persecución bajo distintos emperadores.</p></div>
</div>
<div class="two-col" style="margin-top:18px;">
<div class="feature-card" style="border-left-color:#7A5C5C;"><span class="fc-tag" style="color:#7A5C5C">${ICONS.flag} · Estrategia del invasor</span>
<h4>Saqueando la casa del hombre fuerte</h4>
<p>Cada exorcismo es un acto de guerra. Jesús no <em>negocia</em> con principados: los <strong>saquea</strong>. La parábola programática está en Marcos 3:27: <em>"Nadie puede entrar en la casa del hombre fuerte para saquearle sus bienes, sin atar primero al hombre fuerte; y entonces saqueará su casa"</em> <span class="ref-chip">Mc 3:27</span>. La cruz es el momento en que el <em>Hombre Fuerte</em> queda <em>atado definitivamente</em>.</p>
</div>
<div class="feature-card" style="border-left-color:#C75B2A;"><span class="fc-tag" style="color:#C75B2A">${ICONS.alert} · Pecado contra el Espíritu</span>
<h4>El pecado imperdonable</h4>
<p>¿Por qué Jesús habla de pecado <em>imperdonable</em> contra el Espíritu Santo <span class="ref-chip">Mt 12:22-37</span>? Porque es el pecado de <em>llamarle mal</em> al <strong>bien</strong>: atribuir las señales del Reino a la operación de <em>Belcebú</em>. Es la <span class="kw kw-sello">rechazo irrevocable</span> de la evidencia que Dios mismo pone delante de tus ojos.</p>
</div>
</div>
<h3>${ICONS.bulb} El rechazo se intensifica al final</h3>
<p>A medida que el ministerio de Jesús se despliega hacia Jerusalén, la oposición religiosa deja de ser ambigua y se convierte en un complot <em>explícito</em> de muerte. El último año de ministerio es una larga marcha <em>hacia la cruz</em>, y Jesús lo sabe perfectamente. Su última semana (Semana Santa) es el <em>clímax narrativo</em> de todos los frentes abiertos durante los tres años anteriores.</p>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Ese conflicto alcanza su punto culminante en un solo acontecimiento: la siguiente estación sitúa la <strong>cruz</strong> como el centro de toda la historia del Reino.</p>
</div>`,
  },
  {
    id: 8,
    title: "La Cruz como Evento Central",
    question: "¿Cómo la muerte del Rey inaugura la nueva realidad?",
    color: "#1A1A2E",
    icon: stationIcons[8],
    resumenLinea: "La cruz no interrumpe el mensaje del Reino: es su expresión suprema, el trono desde el cual el Rey vence y a la vez el sacrificio que nos reconcilia.",
    audiencia: "Es la estación central del Atlas. Útil para Semana Santa, y especialmente para enseñar que la victoria sobre los poderes y la expiación de los pecados no compiten entre sí, sino que se necesitan.",
    preguntasReflexion: [
      "Si el poder de Dios se ejerce desde la cruz y no desde el trono, ¿qué queda en pie de tu idea de éxito, ministerial o personal?",
      "¿Tiendes a quedarte solo con la cruz como victoria sobre el mal, o solo con la cruz como perdón de tus pecados? ¿Qué pierdes al separarlas?",
      "El grano de trigo da fruto únicamente si muere. ¿Qué te está pidiendo Dios que sueltes y que tú sigues leyendo como derrota en vez de como siembra?",
    ],
    fraseCitable: "En el mundo de César el poder se ejerce desde el trono. En el Reino de Dios se ejerce desde la cruz.",
    synthesis: `<div class="syn-block" style="--card-color:#1A1A2E">
<div class="big-num">09</div>
<h3>${ICONS.pawn} Trono, no tragedia</h3>
<p>La cruz <strong>no es una interrupción trágica</strong> del mensaje; es su <span class="kw kw-foco">expresión suprema</span>. En el mundo de César, el poder se ejerce <em>desde el trono</em> hacia los súbditos. En el <span class="kw kw-rey">Reino de Dios</span>, el poder se ejerce <strong>desde la cruz</strong>: la muerte del Rey es el verdadero trono desde el cual reina para siempre. <em>El poder de Dios se perfecciona en la debilidad</em>.</p>
<div class="gold-divider"><span>${ICONS.cross}</span></div>
<div class="feature-card" style="border-left-color:#1A1A2E; background:linear-gradient(165deg,#fff 0%,#F5F0E6 100%);"><span class="fc-tag" style="color:#1A1A2E">${ICONS.seedling} · Metáfora programática</span>
<h4>El grano de trigo cae y muere</h4>
<blockquote>"De cierto, de cierto os digo: Que si el grano de trigo no cae en la tierra y muere, queda solo; pero si muere, lleva mucho fruto." <span class="ref-chip">Jn 12:24</span></blockquote>
<p>En una sola frase, Jesús enmarca toda su pasión: su propia muerte es <em>siembra</em>, no <em>derrota</em>. El fruto que produce (la iglesia de todas las épocas) es precisamente la cosecha de la que hablaban las parábolas del crecimiento. <strong>Sin cruz → no hay fruto.</strong></p>
</div>
<div class="feature-card" style="border-left-color:#1A1A2E; background:linear-gradient(165deg,#fff 0%,#F5F0E6 100%);"><span class="fc-tag" style="color:#1A1A2E">${ICONS.chalice} · Sacrificio y sustitución</span>
<h4>La victoria se logra mediante la sangre derramada</h4>
<blockquote>"Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos hechos justicia de Dios en él." <span class="ref-chip">2 Co 5:21</span></blockquote>
<p>${epiTag("iphc")} La cruz como trono y victoria sobre los poderes <span class="kw kw-sello">no sustituye</span> la cruz como sacrificio expiatorio: son dos caras de la misma moneda. Jesús no solo desarmó a los poderes — cargó nuestros pecados en su cuerpo <span class="ref-chip">1 P 2:24</span> y ofreció su sangre para nuestro perdón y reconciliación con el Padre <span class="ref-chip">Ef 1:7</span> <span class="ref-chip">Ro 3:25</span>. La victoria sobre los poderes y la expiación de los pecados no compiten entre sí: se necesitan mutuamente.</p>
</div>
<h3>${ICONS.bolt} Paradoja del poder: la derrota aparente es victoria real</h3>
<p>"Desarmó a los principados y a las potestades, los exhibió públicamente, <strong>triunfando sobre ellos en la cruz</strong>" <span class="ref-chip">Col 2:15</span>. ¿Cómo triunfa un hombre desnudo, clavado a dos maderos, sangrando hasta morir? Triunfa porque <em>está haciendo exactamente la voluntad del Padre</em>. El servicio es el modelo del gobierno divino: el último será el primero.</p>
<div class="flow-row" style="margin-top:20px;">
<div class="flow-step"><span class="fs-num">Getsemaní</span><p>Sumisión total: <em>"No mi voluntad, sino la tuya"</em> <span class="ref-chip">Mt 26:36-46</span>.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">Sanedrín</span><p>Condenación religiosa por <em>blasfemia</em>, a manos de la élite sacerdotal de Jerusalén — no del pueblo judío en su conjunto.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">Pilato</span><p>Condenación política por <em>sedición</em>. Se hace cargo del conflicto con el Imperio.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">Cruz</span><p>Siete palabras, perdón, promesa, familia, sed, abandono, consumación.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">Velo rasgado</span><p>De arriba abajo. ${epiTag("sintesis")} Simboliza proféticamente la apertura del acceso directo a la presencia de Dios mediante la muerte de Cristo <span class="ref-chip">Mt 27:51</span> <span class="ref-chip">Heb 10:19-20</span>.</p></div>
</div>
<div class="two-col" style="margin-top:20px;">
<blockquote>"Padre, perdónalos, porque no saben lo que hacen." <span class="ref-chip">Lc 23:34-43</span></blockquote>
<blockquote>"Hoy estarás conmigo en el paraíso." <span class="ref-chip">Lc 23:34-43</span></blockquote>
</div>
<h3>${ICONS.crownId} El Reino no se defiende, se entrega</h3>
<p>Este es el secreto que Pilato nunca entiende: el Reino de Jesús <em>no es de este mundo</em> <span class="ref-chip">Jn 18:36</span>, precisamente <em>porque</em> su modo de ganar la guerra es <strong>entregarse voluntariamente</strong>. No llamó a doce legiones de ángeles. Se entregó. Y precisamente <em>por eso</em> ganó.</p>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} La cruz no cierra la historia sino que la convierte en bisagra: la siguiente estación muestra cómo la <strong>resurrección</strong> la transforma en victoria.</p>
</div>`,
  },
  {
    id: 9,
    title: "La Resurrección y Exaltación",
    question: "¿Qué confirma la resurrección sobre el Reino?",
    color: "#D4A855",
    icon: stationIcons[9],
    resumenLinea: "La resurrección no es el milagro final de una biografía: es la vindicación pública del Rey crucificado y el fundamento de todo lo demás.",
    audiencia: "Útil para predicar en Resurrección y para acompañar a quien pregunta qué razones hay para creer, con el cuidado de presentar la evidencia en su fuerza real y sin exagerarla.",
    preguntasReflexion: [
      "Pablo dice que sin resurrección la fe es vana. ¿Qué partes de tu vida cristiana seguirían igual mañana aunque Cristo no hubiera resucitado? ¿Qué revela eso?",
      "Los discípulos pasaron del miedo al martirio. ¿Qué explicación alternativa te parece más seria, y por qué te convence menos que la resurrección?",
      "Si el Crucificado es Señor, ¿qué señor menor de tu vida queda automáticamente destronado?",
    ],
    fraseCitable: "El Padre levantó al Hijo crucificado como sello público: este hombre que ustedes mataron es mi Señor.",
    synthesis: `<div class="syn-block" style="--card-color:#D4A855">
<div class="big-num">10</div>
<h3>${ICONS.sunrise} Validación divina, no milagro aislado</h3>
<p>La resurrección no es simplemente un milagro impresionante que cierra un libro bonito. ${epiTag("sintesis")} Es la <span class="kw kw-foco">vindicación divina definitiva</span> de la persona, identidad y mensaje del Rey. El Padre levanta al Hijo crucificado como <em>sello público</em>: declara ante el universo entero — este hombre que ustedes humillaron y mataron <strong>es mi Hijo, mi Mesías, mi Señor</strong>.</p>
<div class="gold-divider"><span>${ICONS.crownGlory}</span></div>
<div class="two-col" style="margin:0 0 14px;">
<div class="kpi-card" style="border-color:#D4A855"><h4>${ICONS.bolt} · Toda potestad</h4>
<blockquote>"Toda potestad me es dada en el cielo y en la tierra." <span class="ref-chip">Mt 28:18</span></blockquote>
<p>No es una victoria parcial sobre los demonios de Galilea. Es una victoria <strong>absoluta y cósmica</strong>. Los <em>poderes que crucificaron</em> al Rey quedaron, en ese instante, <em>desarmados</em> y sometidos.</p>
</div>
<div class="kpi-card" style="border-color:#A86C1A"><h4>${ICONS.cross} · Nombre sobre todo nombre</h4>
<blockquote>"Lo exaltó hasta lo sumo, y le dio un nombre que es sobre todo nombre." <span class="ref-chip">Fil 2:9</span></blockquote>
<p><span class="kw kw-sello">Kyrios</span>: el título usado en la Septuaginta (LXX) para traducir <em>YHWH</em> mismo, ahora se aplica, sin ninguna vergüenza, al <em>resucitado</em> de Nazaret.</p>
</div>
</div>
<div class="three-col" style="margin-top:4px;">
<div class="feature-card"><span class="fc-tag" style="color:#D4A855">${ICONS.book} · Evidencia 01: Tumba vacía</span>
<h5>Tradición atestiguada, no prueba indiscutida</h5>
<p>La tumba vacía aparece de forma independiente en las cuatro tradiciones evangélicas, y la polémica de Mateo 28:11-15 —que intenta <em>explicar</em> el sepulcro vacío (el cuerpo fue robado), no <em>negarlo</em>— sugiere que el dato circulaba ya en el siglo I incluso entre opositores. Es un testimonio con fuerte respaldo textual; su fuerza como "prueba pública indiscutida" sigue siendo objeto de debate académico.</p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#A86C1A">${ICONS.eye} · Evidencia 02: Apariciones</span>
<h5>Testigos múltiples y variados</h5>
<p>Aparece a María Magdalena en el jardín, a las mujeres en el camino, a dos discípulos en Emaús <span class="ref-chip">Lc 24:13-35</span>, a los once en el aposento alto, a Tomás una semana después <span class="ref-chip">Jn 20:24-29</span>, a más de quinientos a la vez (1 Co 15). El testimonio no depende de <em>una sola persona</em>.</p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#8B5C2A">${ICONS.dove} · Evidencia 03: Iglesia transformada</span>
<h5>Discípulos cobardes → mártires</h5>
<p>El <em>mismo grupo</em> que huyó despavorido en Getsemaní y negó a Jesús tres veces, se convierte, después de Pentecostés, en un grupo de hombres y mujeres dispuestos a <span class="kw kw-pacto">morir por lo que han visto</span>. ${epiTag("sintesis")} Es el argumento histórico más simple y ampliamente aceptado para explicarlo, aunque no el único que se ha propuesto: <em>ellos estuvieron realmente convencidos</em>.</p>
</div>
</div>
<h3>${ICONS.tree} La muerte no tiene la última palabra</h3>
<p>1 Corintios 15 es el tratado más extenso del Nuevo Testamento sobre la resurrección. Pablo dice: <em>"Y si Cristo no resucitó, vana es nuestra fe; aún estáis en vuestros pecados"</em>. La <span class="kw kw-rey">resurrección</span> no es un plus piadoso; es el <strong>fundamento ontológico</strong> de todo lo que creemos. Si Cristo resucitó, <em>todo lo demás se sostiene</em>; si no, todo se derrumba.</p>
<blockquote style="margin-top:16px;">"Porque así como en Adán todos mueren, así también en Cristo todos serán vivificados." <span class="ref-chip">1 Co 15:22</span></blockquote>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Con el Rey resucitado y exaltado, queda una pregunta práctica y urgente: la siguiente estación explica cómo <strong>continúa el Reino</strong> ahora que Él ya no camina físicamente entre los suyos.</p>
</div>`,
  },
  {
    id: 10,
    title: "El Reino Después de la Resurrección",
    question: "¿Cómo continúa el Reino después de la resurrección?",
    color: "#A67B5B",
    icon: stationIcons[10],
    resumenLinea: "El Reino no quedó ligado al cuerpo físico de Jesús en Galilea: desde Pentecostés se manifiesta a través de una comunidad llena del mismo Espíritu.",
    audiencia: "Especialmente útil en contexto pentecostal para situar Pentecostés dentro de la teología del Reino y no como un episodio aparte, y para enseñar por qué la curiosidad por las fechas desvía de la misión.",
    preguntasReflexion: [
      "Los discípulos preguntaron por el calendario y Jesús respondió con una misión. ¿Qué preguntas tuyas sobre el futuro son en el fondo una forma de aplazar la obediencia de hoy?",
      "El poder para la misión no viene del número, del dinero ni de la estrategia. ¿En cuál de los tres confía de hecho tu comunidad?",
      "En Emaús Jesús enseña a leer toda la Escritura apuntando a él. ¿Cómo cambiaría tu forma de estudiar la Biblia si tomaras esa clave en serio?",
    ],
    fraseCitable: "Los discípulos preguntaron por el calendario. Jesús les respondió con una misión y una promesa: recibiréis poder.",
    synthesis: `<div class="syn-block" style="--card-color:#A67B5B">
<div class="big-num">11</div>
<h3>${ICONS.clock} Cuarenta días: Puente entre dos épocas</h3>
<p>Los cuarenta días entre la <em>resurrección</em> y la <em>ascensión</em> no son un paréntesis o un epílogo. Son el <span class="kw kw-foco">puente narrativo</span> entre la época de Jesús de Nazaret y la época de la Iglesia. Hechos 1:3 es explícito: Jesús se presenta vivo con <em>"muchas pruebas indubitables"</em> y habla <strong>de las cosas concernientes al reino de Dios</strong> <span class="ref-chip">Hch 1:3</span>. ${epiTag("exegesis")} Esto muestra la continuidad del Reino de Dios en la enseñanza del Jesús resucitado, como marco para la misión que la Iglesia iniciará después de recibir al Espíritu.</p>
<div class="gold-divider"><span>${ICONS.map}</span></div>
<div class="feature-card" style="border-left-color:#A67B5B;"><span class="fc-tag" style="color:#A67B5B">${ICONS.columns} · Expectativa vs. reorientación</span>
<h4>De la política a la misión</h4>
<p>Los once discípulos siguen pensando en la vieja clave mesiánica: <em>"Señor, ¿restaurarás el reino a Israel en este tiempo?"</em> <span class="ref-chip">Hch 1:6</span>. Esperan un reino <em>político inmediato</em> que expulse a Roma y restaure el trono de David. Jesús no contesta <em>"sí"</em> ni <em>"no"</em>; los <span class="kw kw-foco">reorienta totalmente</span>.</p>
</div>
<div class="flow-row" style="margin-top:18px;">
<div class="flow-step"><span class="fs-num">1</span><h5>No os toca saber</h5><p><em>Tiempos o sazones</em> = cronologías, calendarios, profecías numéricas. No te metas ahí. No es tu trabajo.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">2</span><h5>Recibiréis poder</h5><p>Cuando el Espíritu Santo venga <em>sobre vosotros</em>. El poder para la misión <em>no</em> viene del número, ni del dinero, ni de la estrategia: viene del <span class="kw kw-pacto">Espíritu</span>.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">3</span><h5>Me seréis testigos</h5><p>En Jerusalén, Judea, Samaria y <strong>hasta lo último de la tierra</strong> <span class="ref-chip">Hch 1:8</span>. Un anillo geográfico concéntrico que explota hacia los confines del mundo.</p></div>
</div>
<div class="two-col" style="margin-top:20px;">
<div class="kpi-card" style="border-color:#A67B5B"><h5>${ICONS.clock} · Número 40</h5><p>Número bíblico de la <em>preparación</em>. Cuarenta años Moisés en el desierto. Cuarenta días de lluvia en el diluvio. Cuarenta días de tentación Jesús. Ahora: cuarenta días <em>preparando a sus testigos</em> para una misión que trasciende toda expectativa nacional anterior.</p></div>
<div class="kpi-card" style="border-color:#D4A855"><h5>${ICONS.tree} · Emaús: la clave exegética</h5>
<p>En el camino a Emaús, Jesús les abre <em>"el entendimiento para que comprendiesen las Escrituras"</em> <span class="ref-chip">Lc 24:13-35</span> y les demuestra que <em>toda</em> la ley, los profetas y los salmos <em>hablaban de él</em>. ${epiTag("exegesis")} El mismo Jesús les da una clave hermenéutica central para leer la Biblia entera: <em>todo apunta al Rey crucificado y resucitado</em>.</p></div>
</div>
<h3>${ICONS.heart} Pentecostés y el tiempo de la Iglesia</h3>
<p>Diez días después de la ascensión, llega Pentecostés <span class="ref-chip">Hch 2</span>: el Espíritu derramado sobre toda carne, tres mil almas añadidas, el evangelio anunciado en las lenguas de los pueblos allí representados. Los cuarenta días explicados <em>intelectualmente</em> a los once, se hacen, en Pentecostés, una <em>realidad encarnada</em> en la primera comunidad cristiana. Desde ese día, el <span class="kw kw-rey">Reino</span> ya no está <em>ligado</em> al cuerpo físico de Jesús caminando por Galilea: ${epiTag("sintesis")} se manifiesta ahora a través de la Iglesia, la comunidad llena del mismo Espíritu que levantó al Señor de los muertos, que <strong>da testimonio</strong> de él y le sirve como instrumento.</p>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Si el Reino ahora se manifiesta a través de la Iglesia, esa comunidad recibe una tarea concreta hacia el mundo entero: la siguiente estación traza su <strong>alcance global</strong>.</p>
</div>`,
  },
  {
    id: 11,
    title: "La Misión Global del Reino",
    question: "¿Qué papel tienen Israel, las naciones y la comunidad?",
    color: "#3D6B8C",
    icon: stationIcons[11],
    resumenLinea: "La misión de la Iglesia no es construir el Reino, sino dar testimonio de que el Rey ya reina, y hacerlo hasta lo último de la tierra.",
    audiencia: "Útil para predicar sobre misión y evangelismo, para corregir la idea de que somos nosotros quienes hacemos avanzar el Reino, y para enseñar la Gran Comisión desde su único verbo imperativo.",
    preguntasReflexion: [
      "Si el Reino ya avanza porque el Rey ya reina, ¿qué cambia en tu manera de trabajar: qué dejas de cargar y qué sigues siendo responsable de hacer?",
      "El único mandato de Mateo 28 es hacer discípulos, no conseguir decisiones. ¿Qué mide de hecho tu ministerio, decisiones o discípulos?",
      "Si prójimo es cualquier ser humano que necesite misericordia, ¿a quién has dejado fuera de esa definición sin decirlo en voz alta?",
    ],
    fraseCitable: "La Iglesia no construye el Reino. Da testimonio de una realidad que ya es verdad porque el Rey ya reina.",
    synthesis: `<div class="syn-block" style="--card-color:#3D6B8C">
<div class="big-num">12</div>
<h3>${ICONS.shuffle} Ampliado, no reemplazado</h3>
<p>${epiTag("sintesis")} Israel <strong>no es reemplazado</strong> como pueblo del <span class="kw kw-sello">pacto</span>, sino <span class="kw kw-foco">ampliado y transformado</span> — una de varias posturas legítimas sobre la relación Israel-Iglesia que sostiene la tradición cristiana. La comunidad de discípulos que la tradición ha llamado Iglesia <em>no</em> es un <em>plan B</em> que Dios sacó de la manga cuando Israel rechazó a su Mesías. ${epiTag("sintesis")} Es, más bien, el pueblo del Rey resucitado: la comunidad que da testimonio de su reinado sobre la tierra, que incluye tanto israelitas como <strong>naciones enteras</strong> de todo el planeta.</p>
<div class="gold-divider"><span>${ICONS.globe}</span></div>
<div class="feature-card" style="border-left-color:#3D6B8C;"><span class="fc-tag" style="color:#3D6B8C">${ICONS.heart} · Mártyres = Testigos</span>
<h4>No "avanzar" el Reino, sino dar fe de él</h4>
<p>Un error muy frecuente: pensar que la misión de la Iglesia es <em>"hacer avanzar"</em> el Reino o <em>"construirlo"</em> con proyectos humanos. El Reino <em>ya</em> avanza porque el Rey <em>ya</em> está reinando desde el cielo. Lo que la misión hace es <strong>ser testigos</strong> (<em>mártyres</em> en griego): dar testimonio veraz y visible de la realidad que <em>ya</em> es verdad. El Reino se expande por el <em>euangelion</em> (buenas noticias) acompañado de señales.</p>
</div>
<div class="two-col" style="margin-top:16px;">
<blockquote>"Id por todo el mundo y predicad el evangelio a toda criatura." <span class="ref-chip">Mc 16:15</span></blockquote>
<blockquote>"El que en mí cree, las obras que yo hago, él las hará también; y mayores que éstas hará." <span class="ref-chip">Jn 14:12</span></blockquote>
</div>
<h3>${ICONS.target} Gran Comisión: La órden de salida</h3>
<p>En Mateo 28:16-20, Jesús reúne a los once en Galilea y les entrega la <em>gran comisión</em>. ${epiTag("exegesis")} En el griego solo hay un verbo en modo imperativo: <em>mathēteúsate</em> ("haced discípulos"). Los otros tres —yendo, bautizando, enseñando— son participios que describen <em>cómo</em> se cumple ese único mandato:</p>
<div class="flow-row" style="margin-top:14px;">
<div class="flow-step"><span class="fs-num">${ICONS.bulb}</span><h5>Haced discípulos</h5><p>Verbo central en griego: <em>mathēteúsate</em>. No <em>"convertid"</em> ni <em>"bautizad"</em>; el verbo principal es <strong>hacer discípulos</strong>: personas que <em>aprenden y obedecen</em> todo lo que el Rey mandó.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">${ICONS.wave}</span><h5>Bautizándolos</h5><p><em>En el nombre del Padre, y del Hijo, y del Espíritu Santo</em>. El bautismo es la <em>puerta de entrada visible</em> a la comunidad del Reino.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">${ICONS.book}</span><h5>Enseñándoles</h5><p>Que guarden <em>todas las cosas</em> que os mandé. El discipulado <em>no</em> acaba en la conversión; empieza ahí. Debe durar toda la vida.</p></div>
</div>
<div class="two-col" style="margin-top:20px;">
<div class="feature-card" style="border-left-color:#D4A855;"><span class="fc-tag" style="color:#A86C1A">${ICONS.fire} · Presencia ausente pero real</span>
<h4>El Espíritu: Poder del Reino</h4>
<p>${epiTag("pentecostal")} El Espíritu Santo es el <strong>poder del Reino presente</strong> en ausencia del Rey corporal. Pentecostés es la demostración pública de que el reinado continúa operando con autoridad, pero ya <em>no mediado por un cuerpo individual en Galilea</em>, sino por un cuerpo colectivo de testigos: Judíos y samaritanos, esclavos y libres, varones y mujeres, griegos y bárbaros. <em>Todo el edificio juntamente crece en templo santo para el Señor</em>.</p>
</div>
<div class="feature-card" style="border-left-color:#3D6B8C;"><span class="fc-tag" style="color:#3D6B8C">${ICONS.book} · El Buen Samaritano</span>
<h4>Prójimo = Todo ser humano</h4>
<p>Jesús respondió a la pregunta <em>"¿Quién es mi prójimo?"</em> con la parábola del Buen Samaritano <span class="ref-chip">Lc 10:25-37</span>. El prójimo no es el <em>de mi tribu</em>, ni el <em>de mi religión</em>, ni el <em>que me cae bien</em>: es <strong>cualquier ser humano que necesite misericordia</strong>. Por eso la misión es <em>global</em> por definición: no hay <em>excluidos</em> del alcance geográfico o étnico del Reino.</p>
</div>
</div>
<p class="station-transition"><span class="st-arrow">→</span> ${epiTag("atlas")} Esa misión global no se prolonga indefinidamente sin meta: la última estación cierra el arco con la <strong>consumación final</strong> del Reino.</p>
</div>`,
  },
  {
    id: 12,
    title: "La Consumación Final",
    question: "¿Cómo culmina el Reino?",
    color: "#4A3B5C",
    icon: stationIcons[12],
    resumenLinea: "El Reino culmina cuando lo que ya es verdad se hace visible a todo ojo: venida, juicio, resurrección y renovación de todo lo creado.",
    audiencia: "Cierra el arco del Atlas y recoge su confesión final. Útil para enseñar escatología sin especulación de calendarios, y para predicar esperanza a quien está en duelo o agotado de esperar.",
    preguntasReflexion: [
      "Entre el triunfalismo y el quietismo, ¿hacia cuál te inclinas tú, y qué señal concreta lo delata en tu forma de servir?",
      "La consumación no salva almas de la creación, sino que redime la creación entera. ¿Qué implica eso para tu cuerpo, tu trabajo y tu ciudad?",
      "Si el Atlas cierra con una convocatoria y no con una fórmula, ¿a qué te está llamando el Rey ahora mismo, terminado el recorrido?",
    ],
    fraseCitable: "El Rey que murió reina para siempre, y jamás habrá más muerte, ni llanto, ni dolor.",
    synthesis: `<div class="syn-block" style="--card-color:#4A3B5C">
<div class="big-num">13</div>
<h3>${ICONS.sunrise} Plena Manifestación: Lo que ya es, se hace visible</h3>
<p>El <span class="kw kw-rey">Reino</span> ya <em>inaugurado</em> en la cruz, la resurrección y la ascensión será <strong>plenamente manifestado</strong> en la segunda venida del Rey. Este es el final narrativo hacia el que apunta el arco general de la Escritura: segunda venida, juicio final, resurrección de los muertos, renovación cósmica y la entrega final del Reino al Padre. ${epiTag("sintesis")} No es un <em>apéndice</em>; es la <span class="kw kw-foco">meta misma</span> de toda la historia.</p>
<div class="gold-divider"><span>${ICONS.crownGlory}</span></div>
<div class="three-col" style="margin-top:4px;">
<div class="feature-card" style="border-left-color:#4A3B5C;"><span class="fc-tag" style="color:#4A3B5C">${ICONS.bolt} · Acontecimiento 1</span>
<h4>Segunda Venida del Hijo del Hombre</h4>
<blockquote>"Vendrá el Hijo del Hombre en su gloria, y todos los santos ángeles con él; entonces se sentará en su trono de gloria." <span class="ref-chip">Mt 25:31</span></blockquote>
<p>No es una venida <em>espiritual</em> e invisible como la del Pentecostés. Es una venida <strong>visible, pública y cósmica</strong>: "todo ojo le verá" <span class="ref-chip">Ap 1:7</span>. Ninguna nación, ningún imperio, ningún sistema podrá ignorarlo.</p>
</div>
<div class="feature-card" style="border-left-color:#6B5C8C;"><span class="fc-tag" style="color:#6B5C8C">${ICONS.balance} · Acontecimiento 2</span>
<h4>Juicio Universal: Ovejas y Cabritos</h4>
<blockquote>"Todas las naciones serán reunidas delante de él; y apartará unos de los otros, como aparta el pastor las ovejas de los cabritos." <span class="ref-chip">Mt 25:32</span></blockquote>
<p>El criterio del juicio final no es <em>pertenencia étnica</em>, ni <em>intelectual</em>, ni <em>religiosa</em>. ${epiTag("exegesis")} Mateo 25 subraya que la fe genuina en el Rey se evidencia en obras de compasión y justicia hacia los necesitados — no como base de la salvación, sino como su fruto visible: tuviste hambre y me diste de comer, tuve sed y me diste de beber, fui forastero y me recogiste <span class="ref-chip">Mt 25:34-46</span>.</p>
</div>
<div class="feature-card" style="border-left-color:#8C5C6B;"><span class="fc-tag" style="color:#8C5C6B">${ICONS.seedling} · Acontecimiento 3</span>
<h4>Resurrección de todos y renovación</h4>
<blockquote>"Vi un cielo nuevo y una tierra nueva; porque el primer cielo y la primera tierra pasaron, y el mar ya no existía más." <span class="ref-chip">Ap 21:1-5</span></blockquote>
<p>No es el destino de las almas flotando en las nubes. Es la <span class="kw kw-gracia">redención de TODO lo creado</span>: materia, cuerpo, cosmos, cultura, trabajo, belleza. "He aquí, yo hago <strong>nuevas todas las cosas</strong>." <span class="ref-chip">Ap 21:5</span></p>
</div>
</div>
<div class="feature-card" style="margin-top:20px;"><span class="fc-tag">${ICONS.tree} · De la semilla al árbol</span>
<h4>El final coincide con el principio</h4>
<blockquote class="big-quote" style="margin:12px 0 0; padding:18px 22px; border-left:5px solid var(--card-color, var(--gold)); font-size:1.08em;">
Lo que comenzó como <strong>semilla</strong> insignificante en un establo de Belén → se convierte en <strong>árbol</strong> que llena toda la tierra.
<br>Lo que fue <strong>oculto</strong> bajo la apariencia de un nazareno común → se hace <strong>visible a todo ojo</strong>.
<br>Lo que fue <strong>sufrido</strong> voluntariamente en un madero en el Gólgota → se convierte en <strong>gloria inagotable</strong>.
<br><span class="kw kw-rey">El Rey que murió reina para siempre y jamás habrá más muerte, ni llanto, ni dolor.</span> <span class="ref-chip">Ap 21:4</span>
</blockquote>
</div>
<div class="two-col" style="margin-top:18px;">
<blockquote>"El séptimo ángel tocó la trompeta, y hubo grandes voces en el cielo, que decían: ¡El reino del mundo ha venido a ser de nuestro Señor y de su Cristo; y él reinará por los siglos de los siglos!" <span class="ref-chip">Ap 11:15</span></blockquote>
<blockquote>"Muchos vendrán del oriente y del occidente, y se sentarán a la mesa con Abraham, Isaac y Jacob en el reino de los cielos." <span class="ref-chip">Mt 8:11-12</span></blockquote>
</div>
<div class="atlas-closing">
<div class="gold-divider" style="margin-top:24px;"><span>${ICONS.compass}</span></div>
<h3>${ICONS.compass} Síntesis del Atlas: una sola confesión, trece facetas</h3>
<p>${epiTag("sintesis")} Trece estaciones se resumen en una frase: <strong>el Reino de Dios es el reinado de Jesús</strong> — ya presente en su <span class="kw kw-rey">Persona</span> y en su pueblo, todavía no consumado en gloria universal. Parábolas, milagros, cruz, resurrección, Iglesia, consumación: no son trece temas distintos. Son trece caras de la misma confesión. Todos hablan de Jesús. Este Atlas ha intentado hablar de lo que Jesús hablaba.</p>
<p>Que la primera estación empezara por la Persona del Rey y no por un territorio, un programa o una institución no diluye lo comunitario del Reino. Lo funda. Un rey sin pueblo no reina. El mismo gesto que proclama a Jesús como Rey convoca de inmediato una <span class="kw kw-pacto">ekklēsía</span> — doce discípulos que recapitulan a las doce tribus, una comunidad sometida a ese reinado, no un club voluntario reunido por afinidad. Cristo y su pueblo no compiten entre sí. Son la misma realidad mirada desde dos ángulos.</p>
<p>${epiTag("iphc")} ¿Y qué pasa con Israel, la Iglesia y las naciones? Aquí el Atlas habla con la voz de la IPHC: la tradición premilenial en la que se inscribe. Israel no ha sido cancelado ni sustituido. "Ha acontecido a Israel endurecimiento en parte, hasta que haya entrado la plenitud de los gentiles; y luego todo Israel será salvo" <span class="ref-chip">Ro 11:25-27</span>. Los gentiles fueron injertados en su raíz <span class="ref-chip">Ro 11:17-24</span>, no al revés. La Iglesia no hereda la promesa quitándosela a Israel: camina hacia su cumplimiento junto a él, hasta el banquete donde ambos se sientan a la misma mesa <span class="ref-chip">Mt 8:11-12</span>.</p>
<p>Esa misma tensión — ya, todavía no — es también una ética, no solo un dato de calendario. El Reino ya reina en Jesús. Todavía no ha sido entregado, consumado, al Padre <span class="ref-chip">1 Co 15:24-25</span>. Entre esos dos extremos acechan dos tentaciones igual de falsas. El <span class="kw kw-foco">triunfalismo</span> bautiza cualquier proyecto humano — político, nacional, eclesial — como si ya fuera el Reino consumado. El quietismo no hace nada porque total, todavía no ha llegado. La ética del Reino es la de quien ya sirve a un Rey que ya reina, sin fingir que puede terminar con sus propias manos la obra que solo Él consumará.</p>
<p>${epiTag("pentecostal")} Vivir esa tensión sin resolverla antes de tiempo no es indecisión. Para una comunidad pentecostal es el espacio propio del ${ICONS.dove} <span class="kw kw-gracia">Espíritu</span> — las arras de lo que todavía no se ve por entero, el primer pago de una promesa que se sigue cobrando. Por eso el Atlas no cierra con una fórmula sellada. Cierra con una convocatoria. Quien ha recorrido estas trece estaciones no ha terminado un estudio. Ha sido llamado por un Rey que, ahora mismo, sigue reinando.</p>
</div>
</div>`,
  },
];

// ✝️ 70 ENSEÑANZAS BÍBLICAS (f = Foco específico completo de la matriz)
const EVENTS = [
  { n: 1, e: "Bautismo de Jesús", r: "Mt 3:13-17; Mc 1:9-11; Lc 3:21-22", f: "Revelación trinitaria de la identidad del Rey — voz del Padre + Espíritu en paloma + Hijo confirmado", s: 0 },
  { n: 2, e: "Transfiguración", r: "Mt 17:1-9; Mc 9:2-8; Lc 9:28-36", f: "Manifestación de la gloria del Rey encubierta — Moisés + Elías + nube de la Shejiná", s: 0 },
  { n: 3, e: "Yo soy el pan de vida", r: "Jn 6:35-58", f: "Autorrevelación como sustento vital del Reino — comer su carne y beber su sangre = vida eterna", s: 0 },
  { n: 4, e: "Yo soy el camino, la verdad y la vida", r: "Jn 14:6", f: "Exclusividad del Rey como mediador del Reino — nadie viene al Padre sino por Él", s: 0 },
  { n: 5, e: "Yo y el Padre uno somos", r: "Jn 10:30-38", f: "Unidad ontológica con la fuente del Reino — el Padre está en el Hijo y el Hijo en el Padre", s: 0 },
  { n: 6, e: "Parálisis espiritual del hombre / Perdón del paralítico", r: "Mt 9:1-8; Mc 2:1-12; Lc 5:17-26", f: "Perdón de pecados como diagnóstico de la condición humana — autoridad espiritual validada por sanidad física", s: 1 },
  { n: 7, e: "Endemoniado gadareno", r: "Mt 8:28-34; Mc 5:1-20; Lc 8:26-39", f: "Esclavitud demoníaca como evidencia de la opresión — 'Legión' vs. poder del Reino que libera", s: 1 },
  { n: 8, e: "Hija de Jairo y la mujer del flujo de sangre", r: "Mt 9:18-26; Mc 5:21-43; Lc 8:40-56", f: "Muerte e impureza ritual como barreras insuperables — fe del flujo + palabra de resurrección para Jairo", s: 1 },
  { n: 9, e: "Lázaro", r: "Jn 11:1-44", f: "Muerte como enemigo último que el Reino vence — 'Yo soy la resurrección y la vida'", s: 1 },
  { n: 10, e: "Parábola del Hijo Pródigo", r: "Lc 15:11-32", f: "Alienación radical del ser humano respecto a Dios — el amor del Padre corre al encuentro del que vuelve", s: 1 },
  { n: 11, e: "Anuncio inaugural del Reino", r: "Mc 1:15; Mt 4:17; Lc 4:43", f: "Kairos cumplido: declaración del tiempo escatológico — arrepentíos y creed en el evangelio", s: 2 },
  { n: 12, e: "Lectura en Nazaret (Año del favor)", r: "Lc 4:16-21", f: "Manifiesto inaugural del año del favor del Señor — tomando Is 61 y declarándolo cumplido", s: 2 },
  { n: 13, e: "El Reino está entre vosotros", r: "Lc 17:20-21", f: "Presencia real vs. expectativa observacional — el Reino no viene con señal visible externa", s: 2 },
  { n: 14, e: "Parábola de los Labradores Malvados", r: "Mt 21:33-46; Mc 12:1-12; Lc 20:9-19", f: "Juicio sobre los líderes que rechazan al Rey — el Reino se confía a un pueblo que sí da fruto en este tiempo presente", s: 2 },
  { n: 15, e: "Oración del Padrenuestro", r: "Mt 6:9-13; Lc 11:2-4", f: "Petición de la venida del Reino como oración fundamental — 'venga tu Reino' precede el pan nuestro", s: 2 },
  { n: 16, e: "Nacimiento de nuevo (Nicodemo)", r: "Jn 3:1-21", f: "Regeneración espiritual como requisito absoluto — sin el nuevo nacimiento NO se puede VER el Reino", s: 3 },
  { n: 17, e: "Niños y el Reino de Dios", r: "Mt 19:13-15; Mc 10:13-16; Lc 18:15-17", f: "Dependencia infantil como modelo de recepción — recibirlo como un niño, no con logros ni autosuficiencia", s: 3 },
  { n: 18, e: "Zaqueo", r: "Lc 19:1-10", f: "Conversión radical del rico y marginado — el Hijo del Hombre vino a buscar y salvar lo que se había perdido", s: 3 },
  { n: 19, e: "Mujer adúltera", r: "Jn 7:53-8:11", f: "Perdón que genera arrepentimiento genuino — el que esté sin culpa lance la primera piedra", s: 3 },
  { n: 20, e: "Joven rico", r: "Mt 19:16-30; Mc 10:17-31; Lc 18:18-30", f: "Imposibilidad humana vs. posibilidad divina — lo imposible para los hombres, posible para Dios", s: 3 },
  { n: 21, e: "Centurión de Capernaum", r: "Mt 8:5-13; Lc 7:1-10", f: "Fe que trasciende fronteras étnicas y religiosas — Ni en Israel he hallado tanta fe", s: 3 },
  { n: 22, e: "Bienaventuranzas", r: "Mt 5:3-12; Lc 6:20-23", f: "Manifiesto ético del Reino: inversión radical de valores — los pobres, mansos y perseguidos poseen el Reino", s: 4 },
  { n: 23, e: "Antítesis del Sermón del Monte", r: "Mt 5:21-48", f: "Interiorización y profundización de la Ley — el asesinato empieza en el odio, el adulterio en la mirada", s: 4 },
  { n: 24, e: "Amor al enemigo", r: "Mt 5:43-48; Lc 6:27-36", f: "Ética de la no-violencia activa — bendecid a los que os maldicen, orad por los que os persiguen", s: 4 },
  { n: 25, e: "Oración por los que te persiguen", r: "Mt 5:44", f: "Intercesión como respuesta al odio — amar no solo a los amigos sino también a los enemigos", s: 4 },
  { n: 26, e: "Perdón sin límite (setenta veces siete)", r: "Mt 18:21-35", f: "Perdón radical como condición para ser perdonado — el siervo sin misericordia es entregado a los verdugos", s: 4 },
  { n: 27, e: "Gran Mandamiento", r: "Mt 22:34-40; Mc 12:28-34; Lc 10:25-28", f: "Síntesis de toda la Ley en el amor como motor del Reino — amar a Dios y al prójimo", s: 4 },
  { n: 28, e: "Lavado de pies", r: "Jn 13:1-17", f: "Servicio humillante como identidad del ciudadano del Reino — el Señor lava los pies de sus discípulos", s: 4 },
  { n: 29, e: "Parábola del Sembrador", r: "Mt 13:1-23; Mc 4:1-20; Lc 8:4-15", f: "Receptividad del suelo como variable del crecimiento — la semilla (palabra) produce fruto según el corazón", s: 5 },
  { n: 30, e: "Parábola del Grano de Mostaza", r: "Mt 13:31-32; Mc 4:30-32; Lc 13:18-19", f: "Pequeñez inicial vs. magnitud final — la semilla más pequeña se convierte en árbol grande", s: 5 },
  { n: 31, e: "Parábola de la Levadura", r: "Mt 13:33; Lc 13:20-21", f: "Transformación oculta y totalizadora — trabaja invisibiblemente hasta fermentar toda la masa", s: 5 },
  { n: 32, e: "Tesoro escondido y Perla de gran precio", r: "Mt 13:44-46", f: "Valor inestimable que exige entrega total — vender todo para obtenerlo: gracia → respuesta radical", s: 5 },
  { n: 33, e: "Parábola de la Red", r: "Mt 13:47-50", f: "Recolección universal con separación final — los ángeles separarán justos e injustos", s: 5 },
  { n: 34, e: "Crecimiento automático de la semilla", r: "Mc 4:26-29", f: "Misterio del crecimiento independiente de la acción humana — la semilla brota sola", s: 5 },
  { n: 35, e: "Parábola del Trigo y la Cizaña", r: "Mt 13:24-30,36-43", f: "Coexistencia temporal con el mal hasta el juicio — ambos crecen juntos hasta la cosecha final", s: 5 },
  { n: 36, e: "Sanidad del paralítico en Betesda", r: "Jn 5:1-18", f: "Sanidad en sábado como confrontación de autoridad — Hijo hace lo que ve al Padre hacer", s: 6 },
  { n: 37, e: "Nacimiento de ciego de nacimiento", r: "Jn 9:1-41", f: "Luz espiritual como sanidad física y teológica — Yo soy la luz del mundo; este ciego VE", s: 6 },
  { n: 38, e: "Endemoniado en Capernaum", r: "Mc 1:21-28; Lc 4:31-37", f: "Autoridad sobre espíritus inmundos — '¿Qué tienes con nosotros Jesús de Nazaret?' — la palabra lo expulsa", s: 6 },
  { n: 39, e: "Calma de la tormenta", r: "Mt 8:23-27; Mc 4:35-41; Lc 8:22-25", f: "Soberanía sobre los elementos de la creación — viento y mar le obedecen", s: 6 },
  { n: 40, e: "Multiplicación de los panes y peces", r: "Mt 14:13-21; Mc 6:30-44; Lc 9:10-17; Jn 6:1-14", f: "Provisión abundante como anticipo del banquete escatológico — 5 panes alimentan multitudes", s: 6 },
  { n: 41, e: "Caminar sobre las aguas", r: "Mt 14:22-33; Mc 6:45-52; Jn 6:16-21", f: "Dominio sobre el caos primordial — Yo SOY; no temáis", s: 6 },
  { n: 42, e: "Comida con publicanos y pecadores", r: "Mt 9:9-13; Mc 2:13-17; Lc 5:27-32", f: "Comunión con marginados como señal de restauración — No he venido a llamar a justos, sino a pecadores", s: 6 },
  { n: 43, e: "Hemorroísa / Mujer del flujo", r: "Mt 9:20-22; Mc 5:25-34; Lc 8:43-48", f: "Fe que toca el poder del Reino — tu fe te ha salvado; vete en paz", s: 6 },
  { n: 44, e: "Purificación del Templo", r: "Jn 2:13-22", f: "Purificación del centro religioso de Israel — Mi casa casa de oración, ¿ladrones? Limpieza del sistema", s: 7 },
  { n: 45, e: "Discusión sobre el sábado", r: "Mt 12:1-14; Mc 2:23-3:6; Lc 6:1-11", f: "Señor del sábado vs. legalismo religioso — Hijo del Hombre es Señor del sábado", s: 7 },
  { n: 46, e: "Blasfemia contra el Espíritu Santo", r: "Mt 12:22-37; Mc 3:20-30; Lc 11:14-23", f: "Atribución del poder del Reino a Satanás — pecado imperdonable contra el Espíritu que da vida", s: 7 },
  { n: 47, e: "Demandan señal del cielo", r: "Mt 12:38-45; Mc 8:11-13; Lc 11:29-32", f: "Rechazo de las señales ya presentes — generación adúltera pide señal; recibirá la de Jonás", s: 7 },
  { n: 48, e: "Siete ayes a los escribas y fariseos", r: "Mt 23:1-39; Lc 11:37-54", f: "Condena del sistema religioso opresivo — sepulcros blanqueados, fariseos cargan pesos sin tocar la ayuda", s: 7 },
  { n: 49, e: "Juicio ante el Sanedrín", r: "Mt 26:57-68; Mc 14:53-65; Lc 22:54-71; Jn 18:12-24", f: "Condena religiosa del Rey del Reino por blasfemia — '¿Eres tú el Mesías? Yo soy'", s: 7 },
  { n: 50, e: "Juicio ante Pilato", r: "Mt 27:11-26; Mc 15:1-15; Lc 23:1-25; Jn 18:28-19:16", f: "Conflicto entre el Reino de Dios y el poder político — '¿Eres rey de los judíos?' 'Mi Reino no es de aquí'", s: 7 },
  { n: 51, e: "Predicción de la pasión", r: "Mt 16:21-23; Mc 8:31-33; Lc 9:21-22", f: "Necesidad del sufrimiento del Hijo del Hombre — debe padecer mucho, ser rechazado y morir; al 3 día resucitar", s: 8 },
  { n: 52, e: "Oración de Getsemaní", r: "Mt 26:36-46; Mc 14:32-42; Lc 22:39-46; Jn 18:1-11", f: "Sumisión voluntaria al designio del Reino — 'Padre, no mi voluntad, sino la tuya'", s: 8 },
  { n: 53, e: "Crucifixión del Rey", r: "Mt 27:32-56; Mc 15:21-41; Lc 23:26-49; Jn 19:16-37", f: "Victoria mediante sacrificio absoluto — 'Consumado es'. El Cordero inmola su vida por el mundo", s: 8 },
  { n: 54, e: "Siete palabras desde la cruz", r: "Lc 23:34,43; Jn 19:26-27,30", f: "Perdón, promesa y consumación en la agonía — 'Padre perdónalos; Hoy estarás conmigo en el Paraíso'", s: 8 },
  { n: 55, e: "El velo del Templo rasgado", r: "Mt 27:51; Mc 15:38; Lc 23:45", f: "Apertura del acceso a la presencia de Dios — el velo (separador) se rasga de arriba abajo", s: 8 },
  { n: 56, e: "Resurrección al tercer día", r: "Mt 28:1-10; Mc 16:1-8; Lc 24:1-12; Jn 20:1-18", f: "Victoria sobre la muerte como enemigo último — 'Él no está aquí, ha resucitado'", s: 9 },
  { n: 57, e: "Gran Comisión en Galilea", r: "Mt 28:16-20", f: "Autoridad universal delegada al Rey resucitado — 'Toda potestad me es dada; id, haced discípulos'", s: 9 },
  { n: 58, e: "Aparición a Tomás", r: "Jn 20:24-29", f: "Fe en el Rey crucificado y resucitado — 'Señor mío y Dios mío' — bienaventurados los que sin ver han creído", s: 9 },
  { n: 59, e: "Caminata a Emaús", r: "Lc 24:13-35", f: "Interpretación de las Escrituras a la luz del Reino — ¡Nos ardía el corazón mientras nos explicaba!", s: 9 },
  { n: 60, e: "Conversaciones del Reino (40 días)", r: "Hch 1:3", f: "Enseñanza intensiva sobre el Reino en el intervalo entre resurrección y ascensión", s: 10 },
  { n: 61, e: "Pregunta sobre la restauración de Israel", r: "Hch 1:6-8", f: "Reorientación de expectativas políticas a misión global — No os toca saber los tiempos; recibiréis poder y seréis testigos", s: 10 },
  { n: 62, e: "Ascensión al Padre", r: "Lc 24:50-53; Hch 1:9-11", f: "Exaltación del Rey al trono de autoridad — llevado arriba; nube lo recibe; vendrá del mismo modo", s: 10 },
  { n: 63, e: "Parábola del Buen Samaritano", r: "Lc 10:25-37", f: "Expansión del vecino más allá de fronteras étnicas — el samaritano (excluido) se convierte en vecino del caído", s: 11 },
  { n: 64, e: "Gran Comisión (Misión a las naciones)", r: "Mt 28:19-20; Mc 16:15; Lc 24:46-49; Jn 20:21-23", f: "Mandato universal de testificar del Reino a toda criatura, bautizando y enseñando", s: 11 },
  { n: 65, e: "Promesa del Espíritu Santo (Paráclito)", r: "Jn 14:15-26; 16:5-15; Hch 1:8", f: "Poder del Reino en ausencia del Rey corporal — el Consolador os guiará a toda verdad", s: 11 },
  { n: 66, e: "Juicio de las naciones (Ovejas y cabritos)", r: "Mt 25:31-46", f: "Juicio de las naciones según respuesta al Reino — 'Tuve hambre y me disteis de comer; a mi hermanito el más pequeño'", s: 11 },
  { n: 67, e: "Segunda venida del Hijo del Hombre", r: "Mt 24:29-31; Mc 13:24-27; Lc 21:25-28", f: "Manifestación gloriosa del Rey en poder — vendrá en las nubes con gran poder y gloria", s: 12 },
  { n: 68, e: "Juicio final / Resurrección de justos e injustos", r: "Mt 25:31-46; Jn 5:24-30", f: "Separación definitiva según respuesta al Reino — Vida eterna para unos, condenación eterna para otros", s: 12 },
  { n: 69, e: "Nuevos cielos y nueva tierra (Ap 21)", r: "Ap 21:1-5 (ref. Mt 19:28)", f: "Renovación cósmica como culminación del Reino — No más muerte ni llanto; Yo hago nuevas todas las cosas", s: 12 },
  { n: 70, e: "Banquete escatológico del Reino", r: "Mt 8:11-12; Lc 13:28-30; Mt 22:1-14; Ap 19:6-9", f: "Fiesta eterna de la comunión plena con el Rey — sentados con Abraham, Isaac y Jacob; las Bodas del Cordero", s: 12 },
];

// 🔗 CONEXIONES
const CROSS_LINKS = [
  { source: 0, target: 1, strength: 0.8 },
  { source: 0, target: 2, strength: 0.8 },
  { source: 0, target: 8, strength: 0.9 },
  { source: 0, target: 9, strength: 0.9 },
  { source: 1, target: 2, strength: 0.6 },
  { source: 1, target: 6, strength: 0.6 },
  { source: 1, target: 7, strength: 0.6 },
  { source: 2, target: 3, strength: 0.7 },
  { source: 2, target: 5, strength: 0.5 },
  { source: 3, target: 4, strength: 0.8 },
  { source: 5, target: 6, strength: 0.55 },
  { source: 6, target: 7, strength: 0.7 },
  { source: 7, target: 8, strength: 0.9 },
  { source: 8, target: 9, strength: 0.9 },
  { source: 9, target: 10, strength: 0.6 },
  { source: 10, target: 11, strength: 0.7 },
  { source: 11, target: 12, strength: 0.7 },
];

// 📊 QUAD - Esquema de 4 celdas
const QUAD = {
  0: [
    { h: "🔄 Problema: Dios invisible", t: "La humanidad no conoce directamente al Dios invisible, infinito y trascendente. Necesita una revelación clara de quién es el que reina." },
    { h: "💡 Solución: Dios encarnado", t: "Jesús es el Rey personal. El Verbo se hace carne y tabernacula entre nosotros. Dios está reinando en la persona de Cristo." },
    { h: "🧭 Comprensión: Quién es Dios", t: "La identidad del Rey revela el carácter de la Deidad — misericordia, gracia, poder y verdad son tangiblemente visibles." },
    { h: "✨ Consumación: Manifestación divina", t: "Todos conocerán al Rey, desde el más pequeño hasta el grande, y verán su gloria sin mediador." },
  ],
  1: [
    { h: "🔄 Problema: Condición caída", t: "El ser humano nace en una condición de esclavitud múltiple: pecado, opresión, enfermedad, muerte, alienación del origen." },
    { h: "💡 Solución: Liberación real", t: "El Reino llega como intervención de emergencia — no solo consuelo, sino rescate eficaz de cada una de esas ataduras." },
    { h: "🧭 Comprensión: La naturaleza del mal", t: "El enemigo no es un gobierno terrenal, sino Satanás, el pecado y la muerte. La salvación es multidimensional." },
    { h: "✨ Consumación: Ausencia total del mal", t: "Ya no habrá muerte, ni llanto, ni dolor; las cosas primeras habrán pasado." },
  ],
  2: [
    { h: "🔄 Problema: Tiempo cumplido", t: "La humanidad esperaba señales externas. El tiempo de la historia ha llegado a su punto de inflexión; el Reino no espera más." },
    { h: "💡 Solución: El Reino se acerca", t: "El anuncio de Jesús es un evento kairológico — no un consejo moral, sino una declaración de intervención inmediata." },
    { h: "🧭 Comprensión: Ya, pero todavía no", t: "El Reino es una realidad doble: presente aquí y ahora, y futuro glorioso. Dos ejes simultáneos." },
    { h: "✨ Consumación: Plenitud escatológica", t: "Toda rodilla se doblará y toda lengua confesará que Jesucristo es el Señor." },
  ],
  3: [
    { h: "🔄 Problema: Auto-suficiencia", t: "La humanidad intenta entrar por logros, nacimiento, raza o méritos. Es imposible por la vía del esfuerzo propio." },
    { h: "💡 Solución: Gracia por la fe", t: "Metanoia + Pistis + Nuevo nacimiento + dependencia infantil. No por mérito humano, sino por la gracia que el ser humano recibe y a la que responde." },
    { h: "🧭 Comprensión: ¿Qué es la salvación?", t: "No es transacción jurídica solamente. Es regeneración, reorientación radical del rumbo vital." },
    { h: "✨ Consumación: Redención completa", t: "Incluso el cuerpo será liberado de la corrupción. Redención total: espíritu, alma y cuerpo." },
  ],
  4: [
    { h: "🔄 Problema: Valores invertidos", t: "El mundo valora poder, orgullo, riqueza, venganza. La Ley se convierte en exterioridad, no justicia." },
    { h: "💡 Solución: Revolución del corazón", t: "Bienaventuranzas + Antítesis + Amor al enemigo + Perdón sin límite. Ética desde adentro." },
    { h: "🧭 Comprensión: Ética desde el interior", t: "El asesinato empieza en el odio. El adulterio en la mirada. Todo empieza por el corazón." },
    { h: "✨ Consumación: Perfección total", t: "Sed perfectos como vuestro Padre celestial es perfecto. En el Reino venidero, este mandato será plenitud real." },
  ],
  5: [
    { h: "🔄 Problema: Expectativa errónea", t: "Se esperaba conquista militar, poder visible, reino político. Nada de eso pasa." },
    { h: "💡 Solución: Crecimiento orgánico", t: "Parábolas de la semilla, la mostaza, la levadura. Crecimiento oculto pero irreversible." },
    { h: "🧭 Comprensión: Poder del Reino", t: "El Reino avanza por receptividad, no por imposición. El poder está en la Palabra sembrada." },
    { h: "✨ Consumación: Llenura universal", t: "Como el árbol de la mostaza que llena el cielo, el Reino ocupará toda la creación." },
  ],
  6: [
    { h: "🔄 Problema: Cuerpo y cosmos rotos", t: "La creación gime con dolores de parto. Enfermedad, desorden, opresión demoníaca son la condición del mundo caído." },
    { h: "💡 Solución: Señales visibles", t: "Milagros como sēmeia: sanidades, exorcismos, dominio sobre la naturaleza, perdón de pecados." },
    { h: "🧭 Comprensión: El cuerpo como templo", t: "El cuerpo no es accesorio. Es el campo de batalla anticipado del Reino que viene." },
    { h: "✨ Consumación: Nueva creación", t: "Renovación física total. Cuerpos resucitados, incorruptibles. Todo será nuevo." },
  ],
  7: [
    { h: "🔄 Problema: Poderes establecidos", t: "Satanás, religión hipócrita y el César han construido reinos. No ceden sin pelear." },
    { h: "💡 Solución: Saqueo de la casa", t: "Cada milagro, cada confrontación es un acto de guerra. Jesús ata al hombre fuerte y despoja sus bienes." },
    { h: "🧭 Comprensión: Verdadera guerra", t: "No lucha contra sangre y carne, sino contra principados, potestades y gobernadores de las tinieblas." },
    { h: "✨ Consumación: Paz eterna", t: "Muerte y Hades lanzados al lago de fuego. Dios será todo en todos." },
  ],
  8: [
    { h: "🔄 Problema: Justicia retributiva", t: "El pecado exige muerte. Nadie lo puede pagar. El poder del mundo está en la espada y la cruz como castigo." },
    { h: "💡 Solución: Cruz como trono", t: "El Rey muere. El que gobierna, sirve. La derrota aparente es la victoria real." },
    { h: "🧭 Comprensión: Amor sin medida", t: "En esto consiste el amor: no que nosotros lo amamos, sino que él nos amó y dio su vida por nosotros." },
    { h: "✨ Consumación: Glorificación eterna", t: "El Cordero que fue inmolado está de pie, como inmolado, en medio del trono." },
  ],
  9: [
    { h: "🔄 Problema: Último enemigo: muerte", t: "Sin resurrección, Jesús sería un mártir más, la fe vana, los apóstoles mentirosos." },
    { h: "💡 Solución: Vida indestructible", t: "Dios lo levanta de los muertos. Toda potestad en el cielo y la tierra le es entregada." },
    { h: "🧭 Comprensión: Esperanza confirmada", t: "No solo creemos en algo que esperamos, sino en algo que ya ha acontecido." },
    { h: "✨ Consumación: Vida plena", t: "Resurrección de justos e injustos. Eternidad con el Rey vivo." },
  ],
  10: [
    { h: "🔄 Problema: Expectativa nacional", t: "Los discípulos preguntan: ¿restaurarás el Reino a Israel? Política, poder, territorio inmediato." },
    { h: "💡 Solución: Cuarenta días de preparación", t: "Jesús reorienta la expectativa hacia una misión global, con poder del Espíritu." },
    { h: "🧭 Comprensión: La Iglesia", t: "No es el Reino, sino la comunidad redimida que da testimonio de él, encarna sus valores y le sirve como instrumento — ni edificio ni institución." },
    { h: "✨ Consumación: Cuerpo completo", t: "La Iglesia, novia sin mancha ni arruga, plenitud del que todo en todo es llenado." },
  ],
  11: [
    { h: "🔄 Problema: Misión limitada", t: "Misión hasta entonces a la casa perdida de Israel. Gentiles fuera." },
    { h: "💡 Solución: Comisionados a las naciones", t: "Id, haced discípulos de todas las naciones. Bautizándolos en el Nombre triple." },
    { h: "🧭 Comprensión: Comisión mundial", t: "Mártyres, testigos en Jerusalén, Judea, Samaria y hasta lo último de la tierra." },
    { h: "✨ Consumación: Reino universal", t: "Naciones y lenguas y pueblos. Una gran muchedumbre que nadie puede contar." },
  ],
  12: [
    { h: "🔄 Problema: Historia inconclusa", t: "El mal no ha sido castigado. El sufrimiento sigue. La muerte no ha sido destruida del todo." },
    { h: "💡 Solución: Venida del Rey en gloria", t: "Vendrá en las nubes con gran poder y gloria. Segunda venida, parousía manifiesta." },
    { h: "🧭 Comprensión: Juicio y justicia", t: "Separación de justos e injustos. Ovejas y cabritos. Resurrección, vida y condenación." },
    { h: "✨ Consumación: Nuevos cielos y tierra", t: "Yo hago nuevas todas las cosas. El Reino eterno. Dios mora con los hombres." },
  ],
};
