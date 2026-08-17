# ATLAS DEL REINO
# ROADMAP MAESTRO DE IMPLEMENTACIÓN

**Documento:** `NEXT_PHASE.md` · **Fase:** 3 — Síntesis y priorización · **Fecha:** 2026-08-17
**Fuentes primarias:** `AUDITORIA_GENERAL_TECNICA.md` (2026-08-17) · `AUDITORIA_UX_UI_ACCESIBILIDAD.md` (2026-08-17), ambas sobre el árbol local del proyecto (sin commit de referencia — repo `atlas-del-reino-V2.0`, rama `main`, sincronizada a `95fc0d5`).
**Fuente secundaria:** verificación en ejecución real — servidor estático local (`python -m http.server`) + navegador con inspección de consola, DOM, foco y contraste computado. Esta fase **sí ha ejecutado código**, a diferencia de las dos auditorías previas, precisamente para cerrar los puntos que ahí quedaron `[NO VERIFICADO]`.
**Destinatario:** Claude Code, como especificación de trabajo.

> **Esta fase no ha modificado ningún archivo de la aplicación.** Los únicos artefactos producidos son este documento y `.claude/launch.json` (configuración del servidor de previsualización, necesaria para poder ejecutar y verificar).

### Etiquetas usadas

| Etiqueta | Significado |
|---|---|
| **[GENERAL]** | Hallazgo aportado solo por `AUDITORIA_GENERAL_TECNICA.md` |
| **[UX]** | Hallazgo aportado solo por `AUDITORIA_UX_UI_ACCESIBILIDAD.md` |
| **[AMBAS]** | Presente en las dos; fusionado en una sola unidad de trabajo |
| **EJECUTADO** | Verificado en esta fase corriendo la app real en navegador — el nivel de evidencia más alto de este documento |
| **EVIDENCIA (código)** | Observado por lectura directa de código, en esta fase o en las anteriores |
| **INFERENCIA** | Deducción razonada a partir de la evidencia |
| **RECOMENDACIÓN** | Lo que debería hacerse |
| **REQUIERE VERIFICACIÓN** | Duda que sigue sin cerrarse tras esta fase |
| **REQUIERE DECISIÓN HUMANA** | No debe resolverse automáticamente |

---

## 1. Resumen ejecutivo

### Estado actual

Las dos auditorías coinciden en el diagnóstico de fondo: **el sitio está bien construido en su capa de accesibilidad de teclado y en su sistema visual, y funciona sin errores**. Verificado en esta fase: la app carga sin ningún error de consola, D3 v7 se resuelve correctamente desde CDN, los 13 nodos del grafo se generan con sus 17 conexiones y las 70 enseñanzas, no hay overflow horizontal a 375px, y el contraste de texto sobre el fondo "pliego" mide **12.81:1** — muy por encima del mínimo WCAG AA (4.5:1). El trabajo reciente de profundidad material y escala tonal no comprometió la legibilidad.

Lo que falla no es el motor visual. Es la **conexión entre lo que el usuario hace y lo que la app le muestra**: dos fallos de comportamiento, invisibles leyendo el código pero confirmados al ejecutarlo, rompen la sensación de control en los dos flujos más básicos de la app —buscar y navegar a una estación—.

### Problemas principales

Cinco, en orden de gravedad tras la verificación en ejecución:

