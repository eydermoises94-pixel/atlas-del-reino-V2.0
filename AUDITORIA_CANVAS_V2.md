# ATLAS DEL REINO — CANVAS v2 (Claude Design)
# Auditoría multidisciplinar y registro de cambios

**Documento:** `AUDITORIA_CANVAS_V2.md` · **Fecha:** 2026-08-25
**Objeto auditado:** proyecto de Claude Design `494566dd-4f95-4104-9da1-10cfdadb6a47`, archivo `Atlas del Reino v2.dc.html`
**Auditor:** Agente 1 (desarrollo + marketing)
**Estado:** auditoría cerrada · cambios técnicos **aplicados y subidos al canvas** · pendientes de diseño y de contenido listados en §8

> **Este documento no describe la app de producción.** El canvas v2 es un artefacto **separado** de `index.html` / `app.js` / `data.js` / `style.css`. No comparte una sola línea con ellos. Para el estado de producción, ver `NEXT_PHASE.md`.

---

## 1. Contexto

El proyecto tiene dos artefactos vivos y desconectados:

- **Producción** — publicada en `https://eydermoises94-pixel.github.io/atlas-del-reino-V2.0/`, con los P0 de `NEXT_PHASE.md` cerrados en el commit `2c91507`.
- **El canvas v2** — una maqueta interactiva en Claude Design, con contenido, paleta y lógica propios. En el mismo proyecto de Design hay `uploads/Atlas-Dev-Marketing - backaup/` con copia de los cuatro archivos de producción: el v2 nació mirándolos, pero es una reescritura.

**El v2 no es código portable.** Usa el DSL del canvas (`<x-dc>`, `<sc-if>`, `<sc-for>`, `{{ bindings }}`, `class Component extends DCLogic`). Cualquier cosa que se quiera llevar a producción es reescritura manual, no copiar y pegar. Esto condiciona cualquier estimación de coste.

**Decisión tomada por Moisés (2026-08-24):** solo auditoría, sin decidir migración. La parte de SEO queda diagnosticada pero **explícitamente aparcada**, sin trabajo asociado.

---

## 2. Inventario del canvas

**Tres vistas** gobernadas por `state.view`:

| Vista | Contenido |
|---|---|
| `home` | Portada + grafo de 13 nodos con previsualización (*peek*) |
| `map` | Rejilla de 13 tarjetas |
| `station` | Lectura larga de una estación |

**Vista estación:** barra de progreso fija, número fantasma de fondo, cabecera *sticky*, *rail* de 13 segmentos (posición + progreso + navegación en 44 px), título y pregunta, 3–5 bloques de contenido, chips de pasajes con tooltip (escritorio) u hoja inferior (móvil), navegación anterior/siguiente, FAB en escritorio y barra flotante en móvil.

**Datos propios:** `ST` (13 estaciones, 25.342 caracteres), `BIBLE` (61 pasajes), `I` (~26 iconos SVG), `VIVID` (13 colores), `POS`/`EDGES` (13 nodos, 22 aristas).

**Props expuestas al editor visual:** `motion` (Sereno/Vivo/Cinematográfico), `entrance`, `pulse`, `depth` (Plano/Elevado/Profundo), `stationGlow`, `highlight`.

**Lo que el v2 no tiene y producción sí** — medida del alcance, no reproche: buscador libre, filtros por chips, glosario (12 términos), calibración epistemológica (`EPI_TAGS`, 45 usos), las 4 pestañas por estación, modo oscuro, alto contraste, modo lectura, tamaño de texto, deep-linking por hash, progreso persistido, marcador de visitada, volver arriba, las 70 enseñanzas de `EVENTS`, `CROSS_LINKS` y `QUAD`.

---

## 3. Auditoría — estado inicial

### 3.1 Contraste: 8 de 13 colores de estación fallaban AA

Medido sobre el fondo pliego `#F2EEE4` con la fórmula WCAG 2.1 de luminancia relativa:

| Est. | Color | Ratio | AA 4.5 | AA grande 3.0 |
|---|---|---|---|---|
| 10 | `#C79A17` | **2.25** | ✗ | **✗** |
| 06 | `#6A9B33` | 2.85 | ✗ | ✓ |
| 05 | `#A5783A` | 3.39 | ✗ | ✓ |
| 07 | `#2E8AA6` | 3.42 | ✗ | ✓ |
| 11 | `#B06E3C` | 3.53 | ✗ | ✓ |
| 04 | `#4C8A63` | 3.54 | ✗ | ✓ |
| 02 | `#8A7B4E` | 3.61 | ✗ | ✓ |
| 01 | `#C7541F` | 3.84 | ✗ | ✓ |
| 12 | `#2F6FB0` | 4.51 | ✓ (al límite) | ✓ |
| 03 | `#1F6E88` | 4.97 | ✓ | ✓ |
| 08 | `#9B4A4A` | 5.22 | ✓ | ✓ |
| 13 | `#6B4A8C` | 6.08 | ✓ | ✓ |
| 09 | `#3A3A6B` | 9.07 | ✓ | ✓ |

No era decorativo: esos colores pintaban **texto** de 11–13 px (número del nodo, número de la tarjeta, etiqueta de las tarjetas, referencia de las citas) y el número grande de estación. La estación 10 fallaba incluso el umbral relajado de texto grande.

### 3.2 La capa de meta-información entera en 3.27:1

`#8a8278` sobre pliego = **3.27:1**. Color de `DE 13`, el contador `N / 13` de la barra móvil, las etiquetas Anterior/Siguiente, `refsHint` y `mapHint`.

Con una ironía que conviene dejar escrita: **la única frase que explica cómo se usa el grafo era el texto menos legible de la pantalla.** En móvil el grafo pide dos toques (uno para previsualizar, otro para entrar) y la única pista de ese comportamiento es `mapHint`.

El texto de cuerpo sí estaba bien: `#232019` = 14.03:1, `#5b5548` = 6.39:1. El problema estaba acotado a acento y meta.

### 3.3 El foco no se gestionaba al cambiar de vista

`open()` y `nav()` hacían `window.scrollTo({ top: 0 })` y nunca movían el foco. Es **exactamente el defecto P0-02** de `NEXT_PHASE.md`, detectado ejecutando la app real y corregido en producción en `2c91507`. El v2 lo reintroducía. Tampoco había `aria-live`.

### 3.4 Semántica de documento incompleta

Sin `<main>` ni ningún *landmark*. Solo la portada tenía `<h1>`; `map` y `station` arrancaban en `<h2>` — jerarquía rota y ningún título de documento por vista.

### 3.5 Asimetría teclado / ratón en el grafo

El ratón obtenía *peek* al pasar por encima; el teclado no: `onKeyDown` disparaba `open()` directamente. El usuario de teclado se saltaba la previsualización entera. Nada limpiaba `peek` al perder el foco.

### 3.6 Tooltip sin detección de colisión

`left: 0; width: 420px` anclado al borde izquierdo del chip, dentro de una columna de 880 px: cualquier chip de la mitad derecha desbordaba.

### 3.7 `history.back()` podía sacar al usuario de la app

`sheetClose` llamaba a `history.back()` incondicionalmente, pero `tapFn` solo apilaba estado `if (mob)`. Secuencia que rompía: abrir un pasaje en escritorio → estrechar la ventana bajo 720 px → `syncViewport` pone `mob: true` → la hoja aparece sin push previo → cerrarla abandona la aplicación.

### 3.8 El sistema de revelado al hacer scroll era código muerto entero

`observeReveal()` y `checkReveal()` con cuerpo vacío. `rvOf()` devolvía siempre la misma constante. `markReveal()` no se llamaba desde ningún sitio. `this._io` y `this._rvI` se limpiaban en `componentWillUnmount` pero **nunca se asignaban**. El estado `rv`, `rvAll` y `dbg` no gobernaba nada.

### 3.9 Dos fuentes de verdad para la paleta, una muerta

Cada objeto de `ST` declaraba su `color`, pero `renderVals` tomaba `VIVID[i]` en **todas** las rutas de render. Los 13 `ST[].color` no llegaban jamás al DOM.

### 3.10 Valores calculados que nadie consumía

`prevNum`, `nextNum`, `stColorGhost`, `b.anim`, `n.open`, y en cada chip `openSheet`, `stop` y `close`.

### Lo que ya estaba bien y no se tocó

Objetivos táctiles de 44 px en chips, rail y barra móvil; `prefers-reduced-motion` atendido; `:focus-visible` con contorno propio; `touch-action: manipulation`; `aria-label` descriptivos en nodos y rail; `env(safe-area-inset-bottom)` respetado. **Verificado limpio:** los 65 usos de referencia bíblica (61 únicos) tienen todos entrada en `BIBLE`; cero huérfanas en ambas direcciones.

