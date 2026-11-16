# Cuida tus tibias

App educativa para jóvenes deportistas sobre el **síndrome de estrés tibial medial (SETM)**, el dolor en la cara interna de la espinilla que muchos llaman *periostitis* o *shin splints*.

Explica qué es, cómo prevenirlo, qué ejercicios hacer y cómo volver a entrenar por fases. Funciona como **página web** y como **app Android (APK)**, y no necesita internet porque las fotos, las fuentes y los textos van dentro de la app.

## Qué incluye

- **Inicio**: carrusel de fotos, accesos a cada sección y un medidor de dolor del 0 al 10 que dice qué hacer según el nivel.
- **¿Qué es?**: explicación, cifras, anatomía, síntomas, cuándo ir al médico y factores de riesgo.
- **Prevención**: seis hábitos y un calentamiento de 10 minutos con casillas para marcar.
- **Ejercicios**: seis ejercicios con foto, pasos y temporizador.
- **Recuperación**: plan de 4 fases con tareas, progreso guardado en el teléfono y señales de alerta.

## Con qué se hizo

| Parte | Herramienta |
|---|---|
| Interfaz | React 19 |
| Compilación y servidor local | Vite 8 |
| App Android | Capacitor 8 (Android SDK 36, mínimo Android 7.0) |
| Iconos | Lucide |
| Tipografías | Archivo y Manrope (incluidas en la app) |
| Fotos | Wikimedia Commons y Unsplash, con licencia libre |
| Publicación web | Vercel (configurado en `vercel.json`) |

El detalle de cada herramienta, las decisiones de diseño y cómo se fue construyendo la app están en **[docs/COMO-SE-HIZO.md](docs/COMO-SE-HIZO.md)**.

## Probarla

```bash
cd mi-aplicacion-setm
npm install
npm run dev
```

Abre `http://localhost:5173`. Las instrucciones para generar el APK están en el [README de la app](mi-aplicacion-setm/README.md#generar-el-apk-de-android).

## Organización del repositorio

```
.
├── README.md                 # Este archivo
├── docs/
│   └── COMO-SE-HIZO.md       # Herramientas, diseño y proceso de desarrollo
└── mi-aplicacion-setm/       # La app
    ├── src/                  # Código (App.jsx), estilos (index.css) y fotos
    ├── android/              # Proyecto Android generado con Capacitor
    └── README.md             # Ejecutar, generar el APK, publicar y créditos de fotos
```

## Aviso

El contenido es educativo y no sustituye la evaluación de un médico o fisioterapeuta.