1. **Buscar en la vista por defecto no hace nada visible.** [EJECUTADO] Con la app cargada en su estado inicial (vista Grafo), escribir "reino" produce `resultHint: "38 coincidencias"` en el DOM, pero la clase de los 13 nodos del grafo **no cambia ni un carácter** antes y después (`changed: false`, comparación exacta de `className`). El usuario ve un contador subir y nada más. [AMBAS, EJECUTADO]
2. **Abrir el detalle de una estación no mueve el foco ni la vista.** [EJECUTADO] Al activar un nodo con `Enter`, `pageView` pasa a `display:block` pero `document.activeElement` sigue siendo el nodo del grafo, que un instante después queda con `graphViewDisplay:"none"` — foco literalmente atrapado en un elemento con `getBoundingClientRect()` de `0,0,0,0`, invisible e inalcanzable. Además `pageView` renderiza a `top: 1618px` sin ningún scroll automático: en una pantalla normal, el usuario que activó el nodo no ve aparecer nada. Al volver con el botón "Atlas", el foco tampoco se devuelve a un elemento con sentido (queda en otro `<g>` sin identificar). Este hallazgo **no estaba en ninguna de las dos auditorías previas**: ambas lo marcaron `[NO VERIFICADO — requiere prueba manual]`, y la prueba manual lo confirma como fallo real. [NUEVO, EJECUTADO]
3. **El grafo no restringe el gesto táctil.** [EJECUTADO] `getComputedStyle(svg).touchAction === "auto"` — sin ninguna restricción, el `drag()`/`zoom()` de D3 sobre el SVG competirá con el scroll de la página en cualquier pantalla táctil. Confirma con medición lo que la auditoría UX solo podía señalar como riesgo. [UX, EJECUTADO]
4. **Dependencia externa sin red de seguridad.** [GENERAL] D3 se carga desde `d3js.org` sin `integrity` ni fallback; en esta ejecución cargó bien, pero eso no prueba nada sobre una caída futura del CDN — sigue siendo un punto único de fallo para la vista por defecto.
5. **Documentación y pruebas en cero.** [GENERAL] `README.md` vacío, sin ningún test — confirmado, sin cambios respecto a las auditorías previas.

**Lo bueno, confirmado y no solo inferido:** contraste de texto excelente (12.81:1), cero errores de consola, cero overflow horizontal en móvil, chips con contención de scroll correcta (`toolbar` desborda internamente, `body` no).

### Objetivo

Que la app pase de "visualmente cuidada y funcionalmente silenciosa en sus fallos" a "cada acción del usuario tiene una consecuencia visible e inmediata". Las dos fases de trabajo real (Fase 1) no tocan arquitectura ni contenido: son correcciones de comportamiento localizadas, todas de bajo riesgo y verificables con el mismo método usado aquí (ejecución real, no solo lectura).

### Estrategia general

**Dos fases**, mucho más ligeras que en un proyecto con backend — este es un sitio estático de tres archivos, no hay capa de servidor que endurecer ni coste que controlar:

- **FASE 1 — COMPORTAMIENTO.** Los cinco problemas principales de arriba, más los hallazgos de accesibilidad de teclado/color de las auditorías previas. Diez tareas, todas sin dependencias entre sí, todas de riesgo bajo.
- **FASE 2 — PULIDO Y DOCUMENTACIÓN.** Todo lo que mejora sin ser urgente: SEO técnico, testing mínimo, división de `style.css`, documentación.

De las **51 mejoras brutas** entre las dos auditorías (M01–M31 + U01–U20), entran **19 unidades de trabajo consolidadas** en este roadmap. El resto va a backlog o se descarta, con motivo en §9 y §10.

---

## 2. Principios de priorización

Igual que en el encargo original: cada hallazgo se reevalúa contra impacto, riesgo de no hacerlo, dependencias, esfuerzo, valor para el usuario y probabilidad de regresión. **P0** = rompe la experiencia básica de forma medible (los cinco de arriba). **P1** = debe resolverse antes de dar por cerrado el trabajo de accesibilidad ya iniciado. **P2** = mejora significativa no bloqueante. **P3** = refinamiento.

**Diferencia clave respecto al método de auditoría anterior:** en este documento, ningún hallazgo etiquetado **EJECUTADO** se ha vuelto a marcar `[NO VERIFICADO]` — donde la ejecución contradijo la sospecha (el contraste, el overflow horizontal), el hallazgo se retira o se degrada explícitamente en la sección 4.

---

## 3. Matriz consolidada de hallazgos