---

## 4. Cambios aplicados

43 transformaciones sobre el archivo, verificadas una a una con aserción de recuento (si un patrón no aparecía exactamente el número esperado de veces, el script abortaba sin escribir).

### 4.1 Contraste — tres paletas en vez de una

En vez de oscurecer `VIVID` y apagar la identidad visual, `VIVID` queda **intacto para decoración** (círculos del grafo, bordes, barras, brillos, degradados) y se añaden dos paletas derivadas que solo mueven luminosidad, conservando tono y saturación:

```js
const VIVID_TEXT = ["#A24519","#6D613E","#1E6982","#3B6C4D","#7E5B2C","#496B23","#23697F",
                    "#994949","#3A3A6B","#795E0E","#89562F","#2A649E","#6B4A8C"];
const VIVID_DARK = ["#DD6128","#968655","#2992B4","#52956B","#AD7E3D","#6A9B33","#3192AF",
                    "#BC7373","#8282BB","#C79A17","#BD7640","#488BCE","#997AB9"];
```

**`VIVID_TEXT` está calibrado contra el caso peor, que no es el pliego limpio.** Los términos marcados con `~` en el contenido se pintan sobre un tinte del 12 % de su propio color, y ese fondo se come casi un punto de ratio. Calibrar contra pliego liso dejaba 11 de 13 realces por debajo de AA.

| Est. | VIVID (decoración) | VIVID_TEXT | sobre tinte 12 % | sobre pliego |
|---|---|---|---|---|
| 01 | `#C7541F` | `#A24519` | 4.50 | 5.33 |
| 02 | `#8A7B4E` | `#6D613E` | 4.52 | 5.28 |
| 03 | `#1F6E88` | `#1E6982` | 4.53 | 5.33 |
| 04 | `#4C8A63` | `#3B6C4D` | 4.50 | 5.27 |
| 05 | `#A5783A` | `#7E5B2C` | 4.52 | 5.30 |
| 06 | `#6A9B33` | `#496B23` | 4.53 | 5.31 |
| 07 | `#2E8AA6` | `#23697F` | 4.53 | 5.33 |
| 08 | `#9B4A4A` | `#994949` | 4.52 | 5.33 |
| 09 | `#3A3A6B` | `#3A3A6B` *(sin cambio)* | 7.44 | 9.07 |
| 10 | `#C79A17` | `#795E0E` | 4.52 | 5.30 |
| 11 | `#B06E3C` | `#89562F` | 4.50 | 5.28 |
| 12 | `#2F6FB0` | `#2A649E` | 4.51 | 5.31 |
| 13 | `#6B4A8C` | `#6B4A8C` *(sin cambio)* | 5.13 | 6.08 |

`VIVID_DARK` cubre el texto sobre la tinta `#232019` del tooltip de escritorio y de la hoja móvil: peor caso **4.50:1**.

Además: `#8a8278` → **`#726B63`** (3.27 → 4.53:1) en toda la capa de meta-información, y el relleno del nodo activo, el fondo del FAB y el del chip activo pasan a `VIVID_TEXT`, porque llevan texto `#FBF7EC` encima — peor caso **5.71:1**.

### 4.2 Foco al cambiar de vista

Los tres encabezados llevan `data-view-heading` y `tabindex="-1"`. `componentDidUpdate` detecta el cambio de vista y llama a `focusHeading()`, que enfoca **de forma síncrona** (más un `requestAnimationFrame` de refuerzo). El porqué de esas dos decisiones está en §5.

### 4.3 Guarda de historial

Bandera `_refPushed`: `sheetClose` y el cierre desde el chip solo retroceden si fuimos nosotros quienes apilamos la entrada; en caso contrario cierran por estado. `onPop` resetea la bandera. Estrechar la ventana con un pasaje abierto ya no expulsa de la app.

### 4.4 Teclado en el grafo

Los nodos ganan `onFocus`/`onBlur` cableados a `enter`/`leave`: tabular previsualiza igual que el ratón, y Enter entra directo. Sin doble pulsación y sin asimetría.

### 4.5 Semántica

`<main>` envolviendo las tres vistas, un `<h1>` por vista (antes `map` y `station` arrancaban en `<h2>`), y una región `aria-live="polite"` visualmente oculta que anuncia el cambio de vista.

