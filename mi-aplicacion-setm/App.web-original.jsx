import { useState } from "react";

const NAV_ITEMS = ["Inicio", "¿Qué es?", "Prevención", "Ejercicios", "Recuperación"];

const EXERCISES = [
  {
    id: 1,
    phase: "Fortalecimiento",
    title: "Elevaciones de pantorrilla",
    duration: "3 × 15 reps",
    level: "Básico",
    color: "#b5f23d",
    steps: [
      "Párate con los pies al ancho de los hombros cerca de un escalón o pared.",
      "Eleva lentamente los talones hasta estar en punta de pies (2 seg subida).",
      "Mantén 1 segundo en la cima, baja controlado en 3 segundos.",
      "Descansa 60 segundos entre series.",
    ],
    tip: "Si sientes dolor, reduce el rango de movimiento. La calidad > cantidad.",
    icon: "🦵",
  },
  {
    id: 2,
    phase: "Fortalecimiento",
    title: "Dorsiflexión con banda elástica",
    duration: "3 × 20 reps",
    level: "Básico",
    color: "#b5f23d",
    steps: [
      "Siéntate en el suelo con la pierna extendida y la banda en el metatarso.",
      "Tira del pie hacia ti flexionando el tobillo (10 seg tensión).",
      "Regresa lento a la posición inicial.",
      "Trabaja ambas piernas de forma simétrica.",
    ],
    tip: "Usa una banda de resistencia ligera al inicio. Progresa gradualmente.",
    icon: "🎗️",
  },
  {
    id: 3,
    phase: "Estiramiento",
    title: "Estiramiento de sóleo profundo",
    duration: "3 × 30 seg",
    level: "Esencial",
    color: "#3df2a8",
    steps: [
      "Párate frente a una pared con una pierna adelante y otra atrás.",
      "Dobla la rodilla trasera sin despegar el talón del suelo.",
      "Inclina suavemente el cuerpo hacia la pared hasta sentir tensión en el sóleo.",
      "Mantén la posición sin rebotar.",
    ],
    tip: "Diferencia: rodilla doblada = sóleo. Rodilla recta = gastrocnemio.",
    icon: "🧘",
  },
  {
    id: 4,
    phase: "Estiramiento",
    title: "Automasaje con rodillo (foam rolling)",
    duration: "2 × 60 seg por pierna",
    level: "Recuperación",
    color: "#3df2a8",
    steps: [
      "Siéntate en el suelo y coloca el rodillo bajo la pantorrilla.",
      "Levanta la cadera y deja que el peso corporal presione el músculo.",
      "Rueda lentamente desde el tobillo hasta la corva.",
      "Pausa 3–5 seg en los puntos de mayor tensión.",
    ],
    tip: "Evita rodar directamente sobre la tibia. Trabaja el tejido muscular lateral.",
    icon: "🔵",
  },
  {
    id: 5,
    phase: "Propiocepción",
    title: "Equilibrio unipodal con cierre de ojos",
    duration: "3 × 30 seg por pierna",
    level: "Intermedio",
    color: "#f2c23d",
    steps: [
      "Párate sobre una pierna en superficie estable con los ojos abiertos.",
      "Mantén el equilibrio 15 seg, luego cierra los ojos.",
      "Mantén la cadera nivelada y el core activado.",
      "Progresa a superficie inestable (colchoneta) cuando lo domines.",
    ],
    tip: "La propiocepción reduce hasta un 40% el riesgo de recaída.",
    icon: "⚖️",
  },
  {
    id: 6,
    phase: "Propiocepción",
    title: "Saltos laterales controlados",
    duration: "3 × 10 reps",
    level: "Avanzado",
    color: "#f2c23d",
    steps: [
      "Párate sobre una pierna. Salta lateralmente unos 30–40 cm.",
      "Aterriza suave sobre la otra pierna absorbiendo el impacto con la rodilla semiflexionada.",
      "Mantén 2 segundos antes del siguiente salto.",
      "Realiza solo cuando estés libre de dolor por ≥2 semanas.",
    ],
    tip: "Fase de retorno al deporte. No iniciar antes de estar asintomático.",
    icon: "🏃",
  },
];