| ID | Fuente | Problema | Prioridad | Fase | Dependencias | Estado |
|----|--------|----------|-----------|------|---------------|--------|
| **P0-01** | [AMBAS, EJECUTADO] PC1/U01 | Buscar no afecta visualmente a la vista Grafo (por defecto) | P0 | 1 | — | IMPLEMENTAR |
| **P0-02** | [NUEVO, EJECUTADO] | Foco no gestionado al abrir/cerrar detalle de estación; sin scroll a la vista | P0 | 1 | — | IMPLEMENTAR |
| **P0-03** | [UX, EJECUTADO] U08 | `touch-action` sin restringir en el SVG del grafo | P0 | 1 | — | IMPLEMENTAR |
| **P0-04** | [GENERAL] M01/M27 | D3 cargado por CDN sin `integrity` ni fallback | P0 | 1 | — | IMPLEMENTAR |
| **P1-05** | [UX] U06 | Tabs de estación sin navegación por flechas (patrón ARIA incompleto) | P1 | 1 | — | IMPLEMENTAR |
| **P1-06** | [UX] U09 | Estado activo de los chips depende solo del color | P1 | 1 | — | IMPLEMENTAR |
| **P1-07** | [UX] U03 | Iconos de Glosario/Calibración sin etiqueta de texto visible | P1 | 1 | — | IMPLEMENTAR |
| **P1-08** | [UX] U04 | Sin estado "sin resultados" en la vista Grafo | P1 | 1 | P0-01 | IMPLEMENTAR |
| **P1-09** | [GENERAL] M07/M08 | Sin favicon ni `og:image` | P1 | 1 | — | IMPLEMENTAR |
| **P1-10** | [GENERAL] M10/M09 | Sin `robots.txt`, `sitemap.xml` ni skip link | P1 | 1 | — | IMPLEMENTAR |
| **P2-11** | [GENERAL] M03 | `README.md` vacío | P2 | 2 | — | IMPLEMENTAR |
| **P2-12** | [UX] U05 | Filtro/búsqueda no persisten al recargar | P2 | 2 | P0-01 | IMPLEMENTAR |
| **P2-13** | [GENERAL] M04 | Cero tests | P2 | 2 | — | IMPLEMENTAR |
| **P2-14** | [GENERAL] M13 | `style.css` en un único archivo de 3721 líneas | P2 | 2 | — | IMPLEMENTAR |
| **P2-15** | [GENERAL] M12/M14 | `onclick` inline; sin minificación | P2 | 2 | — | IMPLEMENTAR |
| **P2-16** | [UX] U18 | Sin onboarding ni pista de que el grafo es interactivo | P2 | 2 | — | IMPLEMENTAR |
| **P3-17** | [UX] U13/U20 | Loading sutil en estabilización del grafo; tooltip por foco de teclado sin coordenadas de ratón | P3 | 2 | — | IMPLEMENTAR |
| **P3-18** | [GENERAL] M17 | Documentar estructura de `STATIONS[]`/`EVENTS[]` en `data.js` | P3 | 2 | P2-11 | IMPLEMENTAR |
| **P3-19** | [GENERAL] M28 | Confirmar y limpiar los dos `.zip` de nombre anómalo en la raíz | P3 | 2 | — | REQUIERE DECISIÓN HUMANA |

### Resumen por estado

| Estado | Nº |
|---|---|
| **IMPLEMENTAR** | 18 |
| **REQUIERE DECISIÓN HUMANA** | 1 (P3-19) |
| **RESUELTO / DESCARTADO en la fusión** | 3 (ver §4) |
| **FUERA DE ALCANCE** (mantenido igual que en las auditorías previas) | Chat/IA/RAG — no existen en este proyecto |

---

## 4. Discrepancias y hallazgos cerrados por ejecución

### D1 · El contraste de la nueva paleta tonal — riesgo cerrado, no confirmado

**Lo que decían las auditorías.** Ambas marcaron `[NO VERIFICADO — requiere comprobación con contrast checker]` el contraste de texto sobre el fondo "pliego"/"pozo" del Bloque 3 reciente (mesa `#2E2318`, pliego `#FBF7EC`, pozo `#EFE7D5`).

