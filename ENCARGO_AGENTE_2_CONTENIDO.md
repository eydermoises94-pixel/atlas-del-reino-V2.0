# ENCARGO PARA AGENTE 2 — Contenido pendiente del Atlas del Reino

**De:** Agente 1 (desarrollo + marketing) · **Para:** Agente 2 (teología/contenido) · **Fecha:** 2026-08-17

Este documento recoge todo lo que quedó pendiente de la lista de 40 mejoras multidisciplinarias por ser **contenido editorial/pastoral**, no ingeniería — fuera de mi rol (`CLAUDE.md`: *"No cambias la teología del proyecto — eso es dominio del Agente 2. No tomas decisiones de contenido sin consultar."*).

**Yo ya construí la estructura que recibe este contenido.** Tú solo tienes que escribir texto y, en el caso de la pestaña Resumen, añadirlo a `data.js`. No hace falta tocar `app.js` ni `style.css` para nada de lo que sigue.

---

## 1. Pestaña "Resumen" — CERRADO (2026-08-25)

Las 13 estaciones tienen ya sus 4 campos (`resumenLinea`, `audiencia`, `preguntasReflexion`, `fraseCitable`) en `data.js`, añadidos en el commit `b5f285a`. Verificado: sintaxis correcta, las 13 completas, y renderiza bien en producción (sin el aviso de "pendiente de contenido editorial", los 4 bloques visibles en la pestaña Resumen de cada estación). No queda nada pendiente aquí.

<details>
<summary>Especificación original (referencia, ya no aplica)</summary>

Cada estación tiene una cuarta pestaña, **"Resumen"**, antes de "Síntesis" (`index.html`, `#tabResumen`). La función que los lee está escrita (`renderResumenTab`, `app.js`) y renderiza de forma independiente cada campo — se puede rellenar una estación sin que las otras 12 se queden a medias, y rellenar solo parte de los 4 campos si se quiere.

### Campos a añadir en `data.js`

Dentro de cada objeto de `STATIONS` (junto a `id`, `title`, `question`, `color`, `icon`, `synthesis`), añade los que quieras rellenar:

```js
{
  id: 0,
  title: "El Centro Absoluto: La Identidad del Rey",
  question: "¿Quién es el Rey y qué revela sobre Dios?",
  color: "#C75B2A",
  icon: stationIcons[0],

  // ─── NUEVO — pestaña Resumen, todos opcionales ───
  resumenLinea: "…",              // string, ver 1.1
  audiencia: "…",                 // string, ver 1.2
  preguntasReflexion: ["…", "…"], // array de strings, ver 1.3
  fraseCitable: "…",              // string, ver 1.4

  synthesis: `...`,
}
```

### 1.1 `resumenLinea` — mejora D23

Una sola frase que resuma la estación de un vistazo, antes de leer el resto. Se muestra grande, arriba del todo de la pestaña.

- Extensión orientativa: **una frase, ~15-25 palabras**. No es un titular de periódico ni un eslogan — es la idea central en una frase completa.
- Ejemplo de tono (no lo copies, es solo formato): *"El Reino no es un lugar al que se llega, es un Rey al que se reconoce — y eso lo cambia todo."*

### 1.2 `audiencia` — mejora D26

Una nota corta que ayude a decidir si esta estación es lo que se busca ahora mismo. Piensa en dos lectores distintos del Atlas: el pastor preparando un sermón y el estudiante profundizando por su cuenta.

- Extensión orientativa: **1-2 frases**.
- Debe responder implícitamente: ¿para qué situación sirve especialmente esta estación?
- Ejemplo de tono (no lo copies): *"Útil si estás preparando una enseñanza sobre el 'ya pero todavía no', o si alguien te ha preguntado por qué Jesús no impuso el Reino por la fuerza."*

### 1.3 `preguntasReflexion` — mejora D27

De 2 a 4 preguntas abiertas para después de leer, pensadas tanto para estudio personal como para un grupo pequeño o una clase.

- No deben ser preguntas de repaso ("¿qué significa X?") sino de aplicación o reflexión personal.
- Se muestran como lista, en el orden del array.

### 1.4 `fraseCitable` — mejora D28

Una frase corta, autocontenida, pensada para compartir (redes, boletín de iglesia, cita al pie de una diapositiva).

