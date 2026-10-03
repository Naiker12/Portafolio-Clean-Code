# Visores de documentos y capturas

El CV utiliza PDF.js, cargado únicamente al abrir la aplicación. Muestra el PDF original con navegación de páginas, zoom de 50–200 %, ajuste al ancho, descarga y enlace alternativo. El renderizado se cancela al cambiar de página o cerrar la ventana. El texto extraído identifica la página para lectores de pantalla; el canvas no permite seleccionar texto ni seguir los enlaces del PDF, para ello está disponible «Abrir PDF».

El worker, mapas de caracteres y fuentes se copian desde la dependencia bloqueada con `scripts/sync-pdf-assets.mjs` antes de `dev` y `build`. No dependen de una CDN. Estos archivos generados no se versionan.

Cada proyecto dispone de una captura real en el repositorio. «Ampliar captura» abre un diálogo modal con cierre por botón, Escape o clic sobre el fondo, devolviendo el foco al botón original.

Validación en navegador: renderizado de las dos páginas, ampliación al 125 %, ajuste al ancho y vista a 390 px sin desbordamiento horizontal. Apertura de captura DragonBall y cierre por Escape con retorno de foco. TypeScript, ESLint y build de producción correctos.

Referencia de implementación: [ejemplo oficial de PDF.js](https://github.com/mozilla/pdf.js/blob/master/examples/learning/prevnext.html).
