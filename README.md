# TurnoPro EU

Registros y entrega de turno para enfermería. Una sola base de código, dos salidas:
- **Android (APK)**: se genera en GitHub Actions (`.github/workflows/android.yml`).
- **Windows (instalador .exe)**: se genera en GitHub Actions (`.github/workflows/windows.yml`).

## Subir a GitHub
1. Crea un repositorio vacío en GitHub.
2. Sube todos los archivos de esta carpeta, incluidos los ocultos (`.gitignore` y `.github/`).
3. Ve a la pestaña **Actions**, elige el flujo y pulsa **Run workflow**.
4. Al terminar, descarga el artefacto (APK o instalador) desde la misma ejecución.

## Probar en tu computador
- `npm install`
- `npm start` abre la app de escritorio.
- `npm run sync` y luego `npx cap open android` para Android Studio.

## Antes de distribuir
- Cambia `cl.turnopro.eu` por el identificador de tu institución en `package.json` y `capacitor.config.json`.
- Los APK y los instaladores de este flujo no están firmados para tiendas. Para publicar en Google Play o distribuir a equipos del hospital, hay que añadir un keystore y firma de código.
- Los datos viven en cada dispositivo. Usa el respaldo para pasarlos de un equipo a otro.
- Sin probar en equipos reales: valida el flujo antes de usarlo en turno.
