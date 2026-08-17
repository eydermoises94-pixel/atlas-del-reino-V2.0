# AUDITORÍA GENERAL DEL PROYECTO — Atlas Teológico del Reino

**Alcance:** auditoría estática de código, sin ejecución de build/tests/servidor (a petición del solicitante). Todo lo que solo puede confirmarse en tiempo de ejecución en navegador queda marcado `[NO VERIFICADO — requiere prueba manual]`.

**Nota metodológica:** las plantillas de auditoría de referencia (uso habitual del solicitante en otros proyectos) están diseñadas para una aplicación con React + Vite + API propia + proveedor de IA (DeepSeek) + sistema RAG + chat conversacional. **El Atlas del Reino no tiene nada de eso.** Es un sitio estático: `index.html` (391 líneas) + `app.js` (1086 líneas, vanilla JS) + `data.js` (971 líneas, contenido + iconos SVG) + `style.css` (3721 líneas). Sin `package.json`, sin bundler, sin backend, sin tests, sin IA. Las secciones de la plantilla original que no aplican se marcan explícitamente como **NO APLICA** con su justificación, en vez de omitirse en silencio.

---

## 1. Resumen ejecutivo

El proyecto es un sitio estático bien cuidado en su capa de accesibilidad y presentación (sombras en capas, escala tonal, `focus-visible`, `prefers-reduced-motion`, ARIA en la mayoría de controles interactivos), pero tiene tres puntos débiles estructurales confirmados: **cero tests**, **`README.md` vacío**, y **una dependencia externa sin fallback** (D3 v7 cargado desde `d3js.org`, sin versión local ni comprobación de fallo de carga). El código vive en tres archivos monolíticos (`app.js` 1086 líneas, `style.css` 3721 líneas) sin módulos ni build step, lo cual es razonable para el tamaño actual pero empezará a doler si el proyecto crece. No hay riesgos de seguridad relevantes porque no hay superficie de ataque real (no hay inputs que lleguen a un backend, no hay `eval`, no hay backend).

## 2. Estado general

Puntuación 0–10 (proyecto estático; los apartados no aplicables se omiten de la puntuación):

| Área | Puntuación | Base |
|---|---|---|
| Arquitectura | 7 | Separación clara datos/lógica/presentación; monolítico pero coherente |
| Código | 6 | Sin linter, `onclick` inline, duplicación en helpers de tooltip/panel |
| UX | 7 | Flujos claros pero desincronización buscador↔vista grafo (confirmada) |
| UI | 8 | Trabajo reciente de profundidad material y escala tonal ya aplicado |
| Accesibilidad | 7 | ARIA amplio y `focus-visible` reales; falta patrón de tabs con flechas |
| Navegación | 7 | Toggle grafo/cuadrícula, tabs de estación, breadcrumbs de estación |
| Responsive | 7 | 8 breakpoints hasta 360px; sin verificación en dispositivo real |
| Chat | N/A | No existe función de chat en este proyecto |
| IA | N/A | No hay integración de IA |
| RAG | N/A | No hay sistema RAG |
| Testing | 0 | No existe ningún test, ni framework instalado |
| Rendimiento | 6 | Un único archivo CSS de 3721 líneas sin minificar; D3 vía CDN |
| Documentación | 3 | `README.md` vacío (0 líneas); `claude.md` sí tiene contexto |
| Mantenibilidad | 6 | Legible pero sin tests que protejan futuros cambios |

## 3. Arquitectura actual

```
index.html  → estructura + landmarks + carga scripts (D3 CDN, data.js, app.js)
data.js     → contenido teológico puro: STATIONS[], EVENTS[], ICONS{} (SVG inline)
app.js      → todo el motor: grafo D3, tooltips, glosario, buscador, filtros,
              tabs de estación, scroll reveals, localStorage, view toggle
style.css   → presentación completa (3721 líneas, un solo archivo)
```

[CONFIRMADO] `data.js:1-7` documenta explícitamente la intención de separar contenido de lógica ("Contenido teologico puro, separado del motor de renderizado"). Esa separación se respeta: no encontré contenido teológico embebido en `app.js`.

