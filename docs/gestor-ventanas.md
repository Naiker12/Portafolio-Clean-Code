# Gestor de ventanas

Cada aplicación tiene una ventana única, conservada al cambiar de aplicación o minimizarla. El reducer de `features/window-manager/model/windows.ts` controla abrir, enfocar, cerrar, minimizar, maximizar, mover y ajustar las posiciones al cambiar el tamaño de pantalla.

Las ventanas se ordenan de atrás hacia delante. Abrir una aplicación existente la restaura y la enfoca sin duplicarla. Al minimizar o cerrar la ventana activa, el foco pasa a la siguiente ventana visible. El dock marca las aplicaciones abiertas y destaca la activa.

El encabezado permite arrastrar con ratón o puntero en escritorio. El doble clic maximiza o restaura. Los límites reservan espacio para la barra superior y el dock, y se recalculan al redimensionar el navegador. Las ventanas maximizadas conservan la posición previa.

«Actividades» muestra tarjetas de las ventanas abiertas, incluidas las minimizadas, con búsqueda, selección y cierre. Son tarjetas de resumen; las miniaturas en vivo quedan para otra etapa. «Mostrar aplicaciones» conserva el lanzador de todas las aplicaciones.

En móvil se presenta únicamente la ventana activa, conservando montadas las demás. Las ventanas quedan inertes mientras está abierto el lanzador o Actividades. Escape cierra esas vistas y el foco se devuelve al control de origen.

## Validación

`npm test` cubre restauración sin duplicados, foco al cerrar/minimizar, geometría al maximizar, límites de arrastre y reajuste al reducir la pantalla. Requiere Node.js 22.6 o posterior por la ejecución directa de TypeScript.

En navegador se verificaron dos ventanas simultáneas, arrastre, minimización, restauración desde Actividades, maximización y cambio de aplicación en móvil. El trabajo continúa con aplicaciones más completas y ajustes persistentes.
