# Personalización de Naiker OS

Configuración permite elegir Ubuntu, Noche o Minimal; un acento naranja, morado, azul o verde; y un dock pequeño, mediano o grande. Los accesos del escritorio pueden ocultarse y las animaciones pueden reducirse, incluida la espera de entrada.

La lógica está aislada en `features/preferences`. Las preferencias se almacenan con la clave `naiker-os-preferences-v1`, se validan al leerlas y se sincronizan entre pestañas. Si el navegador bloquea el almacenamiento, los controles siguen funcionando durante la visita. Restablecer apariencia únicamente cambia estas preferencias.

Validación: TypeScript, ESLint, compilación de producción y cuatro pruebas del gestor de ventanas. En el navegador se verificaron cambios de fondo, acento, dock, accesos y animaciones; persistencia después de recargar; restablecimiento; y ausencia de desbordamiento horizontal a 390 px.
