/* ========================================================
   ATLAS TEOLÓGICO INTERACTIVO v4.0 — FUNCIONAL COMPLETO
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
  balance:    svgWrap('<path d="M12 3v18"/><path d="M3 8h4l3 9H3L3 8z"/><path d="M17 8h4l-3 9h-4L17 8z"/><path d="M5 8l7-5 7 5"/>')
};
const stationIcons = [
  ICONS.crownId, ICONS.alert, ICONS.hourglass, ICONS.door, ICONS.heart,
  ICONS.seedling, ICONS.spark, ICONS.sword, ICONS.cross, ICONS.sunrise,
  ICONS.scroll, ICONS.globe, ICONS.crownGlory
];

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
};

// 🗺️ 13 ESTACIONES TEOLÓGICAS (Contenido EXACTO del documento Arquitectura del Reino)
const STATIONS = [
  {
    id: 0,
    title: "El Centro Absoluto: La Identidad del Rey",
    question: "¿Quién es el Rey y qué revela sobre Dios?",
    color: "#C75B2A",
    icon: stationIcons[0],
    synthesis: `<div class="syn-block" style="--card-color:#C75B2A">
<div class="big-num">01</div>
<h3>${ICONS.globe2} La Persona, no el territorio</h3>
<p>El <span class="kw kw-rey">Reino de Dios</span> no es primero un territorio, una institución o una doctrina abstracta. Es, ante todo, una <span class="kw kw-sello">persona</span>. Jesús no anuncia el Reino como un sistema externo que vendrá después de Él; <strong>lo encarna</strong>. En su persona, palabra y obra, <span class="kw kw-gracia">Dios mismo</span> está reinando activamente en la historia humana.</p>
<div class="gold-divider"><span>${ICONS.crownId}</span></div>
<div class="feature-card"><span class="fc-tag">${ICONS.scroll} · Contexto bíblico</span>
<h4>Malkut Shamayim: Reinado activo</h4>
<p>En el judaísmo del Segundo Templo, la frase <em>malkut shamayim</em> (reino de los cielos) o <em>basileia tou theou</em> no designaba principalmente un lugar geográfico, sino el <span class="kw kw-foco">reinado activo</span> de Dios: la soberanía dinámica divina que se ejerce sobre la creación. Jesús toma esta expectativa milenaria y la cumple en sí mismo: el Rey <strong>es</strong> el Reino.</p>
</div>
<h3>${ICONS.bolt} El Reino ha llegado ya</h3>
<p>Cuando Jesús declara que el Reino <em>"se ha acercado"</em> (<em>ēngiken</em>), no está anunciando una futura esperanza distante, sino que la soberanía de Dios está ahora <span class="kw kw-sello">operando</span> en su persona. La identidad del Rey es el <span class="kw kw-foco">eje gravitacional</span> de todo el sistema; sin ella, nada tiene sentido. <em>"El que me ha visto a mí, ha visto al Padre"</em> <span class="ref-chip">Jn 14:9</span>.</p>
<div class="flow-row">
<div class="flow-step"><span class="fs-num">1</span><h5>Anuncia</h5><p>Que Dios está reinando ya</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">2</span><h5>Inaugura</h5><p>El reinado mismo en su persona</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">3</span><h5>Transforma</h5><p>La comprensión de quién es Dios</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">4</span><h5>Consumará</h5><p>Señorío universal sobre todo</p></div>
</div>
<blockquote>"Yo y el Padre uno somos." <span class="ref-chip">Jn 10:30-38</span></blockquote>
<div class="two-col" style="margin-top:12px;">
<div class="kpi-card" style="border-color:#C75B2A"><h4>${ICONS.target} Identidad revelada</h4><p>En el Bautismo y la Transfiguración el Padre mismo certifica la identidad del Hijo con voz audible desde el cielo.</p><p class="small"><span class="ref-chip">Mt 3:13-17</span> · <span class="ref-chip">Mt 17:1-9</span></p></div>
<div class="kpi-card" style="border-color:#D4A855"><h4>${ICONS.chalice} Pan de vida</h4><p>El Rey se da a sí mismo como alimento. <em>Comer su carne y beber su sangre</em> no es metáfora abstracta sino participación real en la vida del Reino.</p><p class="small"><span class="ref-chip">Jn 6:35-58</span></p></div>
</div>
</div>`,
  },
  {
    id: 1,
    title: "La Necesidad del Reino",
    question: "¿Qué condición humana hace necesaria su llegada?",
    color: "#8B8680",
    icon: stationIcons[1],
    synthesis: `<div class="syn-block" style="--card-color:#8B8680">
<div class="big-num">02</div>
<h3>${ICONS.alert} Intervención de emergencia</h3>
<p>El <span class="kw kw-rey">Reino</span> no es un lujo espiritual opcional ni una mejora moral. Es una <span class="kw kw-foco">intervención de emergencia</span>. La humanidad vive bajo una <strong>esclavitud multidimensional</strong> que Jesús diagnostica con precisión clínica: seis diagnósticos distintos, todos convergiendo en la misma raíz.</p>
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
<p>La expectativa mesiánica del Segundo Templo esperaba liberación de la ocupación romana. Jesús <span class="kw kw-foco">amplía radicalmente</span> el horizonte: la opresión verdadera es <em>más profunda</em> que la política. El enemigo no es solo Roma; es <strong>Satanás, el pecado y la muerte misma</strong> — poderes invisibles que ningún ejército humano puede derrotar. Por eso el Reino necesita traer un poder que no viene de este mundo.</p>
</div>
<h3>${ICONS.signal} El milagro como diagnóstico</h3>
<p>Cada milagro es simultáneamente un acto de compasión <em>y</em> un diagnóstico. Al sanar a un leproso, demuestra que el Reino tiene poder para tocar lo que la religión consideraba <span class="kw kw-pacto">inmundo e irreparable</span>. Al resucitar a Lázaro, demuestra que incluso el enemigo final tiene fecha de vencimiento.</p>
<div class="two-col" style="margin-top:10px;">
<blockquote>"No he venido a llamar a justos, sino a pecadores al arrepentimiento." <span class="ref-chip">Lc 5:32</span></blockquote>
<blockquote>"El Hijo del Hombre vino a buscar y a salvar lo que se había perdido." <span class="ref-chip">Lc 19:10</span></blockquote>
</div>
</div>`,
  },
  {
    id: 2,
    title: "La Llegada del Reino",
    question: "¿Cómo llega el Reino y qué significa su anuncio?",
    color: "#2E5A6B",
    icon: stationIcons[2],
    synthesis: `<div class="syn-block" style="--card-color:#2E5A6B">
<div class="big-num">03</div>
<h3>${ICONS.hourglass} Kairos: El tiempo se ha cumplido</h3>
<p>El anuncio inaugural en Marcos 1:15 no es un capítulo más de la historia; es un evento <span class="kw kw-foco">kairológico</span> decisivo — un giro de la historia humana en un solo verso. <em>"El tiempo se ha cumplido, y el reino de Dios se ha acercado"</em> <span class="ref-chip">Mc 1:15</span>. No es un consejo moral ni una recomendación piadosa. Es una <strong>declaración de guerra contra el antiguo orden</strong>.</p>
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
</div>`,
  },
  {
    id: 3,
    title: "La Entrada al Reino",
    question: "¿Cómo entra una persona en el Reino?",
    color: "#5D7A6B",
    icon: stationIcons[3],
    synthesis: `<div class="syn-block" style="--card-color:#5D7A6B">
<div class="big-num">04</div>
<h3>${ICONS.door} No por logros, por reorientación</h3>
<p>La entrada al <span class="kw kw-rey">Reino</span> <strong>no</strong> es por nacimiento, raza, logros intelectuales, acumulación de bienes ni observancia religiosa perfecta. Es por una <span class="kw kw-foco">reorientación radical del ser</span> completo. Son cuatro condiciones no negociables que Jesús repite a lo largo de todo su ministerio.</p>
<div class="gold-divider"><span>${ICONS.target}</span></div>
<div class="flow-row">
<div class="flow-step"><span class="fs-num">①</span><h5>Metanoia</h5><p><em>Meta</em> (más allá) + <em>nous</em> (mente). No es remordimiento, sino <span class="kw kw-gracia">transformación de percepción</span> — ir más allá de la mente que tienes.</p></div>
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
</div>`,
  },
  {
    id: 4,
    title: "La Naturaleza Interna del Reino",
    question: "¿Qué transformación produce el Reino en la persona?",
    color: "#8B7355",
    icon: stationIcons[4],
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
<p>Jesús no abroga la Ley; la <span class="kw kw-sello">interioriza y profundiza</span> hasta la médula. Las antítesis del sermón son sistemáticas: el <em>asesinato</em> no empieza en el puño, sino en el <strong>odio</strong> del corazón; el <em>adulterio</em> no empieza en el cuerpo, sino en la <strong>mirada</strong> codiciosa; la <em>venganza</em> —aceptada por lex talionis— es reemplazada por <strong>amor al enemigo</strong> <span class="ref-chip">Mt 5:21-48</span>.</p>
<div class="three-col" style="margin:16px 0 6px;">
<div class="kpi-card"><h5>${ICONS.sword} · Asesinato</h5><p>No matarás → <strong>ni odiarás a tu hermano en el corazón.</strong></p></div>
<div class="kpi-card"><h5>${ICONS.eye} · Adulterio</h5><p>No fornicarás → <strong>ni mirarás con concupiscencia.</strong></p></div>
<div class="kpi-card"><h5>${ICONS.bolt} · Venganza</h5><p>Ojo por ojo → <strong>amor a quien te odia y persigue.</strong></p></div>
</div>
<h3>${ICONS.pulse} Valores cardinales del ciudadano</h3>
<p>Seis ejes que aparecen una y otra vez, y que <em>todo</em> habitante del Reino debe llevar encarnados. No son deberes opcionales, son los <em>genes</em> de la nueva identidad.</p>
<div class="values-grid">
<div class="val-chip">${ICONS.target} <span class="kw kw-glosa">Justicia</span> superior</div>
<div class="val-chip">${ICONS.heart} <span class="kw kw-gracia">Amor</span> al enemigo</div>
<div class="val-chip">${ICONS.dove} <span class="kw kw-gracia">Perdón</span> (70x7)</div>
<div class="val-chip">${ICONS.hands} <span class="kw kw-pacto">Servicio</span> humilde</div>
<div class="val-chip">${ICONS.child} <span class="kw kw-rey">Humildad</span> radical</div>
<div class="val-chip">${ICONS.crownId} <span class="kw kw-sello">Santidad</span> del corazón</div>
</div>
<blockquote style="margin-top:20px;">"Bienaventurados los limpios de corazón, porque ellos verán a Dios." <span class="ref-chip">Mt 5:8</span></blockquote>
</div>`,
  },
  {
    id: 5,
    title: "La Dinámica de Crecimiento del Reino",
    question: "¿Cómo crece y se expande el Reino?",
    color: "#6B8E4E",
    icon: stationIcons[5],
    synthesis: `<div class="syn-block" style="--card-color:#6B8E4E">
<div class="big-num">06</div>
<h3>${ICONS.seedling} Crecimiento orgánico, no político</h3>
<p>El crecimiento del <span class="kw kw-rey">Reino</span> no avanza por fuerza política, conquista militar, manipulación de masas o conquista de poderes. Es <span class="kw kw-foco">orgánico, oculto e inevitable</span>. Jesús enseña toda la dinámica del crecimiento <em>exclusivamente</em> por medio de parábolas agrícolas: imágenes de <em>tierra, semilla, fermentación, cosecha</em>.</p>
<div class="gold-divider"><span>${ICONS.wheat}</span></div>
<h4>${ICONS.book} Parábolas del crecimiento — Cinco movimientos</h4>
<p>El sermón en parábolas (Mateo 13 / Marcos 4 / Lucas 8) es el único lugar en todo el Nuevo Testamento donde Jesús explica, de forma programática, <em>cómo</em> se expande su Reino. Cada parábola revela un <strong>momento distinto</strong> de la misma historia:</p>
<div class="three-col" style="margin-top:10px;">
<div class="feature-card"><span class="fc-tag" style="color:#6B8E4E">01 · SEMBRADOR</span>
<h5>Receptividad, no coerción</h5>
<p>La semilla es la <em>palabra del Reino</em>. El crecimiento depende de la <span class="kw kw-gracia">receptividad del suelo</span> del corazón, no de la fuerza del sembrador. El <em>mismo</em> mensaje produce frutos de 30, 60 y 100 por uno.</p>
<p class="small"><span class="ref-chip">Mt 13:1-23</span></p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#4A7B3A">02 · MOSTAZA</span>
<h5>Insignificancia inicial</h5>
<p>La semilla <em>más pequeña</em> de todas las hortalizas llega a ser un árbol tan grande que las aves vienen a anidar. El Reino empieza en aparente <span class="kw kw-foco">insignificancia</span>, pero termina transformando la ecología entera.</p>
<p class="small"><span class="ref-chip">Mt 13:31-32</span></p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#8B9E4E">03 · LEVADURA</span>
<h5>Transformación total oculta</h5>
<p>Una bola de levadura, escondida en tres medidas de harina (≈50 kilos), fermenta <em>toda la masa</em> sin hacer ruido. Así es el Reino: no anuncia su acción, pero lo <span class="kw kw-sello">penetra todo</span> desde adentro.</p>
<p class="small"><span class="ref-chip">Mt 13:33</span></p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#6B6E2E">04 · TESORO · PERLA</span>
<h5>Valor inestimable</h5>
<p>Un campesino halla un tesoro y <em>vende todo lo que tiene</em> para comprar el campo. Un mercader halla una perla de gran precio y <em>vende</em> todo. La <span class="kw kw-gracia">gracia</span> es hallazgo gratuito que genera <strong>entrega radical</strong>.</p>
<p class="small"><span class="ref-chip">Mt 13:44-46</span></p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#4E8E6E">05 · RED</span>
<h5>Cosecha universal y juicio</h5>
<p>Una red echa al mar recoge toda clase de peces. Los buenos en cestas, los malos echados. Hay un <em>juicio final</em> inevitable, donde la <span class="kw kw-glosa">separación</span> se vuelve visible y eterna.</p>
<p class="small"><span class="ref-chip">Mt 13:47-50</span></p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#8E6E4E">· BONUS · CRECIMIENTO AUTO</span>
<h5>Misterio independiente</h5>
<p>"Echa la semilla, duerme, levanta; la semilla brota y crece sin que él sepa cómo" <span class="ref-chip">Mc 4:26-29</span>. El Reino <em>crece solo</em>: el obrero siembra y riega, pero Dios es quien da el crecimiento.</p>
</div>
</div>
<div class="feature-card" style="margin-top:22px;"><span class="fc-tag">${ICONS.refresh} · Patrón unificado</span>
<h4>Un solo movimiento en cinco actos</h4>
<p><span class="kw kw-foco">Pequeñez</span> invisible → <span class="kw kw-foco">ocultamiento</span> aparente → <span class="kw kw-sello">transformación total</span> del entorno → <span class="kw kw-glosa">juicio</span> y separación final. Todas las parábolas, sin excepción, siguen este mismo guion estructural.</p>
</div>
</div>`,
  },
  {
    id: 6,
    title: "Las Señales Visibles del Reino",
    question: "¿Cómo se manifiesta visiblemente el Reino?",
    color: "#4A7B8C",
    icon: stationIcons[6],
    synthesis: `<div class="syn-block" style="--card-color:#4A7B8C">
<div class="big-num">07</div>
<h3>${ICONS.target} Sēmeia: Señales, no espectáculos</h3>
<p>Los milagros no son espectáculos para impresionar multitudes ni generar <em>fama</em>. Son <span class="kw kw-foco">señales</span> (<em>sēmeia</em>) del reinado de Dios irrumpiendo en la realidad caída. Cada sanidad, exorcismo, dominio sobre la naturaleza y mesa compartida es una <span class="kw kw-rey">anticipación</span> de la renovación cósmica futura: una pequeña muestra de cómo <em>es</em> el mundo cuando Dios está reinando sin oposición.</p>
<div class="gold-divider"><span>${ICONS.signal}</span></div>
<div class="two-col" style="margin:0 0 14px;">
<div class="feature-card" style="border-left-color:#4A7B8C;"><span class="fc-tag" style="color:#4A7B8C">${ICONS.book} · Gramática de la señal</span>
<h4>Cada sēmeion = Reino adelantado</h4>
<p>Los evangelios presentan <em>al menos cinco categorías</em> de señales, cada una de las cuales corresponde a una dimensión diferente de la <span class="kw kw-sello">redención</span> que el Reino inaugura. Ninguna es <em>aleatoria</em>: todas juntas apuntan a que la Nueva Creación <em>ya está aquí</em> en germen.</p>
</div>
<div class="feature-card" style="border-left-color:#D4A855;"><span class="fc-tag" style="color:#A86C1A">${ICONS.bolt} · Autoridad validada</span>
<h4>Milagro = Credencial visible</h4>
<p>"Si por el Espíritu de Dios echo fuera los demonios, <strong>entonces el Reino de Dios ha llegado ya a vosotros</strong>" <span class="ref-chip">Mt 12:28</span>. La señal <em>no es el punto</em>; es la <em>evidencia</em> de que una realidad más fuerte está operando en el mundo.</p>
</div>
</div>
<div class="three-col">
<div class="kpi-card"><h5>${ICONS.heart} · Sanidades</h5><p>Acto de <em>guerra</em> contra las consecuencias del pecado. Cada cuerpo sanado es una <span class="kw kw-gracia">restauración</span> al diseño original del Creador. Todo lo que la Caída rompió, el Reino lo recompone.</p></div>
<div class="kpi-card"><h5>${ICONS.skull} · Exorcismos</h5><p>"Atando al hombre fuerte para saquear su casa" <span class="ref-chip">Mc 3:27</span>. Cada liberación demuestra que <span class="kw kw-sello">Satanás ha sido derrotado de facto</span>, aunque la sentencia final esté pendiente.</p></div>
<div class="kpi-card"><h5>${ICONS.crownGlory} · Perdón de pecados</h5><p>Jesús perdona <em>de visu</em> al paralítico: algo que <em>solo Dios puede hacer</em>. La <em>sanidad física</em> funciona como <em>aval visible</em> de su <em>autoridad espiritual</em>.</p></div>
<div class="kpi-card"><h5>${ICONS.chalice} · Mesa con marginados</h5><p>Come con publicanos y pecadores <span class="ref-chip">Mt 9:9-13</span>. La <em>mesa compartida</em> en el mundo antiguo <em>es</em> alianza. Invitar a un marginado a tu mesa es <em>restaurarle la dignidad perdida</em>.</p></div>
<div class="kpi-card"><h5>${ICONS.wave} · Dominio naturaleza</h5><p>Tormenta calmada, panes multiplicados, caminar sobre aguas. Muestra soberanía sobre la <span class="kw kw-rey">creación entera</span>: el Rey gobierna no solo sobre hombres, sino sobre la materia misma.</p></div>
<div class="kpi-card"><h5>${ICONS.book} · Signos de Jn</h5><p>En Juan hay siete <em>sēmeia</em> elegidas, cada una apunta a una afirmación <em>"Yo soy…"</em>. Pan de vida, Luz del mundo, Puerta, Buen Pastor, Resurrección, Camino/Verdad/Vida, Vid verdadera.</p></div>
</div>
<blockquote style="margin-top:18px;">"Esta generación mala y adúltera pide señal; y no le será dada señal, sino la señal del profeta Jonás" <span class="ref-chip">Mt 12:38-45</span>.</blockquote>
</div>`,
  },
  {
    id: 7,
    title: "El Conflicto del Reino",
    question: "¿Por qué el Reino encuentra oposición?",
    color: "#7A5C5C",
    icon: stationIcons[7],
    synthesis: `<div class="syn-block" style="--card-color:#7A5C5C">
<div class="big-num">08</div>
<h3>${ICONS.swirl} Guerra espiritual real, no metáfora</h3>
<p>El <span class="kw kw-rey">Reino</span> <strong>no puede coexistir pacíficamente</strong> con los reinos de este mundo. Hay una guerra espiritual real, con frentes bien definidos, ejércitos organizados, y un resultado histórico ya <em>decidido</em> en la cruz, pero cuya aplicación sigue <em>desplegándose</em> en el presente. <span class="kw kw-sello">Satanás no cede su territorio sin lucha</span>.</p>
<div class="gold-divider"><span>${ICONS.sword}</span></div>
<h4>${ICONS.fire} Tres frentes de oposición simultáneos</h4>
<p>El conflicto no es monolítico: se despliega en tres planos a la vez, cada uno operando por encima del anterior. El evangelio sin <em>teoría del conflicto</em> es una colección de sentimientos bonitos sin carne.</p>
<div class="three-col">
<div class="kpi-card" style="border-color:#3A1E1E"><h5>${ICONS.skull} · FRUTO ESPIRITUAL</h5><p>Los demonios reconocen a Jesús <em>inmediatamente</em>: "¿Qué tienes con nosotros, Jesús Nazareno? Sé quién eres: el Santo de Dios" <span class="ref-chip">Mc 1:23</span>. Saben perfectamente que ha venido a <strong>despojarlos y destruirlos</strong>. Cada exorcismo es una batalla territorial.</p></div>
<div class="kpi-card" style="border-color:#5C4040"><h5>${ICONS.scroll} · FRENTE RELIGIOSO</h5><p>Fariseos, escribas, sacerdotes, sanedrín. Jesús confronta su <span class="kw kw-foco">hipocresía, legalismo y exclusión</span>. Sus siete ayes <span class="ref-chip">Mt 23:1-39</span> no son un arranque de ira: son una <em>sentencia pública</em> contra un sistema religioso que se convirtió en barrera para el Reino.</p></div>
<div class="kpi-card" style="border-color:#7A5C5C"><h5>${ICONS.columns} · FRENTE POLÍTICO</h5><p>Poncio Pilato, el representante del Imperio. La tensión inevitable entre el <span class="kw kw-rey">Reino de Dios</span> y <strong>todo poder humano</strong>. La pregunta de Pilato <em>"¿Eres rey de los judíos?"</em> <span class="ref-chip">Mt 27:11-26</span> es la misma que César le hará a cada creyente durante los siguientes tres siglos de persecución.</p></div>
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
</div>`,
  },
  {
    id: 8,
    title: "La Cruz como Evento Central",
    question: "¿Cómo la muerte del Rey inaugura la nueva realidad?",
    color: "#1A1A2E",
    icon: stationIcons[8],
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
<h3>${ICONS.bolt} Paradoja del poder: la derrota aparente es victoria real</h3>
<p>"Desarmó a los principados y a las potestades, los exhibió públicamente, <strong>triunfando sobre ellos en la cruz</strong>" <span class="ref-chip">Col 2:15</span>. ¿Cómo triunfa un hombre desnudo, clavado a dos maderos, sangrando hasta morir? Triunfa porque <em>está haciendo exactamente la voluntad del Padre</em>. El servicio es el modelo del gobierno divino: el último será el primero.</p>
<div class="flow-row" style="margin-top:20px;">
<div class="flow-step"><span class="fs-num">Getsemaní</span><p>Sumisión total: <em>"No mi voluntad, sino la tuya"</em> <span class="ref-chip">Mt 26:36-46</span>.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">Sanedrín</span><p>Condenación religiosa por <em>blasfemia</em>. Se hace cargo del rechazo de Israel.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">Pilato</span><p>Condenación política por <em>sedición</em>. Se hace cargo del conflicto con el Imperio.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">Cruz</span><p>Siete palabras, perdón, promesa, familia, sed, abandono, consumación.</p></div>
<div class="flow-arrow">→</div>
<div class="flow-step"><span class="fs-num">Velo rasgado</span><p>De arriba abajo. <strong>Acceso abierto</strong> a la presencia de Dios para <em>toda carne</em> <span class="ref-chip">Mt 27:51</span>.</p></div>
</div>
<div class="two-col" style="margin-top:20px;">
<blockquote>"Padre, perdónalos, porque no saben lo que hacen." <span class="ref-chip">Lc 23:34-43</span></blockquote>
<blockquote>"Hoy estarás conmigo en el paraíso." <span class="ref-chip">Lc 23:34-43</span></blockquote>
</div>
<h3>${ICONS.crownId} El Reino no se defiende, se entrega</h3>
<p>Este es el secreto que Pilato nunca entiende: el Reino de Jesús <em>no es de este mundo</em> <span class="ref-chip">Jn 18:36</span>, precisamente <em>porque</em> su modo de ganar la guerra es <strong>entregarse voluntariamente</strong>. No llamó a doce legiones de ángeles. Se entregó. Y precisamente <em>por eso</em> ganó.</p>
</div>`,
  },
  {
    id: 9,
    title: "La Resurrección y Exaltación",
    question: "¿Qué confirma la resurrección sobre el Reino?",
    color: "#D4A855",
    icon: stationIcons[9],
    synthesis: `<div class="syn-block" style="--card-color:#D4A855">
<div class="big-num">10</div>
<h3>${ICONS.sunrise} Validación divina, no milagro aislado</h3>
<p>La resurrección no es simplemente un milagro impresionante que cierra un libro bonito. Es la <span class="kw kw-foco">validación divina</span> de <strong>TODO</strong> lo que Jesús enseñó, prometió y encarnó durante tres años. El Padre levanta al Hijo crucificado como <em>sello público</em>: declara ante el universo entero — este hombre que ustedes humillaron y mataron <strong>es mi Hijo, mi Mesías, mi Señor</strong>.</p>
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
<h5>Testimonio público verificable</h5>
<p>El primer argumento del Nuevo Testamento no es una doctrina abstracta. Es un hecho <em>histórico y público</em>: el sepulcro donde fue puesto estaba <em>realmente vacío</em> al tercer día. Tanto enemigos como amigos coincidían en este punto y lo intentaban <em>explicar</em> (robaron el cuerpo, etc.), nunca <em>negar</em>.</p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#A86C1A">${ICONS.eye} · Evidencia 02: Apariciones</span>
<h5>Testigos múltiples y variados</h5>
<p>Aparece a María Magdalena en el jardín, a las mujeres en el camino, a dos discípulos en Emaús <span class="ref-chip">Lc 24:13-35</span>, a los once en el aposento alto, a Tomás una semana después <span class="ref-chip">Jn 20:24-29</span>, a más de quinientos a la vez (1 Co 15). El testimonio no depende de <em>una sola persona</em>.</p>
</div>
<div class="feature-card"><span class="fc-tag" style="color:#8B5C2A">${ICONS.dove} · Evidencia 03: Iglesia transformada</span>
<h5>Discípulos cobardes → mártires</h5>
<p>El <em>mismo grupo</em> que huyó despavorido en Getsemaní y negó a Jesús tres veces, se convierte, después de Pentecostés, en un grupo de hombres y mujeres dispuestos a <span class="kw kw-pacto">morir por lo que han visto</span>. No hay explicación histórica más coherente que: <em>ellos estuvieron realmente convencidos</em>.</p>
</div>
</div>
<h3>${ICONS.tree} La muerte no tiene la última palabra</h3>
<p>1 Corintios 15 es el tratado más extenso del Nuevo Testamento sobre la resurrección. Pablo dice: <em>"Y si Cristo no resucitó, vana es nuestra fe; aún estáis en vuestros pecados"</em>. La <span class="kw kw-rey">resurrección</span> no es un plus piadoso; es el <strong>fundamento ontológico</strong> de todo lo que creemos. Si Cristo resucitó, <em>todo lo demás se sostiene</em>; si no, todo se derrumba.</p>
<blockquote style="margin-top:16px;">"Porque así como en Adán todos mueren, así también en Cristo todos serán vivificados." <span class="ref-chip">1 Co 15:22</span></blockquote>
</div>`,
  },
  {
    id: 10,
    title: "El Reino Después de la Resurrección",
    question: "¿Cómo continúa el Reino después de la resurrección?",
    color: "#A67B5B",
    icon: stationIcons[10],
    synthesis: `<div class="syn-block" style="--card-color:#A67B5B">
<div class="big-num">11</div>
<h3>${ICONS.clock} Cuarenta días: Puente entre dos épocas</h3>
<p>Los cuarenta días entre la <em>resurrección</em> y la <em>ascensión</em> no son un paréntesis o un epílogo. Son el <span class="kw kw-foco">puente narrativo</span> entre la época de Jesús de Nazaret y la época de la Iglesia. Hechos 1:3 es explícito: Jesús se presenta vivo con <em>"muchas pruebas indubitables"</em> y habla <strong>de las cosas concernientes al reino de Dios</strong> <span class="ref-chip">Hch 1:3</span>. <em>¡La resurrección no cambia el tema!</em> — lo profundiza y expande.</p>
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
<p>En el camino a Emaús, Jesús les abre <em>"el entendimiento para que comprendiesen las Escrituras"</em> <span class="ref-chip">Lc 24:13-35</span> y les demuestra que <em>toda</em> la ley, los profetas y los salmos <em>hablaban de él</em>. El mismo Jesús les da el método correcto para leer la Biblia entera: <em>todo apunta al Rey crucificado y resucitado</em>.</p></div>
</div>
<h3>${ICONS.heart} Pentecostés y el tiempo de la Iglesia</h3>
<p>Diez días después de la ascensión, llega Pentecostés <span class="ref-chip">Hch 2</span>: el Espíritu derramado sobre toda carne, tres mil almas añadidas, el evangelio anunciado en todas las lenguas del Imperio. Los cuarenta días explicados <em>intelectualmente</em> a los once, se hacen, en Pentecostés, una <em>realidad encarnada</em> en la primera comunidad cristiana. Desde ese día, el <span class="kw kw-rey">Reino</span> ya no está <em>ligado</em> al cuerpo físico de Jesús caminando por Galilea: está <strong>extendido</strong> en el cuerpo de la Iglesia, llena del mismo Espíritu que levantó al Señor de los muertos.</p>
</div>`,
  },
  {
    id: 11,
    title: "La Misión Global del Reino",
    question: "¿Qué papel tienen Israel, las naciones y la comunidad?",
    color: "#3D6B8C",
    icon: stationIcons[11],
    synthesis: `<div class="syn-block" style="--card-color:#3D6B8C">
<div class="big-num">12</div>
<h3>${ICONS.shuffle} Ampliado, no reemplazado</h3>
<p>Israel <strong>no es reemplazado</strong> como pueblo del <span class="kw kw-sello">pacto</span>, sino <span class="kw kw-foco">ampliado y transformado</span>. La comunidad de discípulos que la tradición ha llamado Iglesia <em>no</em> es un <em>plan B</em> que Dios sacó de la manga cuando Israel rechazó a su Mesías. Es, más bien, el <em>cuerpo del Rey</em> resucitado: la extensión <em>corporativa</em> de su reinado sobre la tierra, que incluye tanto israelitas como <strong>naciones enteras</strong> de todo el planeta.</p>
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
<p>En Mateo 28:16-20, Jesús reúne a los once en Galilea y les entrega la <em>gran comisión</em> — el único mandato global y permanente que la Iglesia tiene para toda la historia. Tiene <em>tres verbos imperativos</em> no negociables:</p>
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
<p>El Espíritu Santo es el <strong>poder del Reino presente</strong> en ausencia del Rey corporal. Pentecostés es la demostración pública de que el reinado continúa operando con autoridad, pero ya <em>no mediado por un cuerpo individual en Galilea</em>, sino por un cuerpo colectivo de testigos: Judíos y samaritanos, esclavos y libres, varones y mujeres, griegos y bárbaros. <em>Todo el edificio juntamente crece en templo santo para el Señor</em>.</p>
</div>
<div class="feature-card" style="border-left-color:#3D6B8C;"><span class="fc-tag" style="color:#3D6B8C">${ICONS.book} · El Buen Samaritano</span>
<h4>Prójimo = Todo ser humano</h4>
<p>Jesús respondió a la pregunta <em>"¿Quién es mi prójimo?"</em> con la parábola del Buen Samaritano <span class="ref-chip">Lc 10:25-37</span>. El prójimo no es el <em>de mi tribu</em>, ni el <em>de mi religión</em>, ni el <em>que me cae bien</em>: es <strong>cualquier ser humano que necesite misericordia</strong>. Por eso la misión es <em>global</em> por definición: no hay <em>excluidos</em> del alcance geográfico o étnico del Reino.</p>
</div>
</div>
</div>`,
  },
  {
    id: 12,
    title: "La Consumación Final",
    question: "¿Cómo culmina el Reino?",
    color: "#4A3B5C",
    icon: stationIcons[12],
    synthesis: `<div class="syn-block" style="--card-color:#4A3B5C">
<div class="big-num">13</div>
<h3>${ICONS.sunrise} Plena Manifestación: Lo que ya es, se hace visible</h3>
<p>El <span class="kw kw-rey">Reino</span> ya <em>inaugurado</em> en la cruz, la resurrección y la ascensión será <strong>plenamente manifestado</strong> en la segunda venida del Rey. Este es el final narrativo esperado por <em>toda</em> la Escritura: segunda venida, juicio final, resurrección de todos los muertos, renovación cósmica y la entrega final del Reino al Padre. No es un <em>apéndice</em>; es la <span class="kw kw-foco">meta misma</span> de toda la historia.</p>
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
<p>El criterio del juicio final no es <em>pertenencia étnica</em>, ni <em>intelectual</em>, ni <em>religiosa</em>. Es la <em>encarnación práctica del Reino</em> en la vida cotidiana: tuviste hambre y me diste de comer, tuve sed y me diste de beber, fui forastero y me recogiste <span class="ref-chip">Mt 25:34-46</span>.</p>
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
  { n: 14, e: "Parábola de los Labradores Malvados", r: "Mt 21:33-46; Mc 12:1-12; Lc 20:9-19", f: "Traspaso del Reino de Israel a nuevos productores — la viña pasa del fruto malo a la Iglesia", s: 2 },
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
    { h: "💡 Solución: Gracia por la fe", t: "Metanoia + Pistis + Nuevo nacimiento + dependencia infantil. Nada de lo humano, todo lo divino." },
    { h: "🧭 Comprensión: ¿Qué es la salvación?", t: "No es transacción jurídica solamente. Es regeneración, reorientación radical de la percepción." },
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
    { h: "🧭 Comprensión: La Iglesia", t: "No es un edificio o una institución, sino el cuerpo extendido del Rey. Tiempo, sazones y misión." },
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
    .on("click", (e, d) => showStationDetail(d.id));

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
    .text((d) => d.id);

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
  tooltip.innerHTML = `<div class="tt-num">${d.id === 0 ? "★ CENTRO" : "Estación " + d.id}</div><div class="tt-title">${d.icon} ${d.title}</div><div class="tt-question">${d.question}</div><div class="tt-count"><b>${count}</b> evento${count !== 1 ? "s" : ""}</div><div class="tt-hint">Click para explorar →</div>`;
  tooltip.classList.add("visible");
  requestAnimationFrame(() => positionGraphTooltip(event, tooltip));

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

function showStationDetail(stationId) {
  const station = getStation(stationId);
  if (!station) return;

  const pageView = document.getElementById("pageView");
  if (!pageView) return;

  pageView.classList.add("active");
  document
    .querySelectorAll(".intro, .toolbar, .chip-row")
    .forEach((el) => el?.classList.add("hidden-by-page"));
  document.getElementById("graphView").classList.remove("active");
  document.getElementById("stationsGrid").classList.remove("active");

  const scrollToDetail = () => {
    const header = document.querySelector(".app-header");
    const headerH = header ? header.offsetHeight : 0;
    const pageNav = document.getElementById("pageNav");
    const target = pageNav
      ? pageNav.getBoundingClientRect().top + window.scrollY - headerH - 4
      : 0;
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
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".detail-panel")
    .forEach((panel) => panel.classList.remove("active"));
  document
    .querySelector('.detail-tab[data-tab="synthesis"]')
    .classList.add("active");
  document.getElementById("tabSynthesis").classList.add("active");

  if (!tabListenersSetup) {
    document.querySelectorAll(".detail-tab").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tabName = e.target.closest("button").dataset.tab;
        document
          .querySelectorAll(".detail-tab")
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelectorAll(".detail-panel")
          .forEach((p) => p.classList.remove("active"));
        e.target.closest("button").classList.add("active");
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
    .querySelectorAll(".intro, .toolbar, .chip-row")
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
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".ref-chip, .ref-hoverable, .ref-tooltip")) closeRefTooltip();
  });
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
    ".station-card",
  ];
  let i = 0;
  container.querySelectorAll(selectors.join(",")).forEach((el) => {
    if (el.classList.contains("reveal") || el.classList.contains("reveal-scale") ||
        el.classList.contains("reveal-left") || el.classList.contains("reveal-right")) return;
    const tag = el.tagName.toLowerCase();
    let cls = "reveal";
    if (tag === "blockquote") cls = "reveal-scale";
    else if (el.classList.contains("tl-item")) cls = "reveal-left";
    else if (el.classList.contains("theo-cell")) cls = "reveal";
    else if (el.classList.contains("station-card")) cls = "reveal reveal-scale";
    el.classList.add(cls);
    const delay = i % 5;
    if (delay > 0) el.classList.add(`reveal-delay-${Math.min(delay, 4)}`);
    i++;
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
      <div class="sc-head"><div class="sc-num">${s.id}</div><div><div class="sc-title">${s.icon} ${s.title}</div></div></div>
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
    document.getElementById("toggleGrid").classList.remove("active");
    if (typeof d3 !== "undefined" && !simulation) {
      setTimeout(initGraph, 50);
    }
  });

  document.getElementById("toggleGrid")?.addEventListener("click", () => {
    document.getElementById("graphView").classList.remove("active");
    document.getElementById("stationsGrid").classList.add("active");
    document.getElementById("toggleGraph").classList.remove("active");
    document.getElementById("toggleGrid").classList.add("active");
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

if (fontSizeToggle) {

  fontSizeToggle.addEventListener("click", (e) => {

    if (e.target.classList.contains("font-size-btn")) {

      const size = e.target.dataset.size;

      const proseEl = document.getElementById("synthesisContent");

      if (proseEl) {

        fontSizeToggle.querySelectorAll(".font-size-btn").forEach(btn => btn.classList.remove("active"));

        e.target.classList.add("active");

        const sizes = { sm: "0.9em", md: "1.05em", lg: "1.2em" };

        proseEl.style.fontSize = sizes[size] || "1.05em";

      }

    }

  });

}
    
    const savedSize = localStorage.getItem("fontSizePreference") || "medium";
    const proseEl = document.getElementById("synthesisContent");
    proseEl.classList.remove("size-small", "size-medium", "size-large");
    proseEl.classList.add(`size-${savedSize}`);
    document.querySelector(`[data-size="${savedSize}"]`)?.classList.add("active");
  }

  initCinematicScroll();
  initRevealObserver();
  applyReveals();

  console.log("✓ Atlas Teológico v4.0 ¡LISTO!");
  console.log(`  • ${STATIONS.length} estaciones cargadas`);
  console.log(`  • ${EVENTS.length} enseñanzas bíblicas`);
  console.log(`  • ${CROSS_LINKS.length} conexiones entre estaciones`);

  // Fix: logo/brand lleva al inicio (listener en document, delegado al #brandHome)
  document.addEventListener("click", (e) => {
    if (e.target.closest("#brandHome")) {
      if (document.getElementById("pageView").classList.contains("active")) {
        backToAtlas();
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