[CONFIRMADO] `app.js` concentra 8 subsistemas distintos en un solo archivo sin módulos: grafo D3 (`initGraph`, `dragStarted/dragged/dragEnded`, líneas 43–209), tooltips de referencias (`setupRefTooltips`, `augmentRefChips`, líneas 483–588), glosario (`renderGlossary`, `renderEpiLegend`), paneles (`setupPanelToggle`), scroll cinemático (`initCinematicScroll`), reveal on scroll (`initRevealObserver`, `staggerIndex`, `applyReveals`), grid/búsqueda/filtros (`renderStationsGrid` → `handleSearch`, líneas 747–941), y `initApp` (arranque, línea 983).

[CONFIRMADO] `index.html:38` carga D3 desde `https://d3js.org/d3.v7.min.js` con `defer`, sin `integrity` (Subresource Integrity) ni fallback local. Si `d3js.org` cae o el usuario está sin red, la vista de grafo (la vista **por defecto** — `role="tab" aria-selected="true"` en `index.html:154-156`) queda completamente rota, sin ningún mensaje de error para el usuario.

[CONFIRMADO] Única persistencia: `localStorage` para preferencia de tamaño de fuente (`app.js:1045,1049`, clave `fontSizePreference`). No hay persistencia de filtros, búsqueda ni estado de navegación entre sesiones.

**Un solo punto de fallo:** si `d3.v7.min.js` no carga, la app entera parece rota en el primer vistazo (vista grafo por defecto, sin contenido visible ni mensaje).

## 4. Problemas críticos

| ID | Problema | Evidencia | Impacto |
|---|---|---|---|
| C1 | Dependencia D3 sin fallback ni manejo de error de carga | `index.html:38`, sin `<script>` de respaldo ni comprobación `typeof d3` | Vista por defecto queda en blanco sin aviso si CDN falla |
| C2 | Cero tests | Sin `package.json`, sin carpeta `test/`, sin runner configurado | Cualquier cambio en `app.js` (1086 líneas) puede romper algo sin que nadie se entere hasta producción |
| C3 | `README.md` vacío | `README.md` — 0 líneas confirmadas | Cualquier colaborador nuevo (o tú mismo en 6 meses) no tiene punto de entrada documental |

## 5. Problemas importantes

| ID | Problema | Evidencia | Impacto |
|---|---|---|---|
| I1 | Buscador desincronizado de la vista activa | `app.js:882-940` (`handleSearch`) actualiza `resultHint` con conteo de coincidencias en `STATIONS`/`EVENTS`, pero solo aplica el filtrado visual a `.station-card` (`applyFilterAndSearchToGrid`, línea 777) | Si el usuario busca estando en la vista de grafo (la vista inicial), ve un contador de resultados pero ningún cambio visual en el grafo — confusión real de "¿ha hecho algo mi búsqueda?" |
| I2 | `role="tab"` sin patrón de teclado completo (WAI-ARIA APG) | Tabs de estación en `index.html:297-336`; no encontré manejo de `ArrowLeft`/`ArrowRight` en `app.js` (solo `dataset.tab` en click, línea 424) | Usuario de teclado puede llegar a cada tab con `Tab` normal, pero no con flechas como espera el patrón ARIA de tabs — funciona, pero no es idiomático |
| I3 | `style.css` es un único archivo de 3721 líneas | Medido directamente | Cualquier cambio visual obliga a navegar un archivo grande; alto riesgo de reglas duplicadas o de especificidad ganándose por orden de aparición |
| I4 | Handlers `onclick` inline en HTML generado por JS | `app.js:841,851` (`onclick="filterByStation(...)"`) | Acopla lógica al string HTML; dificulta un futuro CSP estricto (`script-src` sin `unsafe-inline`) |
| I5 | Sin metaetiquetas de imagen social ni favicon | Verificado: no hay `og:image`, ni `<link rel="icon">`, ni `robots.txt`/`sitemap.xml` en el proyecto | Al compartir el enlace en redes/WhatsApp no se muestra imagen de previsualización; sin favicon en la pestaña del navegador |

## 6. UX/UI

Ver informe dedicado `AUDITORIA_UX_UI_ACCESIBILIDAD.md` para el detalle completo de flujos, navegación y accesibilidad. Resumen aquí:

- Fortaleza confirmada: nodos del grafo son `tabindex="0"`, `role="button"`, `aria-label` descriptivo, y responden a `Enter`/`Espacio` (`app.js:105-130`) — accesibilidad del grafo mejor de lo habitual para un componente D3 interactivo.
- Fortaleza confirmada: paneles (glosario, leyenda) cierran con `Escape` y devuelven el foco al botón que los abrió (`app.js:644-649`) — patrón correcto.
- Debilidad confirmada: desincronización buscador↔grafo (ver I1).
- Trabajo reciente (esta sesión) ya resolvió: sombras en capas, textura de vitela, escala tonal de 4 valores, conflictos de animación de entrada entre `.tl-item`/`.theo-cell`/`.station-card`.

## 7. Accesibilidad

- [CONFIRMADO] `focus-visible` implementado de forma amplia y centralizada: `style.css:2798-2806` (controles genéricos) y `style.css:3394-3402` (elementos de contenido: `.station-card`, `.theo-cell`, `.legend-item`, etc.), más una regla específica para no perder el anillo de foco de `.graph-node` (`style.css:3392-3394`, comentario explicando el porqué — buena práctica).
- [CONFIRMADO] `prefers-reduced-motion: reduce` cubierto en tres bloques (`style.css:553-554`, `840`, `2290`, `3641-3644`).
- [CONFIRMADO] Landmarks semánticos presentes: `<header>`, `<nav aria-label="...">` (×2), `<main class="content-area">`, `<footer role="contentinfo">` (`index.html:46,129,213,381`).
- [CONFIRMADO] `role="tablist"`/`role="tab"`/`role="tabpanel"` usados en dos sitios: toggle grafo/cuadrícula (`index.html:148-182`) y tabs de estación (`index.html:297-336`). Ver I2 (falta navegación por flechas).
- [PROBABLE] Contraste de la nueva paleta tonal (mesa `#2E2318`, pliego `#FBF7EC`, pozo `#EFE7D5`) — combinaciones de texto sobre estos fondos no se han medido con una herramienta de contraste en esta auditoría. [NO VERIFICADO — requiere comprobación con un contrast checker].
- [NO VERIFICADO — requiere prueba manual] Compatibilidad real con lector de pantalla (NVDA/VoiceOver): el marcado ARIA es correcto sobre el papel, pero no se ha probado con un lector de pantalla real en esta auditoría.
- CRÍTICO: ninguno confirmado.
- ALTO: I2 (patrón de tabs incompleto).
- MEDIO: contraste no verificado (arriba).
- BAJO: ausencia de `skip link` ("saltar al contenido") — no encontrado en `index.html`.

## 8. Navegación

Cubierto en detalle en la auditoría UX/UI. Estructura confirmada: vista Atlas (grafo ↔ cuadrícula, toggle con `role="tablist"`) → detalle de estación (`pageView`, con navegación prev/next entre estaciones, `index.html:272-275`) → vuelta al Atlas vía `backToAtlas()` (`app.js:454`).

## 9. Responsive

[CONFIRMADO] 14 media queries en `style.css`, con breakpoints en 360, 400 (×2), 480, 620, 640 (×3), 720, 860 (×2), 900, 980px. Buena cobertura de gama baja (360-400px), sin un breakpoint explícito de tablet (768-1024px) aparte de los de 860-980px que ya lo cubren parcialmente.
[NO VERIFICADO — requiere prueba manual] Comportamiento real del grafo D3 (SVG con zoom/drag) en pantallas táctiles pequeñas — el grafo usa `d3.drag()` y `d3.zoom()`, cuya interacción táctil no se ha probado en esta auditoría.

## 10. Chat

**NO APLICA.** El proyecto no tiene ninguna función de chat ni interfaz conversacional.

## 11. IA

**NO APLICA.** No hay integración con ningún proveedor de IA (DeepSeek u otro), ni lógica de prompts, ni streaming de respuestas.

## 12. RAG

**NO APLICA.** No existe sistema de recuperación aumentada; el contenido es estático y está en `data.js`.

## 13. Documentos

[CONFIRMADO] `README.md` existe pero tiene **0 líneas** (vacío).
[CONFIRMADO] `claude.md` (118 líneas) sí documenta contexto del proyecto pero está pensado como instrucciones para un agente IA, no como documentación de referencia para un humano nuevo en el repo.
[CONFIRMADO] `AUDITORIA_EPISTEMOLOGICA.md` (15.193 caracteres) existe como auditoría de contenido teológico previa — no se ha tocado en esta auditoría (fuera de alcance, pertenece al dominio del Agente 2 de teología).
[RECOMENDACIÓN] `README.md` debería documentar al menos: qué es el proyecto, cómo abrirlo localmente (no requiere build, basta abrir `index.html` o servir la carpeta), estructura de `data.js`/`app.js`/`style.css`, y cómo añadir una estación nueva.

