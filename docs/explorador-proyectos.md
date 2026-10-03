# Perfil y explorador de proyectos

La foto proporcionada se conserva sin modificaciones en `public/images/profile/naiker.png`. `components/profile-avatar.tsx` la reutiliza en la bienvenida y en Sobre mí.

`features/projects/components/projects-app.tsx` implementa el explorador dentro de la ventana Proyectos. Incluye búsqueda por título o tecnología, categorías Todos/Web/Móvil/Escritorio, cantidad de resultados y recuperación cuando no hay coincidencias.

Seleccionar una tarjeta abre su detalle dentro de Naiker OS. La vista previa usa la captura real existente; Detalles muestra la descripción y tecnologías del catálogo. Volver a proyectos conserva los filtros y devuelve el foco a la tarjeta original. El gestor conserva esta selección al minimizar y restaurar la aplicación.

Los enlaces externos se distinguen según los datos existentes: demo web, presentación en YouTube o repositorio. No se inventan demos para los proyectos que solo tienen código ni se incrustan servicios externos. Solo se dispone de una captura por proyecto; la miniatura reutiliza esa captura.

Se comprobaron en navegador la apertura interna, cambio de vista, vuelta a la galería, categoría Web con dos resultados, búsqueda sin coincidencias y limpieza de filtros. El detalle a 390 píxeles no desborda horizontalmente.