### 4.6 Tooltip

Los chips de la segunda mitad de la lista anclan su panel a la derecha (`tipL`/`tipR`), y `max-width` pasa a `min(420px, 88vw)`. **Es una heurística por índice, no medición real de posición** — cubre el caso malo, no todos.

### 4.7 Limpieza

Fuera: el sistema de revelado completo (`setupReveal`, `observeReveal`, `markReveal`, `checkReveal`, `rvOf`, `_io`, `_rvI`, `rv`, `rvAll`, `dbg`, los atributos `data-rv`), los 13 `ST[].color` muertos, y `prevNum`, `nextNum`, `stColorGhost`, `b.anim`, `n.open`, `openSheet`, `stop`, `close`. Las animaciones de entrada de bloques pasan a valor literal en el marcado, que es lo que de hecho ocurría ya.

---

## 5. Los tres hallazgos que solo aparecieron al ejecutar

Esta sección es la más importante del documento, porque ninguno de los tres se ve leyendo el código.

**1. El runtime no pasa `prevState`.** `support.js:1013` llama a `this.logic.componentDidUpdate(prevProps)` — **con un solo argumento**. Por eso el archivo original lanzaba `TypeError: Cannot read properties of undefined (reading 'view')`: el `componentDidUpdate(pp, ps)` original leía `ps.view`. Ese error **ya venía de antes** (confirmado montando el archivo original sin modificar en el mismo entorno), y era inofensivo mientras solo protegiera código muerto. Pero al meter el foco ahí dentro, la excepción se lo comía. La corrección: `componentDidUpdate` ya no lee argumentos, compara contra la última vista enfocada (`_viewKey`). El TypeError desapareció.

**2. `requestAnimationFrame` no se ejecuta en documento oculto.** La primera implementación de `focusHeading()` envolvía el `focus()` en un `rAF`. Al medirlo, los callbacks **nunca llegaban a dispararse**: el navegador suspende rAF cuando el documento no es visible. En una pestaña de fondo — o en un artboard oculto dentro de Design — el foco nunca se habría movido. La corrección: enfocar de forma síncrona (cuando corre `componentDidUpdate` el DOM de la vista nueva ya está puesto), con rAF solo como refuerzo.

**3. La primera calibración de paleta no llegaba.** Se calibró `VIVID_TEXT` contra el pliego limpio, dejando los 13 justo en ~4.5:1. Pero los realces van sobre un tinte del 12 % de su propio color: al medirlo en la página, 11 de 13 caían a ~3.9:1. La corrección: recalibrar apuntando al fondo tintado, que es el caso peor. Sobre pliego liso quedan ahora en 5.27:1 o mejor.

---

## 6. Método de verificación

La URL del canvas (`claude.ai/design/p/...`) **no se pudo abrir**: el navegador de la sesión no tiene iniciada sesión en claude.ai, y no se introdujeron credenciales. Tampoco se pudo hacer captura de pantalla: el panel del navegador estaba oculto y no compone frames.

La verificación se hizo ejecutando **el archivo exacto que se subió**: se descargó `support.js` (el runtime del propio canvas) del proyecto de Design, se sirvió en local junto al `.dc.html` con React 18, ReactDOM 18 y Babel, y se midió sobre el DOM real y los estilos calculados.

**Resultados:**

| Comprobación | Resultado |
|---|---|
| Monta sin plantilla residual | cero `{{` en el DOM |
| Jerarquía de encabezados | 1 `h1` / 0 `h2` en las tres vistas |
| Foco al entrar en estación | aterriza en el `h1`, visible (`getBoundingClientRect` no nulo) |
| Foco al volver al mapa | aterriza en el `h1` del mapa |
| Anuncio de vista | `aria-live` refleja la vista actual |
| Nodos del grafo | 13, con `aria-label` completo |
| Previsualización al tabular | funciona |
| Desbordamiento horizontal | ninguno a 278 px ni a 1280 px |
| Estación 01 (peor realce) | realce 4.50:1 · texto plano 5.33:1 |
| Estación 10 (peor original) | 2.25:1 → 4.51:1 en todo lo que pinta texto |
| Sintaxis JavaScript | `node --check` sobre los 55.574 caracteres del script: correcta |
| Integridad del DSL | `x-dc`, `main`, 12 `sc-if`, 12 `sc-for` balanceados; los 151 bindings del marcado tienen origen en el script |

