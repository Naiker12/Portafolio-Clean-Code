# Primera parte: base limpia

## Cambios implementados

- Las nueve secciones actuales están en `features/portfolio/components`.
- Proyectos, experiencia, redes, categorías de habilidades y órbitas tecnológicas están separados del JSX en `features/portfolio/data`, con tipos en `model/content.ts`.
- Los siete proyectos conservan sus descripciones, tecnologías y enlaces; ahora tienen identificador estable y categoría web, móvil o escritorio.
- Los ocho efectos visuales pasaron de `components/ui` a `components/effects`. El proveedor de tema está en `components/providers` y los iconos de redes/categorías en `components/icons`.
- Fotos y capturas se consolidaron en `public/images`, y SVG locales en `public/icons/technologies`. Se retiraron 23 copias después de comparar SHA-256. Los recursos originales se conservaron mediante movimientos; las importaciones se actualizaron.
- `lib/assets.ts` centraliza el prefijo de producción y la resolución de recursos públicos; el CV usa `/cv-naiker.pdf` en desarrollo y `/Portafolio-Clean-Code/cv-naiker.pdf` en producción.
- Se retiró `ignoreBuildErrors`. Se corrigieron errores de lint y tipos sin desactivar sus reglas.
- `useHydrated` comparte la comprobación de hidratación mediante snapshots de servidor/cliente para los componentes que dependen del tema.
- El efecto de estrellas usa partículas en lugar de una clase dentro del hook y cancela el temporizador de resize al desmontar.
- Se mantuvo Framer Motion como única dependencia directa de animación y se retiró la dependencia directa `motion` que no tenía consumidores.
- Se añadió `npm run typecheck`; el workflow de Pages usa `npm ci`, lint y tipos antes del build.

## Verificación

- `npm ci` completado desde el lockfile.
- ESLint sin errores ni advertencias.
- TypeScript sin errores.
- Build estático de producción completado.
- Comprobación de ruta del CV y existencia de nueve recursos importados en el HTML exportado.

## Próxima etapa

La interfaz sigue siendo el portafolio actual. El siguiente módulo será el escritorio mínimo con registro de aplicaciones, barra superior, dock y primera ventana de Sobre mí. shadcn/ui conserva su configuración y sus primitivas se añadirán cuando exista un consumidor. No se implementaron aún ventanas, arranque ni ajustes.

Los iconos remotos de Devicon presentes en las órbitas se conservaron; su descarga y registro de licencias quedan para la etapa de iconos. Esta reorganización no supone una revisión visual completa en navegador.