**Estado real. EJECUTADO** — medido con `getComputedStyle` sobre la app real:

```
content-area background: rgb(239, 231, 213)   ("pozo")
texto de estación:       rgb(35, 32, 25)
ratio de contraste:      12.81:1
```

**Decisión.** El hallazgo se **retira como riesgo abierto**. 12.81:1 supera con holgura tanto AA (4.5:1) como AAA (7:1) para texto normal. No entra ninguna tarea de corrección de contraste en este roadmap — el trabajo del Bloque 3 no comprometió la accesibilidad de color pese a oscurecer el fondo exterior.

### D2 · Overflow horizontal en móvil — riesgo cerrado

**Lo que decía la auditoría UX.** `[NO VERIFICADO — requiere prueba manual]` sobre posible desbordamiento a 320-414px.

**Estado real. EJECUTADO**, viewport 375×812: `document.body.scrollWidth === window.innerWidth` (381 = 381). Sin overflow horizontal a nivel de página. La barra de chips sí desborda internamente (`toolbar.scrollWidth: 642` en un contenedor de 381px), que es el comportamiento **correcto**: es un contenedor con `overflow-x: auto` diseñado para eso, confirmado en el CSS.

**Decisión.** Se retira como riesgo. No entra tarea de corrección.

### D3 · El foco atrapado al abrir el detalle de estación — hallazgo nuevo, no anticipado

**Lo que decían las auditorías.** La auditoría UX marcó `[NO VERIFICADO — requiere prueba manual]` sobre si `showStationDetail`/`backToAtlas` gestionan el foco, con sospecha razonada mirando el código (sin llamadas explícitas a `.focus()`).

**Estado real. EJECUTADO** — la sospecha se confirma y es peor de lo anticipado: no es solo "no se mueve el foco a un elemento mejor", es que **el elemento que retiene el foco pasa a `display:none`** en su contenedor (`graphViewDisplay: "none"` con `activeElement` todavía apuntando a un nodo dentro de ese contenedor, `getBoundingClientRect()` en ceros). Para un usuario de teclado o lector de pantalla, la siguiente pulsación de Tab parte de un punto sin ninguna relación visual con lo que ve en pantalla.

Se suma un segundo defecto no registrado antes: `pageView` no recibe scroll automático al abrirse (renderiza a `top: 1618px` del documento) — un usuario que hace click con ratón tampoco ve el cambio si no hace scroll manualmente después.

**Decisión.** Pasa a **P0-02**, nueva en este documento, prioridad máxima junto con P0-01 por ser el mismo tipo de fallo (acción del usuario sin consecuencia visible) en el flujo más usado de la app.

### D4 · `touch-action` del grafo — de riesgo teórico a medición

**Lo que decía la auditoría UX.** Señalaba el riesgo de conflicto drag-vs-scroll en móvil por el uso de `d3.drag()`/`d3.zoom()`, marcado `[NO VERIFICADO si touch-action está definido]`.

**Estado real. EJECUTADO**: `getComputedStyle(svg).touchAction === "auto"`. Confirmado que no hay ninguna restricción — el navegador tratará cualquier arrastre sobre el grafo como candidato simultáneo a pan de página y a drag de D3, con el comportamiento dependiendo del navegador/dispositivo concreto.

**Decisión.** Pasa a **P0-03**, con solución de una línea de CSS.

---

## 5. FASE 1 — COMPORTAMIENTO

**Objetivo:** que cada acción del usuario en los dos flujos centrales (buscar, navegar a una estación) tenga una consecuencia visible e inmediata, y que el grafo sea seguro de usar con el dedo.

**Por qué va primera:** los cuatro P0 son fallos de comportamiento ya confirmados en ejecución, no hipótesis; ninguno depende de otro; ninguno toca contenido teológico ni arquitectura.

### P0-01 — Sincronizar el buscador con la vista Grafo

