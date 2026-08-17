# AUDITORÍA UX/UI Y ACCESIBILIDAD — Atlas Teológico del Reino

**Alcance:** análisis de código y estructura, sin ejecución en navegador (a petición del solicitante). Los puntos que solo pueden confirmarse observando la app en marcha se marcan `[NO VERIFICADO — requiere prueba manual]` en vez de darse por buenos o por malos.

**Nota metodológica:** la plantilla original de referencia está escrita para una app con Chat/IA + Biblia + Comentario + Fuentes documentales. El Atlas del Reino no tiene chat ni backend: es una app de **lectura/exploración** de 13 estaciones con dos vistas (grafo interactivo y cuadrícula), buscador, filtros y detalle por estación con tres pestañas (síntesis, teología, evidencias). Las secciones sobre chat/IA/RAG/fuentes documentales de la plantilla se adaptan o se marcan **NO APLICA** con justificación.

---

## 1. Resumen ejecutivo

La navegación de la app es simple y predecible: Atlas (grafo o cuadrícula) → detalle de estación → volver. El trabajo de accesibilidad ya hecho es sólido para lo habitual en un proyecto de este tamaño (foco visible consistente, `prefers-reduced-motion`, nodos del grafo navegables por teclado con `Enter`/`Espacio`, paneles que cierran con `Escape` y devuelven el foco). El problema UX más importante confirmado es la **desincronización entre el buscador y la vista de grafo** (que es la vista por defecto): buscar mientras se está en el grafo actualiza un contador de resultados pero no cambia nada visible en el propio grafo, lo cual rompe la expectativa básica de "busco → veo el resultado". El segundo problema es de **descubribilidad**: no hay onboarding ni indicación visual de que el grafo es interactivo (arrastrable, con zoom, con detalle al clicar) más allá de un tooltip que solo aparece al pasar el ratón.

## 2. Estado actual

Inventario de superficies de la aplicación (todo confirmado por lectura de `index.html`/`app.js`):

| Pantalla/sección | Propósito | Acciones disponibles | Destinos | Estado |
|---|---|---|---|---|
| Intro (`.intro`) | Presentación, gancho editorial | Scroll | Mapa/Atlas | Estático |
| Mapa del argumento (`#mapArg`) | Resumen de las 13 estaciones en orden | Scroll, posible click a estación | Detalle de estación | [NO VERIFICADO si es clicable] |
| Toolbar (buscador + toggle vista + chips filtro) | Controlar qué se ve en el Atlas | Escribir, cambiar vista, filtrar por estación | Grid/Grafo | Interactivo |
| Vista Grafo (`#graphView`, por defecto) | Explorar relaciones entre estaciones | Drag, zoom, click/Enter en nodo, hover tooltip | Detalle de estación | Interactivo, D3 |
| Vista Cuadrícula (`#stationsGrid`) | Listado tipo tarjetas | Click en tarjeta, búsqueda resalta texto | Detalle de estación | Interactivo |
| Detalle de estación (`#pageView`) | Contenido de una estación: 3 niveles | Tabs (síntesis/teología/evidencias), navegar a estación prev/next, volver | Atlas | Interactivo |
| Panel Glosario | Consulta de términos clave | Abrir/cerrar (botón + Escape) | — | Interactivo, popover |
| Panel Calibración epistemológica | Explica niveles de certeza A-F | Abrir/cerrar (botón + Escape) | — | Interactivo, popover |
| Footer | Cierre visual | Ninguna acción | — | Estático |

## 3. Mapa de navegación

```
Atlas (vista Grafo ⇄ vista Cuadrícula, toggle role=tablist)
├── Buscar (afecta a Cuadrícula; NO afecta visualmente al Grafo — confirmado)
├── Filtrar por estación (chips, afecta a ambas vistas — confirmado en renderChips/highlightGraphNode)
├── Glosario (popover, independiente de la vista)
├── Calibración A-F (popover, independiente de la vista)
└── Click/Enter en nodo o tarjeta
    └── Detalle de Estación (pageView)
        ├── Tab Síntesis
        ├── Tab Teología
        ├── Tab Evidencias
        ├── ← Estación anterior / Estación siguiente →
        └── Volver al Atlas (backToAtlas())
```