**Avisos que permanecen y no son defectos:** errores de consola del tipo `<circle> attribute r: Expected length "{{ n.r }}"`. Es el navegador leyendo la plantilla antes de que el runtime la hidrate. Están igual en el archivo original.

El andamiaje de pruebas se creó dentro de `.claude/` (ignorado por git) y se eliminó al terminar. El servidor se detuvo. `git status` quedó limpio.

---

## 7. Lo que NO se tocó, y por qué

- **El listener de scroll duplicado** (`window` + `document` en captura, `componentDidMount`). Se sospecha que el segundo está ahí para el contenedor de scroll del propio canvas; quitarlo podría romper la barra de progreso dentro de Design. Riesgo no nulo, valor casi cero.
- **`preserveAspectRatio="none"` del grafo.** `POS` está en coordenadas absolutas 1000×640 y las etiquetas viven en una capa HTML aparte posicionada en porcentajes; ambas coinciden solo porque el contenedor fija `aspect-ratio: 1000 / 640`. Es un acoplamiento implícito entre tres sitios, pero funciona: cambiarlo es decisión de diseño, no de código.
- **Todo lo de SEO y URL.** Aparcado por decisión de Moisés (§1). Queda el diagnóstico en §9.
- **El contenido.** Es dominio del Agente 2 (`CLAUDE.md`).

---

## 7.5 Comparación de contenido, estación por estación

La primera cifra que se dio de este documento —"el canvas es una reescritura al 20 % del volumen de `data.js`"— **estaba mal, y se corrige aquí**: salía de comparar tamaño de archivo (25.342 caracteres del bloque `ST` contra 120.937 de `data.js` completo), y `data.js` completo incluye marcado HTML, iconos, glosario, pasajes y las 70 enseñanzas indexadas — no solo prosa de estación. Comparando **prosa contra prosa**, la cifra real es otra.

| # | Producción (caracteres) | Canvas (caracteres) | Canvas / Prod | Enseñanzas indexadas |
|---|---|---|---|---|
| 01 | 2.262 | 1.457 | 64 % | 5 |
| 02 | 1.988 | 1.551 | 78 % | 5 |
| 03 | 1.996 | 1.519 | 76 % | 5 |
| 04 | 2.170 | 1.514 | 70 % | 6 |
| 05 | 2.633 | 1.338 | **51 %** | 7 |
| 06 | 2.614 | 1.901 | 73 % | 7 |
| 07 | 3.000 | 1.605 | 54 % | 8 |
| 08 | 3.002 | 1.597 | 53 % | 7 |
| 09 | 3.018 | 1.435 | **48 %** | 5 |
| 10 | 2.940 | 1.638 | 56 % | 4 |
| 11 | 2.900 | 1.579 | 54 % | 3 |
| 12 | 3.169 | 1.830 | 58 % | 4 |
| 13 | 5.321 | 1.566 | **29 %** | 4 |
| **Total** | **37.013** | **20.530** | **55 %** | **70** |

**Los 13 títulos y las 13 preguntas de estación son idénticos entre las dos versiones** — cero divergencia en el esqueleto del Atlas. Lo que cambia es la redacción del cuerpo, condensada de media al 55 %, y el andamiaje que la rodea:

| Recurso | Producción | Canvas |
|---|---|---|
| Etiquetas de calibración epistemológica (`epiTag`) | 42 | 0 |
| Términos de glosario enlazados en el cuerpo | 78 | 0 |
| Pasos de desarrollo (`flow-step`) | 21 | 0 |
| Subtítulos internos (`h4`/`h5`) | 74 | 0 |
| Pasajes bíblicos citados | 79 (64 se conservan, 81 %) | 65 |

Las estaciones 13, 09 y 05 son las de mayor pérdida de volumen y las que concentran las pérdidas de pasajes más sensibles doctrinalmente (09 pierde los cinco respaldos bíblicos directos de la expiación sustitutoria: `1 P 2:24`, `2 Co 5:21`, `Ef 1:7`, `Heb 10:19-20`, `Ro 3:25`; 13 pierde el pasaje del olivo de Romanos 11). El encargo completo con el detalle estación por estación está en `ENCARGO_AGENTE_2_CONTENIDO.md`, sección 2 — es dictamen del Agente 2, no trabajo técnico.

---

## 8. Pendiente

### 8.1 Para Moisés, en el editor de Claude Design

