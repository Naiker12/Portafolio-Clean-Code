# Bienvenida y primer escritorio

La ruta principal muestra la bienvenida de Naiker OS. Al pulsar «Entrar», seis puntos aparecen progresivamente, se muestra el estado de preparación y se pasa al escritorio en 1,9 segundos. La animación representa un acceso de visitante: no hay campo de contraseña ni se recopilan credenciales.

La vista prioriza un reloj grande y la fecha, sin botón para saltar la introducción. Con movimiento reducido, la espera baja a 100 ms. Los temporizadores se cancelan al desmontar la bienvenida y el foco pasa al título del escritorio.

## Módulos

- `features/session/components/naiker-session.tsx`: bienvenida y transición de estados.
- `features/session/components/session.css`: apariencia y animaciones de entrada.
- `features/desktop/components/wallpaper.tsx`: fondo SVG original, sin descargas ni dependencias externas.
- `features/desktop/model/apps.ts`: registro común de perfil, CV, proyectos y ajustes.
- `features/desktop/hooks/use-clock.ts`: reloj en America/Bogota sin discrepancias de hidratación.
- `features/desktop/components/desktop-shell.tsx`: escritorio, dock, lanzador y controles de ventana.
- `features/desktop/components/desktop-app-content.tsx`: contenido básico reutilizando los datos existentes.

El escritorio incluye accesos, barra superior, dock, notificación descartable y búsqueda de aplicaciones. Una ventana puede abrirse, minimizarse, restaurarse, maximizarse y cerrarse. El CV ofrece descarga y apertura externa además del visor integrado. Los fondos Ubuntu y Noche se aplican durante la visita.

El escritorio ya permite varias ventanas, arrastre y Actividades con tarjetas de resumen; consulta `gestor-ventanas.md`. Las miniaturas en vivo y persistencia de ajustes quedan pendientes. Los componentes anteriores del portafolio se conservan en `features/portfolio/components`.

## Verificación

Se comprobaron en navegador la entrada animada, acceso directo, foco de ventana, minimizar/restaurar, maximizar/cerrar, búsqueda del lanzador, proyectos y enlaces del CV. Se revisó la bienvenida y los límites de ventana a 390 × 844 y la ventana a 1440 × 900. La consola no presentó errores durante estas comprobaciones.

## Organización de proyectos actualizada

El catálogo está en features/projects/data/catalog.ts, su tipo en features/projects/model/project.ts y la galería en features/projects/components/project-gallery.tsx. Las siete capturas están directamente en public/images, fuera de la antigua subcarpeta projects. Los enlaces y categorías se conservan.
