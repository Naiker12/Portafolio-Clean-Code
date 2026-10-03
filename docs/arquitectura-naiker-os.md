# Naiker OS: análisis y arquitectura

## Alcance de esta primera etapa

**Actualización:** la base limpia ya está implementada. Consulta `base-limpia.md` y `estructura-organizada.md` para el estado posterior a la reorganización. El diagnóstico siguiente corresponde al inventario inicial.

Inventariar el repositorio y definir la transformación del portafolio a un escritorio inspirado en Ubuntu. Las nueve imágenes son referencias visuales; el contenido y las tecnologías reales de los proyectos provienen del repositorio. Este documento propone la estructura futura, no describe componentes ya implementados.

## Estado comprobado

- Next.js 16.1.1, React 19.2.3, TypeScript estricto y Tailwind CSS 4.
- shadcn/ui configurado en `components.json`, estilo new-york, variables CSS y alias `@/components/ui`. No hay todavía primitivas Button, Input, Dialog, Switch o Tabs.
- Lucide React instalado para iconos de interfaz. Hay SVG de tecnologías locales y referencias externas a Devicon. No se encontró una dependencia de SVGL.
- `framer-motion` y `motion` figuran como dependencias directas; el código actual importa Framer Motion. Elegir una sola entrada al migrar y actualizar todos los consumidores antes de retirar la otra.
- next-themes y utilidades `cn` disponibles.
- Página actual de secciones: Navbar, Hero, RibbonSection, Experience, About, Projects, Skills, Contact y Footer.
- Ocho componentes visuales personalizados dentro de `components/ui`; deben distinguirse de las primitivas de interfaz.
- Siete proyectos con imágenes, descripción, tecnologías y enlaces; CV local en `public/cv-naiker.pdf`.
- Recursos duplicados entre `app/assets` y `public`; el inventario incluye coincidencias verificadas por SHA-256.
- No hay gestor de ventanas, escritorio, lanzador ni persistencia de ajustes implementados.

## Problemas que resolver antes de la migración

1. `next.config.ts` omite errores de TypeScript durante el build. Retirar esa excepción después de resolver los errores reales.
2. `getAssetPath` añade siempre `/Portafolio-Clean-Code`, aunque `basePath` solo se activa en producción: centralizar esa decisión para que los recursos funcionen también en desarrollo.
3. Datos de proyectos, experiencia, tecnologías y contactos mezclados con JSX: extraerlos a módulos tipados antes de reutilizarlos en las aplicaciones.
4. `components/ui` mezcla efectos decorativos con controles. Separar ambas responsabilidades.
5. El script `deploy` hace add, commit y push de todo el árbol: no usarlo para validar ni para organizar el código.
6. No existe `node_modules` en esta revisión. La lectura del código no confirma que lint, tipos o build pasen.

## Estructura objetivo

```text
app/
  layout.tsx                   # Metadatos, fuentes y providers
  page.tsx                     # Entrada a Naiker OS
  globals.css                  # Tailwind y tokens compartidos
features/
  desktop/
    components/                # DesktopShell, TopBar, Dock, Wallpaper
    hooks/                     # Reloj y atajos de escritorio
    model/                     # Registro de apps y tipos compartidos
  session/
    components/                # BootScreen y WelcomeScreen
    model/                     # Estados boot, welcome, desktop
  window-manager/
    components/                # WindowFrame y ActivitiesOverview
    hooks/                     # Acciones de ventana
    model/                     # Reducer, foco, posición, tamaño y orden
  launcher/
    components/                # AppLauncher y búsqueda
  settings/
    components/                # Apariencia y accesibilidad
    hooks/                     # Persistencia de preferencias
    model/                     # Tema, acento, fondo, movimiento y dock
  portfolio/
    apps/
      about/                   # Perfil, tecnologías, contacto
      projects/                # Explorador, filtros y detalle
      cv/                      # Visor y descarga
    data/                      # Proyectos, perfil, tecnologías, enlaces
    model/                     # Tipos de contenido
components/
  ui/                          # Primitivas shadcn/ui
  effects/                     # Efectos visuales reutilizables existentes
  icons/                       # AppIcon y TechnologyIcon
  providers/                   # ThemeProvider y preferencias
  widgets/                     # ClockWidget y WelcomeNotification
lib/
  utils.ts                     # cn
  assets.ts                    # Resolución centralizada de recursos
public/
  images/profile/
  images/projects/
  icons/technologies/
  wallpapers/
  cv-naiker.pdf
docs/
  estructura-actual.md
  arquitectura-naiker-os.md
```