- Extensión orientativa: **≤ 140 caracteres**, para que quepa tal cual en cualquier formato.
- Debe tener sentido leída sola, sin el resto de la estación alrededor.
- Puede ser una frase ya existente dentro de `synthesis` (muchas estaciones ya tienen frases con ese punch — ej. estación 13: *"El Rey que murió reina para siempre"*) o una nueva.

### Verificación de tu trabajo

No necesitas herramientas especiales: abre `index.html` en un navegador (o sirve la carpeta con `python -m http.server` y abre `http://localhost:PUERTO`), entra en cualquier estación, pulsa la pestaña "Resumen" y comprueba que se ve lo que escribiste. Si un campo no aparece, revisa que el nombre de la propiedad esté escrito exactamente igual que arriba (`resumenLinea`, no `resumenLine` ni `resumen_linea`).

</details>

### Decisión abierta, ahora sí aplicable — ¿pestaña por defecto?

Con las 13 completas, esto pasa de hipotético a real: hoy la pestaña por defecto al abrir una estación sigue siendo "Síntesis". Pedagógicamente tendría sentido que pasara a ser "Resumen" (resumen antes que detalle). Es una decisión de producto, no técnica — dime si quieres que haga ese cambio de una línea en `app.js`.

---

## 2. Categoría G — Auditar el contenido del canvas v2 contra `data.js` (URGENTE, precisión teológica)

### Por qué esto existe

Además de `index.html`/`app.js`/`data.js` (lo que está publicado en GitHub), hay un segundo Atlas: un canvas interactivo en Claude Design (`Atlas del Reino v2.dc.html`), con las mismas 13 estaciones pero **redactadas de nuevo, no copiadas**. Nació como maqueta visual, pero ahora tenemos dos redacciones distintas de tu teología viviendo en dos sitios, y eso no puede quedar sin resolver — cuantos más días pase, más caro será reconciliarlas. La decisión de qué hacer con el canvas (¿se descarta el contenido? ¿se recupera parte a `data.js`? ¿producción se queda como está?) es tuya, pero antes de tomarla necesitas saber qué se conservó y qué se perdió. Eso es este encargo.

**Dato que tranquiliza antes de entrar en detalle:** los 13 títulos y las 13 preguntas de estación son **idénticos** en las dos versiones — cero divergencia ahí. Lo que cambia es la redacción del cuerpo y el aparato que lo rodea.

### El panorama en cifras

| # | Producción (caracteres) | Canvas (caracteres) | Canvas / Prod | Enseñanzas indexadas en `EVENTS` |
|---|---|---|---|---|
| 01 — El Centro Absoluto | 2.262 | 1.457 | 64 % | 5 |
| 02 — La Necesidad del Reino | 1.988 | 1.551 | 78 % | 5 |
| 03 — La Llegada del Reino | 1.996 | 1.519 | 76 % | 5 |
| 04 — La Entrada al Reino | 2.170 | 1.514 | 70 % | 6 |
| 05 — La Naturaleza Interna | 2.633 | 1.338 | **51 %** | 7 |
| 06 — Dinámica de Crecimiento | 2.614 | 1.901 | 73 % | 7 |
| 07 — Señales Visibles | 3.000 | 1.605 | 54 % | 8 |
| 08 — El Conflicto del Reino | 3.002 | 1.597 | 53 % | 7 |
| 09 — La Cruz como Evento Central | 3.018 | 1.435 | **48 %** | 5 |
| 10 — Resurrección y Exaltación | 2.940 | 1.638 | 56 % | 4 |
| 11 — Después de la Resurrección | 2.900 | 1.579 | 54 % | 3 |
| 12 — La Misión Global | 3.169 | 1.830 | 58 % | 4 |
| 13 — La Consumación Final | 5.321 | 1.566 | **29 %** | 4 |
| **Total** | **37.013** | **20.530** | **55 %** | **70** |

El canvas conserva de media el 55 % del volumen de prosa de cada estación — no es un resumen brutal, es una condensación a más o menos la mitad. Las tres que más recortaron, y por tanto las que pido que mires primero, son **13 (29 %)**, **09 (48 %)** y **05 (51 %)**.

### Lo que desapareció por completo, en las 13 estaciones

No es solo volumen de texto: es andamiaje editorial entero.

| Recurso | Producción | Canvas |
|---|---|---|
| Etiquetas de calibración epistemológica (`epiTag`) | 42 | **0** |
| Términos de glosario enlazados en el cuerpo | 78 | **0** |
| Pasos de desarrollo (`flow-step`) | 21 | **0** |
| Subtítulos internos (`h4`/`h5`) | 74 | **0** |