No existen rutas URL distintas por estación [CONFIRMADO — no hay manejo de `history.pushState` ni hash routing en `app.js`]: recargar la página siempre vuelve al Atlas, y no se puede compartir un enlace directo a una estación concreta. Esto es una limitación de deep-linking, no un error.

**Rutas difíciles de descubrir:** el hecho de que el grafo sea arrastrable y con zoom no tiene ninguna pista visual (cursor, icono, texto) más allá de descubrirlo por accidente o por el tooltip al pasar el ratón sobre un nodo.

**Callejón sin salida:** ninguno confirmado — `backToAtlas()` y navegación prev/next cubren el detalle de estación.

## 4. Arquitectura de información

La agrupación es coherente con el modelo mental esperado: "explorar visualmente" (grafo) vs. "explorar en lista" (cuadrícula) son dos formas de la misma tarea, correctamente presentadas como pestañas del mismo `tablist` (`index.html:148-182`), no como secciones separadas. Los tres niveles de cada estación (histórico-literario / interpretación NT / lectura canónica) se mapean 1:1 a las tres tabs del detalle (Síntesis/Teología/Evidencias) — nomenclatura consistente con la metodología descrita en `claude.md`.

Punto de fricción: el Glosario y la Calibración A-F están en la toolbar principal, al mismo nivel visual que Buscar y el toggle de vista — funcionalmente son "ayuda contextual", no "controles de navegación del Atlas", y comparten espacio con ellos. No es grave, pero mezcla dos categorías de acción distintas en la misma barra.

## 5. Task flows

**Tarea: "Consultar la lectura teológica de la estación 5"**
1. Cargar la app → aparece vista Grafo por defecto.
2. Localizar visualmente el nodo 5 (sin lista textual visible salvo al hacer hover).
3. Click o Enter sobre el nodo → abre detalle de estación.
4. Click en tab "Teología" (por defecto se abre en "Síntesis", `aria-selected="true"` en `index.html:302-304`).
Pasos: 4. Sin pasos innecesarios. Fricción: paso 2 requiere reconocer visualmente el nodo correcto sin una lista de apoyo simultánea.

**Tarea: "Buscar un evento o palabra concreta"**
1. Escribir en el buscador (visible siempre en la toolbar).
2. **Si se está en vista Grafo:** el contador de resultados aparece, pero el grafo no cambia — el usuario no tiene forma visual de saber cuáles de los nodos coinciden. **Fricción real y confirmada.**
3. Si se cambia a vista Cuadrícula, ahí sí se ve el resaltado y el filtrado (`applyFilterAndSearchToGrid`).
Pasos mínimos si el usuario ya sabe que debe cambiar a cuadrícula: 3. Pasos reales para un usuario nuevo que empieza en el grafo: indeterminados, con alta probabilidad de abandono o confusión en el paso 2.

**Tarea: "Volver a la estación anterior tras leer el detalle"**
1. Click en flecha "anterior" dentro de `pageView` (`index.html:272-275`).
Pasos: 1. Sin fricción confirmada.

**Tarea: "Entender qué significa el nivel de certeza C junto a una afirmación"**
1. Localizar el botón de Calibración A-F en la toolbar.
2. Click para abrir el panel.
3. Leer la leyenda.
4. Cerrar (click fuera, botón, o Escape).
Pasos: 4. Fricción: el botón no tiene etiqueta de texto visible, solo icono (`aria-controls="epiLegendPanel"`, sin texto adyacente confirmado) — depende del `aria-label`/tooltip nativo del `title` para transmitir su propósito a un usuario vidente que no use lector de pantalla. [NO VERIFICADO si tiene `title` — no se encontró en el fragmento leído].