**Fuente:** [AMBAS, EJECUTADO]. Confirmado en §1 y §4 de este documento: 38 coincidencias reales, cero cambio en `className` de los 13 nodos.

**Problema.** `handleSearch` (`app.js:882-940`) calcula correctamente qué estaciones y eventos coinciden y actualiza `resultHint`, pero solo aplica el resultado visualmente a `.station-card` vía `applyFilterAndSearchToGrid` (`app.js:777-831`). El grafo, vista por defecto de la app, no tiene ningún código equivalente.

**Solución.** Dentro de `handleSearch`, cuando `term.length >= 2`, añadir una función paralela `applySearchToGraph(matchingStationIds)` que atenúe (`opacity` o clase `.dimmed`) los nodos que no coinciden, igual que ya hace `highlightGraphNode`/`clearGraphHighlight` para el filtro por chip — reutilizar ese mismo mecanismo en vez de crear uno nuevo.

**Archivos:** `app.js` (`handleSearch`, cerca de la línea 939, justo antes o después de la llamada a `applyFilterAndSearchToGrid`).

**Dependencias:** ninguna. Desbloquea P1-08 y P2-12.

**Riesgo de regresión:** BAJO — aditivo, reutiliza funciones de highlight ya existentes y probadas para el filtro por chip.

**Esfuerzo:** Bajo.

**Criterios de aceptación (verificables por ejecución, igual que en esta auditoría):**
1. Con la app en vista Grafo por defecto, escribir un término con ≥2 coincidencias cambia el `className` o `opacity` de al menos un nodo.
2. El número de nodos "activos" tras la búsqueda coincide con las estaciones presentes en `resultHint`.
3. Borrar la búsqueda restaura todos los nodos a su estado normal.

**Prueba de verificación:** repetir el script JS usado en esta auditoría (`§1`, comparación de `className` antes/después) y comprobar `changed: true`.

---

### P0-02 — Gestionar el foco y el scroll al abrir/cerrar el detalle de estación

**Fuente:** [NUEVO, EJECUTADO]. Ver D3.

**Problema.** `showStationDetail` (`app.js:299`) no mueve el foco al nuevo contenido ni hace scroll hacia él; `backToAtlas` (`app.js:454`) tampoco devuelve el foco a un elemento identificable. El foco queda en un nodo del grafo que un instante después está `display:none` y con `getBoundingClientRect()` en ceros.

**Solución.** En `showStationDetail`: tras renderizar el contenido, `document.getElementById('pageTitle')?.focus()` (añadiendo `tabindex="-1"` al `<h2 id="pageTitle">` para que sea enfocable sin ser parte del tab order normal) y `pageView.scrollIntoView({behavior: 'smooth', block: 'start'})`, respetando `prefers-reduced-motion` (ya hay precedente de esa comprobación en el proyecto). En `backToAtlas`: guardar una referencia al nodo/tarjeta que originó la navegación (o, más simple, al botón de toggle de vista activo) y devolver el foco ahí explícitamente.

**Archivos:** `app.js` (`showStationDetail:299`, `backToAtlas:454`), `index.html` (añadir `tabindex="-1"` a `#pageTitle`, línea 290).

**Dependencias:** ninguna.

**Riesgo de regresión:** BAJO — un solo fichero de lógica, no cambia el contrato de ninguna función externa.

**Esfuerzo:** Bajo.

**Criterios de aceptación:**
1. Tras activar un nodo/tarjeta (click o Enter), `document.activeElement` es un elemento dentro de `#pageView` con `getBoundingClientRect()` distinto de cero.
2. `#pageView` es visible en el viewport sin scroll manual del usuario tras la transición.
3. Tras volver al Atlas, `document.activeElement` es un elemento visible y con sentido (el nodo/tarjeta de origen, o el control de toggle de vista) — nunca un elemento dentro de un contenedor `display:none`.

**Prueba de verificación:** repetir el script de foco de §1/D3 de este documento; `activeAfterOpen` debe apuntar a un elemento con `width`/`height` > 0.