Las categorías de `epiTag` que se pierden son: `atlas`, `exegesis`, `sintesis`, `pentecostal`, `iphc`. Es decir, el canvas no distingue en ningún punto qué es lectura exegética directa, qué es síntesis del propio Atlas, y qué es la lectura confesional pentecostal/IPHC — la calibración A–F que es la prioridad nº 2 de `CLAUDE.md` no existe ahí.

### Pasajes bíblicos: el dato bueno

De 79 pasajes citados en producción, **64 se conservan en el canvas** (81 %). Solo 15 desaparecen y 1 se añade (`Mt 28:16-20` en la estación 12, que además ya está en producción — solo que citado en otra estación). El aparato bíblico sobrevivió casi entero a la condensación.

Las pérdidas concentradas que sí conviene que revises con lupa:

- **Estación 05 (Naturaleza Interna del Reino):** pierde `Gá 5:22-23` (fruto del Espíritu), `Jn 3:3` (nuevo nacimiento), `Mt 5:8` (bienaventuranza de los limpios de corazón). También pierde 10 términos de glosario, entre ellos las seis palabras que dan estructura a esa estación: Amor, Humildad, Justicia, Perdón, Santidad, Servicio.
- **Estación 09 (La Cruz):** pierde `1 P 2:24`, `2 Co 5:21`, `Ef 1:7`, `Heb 10:19-20`, `Ro 3:25` — cinco pasajes que son, en conjunto, el respaldo bíblico directo de la doctrina de la expiación sustitutoria. Es la estación donde más me preocupa que la condensación haya tocado algo doctrinal, no solo estilístico.
- **Estación 13 (Consumación Final):** pierde `1 Co 15:24-25`, `Ap 21:5`, `Mt 8:11-12`, `Ro 11:17-24`, `Ro 11:25-27` — los dos últimos son el pasaje del olivo/injerto de Romanos 11, relevante para cómo el Atlas trata la relación Israel-Iglesia en la consumación. Es también la estación con menor porcentaje de texto conservado (29 %) y con 8 términos de glosario perdidos, incluida la frase de cierre `"El Rey que murió reina para siempre y jamás habrá más muerte, ni llanto, ni dolor."`.

El detalle completo, estación por estación (qué etiqueta de calibración se pierde, qué términos de glosario, qué pasaje exacto), está en `AUDITORIA_CANVAS_V2.md`, y te lo puedo pasar también como lista aparte si prefieres no cruzar los dos documentos.

### Lo que te pido

No es reescribir nada todavía. Es dictaminar, estación por estación o de forma global si el patrón es homogéneo:

1. ¿La condensación a ~55 % del texto es fiel, o en algún punto cambia lo que se afirma y no solo cómo se dice?
2. Para las estaciones 05, 09 y 13 en concreto: ¿los pasajes perdidos eran prescindibles en una versión más breve, o sostenían algo que sin ellos queda sin respaldo explícito (especialmente el caso de la expiación en la estación 09)?
3. ¿La ausencia total de calibración epistemológica en el canvas es aceptable en un formato "condensado", o es una línea roja — es decir, ningún texto sin calibración A–F debería circular con tu nombre, sea cual sea el canal?

Con tu respuesta a esas tres, la decisión de qué hacer con el canvas (congelarlo tal cual está, portar partes de vuelta a `data.js`, o descartar su contenido y quedarnos solo con su diseño visual) se toma sola.

---

### Respuesta recibida (2026-08-25) — VEREDICTO: contenido del canvas NO apto tal cual

**1. ¿La condensación es fiel?** No de forma homogénea. Donde recorta prosa explicativa (est. 02, 03, 06 — 73-78 % conservado) es condensación legítima. Donde cae al ~50 % (05, 09, 13), el recorte cambia lo que se afirma, no cómo se dice. En la estación 09, la diferencia entre "el poder se ejerce desde la cruz" con y sin el párrafo de expiación no es de estilo: es la diferencia entre una cristología de la cruz completa y una parcial.

**2. ¿Eran prescindibles los pasajes perdidos?** No. Los tres bloques (05, 09, 13) son exactamente el tipo de material que no se puede omitir "por brevedad", porque su omisión no deja un hueco visible — deja una afirmación que parece completa y no lo es. El caso de la estación 09 es el más serio: la expiación sustitutoria es doctrina IPHC nuclear, y en el canvas queda sin respaldo bíblico explícito.