const PREVENTION_TIPS = [
  {
    icon: "👟",
    title: "Calzado adecuado",
    desc: "Usa calzado con soporte de arco apropiado para tu tipo de pisada. Renueva tus zapatillas cada 600–800 km de uso.",
  },
  {
    icon: "📈",
    title: "Regla del 10%",
    desc: "Nunca incrementes el volumen de entrenamiento más de un 10% por semana. La sobrecarga progresiva es la causa más común.",
  },
  {
    icon: "🏔️",
    title: "Variedad de superficies",
    desc: "Alterna entre asfalto, hierba y pista de atletismo. Las superficies duras multiplican las fuerzas de impacto.",
  },
  {
    icon: "💪",
    title: "Fortalece el core y glúteos",
    desc: "Un core débil altera la biomecánica de carrera. Glúteos fuertes reducen la pronación excesiva y las cargas en tibia.",
  },
  {
    icon: "😴",
    title: "Descanso activo",
    desc: "Incluye al menos 1–2 días de descanso activo por semana. El hueso necesita tiempo para adaptarse al estrés repetitivo.",
  },
  {
    icon: "🥗",
    title: "Nutrición y vitamina D",
    desc: "Asegura ingesta adecuada de calcio y vitamina D. La deficiencia nutricional fragiliza el tejido óseo periostio.",
  },
];

const RECOVERY_STAGES = [
  {
    week: "Semana 1–2",
    title: "Descarga y control del dolor",
    color: "#ef4444",
    tasks: [
      "Detén la actividad de impacto por completo",
      "Hielo local 15–20 min, 3–4 veces al día",
      "Compresión con venda elástica si hay inflamación",
      "Antiinflamatorios tópicos según indicación médica",
      "Actividad sin impacto: natación, bicicleta estática",
    ],
  },
  {
    week: "Semana 3–4",
    title: "Rehabilitación inicial",
    color: "#f59e0b",
    tasks: [
      "Iniciar ejercicios de fortalecimiento suave (Fase 1)",
      "Estiramiento diario de gastrocnemio y sóleo",
      "Foam rolling en pantorrilla (no sobre tibia)",
      "Caminata sin dolor como prueba de tolerancia",
      "Evaluar biomecánica con fisioterapeuta",
    ],
  },
  {
    week: "Semana 5–8",
    title: "Progresión funcional",
    color: "#3df2a8",
    tasks: [
      "Trotar en superficies blandas si hay cero dolor",
      "Ejercicios propioceptivos y de equilibrio",
      "Fortalecer tibial anterior con banda de resistencia",
      "Incremento semanal del 10% en distancia",
      "Análisis de técnica de carrera",
    ],
  },
  {
    week: "Semana 8+",
    title: "Retorno al deporte",
    color: "#b5f23d",
    tasks: [
      "Prueba de carrera a ritmo normal sin síntomas",
      "Saltos y cambios de dirección controlados",
      "Reintegración progresiva a entrenamientos grupales",
      "Continúa ejercicios preventivos 3×/semana",
      "Monitoreo mensual con profesional de salud",
    ],
  },
];