---

### P0-03 — Restringir el gesto táctil del grafo

**Fuente:** [UX, EJECUTADO]. Ver D4.

**Problema.** El SVG del grafo tiene `touch-action: auto` (medido). El `drag()`/`zoom()` de D3 puede competir con el scroll de la página en pantallas táctiles.

**Solución.** `touch-action: none;` sobre el `<svg>` del grafo en `style.css` (o `touch-action: pan-y` si se prefiere permitir scroll vertical de la página cuando el usuario no está tocando un nodo — a decidir según cuánto se quiera priorizar el drag del grafo frente al scroll de la página; la opción `none` es la más segura de probar primero).

**Archivos:** `style.css`, selector del `svg` dentro de `#graphView`.

**Dependencias:** ninguna.

**Riesgo de regresión:** BAJO — una línea de CSS, afecta solo a interacción táctil.

**Esfuerzo:** Trivial.

**Criterios de aceptación:**
1. `getComputedStyle(svg).touchAction !== "auto"`.
2. [REQUIERE VERIFICACIÓN manual en dispositivo táctil real, fuera del alcance de esta fase] que arrastrar un nodo ya no dispara scroll de página simultáneo.

---

### P0-04 — Eliminar el punto único de fallo del CDN de D3

**Fuente:** [GENERAL] M01/M27.

**Problema.** `index.html:38` carga D3 desde `d3js.org` sin `integrity` ni alternativa local. Confirmado en esta fase que hoy carga correctamente (sin error de consola), lo cual no elimina el riesgo de que falle en el futuro.

**Solución (recomendada, la más robusta):** descargar `d3.v7.min.js` al repo (ej. `vendor/d3.v7.min.js`) y servirlo local, eliminando la dependencia de red externa por completo. **Alternativa más ligera:** mantener el CDN pero añadir `integrity`/`crossorigin` con el hash SRI oficial, más un mensaje de error visible si `typeof d3 === "undefined"` tras el `load`.

**Archivos:** `index.html:38`.

**Dependencias:** ninguna.

**Riesgo de regresión:** BAJO.

**Esfuerzo:** Bajo.

**Criterios de aceptación:**
1. La app sigue funcionando igual con D3 servido localmente (verificar con el mismo método de esta fase: consola sin errores, `13 estaciones cargadas` en el log).
2. Si se opta por la alternativa CDN+SRI: simular fallo de carga (bloquear la URL) y confirmar que aparece un mensaje de error legible en vez de una pantalla en blanco.

---

### P1-05 — Roving tabindex y flechas en los tabs de estación

**Fuente:** [UX] U06. Sin cambios respecto a la auditoría previa — no requería ejecución para confirmarse, es ausencia de código (`grep` de `ArrowLeft`/`ArrowRight` en `app.js` sin resultados).

**Solución.** Añadir listener de `ArrowLeft`/`ArrowRight` sobre el contenedor `role="tablist"` de `index.html:297-336`, moviendo el foco entre los tres botones `role="tab"` con roving `tabindex`.

**Archivos:** `app.js` (nuevo listener, junto a la lógica de tabs existente en `app.js:424`), `index.html:297-336`.

**Dependencias:** ninguna. **Riesgo:** BAJO. **Esfuerzo:** Bajo.

---

### P1-06 — Indicador de chip activo no dependiente solo del color

**Fuente:** [UX] U09. Confirmado en esta fase que el borde en reposo es transparente (`rgba(0,0,0,0)`) y el peso de fuente ya es 600 tanto activo como inactivo [EJECUTADO — comprobar si `font-weight` varía sería el siguiente paso; en esta medición puntual salió 600 para el chip por defecto].

**Solución.** Añadir un segundo indicador no-color al estado `.chip.active` — ej. un borde sólido visible o un icono de check, no solo el cambio de `background`.

**Archivos:** `style.css` (`.chip.active`), `app.js:841-856` si requiere marcado adicional.

