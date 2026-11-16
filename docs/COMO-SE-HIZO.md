# Cómo se hizo

Este documento explica con qué herramientas se construyó la app *Cuida tus tibias*, por qué se eligieron y cómo se pasó de una página web a una app Android.

## 1. Herramientas

### La app (lo que ve el usuario)

| Herramienta | Versión | Para qué se usa |
|---|---|---|
| [React](https://react.dev) | 19.3 | Construye la interfaz con componentes: cada pantalla, tarjeta, temporizador o carrusel es un componente. |
| [Vite](https://vite.dev) | 8.3 | Servidor local con recarga instantánea mientras se programa, y compilación final optimizada en la carpeta `dist/`. |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | 6.1 | Permite a Vite entender JSX, la sintaxis de React. |
| [Lucide](https://lucide.dev) (`lucide-react`) | 1.73 | Juego de iconos de línea, coherente entre sí. Solo se incluyen en la app los iconos que se usan. |
| [Fontsource](https://fontsource.org): Archivo y Manrope | 5.3 | Tipografías empaquetadas dentro de la app, para que se vean igual sin internet. **Archivo** (ancha y fuerte) se usa en títulos; **Manrope** en textos. |
| CSS propio (`src/index.css`) | — | Colores, espaciados y todas las animaciones. Sin librerías de animación: se usan transiciones y `@keyframes` de CSS. |
| Tailwind CSS, PostCSS, Autoprefixer | 3.4 / 8.5 / 10.6 | Venían en el proyecto original. Tailwind casi no se usa; se mantiene para no romper la configuración. |

### La app Android

| Herramienta | Versión | Para qué se usa |
|---|---|---|
| [Capacitor](https://capacitorjs.com) | 8.6 | Mete la web compilada dentro de una app Android nativa (un *WebView*). Así el mismo código sirve para web y para móvil. |
| Android SDK | plataforma 36, build-tools 36 | Herramientas de Google para compilar apps Android. La app funciona desde Android 7.0 (API 24). |
| Gradle / Android Gradle Plugin | 8.14 / 8.13 | Sistema que compila el proyecto Android y genera el APK. |
| JDK (Eclipse Temurin) | 21 | Java, necesario para Gradle. |

No hizo falta Android Studio: el SDK y Java se instalaron en versión portable y el APK se genera desde la terminal.

### Pruebas

| Herramienta | Para qué se usó |
|---|---|
| [Playwright](https://playwright.dev) con Microsoft Edge | Abrir la app simulando un móvil (390 × 844 px, pantalla táctil), tocar botones, pasar pestañas, iniciar el temporizador, usar el botón atrás y sacar capturas de cada pantalla. |

Estas pruebas encontraron, por ejemplo, que las tareas de Recuperación no se veían porque una clase CSS propia (`collapse`) chocaba con una clase de Tailwind con el mismo nombre. Se renombró a `acc-body`.

## 2. Diseño

### Colores

Paleta oscura y deportiva con un solo color de acento:

| Uso | Color |
|---|---|
| Fondo | Azul noche `#0B1026` |
| Tarjetas | `#151C3D` y `#1D2550` |
| Acento (botones, pestaña activa, progreso) | Degradado naranja `#FF7A45` → rosa `#FF3D7F` |
| Alertas | Rojo `#F43F5E` |
| Medidor de dolor | Escala verde → amarillo → naranja → rojo, porque ahí el color es la información |

Todos los colores están definidos como variables en `:root`, al principio de `src/index.css`.

### Estructura

- **Barra de pestañas flotante** abajo con las 5 secciones. La pestaña activa sube y se pinta con el degradado.
- **Cabecera con foto** en cada sección. En Inicio es un carrusel a pantalla completa, sin recuadro.
- **Pestañas internas** dentro de ¿Qué es?, Prevención y Recuperación, para no tener pantallas eternas.
- **Poco texto a la vista**: títulos cortos, y el detalle se abre al tocar.
- **Variedad de formatos**: carruseles horizontales, cuadrículas, filas desplegables y tarjetas de foto.

### Animaciones

- Transición entre secciones que entra desde el lado hacia el que te mueves.
- Carrusel de Inicio con fundido entre fotos, zoom lento y barras de progreso tipo historias.
- Efecto de onda al tocar botones y tarjetas.
- Indicador deslizante en las pestañas internas.
- Confeti y aviso al completar una fase de recuperación o el calentamiento.
- Ficha de ejercicio que sube desde abajo y se cierra deslizando hacia abajo.
- Temporizador con anillo de progreso y vibración al terminar.
- Todo se reduce al mínimo si el teléfono tiene activado "reducir movimiento".

### Fotos

Solo fotos reales de personas, sin ilustraciones. Se eligieron fotos con licencia libre (dominio público, CC BY, CC BY-SA y licencia Unsplash) y se guardaron dentro de la app. Los autores aparecen al pie de cada pantalla y en el [README de la app](../mi-aplicacion-setm/README.md#créditos-de-las-fotos).

## 3. Cómo funciona por dentro

- **Todo el código de la app está en `src/App.jsx`**: arriba los datos (ejercicios, hábitos, fases, escala de dolor) y debajo los componentes de cada pantalla.
- **Navegación con el `#` de la URL** (`#inicio`, `#ejercicios`, `#ejercicio-3`…). Gracias a eso el botón atrás de Android cierra la ficha de un ejercicio o vuelve a la sección anterior sin código extra.
- **El progreso se guarda en el teléfono** (`localStorage`): calentamiento, tareas de recuperación, pestaña elegida y filtro de ejercicios. No hay servidor ni cuentas.
- **Icono y arranque de la app**: el icono (un hueso blanco sobre el degradado) y la pantalla de arranque azul noche están definidos como recursos de Android en `android/app/src/main/res/`.

## 4. Proceso

1. **Punto de partida**: una web en React + Vite con fondo casi negro, acento verde lima y fotos cargadas desde internet.
2. **Rediseño como app móvil**: barra de pestañas abajo, cabeceras por sección, temporizador en los ejercicios y progreso guardado.
3. **Colores**: tras probar una primera paleta, se eligió el estilo "deportivo y enérgico" (azul noche con naranja y rosa) y después se redujo a un solo acento.
4. **Fotos**: se sustituyeron las ilustraciones por fotos reales de personas, buscadas en Wikimedia Commons y revisadas una a una.
5. **Estructura**: Inicio más corto, pestañas internas, textos más breves y carruseles.
6. **Textos**: se reescribieron los de "¿Qué es?" en un lenguaje directo y cercano, sin cambiar la información médica.
7. **Pruebas** en un móvil simulado después de cada cambio importante.
8. **APK**: se instalaron Java 21 y el Android SDK, se añadió Capacitor, se configuraron el icono y la pantalla de arranque, y se compiló con Gradle.

## 5. Pendiente

- Probar el APK en varios móviles reales.
- Generar un APK de *release* firmado para poder publicarlo en Google Play.
- Revisar las cifras médicas con referencias científicas antes de usar la app como recurso académico o clínico.
- La foto de elevación de talones tiene poca resolución; conviene sustituirla por una más grande.