**Tarea: "Filtrar el Atlas para ver solo una estación"**
1. Click en el chip de esa estación.
Pasos: 1. Sin fricción — `filterByStation` actualiza chips, grid y grafo (`highlightGraphNode`) de forma coherente entre vistas — a diferencia del buscador, el filtro por chip **sí está sincronizado entre ambas vistas** [CONFIRMADO, `app.js:859-880` referencia `renderChips`+grafo].

**Tarea: "Cambiar el tamaño de texto"**
1. Localizar el control de tamaño de fuente (mencionado en trabajo previo del proyecto, persistido en `localStorage`).
2. Cambiar.
Pasos: 2. Persiste entre sesiones — fortaleza confirmada (`app.js:1045,1049`).

**Tarea: "Empezar a explorar sin saber nada de la app" (usuario nuevo)**
Ver sección 26 (Prueba del usuario nuevo) — ahí se detalla con más profundidad.

**Tarea: "Leer el argumento completo en 13 pasos antes de profundizar"**
1. Scroll a `#mapArg` desde la intro.
Pasos: 1 (scroll). [NO VERIFICADO si los 13 pasos del mapa son clicables hacia su estación correspondiente — no se confirmó en el código leído; si no lo son, es una oportunidad perdida de acceso directo].

**Tarea: "Recuperar el filtro/búsqueda tras recargar la página"**
1. Recargar.
2. Resultado: se pierde el filtro y la búsqueda (no persistidos en `localStorage` ni en URL — solo el tamaño de fuente persiste).
Fricción: confirmada pérdida de estado tras recarga, para cualquier cosa que no sea el tamaño de fuente.

**Tarea: "Usar la app solo con teclado, de principio a fin"**
Ver sección 8 (Keyboard-first audit).

## 6. Problemas críticos

| ID | Problema | Evidencia |
|---|---|---|
| PC1 | Buscador no filtra visualmente la vista Grafo (por defecto) | `app.js:882-940` vs `777-831` |
| PC2 | Pérdida de filtro/búsqueda al recargar | Solo `fontSizePreference` en `localStorage`, confirmado |

## 7. Accesibilidad

Formato de la plantilla: CUMPLE OBSERVABLEMENTE / NO CUMPLE / RIESGO / NO VERIFICABLE.

| # | Criterio | Estado | Evidencia |
|---|---|---|---|
| 1 | Contraste | NO VERIFICABLE sin herramienta | Paleta tonal reciente no medida en esta auditoría |
| 2 | Tamaño de texto | CUMPLE OBSERVABLEMENTE | Selector de tamaño de fuente propio, persistido |
| 3 | Jerarquía de headings | CUMPLE OBSERVABLEMENTE | `<h1>` en intro, `<h2>` en mapa del argumento y título de página (`index.html:106,121,290`) |
| 4 | Semantic HTML | CUMPLE OBSERVABLEMENTE | `header`/`nav`/`main`/`footer`/`section` presentes |
| 5 | ARIA | CUMPLE OBSERVABLEMENTE (con matiz) | Amplio uso correcto; falta roving tabindex en tabs (ver PI en general) |
| 6 | Labels | CUMPLE OBSERVABLEMENTE | `aria-label` en buscador, regiones, nav |
| 7 | Inputs | CUMPLE OBSERVABLEMENTE | Input de búsqueda con `aria-label="Buscar en el atlas"` |
| 8 | Buttons | CUMPLE OBSERVABLEMENTE | Botones reales (no divs falsos) para acciones principales |
| 9 | Links | NO VERIFICABLE | No se auditaron enlaces salientes específicos (referencias bíblicas) en profundidad |
| 10 | Keyboard navigation | CUMPLE OBSERVABLEMENTE (parcial) | Grafo: sí (`tabindex`, `keydown`); tabs: solo Tab nativo, sin flechas |
| 11 | Focus visible | CUMPLE OBSERVABLEMENTE | `:focus-visible` centralizado y amplio |
| 12 | Focus order | NO VERIFICADO — requiere prueba manual | Orden DOM parece lógico pero no se ha recorrido en navegador |
| 13 | Modals | CUMPLE OBSERVABLEMENTE (son popovers, no modales bloqueantes) | `setupPanelToggle`, cierre con Escape + devolución de foco |
| 14 | Dialogs | NO APLICA | No hay `<dialog>` ni modal bloqueante en la app |
| 15 | Screen readers | NO VERIFICADO — requiere prueba manual | Marcado correcto sobre el papel, sin prueba real |
| 16 | Error messages | RIESGO | No se encontró manejo de "sin resultados" fuera de la cuadrícula (`.no-results`, `app.js:820-830`) — el grafo no tiene equivalente |
| 17 | Form validation | NO APLICA | No hay formularios de envío de datos |
| 18 | Touch targets | NO VERIFICADO — requiere medición en DevTools móvil | Chips y botones de icono pequeños, tamaño no medido |
| 19 | Reduced motion | CUMPLE OBSERVABLEMENTE | Tres bloques `@media (prefers-reduced-motion: reduce)` confirmados |
| 20 | Dependencia del color | RIESGO | Estado activo de chips se comunica principalmente por color de fondo (`app.js:842,852`) |
| 21 | Estados visuales | CUMPLE OBSERVABLEMENTE (parcial) | `.hidden`, `.highlight`, `.active`, `.open` bien definidos en CSS/JS |
| 22 | Lectura de contenido largo | NO VERIFICADO | No se midió longitud real de bloques de texto teológico |
| 23 | Zoom | NO VERIFICADO — requiere prueba manual | No se probó zoom del navegador al 200%+ |
| 24 | Responsive accessibility | CUMPLE OBSERVABLEMENTE (parcial) | Buena cobertura de breakpoints; grafo táctil no verificado |