1. **Revisar la paleta de texto.** Es notablemente más profunda que la original. Los saltos mayores: estación 10 `#C79A17` → `#795E0E` (oro brillante → oliva oscuro) y estación 01 `#C7541F` → `#A24519`. Las estaciones 09 y 13 no cambian. `VIVID` sigue intacto, así que el grafo y los bordes conservan el color vivo. Si algún tono no convence, se retoca en `VIVID_TEXT` — respetando 4.5:1 **contra el fondo tintado**, no contra el pliego.
2. **Las props del panel** (`motion`, `entrance`, `pulse`, `depth`, `stationGlow`, `highlight`) son gusto puro y quedan sin tocar.
3. **Comprobar el tooltip** en la estación 13, la que más referencias tiene (7), a 1280 px y a 768 px. El arreglo es heurístico (§4.6).

### 8.2 Contenido — CERRADO (2026-08-25): veredicto negativo

El Agente 2 dictaminó sobre las tres preguntas de `ENCARGO_AGENTE_2_CONTENIDO.md` §2 (texto completo del veredicto ahí). Resumen:

1. **Fidelidad no homogénea.** Donde el canvas recorta prosa explicativa (02, 03, 06 — 73-78 % conservado) es condensación legítima. Donde cae a ~50 % (05, 09, 13), el recorte cambia lo que se afirma, no solo cómo se dice.
2. **Los pasajes perdidos en 05/09/13 no eran prescindibles.** El caso más grave: la estación 09 pierde los cinco respaldos bíblicos explícitos de la expiación sustitutoria — doctrina IPHC nuclear — y queda sin ellos.
3. **La ausencia total de calibración A–F es línea roja, no un matiz de estilo.** Sin ella el lector no puede distinguir cita directa, síntesis del Atlas y posición confesional discutida. El daño se concentra donde más pesa: el 100 % de los bloques `iphc` y `pentecostal` pierde a la vez etiqueta y pasajes, volviendo indistinguible la voz confesional de la exégesis.

**Decisión derivada:** el contenido del canvas (`ST`) **queda descartado como texto publicable, en las 13 estaciones** — el veredicto de línea roja en calibración no se limita a 05/09/13. El canvas se congela como **laboratorio visual únicamente**. De él se puede portar diseño (portada, rail, paleta) pero **nunca prosa**, sin pasar antes por calibración A–F completa y verificación de pasajes.

### 8.3 Trabajo técnico que queda abierto

Ninguno de los P0/P1/P2 técnicos identificados sigue abierto en el canvas. Lo que resta es diseño (§8.1) y, del lado de producción, decidir si se portan los elementos visuales aprobados en §8.2 (portada, rail) — pendiente de que Moisés lo confirme como encargo explícito.

---

## 9. Diagnóstico aparcado: URL y distribución

Se deja registrado aunque no haya trabajo asociado, porque es la regresión de marketing más cara del v2 y la más barata de arreglar el día que interese.

`push()` llama a `history.pushState({ atlas: next }, "")` **sin tercer argumento**. El historial guarda el estado pero la barra de direcciones no se mueve nunca. Consecuencias, todas de negocio:

- No hay enlace compartible a una estación concreta.
- No hay nada indexable por estación: una sola URL para trece piezas de contenido de fondo.
- No hay analítica por estación: imposible saber cuál se lee y cuál se abandona.
- No hay `og:image` ni `og:title` por estación.

Producción ya lo resuelve con `#estacion-N` (`app.js:1442`).

Sigue igualmente abierto en producción, sin cambios: no existen `robots.txt` ni `sitemap.xml`, e `index.html` no declara favicon ni `og:image`.

---

## 10. Lo que el v2 aporta y producción no

Para que el balance quede completo, porque el grueso de este documento son defectos:

- **La portada convierte mejor.** Titular, subtítulo de una línea (*«Trece estaciones. Cada una responde a una pregunta.»*) y dos llamadas a la acción claras. Frente a la matriz de 7×13 de producción, que es más rica pero exige entender un sistema antes de leer nada.
- **El rail de 13 segmentos** resuelve posición, progreso y navegación en 44 px de alto.
- **La jerarquía de lectura por estación** es más clara.

Con un matiz honesto: el rail marca como recorrido todo lo que está antes de la estación actual. Eso es *posición*, no *lectura*. Producción persiste progreso real. El indicador del v2 es más bonito y menos veraz.