**Dependencias:** ninguna. **Riesgo:** BAJO. **Esfuerzo:** Bajo.

---

### P1-07 — Etiqueta de texto visible en botones de Glosario/Calibración

**Fuente:** [UX] U03.

**Solución.** Añadir un `<span>` de texto junto al icono (puede ocultarse en pantallas muy estrechas con CSS si el espacio aprieta, pero no depender solo de `aria-label`).

**Archivos:** `index.html:60-95`.

**Dependencias:** ninguna. **Riesgo:** BAJO. **Esfuerzo:** Trivial.

---

### P1-08 — Estado "sin resultados" también en la vista Grafo

**Fuente:** [UX] U04. **Dependencia:** P0-01 (no tiene sentido implementarlo antes de que el grafo reaccione a la búsqueda).

**Solución.** Cuando `applySearchToGraph` (de P0-01) determine cero coincidencias, mostrar un mensaje equivalente al `.no-results` de la cuadrícula, superpuesto o junto al grafo.

**Archivos:** `app.js`, `index.html` (nuevo contenedor de mensaje en `#graphView`).

**Riesgo:** BAJO. **Esfuerzo:** Bajo.

---

### P1-09 — Favicon y `og:image`

**Fuente:** [GENERAL] M07/M08. Confirmado por ausencia (`grep` sin resultados en `<head>`).

**Solución.** Generar favicon (monograma/sello del Atlas) y una imagen 1200×630 para `og:image`.

**Archivos:** `index.html` (`<head>`), nuevos assets.

**Riesgo:** Ninguno. **Esfuerzo:** Bajo (requiere diseño de la imagen, no solo código).

---

### P1-10 — `robots.txt`, `sitemap.xml` y skip link

**Fuente:** [GENERAL] M09/M10. Confirmado por ausencia.

**Solución.** Añadir los dos ficheros en la raíz; añadir `<a class="skip-link" href="#mainContent">Saltar al contenido</a>` visible al recibir foco, y el `id="mainContent"` correspondiente en `<main class="content-area">`.

**Archivos:** raíz del proyecto, `index.html:213`.

**Riesgo:** BAJO. **Esfuerzo:** Bajo.

---

## 6. FASE 2 — PULIDO Y DOCUMENTACIÓN

**Objetivo:** cerrar las brechas de documentación/testing y las mejoras de UI que no bloquean ningún flujo.

### P2-11 — `README.md`

**Fuente:** [GENERAL] M03. Confirmado, 0 líneas.

**Solución.** Documentar: qué es el proyecto, cómo abrirlo (basta con `python -m http.server` en la raíz, tal como se ha hecho para esta verificación — no requiere build), estructura de `data.js`/`app.js`/`style.css`, cómo añadir una estación.

**Dependencias:** ninguna, pero P3-18 lo complementa.

---

### P2-12 — Persistir filtro/búsqueda entre recargas

**Fuente:** [UX] U05. **Dependencia:** P0-01 (persistir un comportamiento que aún no existe visualmente no aporta).

**Solución.** Guardar `state.currentFilter`/`state.currentSearch` en `localStorage`, siguiendo el patrón ya usado para `fontSizePreference` (`app.js:1045,1049`).

---

### P2-13 — Test mínimo del arranque

**Fuente:** [GENERAL] M04. Confirmado: sin `package.json`, sin ningún test.

**Solución mínima viable, sin introducir un framework pesado:** un test E2E con Playwright que cargue `index.html` servido localmente y verifique lo mismo que se ha comprobado a mano en esta fase — consola sin errores, `13 estaciones cargadas` en el log, grafo con 13 nodos en el DOM. Es literalmente automatizar el script de verificación usado para escribir este documento.

---

### P2-14 — Dividir `style.css`

**Fuente:** [GENERAL] M13. Sin cambios — 3721 líneas confirmadas, decisión de alto esfuerzo/riesgo medio, no urgente.

---

### P2-15 — Quitar `onclick` inline y minificar para producción

