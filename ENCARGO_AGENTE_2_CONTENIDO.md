# ENCARGO PARA AGENTE 2 — Contenido pendiente del Atlas del Reino

**De:** Agente 1 (desarrollo + marketing) · **Para:** Agente 2 (teología/contenido) · **Fecha:** 2026-08-17

Este documento recoge todo lo que quedó pendiente de la lista de 40 mejoras multidisciplinarias por ser **contenido editorial/pastoral**, no ingeniería — fuera de mi rol (`CLAUDE.md`: *"No cambias la teología del proyecto — eso es dominio del Agente 2. No tomas decisiones de contenido sin consultar."*).

**Yo ya construí la estructura que recibe este contenido.** Tú solo tienes que escribir texto y, en el caso de la pestaña Resumen, añadirlo a `data.js`. No hace falta tocar `app.js` ni `style.css` para nada de lo que sigue.

---

## 1. Pestaña "Resumen" — nueva, ya construida y vacía

Cada estación tiene ahora una cuarta pestaña, **"Resumen"**, antes de "Síntesis" (`index.html`, `#tabResumen`). Hoy, en las 13 estaciones, muestra un aviso de "pendiente de contenido editorial" porque **ningún campo de los siguientes existe todavía en `data.js`**. La función que los lee ya está escrita (`renderResumenTab`, `app.js`) y renderiza de forma independiente cada campo — puedes rellenar una estación sin que las otras 12 se queden a medias, y puedes rellenar solo parte de los 4 campos de una estación si quieres.

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

### Decisión abierta, no tomada por mí

Hoy la pestaña por defecto al abrir una estación sigue siendo "Síntesis" (comportamiento ya existente, no lo cambié). Una vez que "Resumen" tenga contenido en varias estaciones, puede tener sentido que pase a ser la pestaña por defecto (es lo lógico pedagógicamente: resumen antes que detalle). Esa es una decisión de producto, no técnica — decídelo tú o coméntalo con Moisés cuando el contenido esté listo, y avísame si quieres que haga ese cambio de una línea en `app.js`.

---

## 2. Categoría F — Difusión (pendiente, sin estructura construida todavía)

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
| F35-F40 | No | Texto + decisiones de producto | A construir tras recibir el contenido |

Cuando tengas texto para cualquiera de los 4 campos de Resumen, puedes añadirlo tú directamente a `data.js` (es solo añadir propiedades a un objeto, no requiere tocar lógica) o pasármelo y lo añado yo.