## 8. Keyboard UX

Recorrido de código (sin ejecución real, por restricción del encargo):

- **TAB en toolbar:** buscador → toggle vista → chips de filtro — orden DOM lógico, sin `tabindex` negativo detectado que rompa el flujo.
- **TAB en vista Grafo:** cada nodo tiene `tabindex="0"` (`app.js:105`) — foco secuencial por todos los nodos, sin agrupación por roving tabindex (aceptable para esta cantidad de nodos, 13-14).
- **ENTER/SPACE en nodo:** confirmado, abre detalle (`app.js:126-131`).
- **ESC en paneles (Glosario/Calibración):** confirmado, cierra y devuelve foco al botón (`app.js:644-649`).
- **Tabs de estación (Síntesis/Teología/Evidencias):** alcanzables con Tab, activables con Enter/Space (comportamiento nativo de `<button>`), pero sin `ArrowLeft`/`ArrowRight` como indica el patrón WAI-ARIA APG para tabs — no roto, pero no idiomático para usuarios que esperan ese patrón.
- **Focus atrapado:** no se encontró ningún `trapFocus` ni gestión de foco cíclico — no es necesario porque no hay modales bloqueantes, solo popovers.
- [NO VERIFICADO — requiere prueba manual] Si el foco salta de forma inesperada al abrir/cerrar la vista de detalle de estación (`showStationDetail`/`backToAtlas`) — el código no muestra gestión explícita de `.focus()` en esas dos funciones más allá de lo visto; posible pérdida de foco al navegar. Marcar para verificación manual antes de dar por bueno.

## 9. Mobile UX

[NO VERIFICADO — requiere prueba manual en dispositivo o emulador] No se ha cargado la app en un viewport móvil real durante esta auditoría (restricción de "no ejecutar nada"). Lo que sí se puede afirmar por código:

- Existen reglas específicas para 360px y 400px (`style.css`), señal de que se ha probado en gama baja en algún momento.
- El grafo D3 usa `d3.drag()` y `d3.zoom()` — estas interacciones táctiles requieren verificación específica: el drag de un nodo puede entrar en conflicto con el scroll de la página en móvil si no se maneja `touch-action` explícitamente. [NO VERIFICADO si `touch-action` está definido en CSS para `.graph-node`/`svg`].
- Los chips de filtro usan `overflow-x: auto` (`style.css:606`) — patrón correcto para una fila de chips en móvil (scroll horizontal contenido, no rotura de layout).