## 14. Rendimiento

[CONFIRMADO] `style.css`: 3721 líneas, sin minificar, servido tal cual (no hay build step que lo procese).
[CONFIRMADO] `app.js`: 1086 líneas, sin minificar.
[CONFIRMADO] D3 v7 completo cargado desde CDN (`d3.v7.min.js`, sí minificado por el propio D3, pero es la build completa de la librería para usar solo fuerza dirigida + zoom + drag — no hay tree-shaking posible sin bundler).
[NO VERIFICADO — requiere prueba manual] Tiempo real de carga/interactividad (LCP, TTI) — no se ha medido con Lighthouse ni herramienta equivalente en esta auditoría por ser ejecución activa, fuera del alcance pedido.
[RECOMENDACIÓN] Minificar `style.css`/`app.js` antes de publicar es una mejora de bajo esfuerzo y bajo riesgo (no cambia comportamiento, solo tamaño de transferencia).

## 15. Costes y límites

[CONFIRMADO] Hosting actual: GitHub Pages (repo `atlas-del-reino-V2.0`). Sitio 100% estático — no hay coste variable por uso, no hay funciones serverless, no hay llamadas a API de pago.
**NO APLICA** el resto de la sección de costes de la plantilla original (Vercel Hobby, DeepSeek, etc.) — no se usan esos servicios en este proyecto.
[RECOMENDACIÓN] El único límite real a vigilar es el tamaño del repositorio de GitHub (recomendado <1GB, límite duro 100MB por archivo) — verificar que los dos `.zip` presentes en la raíz del proyecto local (`Atlas Teológico del Reino...zip`, con nombres de archivo anómalos) no se suban por error; ya están excluidos vía `.gitignore` (`*.zip`).

## 16. Testing

**Ausencia total, no cobertura baja.** [CONFIRMADO] No existe `package.json`, ni carpeta de tests, ni ningún framework de testing instalado o referenciado.

Test matrix propuesta (para cuando se decida introducir testing, no implementado en esta auditoría):

| Función | Tipo de test sugerido | Prioridad |
|---|---|---|
| `handleSearch` / `applyFilterAndSearchToGrid` | Unit (lógica de filtrado pura, fácil de extraer) | P1 |
| `getStation` / `getEventByNumber` | Unit | P2 |
| Navegación teclado en nodos del grafo (`Enter`/`Espacio`) | E2E (Playwright/Cypress) | P1 |
| Toggle grafo ↔ cuadrícula conserva filtro activo | E2E | P2 |
| `localStorage` de tamaño de fuente persiste tras recarga | E2E | P2 |
| Comportamiento cuando D3 falla al cargar | E2E / manual | P0 (bloquea vista por defecto) |

## 17. Código

[CONFIRMADO] Sin ESLint ni Prettier configurado (no hay `.eslintrc*` en el proyecto).
[CONFIRMADO] No se encontraron `console.log` de depuración olvidados en el código auditado directamente, ni comentarios `TODO`/`FIXME` — código relativamente limpio de residuos de desarrollo.
[CONFIRMADO] `onclick` inline en HTML generado dinámicamente (`app.js:841,851`) — funcional pero no es la práctica recomendada actual.
[CONFIRMADO] Nomenclatura consistente en español para dominio (STATIONS, EVENTS) e inglés para utilidades genéricas (`escapeRegex`, `highlightText`) — mezcla presente pero coherente por tipo de función, no caótica.
No se hizo ningún refactor ni corrección — solo se informa, según regla de la auditoría.

## 18. Documentación

Comparación documentación vs. código real:

- `claude.md` describe el rol de un "Agente 1 — Atlas del Reino" (asistente de desarrollo/marketing) — es instrucción de agente, no documentación de arquitectura del propio sitio. No contradice el código, pero tampoco lo documenta.
- No existe ningún documento que describa la estructura de `STATIONS[]`/`EVENTS[]` en `data.js`, lo cual sería el documento más útil para cualquiera que quiera añadir contenido sin tener que leer 971 líneas de `data.js`.
- `README.md` vacío es la brecha documental más visible del proyecto.