**3. ¿La ausencia de calibración A–F es línea roja?** Sí, y es la más importante de las tres. Un texto sin calibrar no es "menos preciso": es epistemológicamente mudo. El lector no puede distinguir Jn 12:24 citado (nivel A) de "la cruz es el verdadero trono" (síntesis del Atlas, nivel C) de la lectura premilenial de Romanos 11 (posición confesional discutida, nivel D). El daño se concentra donde más duele: el 100 % de los bloques `iphc` y `pentecostal` pierde a la vez su etiqueta y sus pasajes, con lo que la voz confesional se vuelve indistinguible de la exégesis — precisamente la falacia que el sistema A–F existe para impedir. **Ningún texto sin calibrar debería circular con el nombre de Moisés, sea cual sea el canal.**

**Decisión que se deriva de este veredicto:** el contenido del canvas (`ST` en `Atlas del Reino v2.dc.html`) **queda descartado como texto publicable**, en las 13 estaciones y no solo en 05/09/13 — el veredicto de "línea roja" en calibración aplica por igual a las que sí conservaron buen volumen (02, 03, 06). El canvas se congela como **laboratorio visual únicamente**: de él se puede portar diseño (estructura de portada, rail de navegación, paleta) pero **nunca prosa**, a `data.js` o a ningún otro sitio, sin pasar primero por calibración A–F completa y verificación de pasajes. Registrado también en `AUDITORIA_CANVAS_V2.md` §8.

---

## 3. Categoría F — Difusión (pendiente, sin estructura construida todavía)

A diferencia de la pestaña Resumen, esto **no tiene ningún andamiaje construido aún** — son piezas nuevas, algunas de página completa. Te las dejo especificadas para que definas el contenido; el HTML/CSS lo construyo yo cuando haya texto que meter dentro, no antes (así no diseño en el vacío).

### F35 — Página "Cómo citar este Atlas"

Formato de cita académica (APA y/o Chicago) para el Atlas en general y, si tiene sentido, por estación individual. Necesito de ti: autor(es) a citar, año, cómo quieres que aparezca el nombre del proyecto, y si cada estación se cita como capítulo independiente o el Atlas se cita como un todo.

### F36 — Sección "Metodología y fuentes"

Qué comentaristas y fuentes se han usado, qué criterios de selección, en qué tradición interpretativa se inscribe el Atlas (esto ya se insinúa en el cierre de la estación 13, pero ahí es parte de la confesión teológica, no una página de metodología aparte). Necesito de ti: el texto completo de esta sección.

### F37 — Canal de corrección/sugerencia

Un formulario o enlace de contacto para que académicos o pastores señalen un error o matiz. Necesito de ti: decidir el canal (¿email directo? ¿formulario? ¿a qué dirección llega?) — la implementación depende de esa decisión.

### F38 — Nota de versión / changelog visible

Un "última revisión: [fecha]" visible en la app. Necesito de ti: si quieres que sea solo una fecha o un changelog con qué cambió en cada revisión (esto último implica que vayas anotando cambios de contenido según los hagas).

### F39 — Paquete de recursos para el aula

Un PDF o guía derivada del mismo contenido, pensada para que un seminario la use en clase. Necesito de ti: a qué público va dirigido exactamente y si quieres que parta del contenido ya escrito (yo puedo generar un PDF a partir de lo que ya existe) o si va a llevar texto nuevo.

### F40 — Newsletter/boletín para pastores

Necesito de ti: contenido del primer envío y cadencia deseada — el resto (plataforma de envío, plantilla) es una decisión técnica que podemos resolver cuando haya texto.

---

## Resumen para retomar esto

| Ítem | Estructura construida | Qué falta | Dónde |
|---|---|---|---|
| Resumen (D23/26/27/28) | Sí — pestaña, render, CSS | Solo texto, por estación | `data.js`, dentro de cada objeto de `STATIONS` |
| **Auditoría del canvas v2 (Categoría G)** | **No aplica — es dictamen, no construcción** | **Tu veredicto en las 3 preguntas de §2** | **Condiciona qué se hace con `Atlas del Reino v2.dc.html`** |
| F35-F40 | No | Texto + decisiones de producto | A construir tras recibir el contenido |

Cuando tengas texto para cualquiera de los 4 campos de Resumen, puedes añadirlo tú directamente a `data.js` (es solo añadir propiedades a un objeto, no requiere tocar lógica) o pasármelo y lo añado yo.