**Fuente:** [GENERAL] M12/M14.

---

### P2-16 — Pista de que el grafo es interactivo

**Fuente:** [UX] U18. Ej. un texto sutil bajo el grafo la primera vez ("Arrastra o haz zoom para explorar") persistido con `localStorage` para no repetirse.

---

### P3-17 — Loading sutil en estabilización del grafo + tooltip por foco de teclado

**Fuente:** [UX] U13/U20. Nota añadida en esta fase: `nodeMouseover` (`app.js:233-238`) usa `event.clientX/Y`, que en un evento de `focus` (activado por teclado, sin coordenadas de ratón) puede posicionar mal el tooltip — revisar antes de dar por cerrado.

---

### P3-18 — Documentar `STATIONS[]`/`EVENTS[]`

**Fuente:** [GENERAL] M17. **Dependencia:** P2-11 (mismo documento).

---

### P3-19 — Los dos `.zip` de nombre anómalo en la raíz

**Fuente:** [GENERAL] M28. **REQUIERE DECISIÓN HUMANA** — ya excluidos de git vía `.gitignore`, pero siguen en el disco local; confirmar si se pueden borrar.

---

## 7. NO TOCAR

Sin cambios respecto a las auditorías previas, reforzado con lo verificado en esta fase:

- **La accesibilidad de teclado del grafo** (`tabindex`, `role="button"`, `Enter`/`Espacio`) — funciona: se usó exactamente ese mecanismo para activar un nodo en las pruebas de esta fase, sin fallos.
- **El sistema de `focus-visible` y `prefers-reduced-motion`** — no tocar, ya correcto.
- **La paleta tonal del Bloque 3** — el contraste medido (12.81:1) confirma que no hay nada que corregir ahí.
- **El patrón de contención de scroll de los chips** (`overflow-x: auto` en `.toolbar`) — confirmado correcto en ejecución, no es un bug.
- **No migrar a framework ni introducir bundler** — sigue sin haber ninguna señal que lo justifique.

---

## 8. Riesgos globales

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El usuario busca en la vista por defecto y concluye que la búsqueda "no funciona" | Alta (ocurre en el primer uso normal, confirmado por ejecución) | Alto | P0-01 |
| Usuario de teclado/lector de pantalla pierde el hilo al abrir una estación | Alta para ese perfil de usuario | Alto | P0-02 |
| Conflicto drag/scroll en el grafo en móvil | Media (depende de navegador/dispositivo) | Medio | P0-03 |
| Caída del CDN de D3 | Baja pero no nula | Alto (rompe la vista por defecto entera) | P0-04 |

---

## 9. Orden recomendado de implementación

1. **P0-01, P0-02, P0-03, P0-04** — en cualquier orden, sin dependencias entre sí, todas verificables con el mismo método de ejecución usado en esta auditoría.
2. **P1-05 a P1-10** — sin dependencias, pueden hacerse en paralelo a lo anterior.
3. **P2-11 a P2-16** — tras cerrar P0-01 (por la dependencia de P1-08/P2-12).
4. **P3-17 a P3-19** — cuando convenga; P3-19 requiere confirmación tuya primero.

---

## 10. Verificación final de esta fase

Todo lo afirmado como **[EJECUTADO]** en este documento se obtuvo así: servidor estático local (`python -m http.server 8843`, registrado en `.claude/launch.json` como configuración `atlas-static`), navegador con la app real cargada, lectura de consola, y scripts JS ejecutados en la página para comparar estado del DOM antes/después de cada interacción (búsqueda, activación de nodo, vuelta al Atlas, medición de contraste con la fórmula WCAG de luminancia relativa). No se modificó ningún archivo del proyecto durante la verificación. El servidor de previsualización se detuvo al terminar.

**No se ha implementado ninguna de las tareas de este roadmap** — es, igual que su fuente de inspiración, solo la fase de síntesis y priorización. Esperando instrucciones para empezar por P0-01 a P0-04, o por donde prefieras.