## 10. Responsive

Cobertura de breakpoints confirmada (ver auditoría general, sección 9) — 14 media queries, buena cobertura de gama baja. Sin verificación visual real de overflow o elementos cortados en esta auditoría (requeriría captura en navegador, fuera del alcance pedido).

## 11. Chat UX

**NO APLICA.** No existe chat en este proyecto.

## 12. Historial

**NO APLICA en el sentido de "conversaciones".** El equivalente más cercano — recordar dónde se quedó el usuario — no existe: no hay historial de estaciones visitadas ni forma de "continuar donde lo dejé" más allá de la memoria del propio usuario. Es una ausencia real pero de bajo impacto dado que el contenido es finito (13 estaciones) y no conversacional.

## 13. Fuentes y referencias

Desde UX puro (sin evaluar exactitud teológica, fuera de alcance):
- Existen tooltips de referencia (`setupRefTooltips`, `openRefTooltip`, `app.js:483-565`) que permiten ver una referencia sin perder el contexto de lectura — buen patrón, evita navegación destructiva.
- [NO VERIFICADO] Si las referencias son además clicables hacia un destino externo (ej. Bible Gateway) o solo muestran tooltip — el código muestra apertura/cierre de tooltip pero no confirma un link de salida en el fragmento auditado.

## 14. Descubribilidad

- El grafo interactivo (drag, zoom, click) no tiene ninguna pista visual permanente de que se puede manipular — solo se revela al interactuar por accidente o al leer el tooltip tras hacer hover en un nodo. **Oportunidad de mejora real.**
- Los botones de Glosario y Calibración A-F son iconos sin etiqueta de texto visible junto al icono (solo `aria-label` para lectores de pantalla) — un usuario vidente nuevo puede no saber qué hacen sin pasar el ratón por encima (si tienen `title`) o sin hacer click por curiosidad.
- El toggle de vista Grafo/Cuadrícula sí es descubrible: usa el patrón estándar de pestañas, reconocible.

## 15. Feedback y estados

| Acción | ¿Hay feedback? | Evidencia |
|---|---|---|
| Click en nodo/tarjeta | Sí, navega inmediatamente | `showStationDetail` |
| Búsqueda con resultados | Sí (parcial — ver PC1) | `resultHint` con conteo |
| Búsqueda sin resultados en cuadrícula | Sí | `.no-results` (`app.js:820-830`) |
| Búsqueda sin resultados en grafo | No | Confirmado ausente |
| Abrir/cerrar panel | Sí | `aria-expanded` + clase `.open` |
| Cambio de tamaño de fuente | [NO VERIFICADO] | No se auditó el handler en detalle en esta pasada |
| Carga inicial de la app | [NO VERIFICADO] | No se detectó ningún estado de "cargando" explícito antes de que D3 estabilice el grafo — probablemente instantáneo dado que no hay red de por medio salvo la carga del propio script D3 |

## 16. Consistencia visual

No se detectaron inconsistencias evidentes en la lectura de código: los estados `.active`/`.open`/`.hidden`/`.highlight` se usan de forma predecible en todo `app.js`. La escala tonal de 4 valores (trabajo reciente) da un sistema de color coherente a nivel de fondo/superficie.

## 17. Carga cognitiva

- Vista Grafo: MEDIA — 13-14 nodos simultáneos con relaciones visuales, apropiado para el propósito de "ver el mapa completo", pero exige cierto esfuerzo de lectura visual inicial.
- Vista Cuadrícula: BAJA — lista lineal, más fácil de escanear secuencialmente.
- Detalle de estación: BAJA-MEDIA — tres tabs claramente separadas evitan mostrar todo el contenido a la vez.
- Toolbar: BAJA — pocos controles, bien agrupados.

## 18. Error recovery