## 19. Propuesta "Comentario"

**NO APLICA tal como está planteada en la plantilla original** — esa sección asume una app con pestañas Biblia/Comentario/Chat que no existen aquí.

Adaptación al contexto real del Atlas: la funcionalidad más cercana ya existe parcialmente — el **glosario interactivo** (`renderGlossary`, `app.js`) y la leyenda de calibración epistemológica (`renderEpiLegend`). Una evolución natural sería permitir **notas personales del usuario por estación**, persistidas en `localStorage` (siguiendo el patrón ya usado para `fontSizePreference`), con:

- Ubicación: un botón adicional junto a "Glosario" y "Calibración" en la barra de herramientas (`index.html:60-95`), reutilizando el mismo patrón `setupPanelToggle`.
- Relación con estaciones: nota vinculada a `stationId`, accesible desde el propio detalle de estación (`pageView`).
- Persistencia: `localStorage`, igual que el tamaño de fuente — no requiere backend.
- Sin deep-linking a versículo individual (no aplica: el Atlas no navega por versículo, navega por estación/evento).

Esto es una recomendación de diseño, no una implementación — no se ha construido nada.

## 20. 30+ mejoras

| ID | Título | Problema | Evidencia | Impacto | Esfuerzo | Riesgo | Prioridad | Solución propuesta |
|---|---|---|---|---|---|---|---|---|
| M01 | Fallback si D3 no carga | Vista por defecto queda en blanco sin aviso | `index.html:38` | Alto | Bajo | Bajo | P0 | Mensaje de error visible + botón "Ir a vista de cuadrícula" si `typeof d3 === "undefined"` |
| M02 | Sincronizar buscador con vista grafo | Búsqueda no filtra visualmente el grafo | `app.js:882-940` | Alto | Medio | Bajo | P0 | Resaltar/atenuar nodos del grafo según `matchesSearch`, igual que ya hace con `.station-card` |
| M03 | Crear `README.md` | Documento vacío | `README.md` (0 líneas) | Alto | Bajo | Ninguno | P0 | Documentar propósito, cómo abrir el proyecto, estructura de archivos |
| M04 | Test E2E mínimo del arranque | Cero cobertura de la ruta crítica | Confirmado ausencia total | Alto | Medio | Bajo | P1 | Playwright: carga página, verifica que aparece el grafo o la cuadrícula |
| M05 | Navegación por flechas en tabs | Patrón ARIA de tabs incompleto | `index.html:297-336`, sin `ArrowLeft/Right` en `app.js` | Medio | Bajo | Bajo | P1 | Añadir listener de flechas con roving `tabindex` en los botones `role="tab"` |
| M06 | Subresource Integrity en script D3 | CDN sin `integrity`/`crossorigin` | `index.html:38` | Medio | Bajo | Bajo | P1 | Añadir atributo `integrity` con el hash SRI oficial de D3 v7 |
| M07 | Favicon | No existe `<link rel="icon">` | Verificado en `<head>` | Medio | Bajo | Ninguno | P1 | Generar favicon con el sello/monograma del Atlas |
| M08 | `og:image` para previsualización social | Ausente | Verificado en `<head>` | Medio | Bajo | Ninguno | P1 | Diseñar imagen 1200×630 con el título del Atlas |
| M09 | `robots.txt` y `sitemap.xml` | Ausentes | Verificado, no existen en el proyecto | Medio | Bajo | Ninguno | P2 | Añadir ambos para SEO técnico básico |
| M10 | Skip link "saltar al contenido" | No encontrado en `index.html` | Verificado | Medio | Bajo | Ninguno | P1 | `<a class="skip-link" href="#mainContent">Saltar al contenido</a>` visible al enfocar |
| M11 | Extraer lógica de filtrado a funciones puras testeables | `applyFilterAndSearchToGrid` mezcla DOM y lógica | `app.js:777-831` | Medio | Medio | Bajo | P2 | Separar función pura `filterStations(term, filter)` de la manipulación DOM |
| M12 | Quitar `onclick` inline | Acopla lógica a HTML generado | `app.js:841,851` | Bajo | Medio | Bajo | P2 | Delegación de eventos con `addEventListener` sobre `chipRow` |
| M13 | Dividir `style.css` en archivos por dominio | 3721 líneas en un solo archivo | Medido | Medio | Alto | Medio | P2 | Separar en `base.css`, `graph.css`, `station.css`, `a11y.css` e importar con `@import` o concatenar en build |
| M14 | Minificar CSS/JS para producción | Sin minificar actualmente | Medido | Bajo | Bajo | Bajo | P2 | Paso de build simple (esbuild/terser) antes de publicar, sin cambiar el código fuente |
| M15 | Medir contraste de la nueva paleta tonal | No verificado en esta auditoría | `style.css` (mesa/pliego/pozo, Bloque 3) | Medio | Bajo | Ninguno | P1 | Pasar combinaciones texto/fondo por un contrast checker (WCAG AA mínimo) |
| M16 | Prueba real con lector de pantalla | ARIA correcto sobre el papel, no probado | — | Alto | Bajo | Ninguno | P1 | Sesión de prueba con VoiceOver o NVDA en los flujos principales |
| M17 | Documentar estructura de `STATIONS[]`/`EVENTS[]` | Sin documento de referencia | `data.js` 971 líneas | Medio | Bajo | Ninguno | P2 | Añadir sección en `README.md` con el shape de cada objeto y ejemplo |
| M18 | Manejar clic repetido en toggle de vista durante animación | No verificado si genera estado inconsistente | `setupViewToggle`, `app.js:942` | Bajo | Bajo | Bajo | P3 | Deshabilitar brevemente el control mientras la transición está en curso |
| M19 | Mensaje de error visible si `EVENTS`/`STATIONS` viene vacío o corrupto | No se encontró manejo de ese caso | `data.js` / `app.js` | Bajo | Bajo | Bajo | P3 | Guard clause con mensaje amistoso en `initApp` |
| M20 | Unificar mezcla de idioma en nombres de función | Cohesión de estilo | Verificado, mezcla ES/EN | Bajo | Alto | Medio | P3 | No recomendable ahora mismo — ver sección "Lo que NO debemos tocar" |
| M21 | Cachear resultado de `getMaxEventsPerStation()` si se llama repetidamente en render | Posible recomputo innecesario | `app.js:25` | Bajo | Bajo | Bajo | P3 | Memoizar si el profiling confirma que es un costo real (no verificado aún) |
| M22 | Añadir `lang` correcto en fragmentos si hubiera contenido en otro idioma (citas originales) | No verificado si hay mezcla de idiomas en el contenido | `data.js` | Bajo | Bajo | Ninguno | P3 | Revisar si citas en griego/hebreo necesitan `lang="grc"`/`lang="he"` |
| M23 | Comprobar accesibilidad de color-only en chips activos | Chips usan color de fondo para indicar estado activo | `app.js:842,852` (`isActive` vía color) | Medio | Bajo | Bajo | P1 | Verificar que `.chip.active` también cambia algo no-color (borde, icono check) — [NO VERIFICADO, requiere inspección visual] |
| M24 | Revisar tamaño de objetivo táctil (44×44px) en chips y botones pequeños | No medido en esta auditoría | `style.css` | Medio | Bajo | Ninguno | P1 | Medir en DevTools móvil; ajustar padding si es necesario |
| M25 | Loading state explícito mientras D3 inicializa la simulación de fuerzas | El grafo puede tardar en estabilizarse (`simulation.alpha(0.3).restart()`, `app.js:193`) | Confirmado en código | Medio | Bajo | Bajo | P2 | Mostrar un estado sutil de "acomodando el grafo" durante el primer segundo |
| M26 | Prefetch/preconnect al CDN de D3 | No hay `<link rel="preconnect">` a `d3js.org` | Verificado en `<head>` | Bajo | Bajo | Ninguno | P3 | Añadir `<link rel="preconnect" href="https://d3js.org">` |
| M27 | Considerar alojar D3 localmente | Elimina dependencia de red externa por completo | `index.html:38` | Alto | Bajo | Bajo | P1 | Descargar `d3.v7.min.js` al repo y servirlo local; resuelve M01 y M06 de raíz |
| M28 | Validar que los dos `.zip` en la raíz no contienen material a limpiar | Nombres de archivo anómalos, parecen accidentales | Confirmado en listado de archivos | Bajo | Bajo | Ninguno | P2 | Confirmar con el usuario si se pueden borrar (ya fuera de git vía `.gitignore`) |
| M29 | Añadir `<meta name="theme-color">` para navegadores móviles | No encontrado | Verificado en `<head>` | Bajo | Bajo | Ninguno | P3 | Usar el color "tinta" o "sello" de la paleta |
| M30 | Documentar en `README.md` cómo se genera un nuevo icono SVG editorial | El patrón `svgWrap` ya es consistente y reutilizable | `data.js:13-14` | Bajo | Bajo | Ninguno | P3 | Ejemplo de uso en el README para mantener consistencia futura |
| M31 | Revisar si `augmentRefChips` se ejecuta de forma redundante en cada render | Posible trabajo repetido en DOM | `app.js:566` | Bajo | Bajo | Bajo | P3 | [NO VERIFICADO] — perfilar antes de tocar |

