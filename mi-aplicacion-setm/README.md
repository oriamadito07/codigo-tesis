# Cuida tus tibias — app sobre el síndrome de estrés tibial medial (SETM)

App educativa para jóvenes deportistas sobre el síndrome de estrés tibial medial ("shin splints"): qué es, cómo prevenirlo, ejercicios de rehabilitación y un plan de recuperación por fases.

Funciona como web (React + Vite) y como app Android (APK generado con Capacitor). Todo el contenido, las fotos y las fuentes van dentro de la app, así que funciona sin internet.

## Pantallas

| Sección | Contenido |
|---|---|
| **Inicio** | Carrusel de fotos a pantalla completa, accesos a cada sección y medidor de dolor 0–10 con recomendación según el nivel. |
| **¿Qué es?** | Pestañas *Qué es* (explicación, cifras, anatomía), *Síntomas* (señales y cuándo ir al médico) y *Riesgos* (factores que se despliegan al tocar). |
| **Prevención** | Pestañas *Hábitos* (6 claves seleccionables) y *Calentamiento* (10 minutos con casillas; el progreso se guarda en el teléfono). |
| **Ejercicios** | 6 ejercicios con foto, filtrables por fase (fortalecimiento, estiramiento, propiocepción). Cada uno abre una ficha con pasos, consejo clave y temporizador. |
| **Recuperación** | Pestañas *Plan* (4 fases con tareas marcables y progreso total), *Alertas* (cuándo ir al médico) y *Consejos*. |

Detalles de interacción: transiciones según la dirección de la pestaña, efecto de onda al tocar, confeti al completar una fase o el calentamiento, vibración en Android, ficha de ejercicio que se cierra deslizando hacia abajo y botón atrás de Android integrado (la navegación usa el `#` de la URL).

## Tecnología

- **React 19 + Vite** — interfaz.
- **Lucide** (`lucide-react`) — iconos.
- **Archivo** y **Manrope** (`@fontsource-variable`) — tipografías incluidas en la app.
- **Capacitor 8** — empaqueta la web como app Android.
- Tailwind está instalado pero casi no se usa; los estilos están en `src/index.css`.

## Estructura

```
mi-aplicacion-setm/
├── src/
│   ├── App.jsx          # Toda la app: datos, pantallas y componentes
│   ├── index.css        # Estilos, colores (variables en :root) y animaciones
│   ├── main.jsx         # Punto de entrada de React
│   └── assets/          # Fotos (ver créditos abajo)
├── android/             # Proyecto Android generado por Capacitor (icono y tema propios)
├── capacitor.config.json
├── index.html
├── App.web-original.jsx     # Diseño original de la web, guardado como referencia
└── index.web-original.css
```

## Ejecutar en el ordenador

Requisitos: Node.js (LTS).

```bash
cd mi-aplicacion-setm
npm install
npm run dev
```

Abre `http://localhost:5173`. Para verla como en un móvil, usa las herramientas de desarrollador del navegador (F12 → vista de dispositivo).

## Generar el APK de Android

Requisitos: **JDK 21** y el **Android SDK** (plataforma 36 y build-tools). No hace falta Android Studio.

1. Indica dónde está el SDK en `android/local.properties` (este archivo no se sube a git):
   ```
   sdk.dir=C\:/ruta/al/Android/sdk
   ```
2. Compila la web y cópiala al proyecto Android:
   ```bash
   npm run build
   npx cap sync android
   ```
3. Genera el APK (con `JAVA_HOME` apuntando al JDK 21):
   ```bash
   cd android
   ./gradlew assembleDebug        # en Windows: gradlew.bat assembleDebug
   ```
4. El APK queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

Para instalarlo, pásalo al móvil y permite "Instalar apps de origen desconocido". Este APK de depuración sirve para probar. Para publicarlo en Google Play hay que generar uno de *release* firmado con una clave propia.

## Publicar la web en Vercel

`vercel.json` ya está configurado: en Vercel importa el repositorio, elige la carpeta `mi-aplicacion-setm` como raíz del proyecto y despliega (build `npm run build`, salida `dist`).

## Créditos de las fotos

| Foto | Autor y licencia |
|---|---|
| Inicio (chica entrenando) | Unsplash, licencia Unsplash |
| Fisioterapia, banda elástica, deportista, piernas con banda | Shixart1985, CC BY 2.0, Wikimedia Commons |
| Corredores calentando | Sgt. Bobby Yarbrough (USMC), dominio público |
| Hielo en la tibia | U.S. Navy, Jhi L. Scott, dominio público |
| Elevación de talones | GeorgeStepanek, CC BY-SA 3.0, Wikimedia Commons |
| Estiramiento | Sergio Savarese, CC BY 2.0, Wikimedia Commons |
| Rodillo | Roger Mommaerts, CC BY-SA 2.0, Wikimedia Commons |

Los créditos también aparecen dentro de la app, al pie de cada pantalla.

## Aviso

El contenido es educativo y no sustituye la evaluación de un médico o fisioterapeuta. Las cifras de prevalencia y efectividad que aparecen en la app deben verificarse con referencias científicas antes de usarla como recurso académico o clínico.