- IA tarda / IA falla: **NO APLICA** (no hay IA).
- Búsqueda vacía: manejado (`term.length < 2` oculta el hint, `app.js:899`).
- Fuente/estación inexistente: [NO VERIFICADO] — no se confirmó qué ocurre si `stationId` no existe en `getStation` (`app.js:19`); no se ve una guarda explícita contra `undefined`.
- Recarga: vuelve al Atlas por defecto (pierde filtro/búsqueda, conserva tamaño de fuente) — comportamiento consistente aunque con pérdida de estado (ver PC2).
- D3 no carga: **sin manejo — ver hallazgo crítico en auditoría general (C1/M01).**

## 19. Propuesta de pestaña "Comentario"

**No aplica tal cual la plantilla la plantea** (asume Biblia + Comentario + Chat). Ver la adaptación completa en `AUDITORIA_GENERAL_TECNICA.md`, sección 19: la evolución natural para este proyecto es un sistema de **notas personales por estación**, no una pestaña de comentario bíblico versículo a versículo.

## 20. 40+ mejoras

Continuación numerada desde la auditoría general (M01-M31) para no duplicar — nuevas específicas de UX/UI/Accesibilidad:

| ID | Título | Problema | Evidencia | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|---|---|---|
| U01 | Sincronizar highlight del grafo con la búsqueda de texto | Buscar no resalta nodos coincidentes | `app.js:882-940` | Alto | Medio | P0 |
| U02 | Indicio visual permanente de que el grafo es arrastrable/zoomable | Sin pista salvo hover accidental | Confirmado, sin overlay de ayuda | Alto | Bajo | P1 |
| U03 | Añadir etiqueta de texto visible junto a iconos de Glosario/Calibración | Solo icono + aria-label | `index.html:60-95` | Medio | Bajo | P1 |
| U04 | Estado "sin resultados" también en vista Grafo | Solo existe en cuadrícula | `app.js:820-830` vs sin equivalente en grafo | Medio | Medio | P1 |
| U05 | Persistir filtro/búsqueda en la URL (query string) | Se pierde todo al recargar salvo tamaño de fuente | Confirmado | Medio | Medio | P2 |
| U06 | Roving tabindex + flechas en tabs (Atlas y estación) | Patrón ARIA de tabs incompleto | `index.html:148-182,297-336` | Medio | Bajo | P1 |
| U07 | Verificar gestión de foco al abrir/cerrar detalle de estación | No se ve `.focus()` explícito en `showStationDetail`/`backToAtlas` | `app.js:299,454` | Alto | Bajo | P1 (verificar primero) |
| U08 | `touch-action` explícito en el SVG del grafo | Riesgo de conflicto drag-vs-scroll en móvil | No confirmado en CSS | Alto | Bajo | P1 (verificar primero) |
| U09 | Indicador no-solo-color para chip activo | Depende de color de fondo | `app.js:842,852` | Medio | Bajo | P1 |
| U10 | Confirmar si los 13 pasos de `#mapArg` son clicables a su estación | Posible oportunidad de acceso directo no aprovechada | No confirmado | Medio | Bajo | P2 (verificar primero) |
| U11 | `title`/tooltip nativo en botones de icono sin texto | Ayuda a usuarios sin lector de pantalla que dudan del icono | `index.html:60-95` | Bajo | Bajo | P2 |
| U12 | Medir contraste real de texto sobre fondo "mesa" oscuro (Bloque 3) | No medido | `style.css` (paleta tonal) | Alto | Bajo | P0 (verificar) |
| U13 | Loading sutil durante estabilización de la simulación D3 | Pequeño "salto" inicial de los nodos | `app.js:193` | Bajo | Bajo | P3 |
| U14 | Confirmar comportamiento de `getStation` ante id inexistente | Sin guarda visible | `app.js:19-21` | Bajo | Bajo | P2 |
| U15 | Prueba real con lector de pantalla en flujo completo | Solo verificado el marcado, no el comportamiento real | — | Alto | Medio | P1 |
| U16 | Prueba real de zoom al 200%/400% del navegador | No verificado | — | Medio | Bajo | P2 |
| U17 | Medir tamaño de objetivo táctil de chips e iconos | No medido | — | Medio | Bajo | P1 |
| U18 | Onboarding ligero para primera visita (tooltip único, no intrusivo) | Sin ningún onboarding detectado | Confirmado ausente | Medio | Medio | P2 |
| U19 | Confirmar si referencias bíblicas en tooltip llevan a destino externo clicable | No confirmado en el fragmento leído | `app.js:483-565` | Bajo | Bajo | P3 (verificar) |
| U20 | Reducir dependencia visual del hover puro en el grafo (mostrar también al focus, ya cubierto parcialmente) | `on("focus", nodeMouseover)` ya existe — verificar que el tooltip se posiciona bien sin coordenadas de ratón | `app.js:124,233-238` (usa `event.clientX/Y`, puede fallar en focus por teclado sin evento de ratón) | Medio | Bajo | P1 (verificar) |