## 21. Matriz impacto/esfuerzo

**ALTO IMPACTO / BAJO ESFUERZO** (hacer primero): M01, M02, M03, M06, M07, M08, M10, M15, M16, M27

**ALTO IMPACTO / ALTO ESFUERZO**: M13 (dividir CSS), M04 (suite de tests real más allá del mínimo)

**BAJO IMPACTO / BAJO ESFUERZO**: M12, M18, M19, M26, M29, M30

**BAJO IMPACTO / ALTO ESFUERZO**: M20 (no recomendado — ver sección 24)

**Las 10 primeras a implementar:** M01, M02, M03, M27, M06, M07, M08, M10, M15, M16.

## 22. Quick Wins

M01, M03, M06, M07, M08, M10, M26, M29 — todas requieren minutos u horas, sin riesgo de romper nada existente, y no tocan contenido teológico ni arquitectura.

## 23. Cambios de medio plazo

M02 (sincronizar búsqueda-grafo), M04 (tests E2E), M11 (extraer lógica pura), M13 (dividir CSS), M17 (documentar `data.js`).

## 24. Cambios que NO recomiendo realizar

- **No dividir `app.js` en módulos ES ni introducir un bundler ahora mismo.** El archivo es grande pero legible y navegable; introducir Vite/Webpack añade una capa de build que hoy no existe, cambia el flujo de publicación en GitHub Pages, y no hay ninguna señal de que el tamaño actual esté causando problemas reales. Solo lo haría si el proyecto va a crecer significativamente en funcionalidad.
- **No unificar el idioma de los nombres de función (M20).** La mezcla ES/EN actual es consistente por categoría (dominio en español, utilidades genéricas en inglés) y renombrar 1086 líneas de código funcionando introduce riesgo de errores por preferencia estética, no por un problema real.
- **No migrar a React/framework.** Nada en el proyecto lo justifica: es contenido mayormente estático con interactividad puntual, exactamente el caso de uso donde vanilla JS es la elección correcta.
- **El trabajo de accesibilidad de teclado en el grafo (`app.js:105-131`) está bien hecho — no tocar.** Es más cuidadoso que la media de implementaciones D3 interactivas.
- **El sistema de `focus-visible` centralizado en `style.css` no debe reescribirse** — ya cubre los casos relevantes de forma consistente.

## 25. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Caída/lentitud del CDN de D3 rompe la vista por defecto | Media (depende de terceros) | Alto | M01 + M27 |
| Regresión silenciosa en `app.js` al hacer futuros cambios (sin tests) | Alta con el tiempo | Medio-Alto | M04 |
| Confusión de usuario por buscador que no filtra el grafo | Alta (ocurre en el primer uso normal) | Medio | M02 |
| `README.md` vacío dificulta retomar el proyecto tras una pausa larga | Alta | Medio | M03 |

## 26. Roadmap recomendado

1. **Ahora (P0):** M01, M02, M03.
2. **Corto plazo (P1):** M27, M06, M07, M08, M10, M15, M16, M05, M23, M24.
3. **Medio plazo (P2):** M04, M09, M11, M13, M14, M17, M25, M28.
4. **Cuando convenga (P3):** el resto.

---

**Fin de la auditoría. No se ha modificado, ejecutado, instalado ni publicado nada durante este proceso — solo lectura y análisis. Esperando instrucciones.**