Crear cada directorio cuando tenga su primer módulo; evitar carpetas vacías. Durante la transición, conservar las secciones actuales hasta sustituir sus consumidores. Mantener `app` para rutas y composición, y concentrar el comportamiento en `features`. Las primitivas no deben importar funcionalidades del escritorio.

## Lectura funcional de las nueve referencias

| Referencia | Función | Decisión de implementación |
| --- | --- | --- |
| 1 | Arranque con marca y progreso | Introducción corta, omisible y sin bloquear el acceso al contenido |
| 2 | Escritorio, accesos, dock y bienvenida | DesktopShell con registro único de aplicaciones |
| 3 | Acceso de visitante | Pantalla de bienvenida sin pedir contraseña real |
| 4 | Explorador de proyectos | Filtros, búsqueda, selección y panel de detalle |
| 5 | CV y ajustes simultáneos | Ventanas independientes y preferencias persistentes |
| 6 | Lanzador de aplicaciones | Búsqueda por nombre y navegación con teclado |
| 7 | Vista de actividades | Mostrar ventanas abiertas; seleccionar, enfocar o cerrar |
| 8 | Detalle y vista previa de proyecto | Imagen local; demo externa cuando exista un enlace real |
| 9 | Sobre mí | Reutilizar perfil, tecnologías y contacto existentes |

Las referencias varían en posición del dock y controles. Adoptar un diseño consistente: barra superior delgada, dock inferior, fondos morados y naranja de acento; ventanas oscuras con controles uniformes. Los proyectos móviles existentes deben conservar su categoría real aunque una referencia los muestre como web.

## Reglas de comportamiento y calidad

- Un registro tipado de aplicaciones alimenta accesos, dock y lanzador.
- Un reducer controla abrir, cerrar, minimizar, restaurar, maximizar y enfocar; no duplicar estado por cada componente.
- Separar estado temporal de ventanas de preferencias persistentes. Leer almacenamiento solo en cliente y tolerar que no esté disponible.
- Escritorio con ventanas en pantallas grandes; aplicaciones a pantalla completa y navegación táctil en móvil.
- Foco visible, botones con nombres accesibles, Escape para overlays y devolución del foco al cerrarlos. No tratar todas las ventanas como diálogos modales.
- Respetar `prefers-reduced-motion` y el ajuste de animaciones. El contenido debe seguir accesible al omitir la introducción.
- Reloj con zona America/Bogota, sin copiar fechas estáticas de las imágenes y evitando diferencias de hidratación.
- Indicadores de red, volumen y batería son decorativos salvo que se implemente una API real; no presentar lecturas ficticias como datos del dispositivo.
- SVG de tecnologías locales con origen y licencia registrados. Lucide para controles; Motion para microinteracciones de interfaz. No hace falta un framework de video para estas animaciones.
- No asumir que las demos aceptan iframes: usar capturas locales y abrir enlaces externos con seguridad.
- Conservar exportación estática para GitHub Pages; no introducir funciones de servidor incompatibles.

## Orden de trabajo

1. **Inventario y arquitectura:** esta etapa; archivos actuales, duplicados y mapa de funcionalidades.
2. **Base limpia:** instalar dependencias desde el lockfile, medir lint/tipos/build, extraer datos, unificar rutas de assets y resolver errores. Consolidar recursos tras actualizar todos sus consumidores.
3. **Primitivas:** añadir desde shadcn/ui solo Button, Input, Tabs, Switch, Tooltip, DropdownMenu y Select conforme se necesiten. No reinicializar la configuración existente ni instalar una colección completa de widgets.
4. **Escritorio mínimo:** wallpaper, barra superior, dock y registro de aplicaciones; abrir una primera ventana de Sobre mí.
5. **Gestor de ventanas:** foco, minimizar/restaurar, maximizar, mover, límites de pantalla y actividades.
6. **Aplicaciones:** proyectos con datos reales, CV, tecnologías y contacto.
7. **Ajustes y bienvenida:** persistencia, accesibilidad, notificaciones e introducción omisible.
8. **Verificación:** teclado, móvil, movimiento reducido, recursos bajo basePath y build estático. Pruebas de reducer para transiciones de ventanas y pruebas de navegación para abrir, minimizar y restaurar.

El siguiente resultado verificable debe ser la base limpia y una primera ventana funcional; luego se amplía el sistema por módulos.