*(Nota: junto con las 31 mejoras M01-M31 de la auditoría general, el conjunto combinado supera las 40 mejoras solicitadas por la plantilla; se evita duplicar aquí las que ya son de accesibilidad general — M06, M10, M15, M16, M23, M24 de la auditoría general también cuentan como mejoras UX/accesibilidad de este informe.)*

## 21. Quick Wins

U03, U09, U11, U13, U14, U16 (solo medir), más los ya listados en la auditoría general (M07, M08, M10).

## 22. Mejoras de medio esfuerzo

U01, U04, U05, U15, U18.

## 23. Mejoras de alto esfuerzo

Ninguna identificada en esta auditoría que requiera rediseño grande — todas las mejoras UX encontradas son localizadas y no requieren tocar la arquitectura de navegación existente.

## 24. Lo que NO debemos cambiar

- El patrón de navegación grafo ⇄ cuadrícula como `tablist` — es correcto y reconocible, no cambiar por preferencia.
- El manejo de foco en popovers (Glosario/Calibración) con `Escape` + retorno de foco — ya sigue buenas prácticas.
- El sistema de tres niveles por estación (Síntesis/Teología/Evidencias) como tabs — mapea bien la metodología del proyecto, no rediseñar.
- La accesibilidad de teclado del grafo D3 (`tabindex`, `role="button"`, `aria-label`, Enter/Space) — ya está mejor resuelta que en la mayoría de grafos D3 interactivos; no tocar salvo para el ajuste puntual U20 (posicionamiento del tooltip vía teclado).
- No añadir un sistema de historial de "conversaciones" — no tiene sentido para un contenido finito de 13 estaciones; sería complejidad sin beneficio real.

## 25. Puntuación UX

| Aspecto | Puntuación |
|---|---|
| Descubribilidad | 5 |
| Navegación | 7 |
| Maniobrabilidad | 7 |
| UX general | 6 |
| UI | 8 |
| Accesibilidad | 7 |
| Keyboard UX | 7 |
| Mobile UX | No verificado (sin puntuar) |
| Responsive | 7 |
| Chat UX | N/A |
| Feedback | 6 |
| Consistencia | 8 |
| Carga cognitiva | 7 |
| Error recovery | 5 |
| Historial | N/A |
| Fuentes | 6 |
| Comentario (propuesta) | 6 (propuesta razonable, no implementada) |

**PUNTUACIÓN UX GLOBAL: 6.8/10** — sólida en consistencia visual y accesibilidad de teclado del componente más complejo (el grafo), penalizada principalmente por la desincronización buscador-grafo y la falta de pistas de descubribilidad en la interacción del grafo.

## 26. Prueba del usuario nuevo

Simulación mental basada en el código (sin ejecución real):