const PAIN_SCALE = [
  { value: 0, label: "Sin dolor", color: "#b5f23d", action: "Puedes entrenar normalmente" },
  { value: 3, label: "Leve", color: "#f2c23d", action: "Reduce intensidad, monitorea" },
  { value: 5, label: "Moderado", color: "#f97316", action: "Pausa el impacto, hielo y descanso" },
  { value: 7, label: "Intenso", color: "#ef4444", action: "Consulta a un médico o fisioterapeuta" },
  { value: 10, label: "Severo", color: "#dc2626", action: "Visita urgencias, descarta fractura por estrés" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("Inicio");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [activePhase, setActivePhase] = useState("Todos");
  const [painValue, setPainValue] = useState(0);
  const [expandedStage, setExpandedStage] = useState(0);

  const phases = ["Todos", "Fortalecimiento", "Estiramiento", "Propiocepción"];
  const filteredExercises =
    activePhase === "Todos"
      ? EXERCISES
      : EXERCISES.filter((e) => e.phase === activePhase);

  const currentPain = PAIN_SCALE.reduce((prev, curr) =>
    Math.abs(curr.value - painValue) < Math.abs(prev.value - painValue) ? curr : prev
  );

  return (
    <div className="min-h-full" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(13,15,18,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "Oswald, sans-serif" }}
          >
            MTSS
          </div>
          <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
            Síndrome de Estrés Tibial
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className="px-4 py-2 text-sm rounded transition-all duration-200"
              style={{
                fontFamily: "Outfit, sans-serif",
                background: activeSection === item ? "var(--primary)" : "transparent",
                color: activeSection === item ? "var(--primary-foreground)" : "var(--muted-foreground)",
                fontWeight: activeSection === item ? "600" : "400",
              }}
            >
              {item}
            </button>
          ))}
        </div>
        {/* Mobile nav */}
        <select
          className="md:hidden text-sm px-3 py-2 rounded border"
          style={{ background: "var(--card)", color: "var(--foreground)", borderColor: "var(--border)", fontFamily: "Outfit, sans-serif" }}
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
        >
          {NAV_ITEMS.map((item) => <option key={item}>{item}</option>)}
        </select>
      </nav>

      <div className="pt-16">
        {/* ─── INICIO ─── */}
        {activeSection === "Inicio" && (
          <div>
            {/* Hero */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=900&fit=crop&auto=format')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,15,18,0.92) 0%, rgba(13,15,18,0.6) 60%, rgba(13,15,18,0.85) 100%)" }} />
              <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
                <div
                  className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-6 rounded"
                  style={{ background: "rgba(181,242,61,0.15)", color: "var(--primary)", border: "1px solid rgba(181,242,61,0.3)" }}
                >
                  Guía para jóvenes deportistas
                </div>
                <h1
                  className="text-6xl md:text-8xl font-bold leading-none mb-6 uppercase tracking-tight"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  CUIDA TUS
                  <br />
                  <span style={{ color: "var(--primary)" }}>TIBIAS.</span>
                  <br />
                  CORRE MEJOR.
                </h1>
                <p className="text-lg md:text-xl max-w-xl mb-10" style={{ color: "var(--secondary-foreground)", lineHeight: 1.7 }}>
                  El síndrome de estrés tibial medial afecta al{" "}
                  <strong style={{ color: "var(--foreground)" }}>35% de los atletas jóvenes</strong>. Con la información correcta,
                  puedes prevenirlo, tratarlo y volver más fuerte.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveSection("Ejercicios")}
                    className="px-8 py-4 font-semibold text-base uppercase tracking-wide rounded transition-all duration-200 hover:scale-105"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}
                  >
                    Ver Ejercicios →
                  </button>
                  <button
                    onClick={() => setActiveSection("¿Qué es?")}
                    className="px-8 py-4 font-semibold text-base uppercase tracking-wide rounded transition-all duration-200"
                    style={{ background: "transparent", color: "var(--foreground)", border: "1px solid var(--border)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}
                  >
                    Aprende más
                  </button>
                </div>
              </div>
            </section>

            {/* Stats bar */}
            <section className="py-12 px-6" style={{ background: "var(--secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "35%", label: "atletas jóvenes afectados" },
                  { value: "6–8 sem", label: "recuperación promedio" },
                  { value: "80%", label: "mejora con rehabilitación" },
                  { value: "40%", label: "reducción de recaída con propiocepción" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-4xl font-bold mb-1" style={{ color: "var(--primary)", fontFamily: "Oswald, sans-serif" }}>{s.value}</div>
                    <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick access cards */}
            <section className="py-20 px-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold uppercase mb-12" style={{ fontFamily: "Oswald, sans-serif" }}>
                  ¿QUÉ NECESITAS HOY?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { section: "Prevención", emoji: "🛡️", desc: "Estrategias basadas en evidencia para evitar la lesión antes de que ocurra.", color: "var(--primary)" },
                    { section: "Ejercicios", emoji: "💪", desc: "Rutinas de fortalecimiento, estiramiento y propiocepción paso a paso.", color: "var(--accent)" },
                    { section: "Recuperación", emoji: "🔄", desc: "Plan semanal de retorno progresivo al deporte con indicadores claros.", color: "#f2c23d" },
                  ].map((card) => (
                    <button
                      key={card.section}
                      onClick={() => setActiveSection(card.section)}
                      className="text-left p-8 rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                    >
                      <div className="text-4xl mb-4">{card.emoji}</div>
                      <h3 className="text-xl font-bold uppercase mb-3" style={{ fontFamily: "Oswald, sans-serif", color: card.color }}>
                        {card.section}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{card.desc}</p>
                      <div className="mt-6 text-sm font-semibold" style={{ color: card.color }}>
                        Ir a {card.section} →
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Pain checker */}
            <section className="py-20 px-6" style={{ background: "var(--muted)", borderTop: "1px solid var(--border)" }}>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
                  ¿CÓMO ES TU DOLOR HOY?
                </h2>
                <p className="mb-10" style={{ color: "var(--muted-foreground)" }}>
                  Mueve el control para conocer qué hacer según tu nivel de dolor
                </p>
                <div className="p-8 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="flex justify-between text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
                    <span>0 — Sin dolor</span>
                    <span>10 — Máximo dolor</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={painValue}
                    onChange={(e) => setPainValue(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: currentPain.color }}
                  />
                  <div className="mt-8 p-6 rounded-lg" style={{ background: `${currentPain.color}18`, border: `1px solid ${currentPain.color}40` }}>
                    <div className="text-5xl font-bold mb-1" style={{ fontFamily: "Oswald, sans-serif", color: currentPain.color }}>
                      {painValue}/10
                    </div>
                    <div className="text-lg font-semibold mb-2" style={{ color: currentPain.color }}>{currentPain.label}</div>
                    <p className="text-sm" style={{ color: "var(--foreground)" }}>{currentPain.action}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ─── ¿QUÉ ES? ─── */}
        {activeSection === "¿Qué es?" && (
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4 rounded"
              style={{ background: "rgba(181,242,61,0.15)", color: "var(--primary)", border: "1px solid rgba(181,242,61,0.3)" }}
            >
              Información clínica
            </div>
            <h2 className="text-5xl md:text-6xl font-bold uppercase mb-8" style={{ fontFamily: "Oswald, sans-serif" }}>
              SÍNDROME DE ESTRÉS<br />
              <span style={{ color: "var(--primary)" }}>TIBIAL MEDIAL</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--secondary-foreground)" }}>
                  El síndrome de estrés tibial medial (SETM), conocido popularmente como <strong style={{ color: "var(--foreground)" }}>"shin splints"</strong>, es
                  una lesión por sobrecarga que produce dolor en la parte interna de la tibia. Ocurre cuando los músculos, tendones y el tejido óseo
                  periostio de la tibia se inflaman por estrés repetitivo.
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--secondary-foreground)" }}>
                  Es una de las lesiones más frecuentes en corredores, bailarines y atletas de deportes de impacto, especialmente durante
                  períodos de <strong style={{ color: "var(--foreground)" }}>aumento rápido del volumen</strong> de entrenamiento.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "var(--secondary-foreground)" }}>
                  La buena noticia: con el manejo correcto, la gran mayoría de los casos se resuelven completamente en 6–8 semanas.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden" style={{ minHeight: "260px", background: "var(--card)" }}>
                <img
                  src="https://images.unsplash.com/photo-1530143584546-02191bc84eb5?w=600&h=400&fit=crop&auto=format"
                  alt="Atleta corriendo en pista, vista de piernas y zapatillas"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Anatomy */}
            <h3 className="text-3xl font-bold uppercase mb-8" style={{ fontFamily: "Oswald, sans-serif" }}>
              ¿QUÉ ESTRUCTURAS ESTÁN INVOLUCRADAS?
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-16">
              {[
                { name: "Periostio tibial", desc: "Membrana que recubre el hueso. Se inflama con las tracciones musculares repetitivas.", color: "var(--primary)" },
                { name: "Músculo tibial posterior", desc: "Principal traccionador del periostio. Trabaja cada vez que el pie toca el suelo.", color: "var(--accent)" },
                { name: "Fascia profunda", desc: "Tejido conectivo que envuelve los compartimentos musculares de la pierna.", color: "#f2c23d" },
              ].map((s) => (
                <div key={s.name} className="p-6 rounded-lg" style={{ background: "var(--card)", borderLeft: `3px solid ${s.color}` }}>
                  <div className="font-bold mb-2" style={{ color: s.color, fontFamily: "Oswald, sans-serif", fontSize: "1.1rem" }}>{s.name}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Symptoms */}
            <h3 className="text-3xl font-bold uppercase mb-8" style={{ fontFamily: "Oswald, sans-serif" }}>SÍNTOMAS TÍPICOS</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-16">
              {[
                { sym: "Dolor difuso en el tercio medio-inferior interno de la tibia", red: false },
                { sym: "Dolor que empeora al inicio del ejercicio y mejora al continuar (estadío temprano)", red: false },
                { sym: "Dolor que persiste durante y después del ejercicio (estadío avanzado)", red: true },
                { sym: "Sensibilidad al tacto en el borde medial de la tibia", red: false },
                { sym: "Inflamación o hinchazón leve en la zona tibial", red: false },
                { sym: "Dolor en reposo o nocturno — consultar médico para descartar fractura por estrés", red: true },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded" style={{ background: "var(--muted)" }}>
                  <span style={{ color: item.red ? "#ef4444" : "var(--primary)", fontSize: "1.2rem" }}>{item.red ? "⚠️" : "✓"}</span>
                  <span className="text-sm" style={{ color: item.red ? "#fca5a5" : "var(--secondary-foreground)" }}>{item.sym}</span>
                </div>
              ))}
            </div>

            {/* Causes */}
            <div className="p-8 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <h3 className="text-3xl font-bold uppercase mb-6" style={{ fontFamily: "Oswald, sans-serif" }}>
                FACTORES DE RIESGO
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Aumento brusco del volumen o intensidad de entrenamiento",
                  "Pronación excesiva del pie (pie plano)",
                  "Calzado desgastado o inadecuado para el tipo de pisada",
                  "Carrera en superficies duras de manera exclusiva",
                  "Debilidad de core, glúteos y músculos de la pierna",
                  "Técnica de carrera deficiente (zancada larga, sobrecarga de talón)",
                  "Deficiencia de vitamina D y calcio",
                  "Historial previo de SETM (riesgo de recaída hasta 60%)",
                ].map((r, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span style={{ color: "var(--primary)", marginTop: "2px" }}>→</span>
                    <span className="text-sm" style={{ color: "var(--secondary-foreground)" }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── PREVENCIÓN ─── */}
        {activeSection === "Prevención" && (
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4 rounded"
              style={{ background: "rgba(181,242,61,0.15)", color: "var(--primary)", border: "1px solid rgba(181,242,61,0.3)" }}
            >
              Basado en evidencia
            </div>
            <h2 className="text-5xl md:text-6xl font-bold uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
              PREVENCIÓN
            </h2>
            <p className="text-base mb-16" style={{ color: "var(--muted-foreground)", maxWidth: "600px" }}>
              La prevención es siempre más eficiente que el tratamiento. Estas estrategias tienen respaldo científico para reducir la incidencia del SETM.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {PREVENTION_TIPS.map((tip) => (
                <div
                  key={tip.title}
                  className="flex gap-5 p-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div className="text-4xl flex-shrink-0">{tip.icon}</div>
                  <div>
                    <h3 className="font-bold mb-2 text-lg" style={{ fontFamily: "Oswald, sans-serif", color: "var(--primary)" }}>{tip.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--secondary-foreground)" }}>{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Warm up guide */}
            <div className="p-8 rounded-xl mb-8" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
              <h3 className="text-3xl font-bold uppercase mb-6" style={{ fontFamily: "Oswald, sans-serif" }}>
                CALENTAMIENTO PREVENTIVO <span style={{ color: "var(--primary)" }}>ÓPTIMO</span>
              </h3>
              <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
                Realiza esta secuencia de 8–10 minutos antes de cada sesión de impacto:
              </p>
              <div className="space-y-3">
                {[
                  { time: "2 min", act: "Trote suave en el lugar o caminata brisk" },
                  { time: "1 min", act: "Círculos de tobillo — 10 rep cada dirección, ambos pies" },
                  { time: "1 min", act: "Elevaciones de rodilla exageradas en marcha" },
                  { time: "1 min", act: "Talones al glúteo en marcha (activación flexores de rodilla)" },
                  { time: "2 min", act: "Estiramiento dinámico de pantorrilla (paso adelante con talón arriba)" },
                  { time: "1 min", act: "Activación de glúteo: pasos laterales con banda o sin ella" },
                  { time: "2 min", act: "Trote progresivo al 50% → 70% del ritmo objetivo" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded" style={{ background: "var(--card)" }}>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded flex-shrink-0"
                      style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "Oswald, sans-serif", minWidth: "52px", textAlign: "center" }}
                    >
                      {item.time}
                    </span>
                    <span className="text-sm" style={{ color: "var(--secondary-foreground)" }}>{item.act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl" style={{ background: "rgba(181,242,61,0.08)", border: "1px solid rgba(181,242,61,0.2)" }}>
              <p className="text-sm" style={{ color: "var(--secondary-foreground)" }}>
                <strong style={{ color: "var(--primary)" }}>Recuerda:</strong> Ninguna estrategia por sí sola garantiza la prevención total. La combinación de
                calzado adecuado + progresión del 10% + fortalecimiento + descanso reduce el riesgo hasta un{" "}
                <strong style={{ color: "var(--foreground)" }}>60–70%</strong> según estudios publicados en el{" "}
                <em>British Journal of Sports Medicine</em>.
              </p>
            </div>
          </div>
        )}

        {/* ─── EJERCICIOS ─── */}
        {activeSection === "Ejercicios" && (
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4 rounded"
              style={{ background: "rgba(181,242,61,0.15)", color: "var(--primary)", border: "1px solid rgba(181,242,61,0.3)" }}
            >
              Programa de rehabilitación
            </div>
            <h2 className="text-5xl md:text-6xl font-bold uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
              EJERCICIOS
            </h2>
            <p className="text-base mb-10" style={{ color: "var(--muted-foreground)", maxWidth: "600px" }}>
              Selecciona la categoría según tu fase de recuperación. Toca cualquier ejercicio para ver las instrucciones completas.
            </p>

            {/* Phase filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {phases.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePhase(p)}
                  className="px-5 py-2 text-sm font-semibold uppercase rounded transition-all duration-200"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    letterSpacing: "0.05em",
                    background: activePhase === p ? "var(--primary)" : "var(--card)",
                    color: activePhase === p ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    border: `1px solid ${activePhase === p ? "var(--primary)" : "var(--border)"}`,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Exercise grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {filteredExercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExercise(selectedExercise === ex.id ? null : ex.id)}
                  className="text-left rounded-xl transition-all duration-200"
                  style={{
                    background: selectedExercise === ex.id ? `${ex.color}12` : "var(--card)",
                    border: `1px solid ${selectedExercise === ex.id ? ex.color : "var(--border)"}`,
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded uppercase"
                            style={{ background: `${ex.color}20`, color: ex.color, fontFamily: "Oswald, sans-serif" }}
                          >
                            {ex.phase}
                          </span>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{ex.level}</span>
                        </div>
                        <h3 className="text-xl font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "var(--foreground)" }}>
                          {ex.title}
                        </h3>
                      </div>
                      <span className="text-3xl">{ex.icon}</span>
                    </div>
                    <div className="text-sm font-semibold" style={{ color: ex.color }}>{ex.duration}</div>

                    {selectedExercise === ex.id && (
                      <div className="mt-6 space-y-3" onClick={(e) => e.stopPropagation()}>
                        <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
                          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)", fontFamily: "Oswald, sans-serif" }}>
                            Instrucciones
                          </p>
                          {ex.steps.map((step, i) => (
                            <div key={i} className="flex gap-3 mb-2">
                              <span
                                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{ background: ex.color, color: "var(--primary-foreground)" }}
                              >
                                {i + 1}
                              </span>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--secondary-foreground)" }}>{step}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: `${ex.color}10`, border: `1px solid ${ex.color}30` }}>
                          <p className="text-xs" style={{ color: ex.color }}>
                            <strong>💡 Clave:</strong> {ex.tip}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-5 rounded-lg" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                <strong style={{ color: "var(--foreground)" }}>Importante:</strong> Estos ejercicios son orientativos. Ante cualquier dolor superior a 3/10
                durante la ejecución, detente y consulta con un fisioterapeuta o médico deportivo. No sustituyen la evaluación profesional individualizada.
              </p>
            </div>
          </div>
        )}

        {/* ─── RECUPERACIÓN ─── */}
        {activeSection === "Recuperación" && (
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4 rounded"
              style={{ background: "rgba(181,242,61,0.15)", color: "var(--primary)", border: "1px solid rgba(181,242,61,0.3)" }}
            >
              Plan de retorno
            </div>
            <h2 className="text-5xl md:text-6xl font-bold uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
              RECUPERACIÓN
            </h2>
            <p className="text-base mb-16" style={{ color: "var(--muted-foreground)", maxWidth: "600px" }}>
              Sigue este protocolo de retorno progresivo al deporte. Avanza de fase solo cuando estés completamente asintomático en la fase anterior.
            </p>

            {/* Timeline */}
            <div className="space-y-4 mb-16">
              {RECOVERY_STAGES.map((stage, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{ background: "var(--card)", border: `1px solid ${expandedStage === i ? stage.color : "var(--border)"}` }}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setExpandedStage(expandedStage === i ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: stage.color, color: "#0d0f12", fontFamily: "Oswald, sans-serif" }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>{stage.week}</div>
                        <div className="font-bold text-lg uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "var(--foreground)" }}>
                          {stage.title}
                        </div>
                      </div>
                    </div>
                    <span style={{ color: "var(--muted-foreground)", fontSize: "1.2rem" }}>{expandedStage === i ? "−" : "+"}</span>
                  </button>
                  {expandedStage === i && (
                    <div className="px-6 pb-6">
                      <div className="border-t pt-5" style={{ borderColor: "var(--border)" }}>
                        <div className="space-y-2">
                          {stage.tasks.map((task, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <span style={{ color: stage.color, flexShrink: 0 }}>✓</span>
                              <span className="text-sm" style={{ color: "var(--secondary-foreground)" }}>{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Red flags */}
            <div className="p-8 rounded-xl mb-8" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
              <h3 className="text-2xl font-bold uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#ef4444" }}>
                🚨 SEÑALES DE ALERTA — CONSULTA MÉDICA INMEDIATA
              </h3>
              <div className="space-y-2">
                {[
                  "Dolor en reposo o dolor nocturno que interrumpe el sueño",
                  "Punto de dolor muy localizado y puntual (posible fractura por estrés)",
                  "Inflamación significativa o cambio de coloración en la zona",
                  "Dolor que empeora progresivamente pese al reposo",
                  "Sensación de calor intensa o latido en la zona tibial",
                ].map((flag, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span style={{ color: "#ef4444", flexShrink: 0 }}>!</span>
                    <span className="text-sm" style={{ color: "#fca5a5" }}>{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro tip */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: "🧊", title: "Protocolo RICE", desc: "Rest · Ice · Compression · Elevation. Primeras 48–72h post-lesión aguda." },
                { icon: "📊", title: "Lleva un diario", desc: "Registra dolor (0–10), actividad realizada y duración. Te ayuda a identificar patrones." },
                { icon: "🩺", title: "Equipo de salud", desc: "Fisioterapeuta + médico deportivo. Un podólogo puede evaluar tu pisada y recomendar plantillas." },
              ].map((tip) => (
                <div key={tip.title} className="p-6 rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <div className="font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--primary)" }}>{tip.title}</div>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer
          className="mt-20 py-10 px-6 text-center"
          style={{ background: "var(--secondary)", borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Esta aplicación es de carácter informativo y educativo. No reemplaza el diagnóstico ni el tratamiento médico profesional.
            Ante cualquier duda, consulta a un médico o fisioterapeuta certificado.
          </p>
        </footer>
      </div>
    </div>
  );
}
