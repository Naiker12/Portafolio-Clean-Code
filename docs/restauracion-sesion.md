# Restauración al recargar

El estado de vista se guarda en sessionStorage por pestaña. Recargar conserva el acceso al escritorio, ventanas abiertas, foco, posiciones, minimización/maximización, lanzador y búsqueda, pestaña de cada proyecto, sección de Configuración, página/zoom del CV y desplazamiento de ventanas. Las preferencias de apariencia continúan en localStorage.

Los registros de ventanas se validan y se ajustan al tamaño actual de pantalla. Se descartan aplicaciones desconocidas, posiciones inválidas y duplicados. Un almacenamiento bloqueado no impide usar el escritorio. Una pestaña nueva sin sesión previa muestra la bienvenida.

Se incorporaron nueve proyectos en total. Los nuevos son [Sparta Agent](https://github.com/Naiker12/Sparta-Agent), aplicación de escritorio con agentes por API, y [AUTEM](https://github.com/Naiker12/AUTEM), plataforma inmobiliaria con visualización 3D y mapas. Sus descripciones y tecnologías se consultaron en los repositorios. Sus iconos y portadas SVG son ilustraciones originales; las portadas se identifican como presentaciones visuales, no capturas de las aplicaciones.

Verificación: recarga de Sparta maximizado en Detalles; AUTEM con otra ventana abierta; página 2 del CV al 125 %. Siete pruebas del gestor/restauración, ESLint y compilación correctos.