1. **Qué es la aplicación:** clara desde el primer momento — título y subtítulo en la intro explican el propósito ("13 estaciones... enseñanza de Jesús sobre el Reino de Dios").
2. **Qué puedo hacer:** parcialmente claro — veo un grafo de nodos, pero no hay instrucción de qué hacer con él más allá de la intuición de "algo clicable".
3. **Cómo empiezo:** tendría que **adivinar** que puedo hacer click en un nodo — no hay ningún texto tipo "haz click en una estación para explorarla".
4. **Cómo hago una pregunta:** no aplica — no hay chat, es contenido de lectura, esto podría confundir a alguien que llegue esperando un asistente conversacional (dado que "IA" y "teológico" a veces se asocian).
5. **Cómo encuentro un pasaje:** usaría el buscador — si estoy en la vista grafo (por defecto), **aquí adivinaría mal**: escribiría, vería un número de resultados, pero no sabría cuál nodo corresponde. Tendría que **adivinar** que debo cambiar a vista Cuadrícula.
6. **Cómo profundizo:** click en un nodo/tarjeta → tabs claras (Síntesis/Teología/Evidencias) — sin fricción aquí.
7. **Cómo regreso:** botón de volver visible — sin fricción.
8. **Cómo encuentro algo anterior:** no puedo — no hay historial ni URL por estación; tendría que recordar cuál estación era por su número/título.

**Momentos de "adivinar" registrados:** pasos 3 y 5 — ambos coinciden con los hallazgos PC1/U01/U02 de esta auditoría. Esto confirma, desde la simulación de usuario, que no son problemas teóricos sino puntos reales de fricción de primer uso.

## 27. Métricas UX

| Tarea | Pasos | Decisiones | Fricción |
|---|---|---|---|
| Ver detalle de una estación desde el grafo | 1-2 | Baja | Baja |
| Buscar un término estando en vista grafo | 2+ (con desvío obligado a cuadrícula) | Media-Alta | Alta |
| Buscar un término estando en vista cuadrícula | 1 | Baja | Baja |
| Filtrar por una estación | 1 | Baja | Baja |
| Volver a la estación anterior | 1 | Baja | Baja |
| Retomar una búsqueda tras recargar | No es posible directamente | — | Alta |

## 28. Matriz de problemas

| ID | Categoría | Pantalla | Problema | Severidad | Prioridad |
|---|---|---|---|---|---|
| PC1/U01 | Feedback | Vista Grafo | Búsqueda sin efecto visual | Alta | P0 |
| U02 | Descubribilidad | Vista Grafo | Interacción no anunciada | Alta | P1 |
| U07 | Accesibilidad | Detalle estación | Gestión de foco no confirmada | Alta (si falla) | P1 |
| U08 | Mobile | Vista Grafo | `touch-action` no confirmado | Alta (si falla) | P1 |
| U12 | Accesibilidad | Global | Contraste no medido | Alta (si falla) | P0 |
| U03 | Descubribilidad | Toolbar | Iconos sin etiqueta visible | Media | P1 |
| U09 | Accesibilidad | Toolbar | Estado activo solo por color | Media | P1 |
| PC2/U05 | Persistencia | Global | Pérdida de estado al recargar | Media | P2 |

## Roadmap recomendado

**FASE UX-1 — Quick Wins:** U03, U09, U11, U13, U14.

**FASE UX-2 — Navegación y maniobrabilidad:** U01/PC1 (sincronizar búsqueda-grafo), U02 (pista de interacción), U06 (roving tabs).

**FASE UX-3 — Accesibilidad:** U12 (medir contraste — bloqueante para dar por cerrado el trabajo de accesibilidad reciente), U07 y U08 (verificar antes de tocar nada), U15, U17.

**FASE UX-4 — Mobile/Responsive:** U08 (una vez verificado), prueba real en dispositivo.

**FASE UX-5 — Chat:** No aplica a este proyecto.

**FASE UX-6 — Comentario:** Explorar la propuesta de notas personales por estación (sección 19) solo si hay interés real, no es urgente.

**FASE UX-7 — Refinamiento visual:** U18 (onboarding ligero), U20 (tooltip vía teclado).

---

**Fin de la auditoría. No se ha modificado, ejecutado, implementado ni tocado ningún componente durante este proceso — solo lectura y análisis. Esperando instrucciones.**
