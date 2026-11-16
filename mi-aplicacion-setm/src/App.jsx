import { useEffect, useRef, useState } from "react";
import {
  House, BookOpen, ShieldCheck, Dumbbell, HeartPulse, ArrowRight, ChevronRight, ChevronDown, Check, TriangleAlert,
  X, Play, Pause, RotateCcw, Footprints, TrendingUp, Mountain, Activity, Moon, Apple, Snowflake, NotebookPen,
  Stethoscope, Timer as TimerIcon, Flame, Sparkles, Zap, PersonStanding, Target, ListChecks, Gauge, Medal, Camera, Bone,
} from "lucide-react";

import imgHero from "./assets/hero-runner.jpg";
import imgQueEs from "./assets/que-es-fisio.jpg";
import imgPrev from "./assets/prevencion-calentamiento.jpg";
import imgEjer from "./assets/ejercicios-atleta.jpg";
import imgRecu from "./assets/recuperacion-hielo.jpg";
import imgEx1 from "./assets/ex1-talones.jpg";
import imgEx2 from "./assets/ex2-banda.jpg";
import imgEx3 from "./assets/ex3-estiramiento.jpg";
import imgEx4 from "./assets/ex4-rodillo.jpg";
import imgEx5 from "./assets/ex5-equilibrio.jpg";

/* ───────────────────────── Contenido ───────────────────────── */
const SECTIONS = [
  { id: "inicio", label: "Inicio", Icon: House },
  { id: "que-es", label: "¿Qué es?", Icon: BookOpen },
  { id: "prevencion", label: "Prevención", Icon: ShieldCheck },
  { id: "ejercicios", label: "Ejercicios", Icon: Dumbbell },
  { id: "recuperacion", label: "Recuperación", short: "Recuperar", Icon: HeartPulse },
];

const PHASE = {
  Fortalecimiento: { c: "var(--accent)", Icon: Zap },
  Estiramiento: { c: "var(--accent)", Icon: PersonStanding },
  "Propiocepción": { c: "var(--accent)", Icon: Target },
};

const EXERCISES = [
  {
    id: 1, phase: "Fortalecimiento", title: "Elevaciones de pantorrilla", duration: "3 × 15 reps", level: "Básico",
    img: imgEx1, focus: "50% 30%", timer: { s: 60, label: "Descanso entre series" },
    steps: [
      "Párate con los pies al ancho de los hombros cerca de un escalón o pared.",
      "Eleva lentamente los talones hasta estar en punta de pies (2 seg subida).",
      "Mantén 1 segundo en la cima, baja controlado en 3 segundos.",
      "Descansa 60 segundos entre series.",
    ],
    tip: "Si sientes dolor, reduce el rango de movimiento. La calidad > cantidad.",
  },
  {
    id: 2, phase: "Fortalecimiento", title: "Dorsiflexión con banda elástica", duration: "3 × 20 reps", level: "Básico",
    img: imgEx2, focus: "60% 50%", timer: { s: 10, label: "Tensión por repetición" },
    steps: [
      "Siéntate en el suelo con la pierna extendida y la banda en el metatarso.",
      "Tira del pie hacia ti flexionando el tobillo (10 seg tensión).",
      "Regresa lento a la posición inicial.",
      "Trabaja ambas piernas de forma simétrica.",
    ],
    tip: "Usa una banda de resistencia ligera al inicio. Progresa gradualmente.",
  },
  {
    id: 3, phase: "Estiramiento", title: "Estiramiento de sóleo profundo", duration: "3 × 30 seg", level: "Esencial",
    img: imgEx3, focus: "50% 40%", timer: { s: 30, label: "Mantén el estiramiento" },
    steps: [
      "Párate frente a una pared con una pierna adelante y otra atrás.",
      "Dobla la rodilla trasera sin despegar el talón del suelo.",
      "Inclina suavemente el cuerpo hacia la pared hasta sentir tensión en el sóleo.",
      "Mantén la posición sin rebotar.",
    ],
    tip: "Diferencia: rodilla doblada = sóleo. Rodilla recta = gastrocnemio.",
  },
  {
    id: 4, phase: "Estiramiento", title: "Automasaje con rodillo (foam rolling)", duration: "2 × 60 seg por pierna", level: "Recuperación",
    img: imgEx4, focus: "30% 60%", timer: { s: 60, label: "Rodillo por pierna" },
    steps: [
      "Siéntate en el suelo y coloca el rodillo bajo la pantorrilla.",
      "Levanta la cadera y deja que el peso corporal presione el músculo.",
      "Rueda lentamente desde el tobillo hasta la corva.",
      "Pausa 3–5 seg en los puntos de mayor tensión.",
    ],
    tip: "Evita rodar directamente sobre la tibia. Trabaja el tejido muscular lateral.",
  },
  {
    id: 5, phase: "Propiocepción", title: "Equilibrio unipodal con cierre de ojos", duration: "3 × 30 seg por pierna", level: "Intermedio",
    img: imgEx5, focus: "50% 70%", timer: { s: 30, label: "Equilibrio por pierna" },
    steps: [
      "Párate sobre una pierna en superficie estable con los ojos abiertos.",
      "Mantén el equilibrio 15 seg, luego cierra los ojos.",
      "Mantén la cadera nivelada y el core activado.",
      "Progresa a superficie inestable (colchoneta) cuando lo domines.",
    ],
    tip: "La propiocepción reduce hasta un 40% el riesgo de recaída.",
  },
  {
    id: 6, phase: "Propiocepción", title: "Saltos laterales controlados", duration: "3 × 10 reps", level: "Avanzado",
    img: imgEjer, focus: "50% 30%", timer: { s: 60, label: "Descanso entre series" },
    steps: [
      "Párate sobre una pierna. Salta lateralmente unos 30–40 cm.",
      "Aterriza suave sobre la otra pierna absorbiendo el impacto con la rodilla semiflexionada.",
      "Mantén 2 segundos antes del siguiente salto.",
      "Realiza solo cuando estés libre de dolor por ≥2 semanas.",
    ],
    tip: "Fase de retorno al deporte. No iniciar antes de estar asintomático.",
  },
];

const PREVENTION_TIPS = [
  { Icon: Footprints, c: "var(--accent)", title: "Calzado adecuado", short: "Cámbialas cada 600–800 km", desc: "Usa calzado con soporte de arco apropiado para tu tipo de pisada. Renueva tus zapatillas cada 600–800 km de uso." },
  { Icon: TrendingUp, c: "var(--accent)", title: "Regla del 10%", short: "No subas más de un 10% por semana", desc: "Nunca incrementes el volumen de entrenamiento más de un 10% por semana. La sobrecarga progresiva es la causa más común." },
  { Icon: Mountain, c: "var(--accent)", title: "Variedad de superficies", short: "Alterna asfalto, hierba y pista", desc: "Alterna entre asfalto, hierba y pista de atletismo. Las superficies duras multiplican las fuerzas de impacto." },
  { Icon: Activity, c: "var(--accent)", title: "Fortalece el core y glúteos", short: "Mejor técnica, menos carga en la tibia", desc: "Un core débil altera la biomecánica de carrera. Glúteos fuertes reducen la pronación excesiva y las cargas en tibia." },
  { Icon: Moon, c: "var(--accent)", title: "Descanso activo", short: "1–2 días a la semana", desc: "Incluye al menos 1–2 días de descanso activo por semana. El hueso necesita tiempo para adaptarse al estrés repetitivo." },
  { Icon: Apple, c: "var(--accent)", title: "Nutrición y vitamina D", short: "Calcio y vitamina D suficientes", desc: "Asegura ingesta adecuada de calcio y vitamina D. La deficiencia nutricional fragiliza el tejido óseo periostio." },
];

const WARMUP = [
  { time: 2, act: "Trote suave en el lugar o caminata rápida" },
  { time: 1, act: "Círculos de tobillo: 10 rep cada dirección, ambos pies" },
  { time: 1, act: "Elevaciones de rodilla exageradas en marcha" },
  { time: 1, act: "Talones al glúteo en marcha (activación flexores de rodilla)" },
  { time: 2, act: "Estiramiento dinámico de pantorrilla (paso adelante con talón arriba)" },
  { time: 1, act: "Activación de glúteo: pasos laterales con banda o sin ella" },
  { time: 2, act: "Trote progresivo al 50% → 70% del ritmo objetivo" },
];

const RECOVERY_STAGES = [
  { week: "Semana 1–2", title: "Descarga y control del dolor", c: "var(--danger)", tasks: [
    "Detén la actividad de impacto por completo",
    "Hielo local 15–20 min, 3–4 veces al día",
    "Compresión con venda elástica si hay inflamación",
    "Antiinflamatorios tópicos según indicación médica",
    "Actividad sin impacto: natación, bicicleta estática",
  ] },
  { week: "Semana 3–4", title: "Rehabilitación inicial", c: "var(--accent)", tasks: [
    "Iniciar ejercicios de fortalecimiento suave (Fase 1)",
    "Estiramiento diario de gastrocnemio y sóleo",
    "Foam rolling en pantorrilla (no sobre tibia)",
    "Caminata sin dolor como prueba de tolerancia",
    "Evaluar biomecánica con fisioterapeuta",
  ] },
  { week: "Semana 5–8", title: "Progresión funcional", c: "var(--accent)", tasks: [
    "Trotar en superficies blandas si hay cero dolor",
    "Ejercicios propioceptivos y de equilibrio",
    "Fortalecer tibial anterior con banda de resistencia",
    "Incremento semanal del 10% en distancia",
    "Análisis de técnica de carrera",
  ] },
  { week: "Semana 8+", title: "Retorno al deporte", c: "var(--accent)", tasks: [
    "Prueba de carrera a ritmo normal sin síntomas",
    "Saltos y cambios de dirección controlados",
    "Reintegración progresiva a entrenamientos grupales",
    "Continúa ejercicios preventivos 3×/semana",
    "Monitoreo mensual con profesional de salud",
  ] },
];

const PAIN_SCALE = [
  { value: 0, label: "Sin dolor", c: "#34d399", action: "Puedes entrenar normalmente" },
  { value: 3, label: "Leve", c: "#fbbf24", action: "Reduce intensidad, monitorea" },
  { value: 5, label: "Moderado", c: "#fb923c", action: "Pausa el impacto, hielo y descanso" },
  { value: 7, label: "Intenso", c: "#f43f5e", action: "Consulta a un médico o fisioterapeuta" },
  { value: 10, label: "Severo", c: "#e11d48", action: "Visita urgencias, descarta fractura por estrés" },
];

const CREDITS = [
  "Inicio: Unsplash (licencia Unsplash)",
  "Fisioterapia, banda elástica, deportista y piernas con banda: Shixart1985, CC BY 2.0, Wikimedia Commons",
  "Corredores calentando: Sgt. Bobby Yarbrough, dominio público (USMC)",
  "Hielo en la tibia: U.S. Navy, Jhi L. Scott, dominio público",
  "Elevación de talones: GeorgeStepanek, CC BY-SA 3.0, Wikimedia Commons",
  "Estiramiento: Sergio Savarese, CC BY 2.0, Wikimedia Commons",
  "Rodillo: Roger Mommaerts, CC BY-SA 2.0, Wikimedia Commons",
];

/* ───────────────────────── Utilidades ───────────────────────── */
function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
  }, [key, value]);
  return [value, setValue];
}

function useCountUp(target, ms = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}

function vibrate(ms) {
  try { navigator.vibrate?.(ms); } catch { /* no soportado */ }
}

function parseHash() {
  const h = decodeURIComponent(window.location.hash.slice(1));
  if (h.startsWith("ejercicio-")) return { section: "ejercicios", exercise: Number(h.slice(10)) || null };
  return { section: SECTIONS.some((s) => s.id === h) ? h : "inicio", exercise: null };
}

const painLevel = (v) => PAIN_SCALE.reduce((p, q) => (Math.abs(q.value - v) < Math.abs(p.value - v) ? q : p));

/* Onda al tocar: cualquier elemento con la clase .rp */
function useRipple() {
  useEffect(() => {
    const onDown = (e) => {
      const el = e.target.closest(".rp");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const s = document.createElement("span");
      s.className = "ripple";
      s.style.width = s.style.height = `${size}px`;
      s.style.left = `${e.clientX - r.left - size / 2}px`;
      s.style.top = `${e.clientY - r.top - size / 2}px`;
      el.appendChild(s);
      setTimeout(() => s.remove(), 650);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
}

/* ───────────────────────── App ───────────────────────── */
export default function App() {
  const [route, setRoute] = useState(parseHash);
  const [scrolled, setScrolled] = useState(false);
  const [party, setParty] = useState(null);
  const [splash, setSplash] = useState(true);
  const prevIdx = useRef(null);
  useRipple();

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => setSplash(false), 1700);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const idx = SECTIONS.findIndex((s) => s.id === route.section);
  const dirRef = useRef("up");
  if (prevIdx.current !== null && idx !== prevIdx.current) dirRef.current = idx > prevIdx.current ? "right" : "left";
  prevIdx.current = idx;
  const dir = dirRef.current;

  const go = (id) => {
    vibrate(8);
    if (id === route.section && !route.exercise) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = id;
    window.scrollTo(0, 0);
  };
  const openExercise = (id) => { vibrate(8); window.location.hash = `ejercicio-${id}`; };
  const closeExercise = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.hash = "ejercicios";
  };
  const celebrate = (text) => {
    vibrate([30, 40, 60]);
    setParty({ id: Date.now(), text });
    setTimeout(() => setParty(null), 2500);
  };

  return (
    <div className="app">
      {splash && (
        <div className="splash" aria-hidden="true">
          <div className="splash-in">
            <div className="brand-mark"><Bone size={40} strokeWidth={2.2} /></div>
            <div className="h2">Cuida tus <span className="grad-text">tibias</span></div>
          </div>
        </div>
      )}

      <header className={`topbar ${scrolled ? "scrolled" : ""} ${route.section === "inicio" && !scrolled ? "clear" : ""}`}>
        <div className="brand-mark" aria-hidden="true"><Bone size={22} strokeWidth={2.4} /></div>
        <div className="topbar-title">
          <div className="topbar-name">Cuida tus tibias</div>
          <div className="topbar-eyebrow">Guía SETM para deportistas</div>
        </div>
      </header>

      <main key={route.section} className={`screen enter-${dir}`}>
        {route.section === "inicio" && <Inicio go={go} />}
        {route.section === "que-es" && <QueEs />}
        {route.section === "prevencion" && <Prevencion celebrate={celebrate} />}
        {route.section === "ejercicios" && <Ejercicios onOpen={openExercise} />}
        {route.section === "recuperacion" && <Recuperacion celebrate={celebrate} />}
        <div className="footer-note">
          Esta aplicación es de carácter informativo y educativo. No reemplaza el diagnóstico ni el tratamiento médico
          profesional. Ante cualquier duda, consulta a un médico o fisioterapeuta certificado.
          <details>
            <summary><Camera size={15} /> Créditos de las fotos</summary>
            <ul>{CREDITS.map((c) => <li key={c}>{c}</li>)}</ul>
          </details>
        </div>
      </main>

      {route.exercise && <ExerciseSheet key={route.exercise} ex={EXERCISES.find((e) => e.id === route.exercise)} onClose={closeExercise} />}

      {party && <Party key={party.id} text={party.text} />}

      <nav className="tabbar" aria-label="Secciones">
        <div className="tabbar-inner">
          {SECTIONS.map(({ id, label, short, Icon }) => (
            <button key={id} className={`tab ${id === route.section ? "on" : ""}`} onClick={() => go(id)}
              aria-current={id === route.section ? "page" : undefined}>
              <span className="tab-ic"><Icon size={22} strokeWidth={id === route.section ? 2.4 : 2} /></span>
              <span className="lbl">{short || label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function Party({ text }) {
  const colors = ["#ff7a45", "#ff3d7f", "#8b5cf6", "#22d3ee", "#fbbf24", "#34d399"];
  const pieces = Array.from({ length: 36 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 36 + Math.random() * 0.4;
    const d = 140 + Math.random() * 180;
    return {
      "--x": "50%", "--y": "60%", "--col": colors[i % colors.length],
      "--dx": `${Math.cos(a) * d}px`, "--dy": `${Math.sin(a) * d - 120}px`, "--r": `${Math.random() * 720 - 360}deg`,
      animationDelay: `${Math.random() * 80}ms`,
    };
  });
  return (
    <>
      <div className="confetti" aria-hidden="true">{pieces.map((s, i) => <i key={i} style={s} />)}</div>
      <div className="toast" role="status"><Medal size={20} /> {text}</div>
    </>
  );
}

function PhotoHeader({ img, focus, badge, BadgeIcon, c, title, text, className = "", children, i = 0 }) {
  return (
    <section className={`photo ${className}`} style={{ "--c": c, "--i": i, "--focus": focus }}>
      <img src={img} alt="" style={{ objectPosition: focus }} />
      <span className="badge">{BadgeIcon && <BadgeIcon size={14} strokeWidth={2.6} />}{badge}</span>
      <h1 className="display">{title}</h1>
      {text && <p>{text}</p>}
      {children}
    </section>
  );
}

function BlockHead({ eyebrow, title }) {
  return (
    <div className="block-head">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="h2" style={{ marginTop: eyebrow ? 3 : 0 }}>{title}</h2>
    </div>
  );
}

function Tip({ c, Icon = Sparkles, children, className = "", style }) {
  return (
    <div className={`tip ${className}`} style={{ "--c": c, ...style }}>
      <Icon size={18} strokeWidth={2.4} />
      <div>{children}</div>
    </div>
  );
}

/* ───────────────────────── Piezas reutilizables ───────────────────────── */
function Stat({ value, suffix, text, label }) {
  const n = useCountUp(value ?? 0);
  return (
    <div className="stat slide">
      <div className="stat-value tnum">{text ?? n}<small className="grad-text">{suffix}</small></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* Pestañas internas con indicador deslizante */
function Segmented({ options, value, onChange }) {
  const i = Math.max(0, options.findIndex((o) => o.id === value));
  return (
    <div className="seg" role="tablist" style={{ "--n": options.length }}>
      <span className="seg-pill" style={{ transform: `translateX(${i * 100}%)` }} />
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={o.id === value} className={`seg-btn ${o.id === value ? "on" : ""}`}
          onClick={() => { onChange(o.id); vibrate(8); }}>
          {o.Icon && <o.Icon size={16} strokeWidth={2.4} />}<span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

/* Contenido de una pestaña interna: entra desde el lado hacia el que te mueves */
function useTabs(key, options) {
  const [tab, setTab] = useStored(key, options[0].id);
  const prev = useRef(tab);
  const dir = useRef("right");
  const idx = options.findIndex((o) => o.id === tab);
  const pIdx = options.findIndex((o) => o.id === prev.current);
  if (idx !== pIdx) { dir.current = idx > pIdx ? "right" : "left"; prev.current = tab; }
  return [tab, setTab, dir.current];
}

function TabPanel({ id, dir, children }) {
  return <div key={id} className={`tab-panel from-${dir} stagger`}>{children}</div>;
}

/* Fila corta que se abre al tocar */
function Expand({ Icon, title, short, children, open, onToggle, i = 0 }) {
  return (
    <div className={`expand ${open ? "open" : ""}`} style={{ "--i": i }}>
      <button className="expand-head rp" onClick={() => { onToggle(); vibrate(8); }} aria-expanded={open}>
        <span className="icon-tile"><Icon size={21} /></span>
        <span className="body">
          <span className="h3" style={{ display: "block" }}>{title}</span>
          {short && <span className="small muted">{short}</span>}
        </span>
        <span className="expand-chev"><ChevronDown size={20} /></span>
      </button>
      <div className={`acc-body ${open ? "open" : ""}`}>
        <div><div className="expand-text small muted">{children}</div></div>
      </div>
    </div>
  );
}

function Carousel({ children, label }) {
  return <div className="carousel" role="list" aria-label={label}>{children}</div>;
}

/* ───────────────────────── Inicio ───────────────────────── */
const HERO_SLIDES = [
  { img: imgHero, focus: "78% 40%", Icon: Flame, badge: "Para jóvenes deportistas", a: <>Cuida tus <span className="grad-text">tibias</span>,</>, b: "corre mejor",
    text: "Aprende a prevenir el dolor de espinillas, tratarlo y volver a entrenar sin miedo.", cta: "Ver ejercicios", to: "ejercicios" },
  { img: imgEjer, focus: "50% 25%", Icon: Dumbbell, badge: "Ejercicios", a: <>Piernas <span className="grad-text">fuertes</span>,</>, b: "tibias protegidas",
    text: "Seis ejercicios con fotos, pasos y temporizador.", cta: "Empezar", to: "ejercicios" },
  { img: imgPrev, focus: "50% 40%", Icon: ShieldCheck, badge: "Prevención", a: <>Calienta <span className="grad-text">10 minutos</span></>, b: "antes de correr",
    text: "Un calentamiento corto y seis hábitos que evitan la lesión.", cta: "Ver hábitos", to: "prevencion" },
  { img: imgRecu, focus: "50% 30%", Icon: HeartPulse, badge: "Recuperación", a: <>Vuelve a <span className="grad-text">correr</span></>, b: "paso a paso",
    text: "Un plan de 8 semanas con tu progreso guardado.", cta: "Ver el plan", to: "recuperacion" },
];
const SLIDE_MS = 5000;

function HeroCarousel({ go }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const n = HERO_SLIDES.length;
  const s = HERO_SLIDES[i];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((k) => (k + 1) % n), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, paused, n]);

  const goTo = (k) => { setI((k + n) % n); vibrate(8); };
  const onStart = (e) => { touch.current = e.touches[0].clientX; setPaused(true); };
  const onEnd = (e) => {
    const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
    if (Math.abs(dx) > 45) goTo(i + (dx < 0 ? 1 : -1));
    touch.current = null; setPaused(false);
  };

  return (
    <section className="photo hero bleed hero-carousel" style={{ "--i": 0 }} onTouchStart={onStart} onTouchEnd={onEnd}
      aria-roledescription="carrusel" aria-label="Destacados">
      {HERO_SLIDES.map((sl, k) => (
        <img key={k} src={sl.img} alt="" className={`hero-slide ${k === i ? "on" : ""}`} style={{ objectPosition: sl.focus }} />
      ))}
      <div className="bars" aria-hidden="true">
        {HERO_SLIDES.map((_, k) => (
          <span key={k} className={k < i ? "done" : ""}>
            {k === i && <i key={i} style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }} />}
          </span>
        ))}
      </div>
      <div key={i} className="hero-copy">
        <span className="badge"><s.Icon size={14} strokeWidth={2.6} />{s.badge}</span>
        <h1 className="display"><span className="line"><span>{s.a}</span></span><span className="line"><span>{s.b}</span></span></h1>
        <p>{s.text}</p>
        <div className="hero-actions">
          <button className="btn btn-primary rp" onClick={() => go(s.to)}>
            <span>{s.cta}</span><span className="btn-ic"><ArrowRight size={20} strokeWidth={2.6} /></span>
          </button>
          <button className="btn btn-glass rp" onClick={() => go("que-es")}><BookOpen size={18} /> <span>Aprende</span></button>
        </div>
      </div>
      <div className="dots">
        {HERO_SLIDES.map((sl, k) => (
          <button key={k} className={`dot ${k === i ? "on" : ""}`} onClick={() => goTo(k)} aria-label={`Ir a ${sl.badge}`} />
        ))}
      </div>
    </section>
  );
}

function Inicio({ go }) {
  const tiles = [
    { id: "que-es", img: imgQueEs, focus: "60% 40%", desc: "Qué le pasa a tu tibia" },
    { id: "prevencion", img: imgPrev, focus: "50% 50%", desc: "Hábitos y calentamiento" },
    { id: "ejercicios", img: imgEx2, focus: "60% 50%", desc: "Con temporizador" },
    { id: "recuperacion", img: imgRecu, focus: "50% 35%", desc: "Plan de 8 semanas" },
  ];

  return (
    <div className="stagger">
      <HeroCarousel go={go} />

      <section className="block" style={{ "--i": 1 }}>
        <BlockHead eyebrow="Explora" title="¿Qué necesitas hoy?" />
        <div className="tiles">
          {tiles.map((t, k) => {
            const S = SECTIONS.find((s) => s.id === t.id);
            return (
              <button key={t.id} className="photo tile tap rp pop" style={{ "--i": k }} onClick={() => go(t.id)}>
                <img src={t.img} alt="" style={{ objectPosition: t.focus }} />
                <span className="tile-go"><S.Icon size={17} /></span>
                <span className="h3">{S.label}</span>
                <span className="small">{t.desc}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="block reveal" style={{ "--i": 2 }}>
        <PainCheck />
      </section>
    </div>
  );
}

function PainCheck() {
  const [pain, setPain] = useState(0);
  const level = painLevel(pain);
  const angle = -90 + pain * 18;

  return (
    <div className="card">
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}><Gauge size={14} /> Escala 0–10</div>
      <h2 className="h2" style={{ marginTop: 3 }}>¿Cómo es tu dolor hoy?</h2>
      <p className="small muted" style={{ margin: "6px 0 0" }}>Toca un número para saber qué hacer.</p>

      <div className="gauge-wrap" style={{ marginTop: 12 }}>
        <svg className="gauge" viewBox="0 0 300 165" role="img" aria-label={`Dolor ${pain} de 10: ${level.label}`}>
          <defs>
            <linearGradient id="g-pain" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#34d399" />
              <stop offset=".35" stopColor="#fbbf24" />
              <stop offset=".6" stopColor="#fb923c" />
              <stop offset=".8" stopColor="#f43f5e" />
              <stop offset="1" stopColor="#be123c" />
            </linearGradient>
          </defs>
          <path d="M 30 150 A 120 120 0 0 1 270 150" fill="none" stroke="var(--surface-2)" strokeWidth="22" strokeLinecap="round" />
          <path d="M 30 150 A 120 120 0 0 1 270 150" fill="none" stroke="url(#g-pain)" strokeWidth="22" strokeLinecap="round"
            strokeDasharray="377" strokeDashoffset={377 - (377 * pain) / 10} style={{ transition: "stroke-dashoffset .7s cubic-bezier(.2,.8,.2,1)" }} />
          <g className="gauge-needle" style={{ transform: `rotate(${angle}deg)` }}>
            <path d="M150 150 L145 150 L150 58 L155 150 Z" fill="#fff" />
          </g>
          <circle cx="150" cy="150" r="10" fill="#fff" />
          <circle cx="150" cy="150" r="4" fill="var(--bg)" />
        </svg>
        <div key={pain} className="gauge-value tnum bump" style={{ color: level.c }}>{pain}<span style={{ fontSize: 20, color: "var(--ink-3)" }}>/10</span></div>
        <div className="gauge-label" style={{ color: level.c }}>{level.label}</div>

        <div className="pain-dots" role="radiogroup" aria-label="Nivel de dolor">
          {Array.from({ length: 11 }, (_, v) => (
            <button key={v} role="radio" aria-checked={pain === v} className={`pain-dot tnum ${pain === v ? "on" : ""}`}
              style={{ "--c": painLevel(v).c }} onClick={() => { setPain(v); vibrate(12); }}>{v}</button>
          ))}
        </div>

        <div key={level.label} className="pain-advice bump" style={{ "--c": level.c }}>
          <span style={{ color: level.c, flexShrink: 0 }}>{pain >= 5 ? <TriangleAlert size={20} /> : <Check size={20} strokeWidth={2.8} />}</span>
          <span>{level.action}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── ¿Qué es? ───────────────────────── */
const QUE_TABS = [
  { id: "que", label: "Qué es", Icon: BookOpen },
  { id: "sintomas", label: "Síntomas", Icon: Activity },
  { id: "riesgos", label: "Riesgos", Icon: TriangleAlert },
];

function QueEs() {
  const [tab, setTab, dir] = useTabs("setm-tab-que", QUE_TABS);
  const [open, setOpen] = useState(null);

  return (
    <div className="stagger">
      <PhotoHeader i={0} img={imgQueEs} focus="65% 40%" c="var(--accent)" BadgeIcon={Stethoscope} badge="Qué es"
        title="Estrés tibial medial" text="Dolor en la cara interna de la espinilla." />

      <div className="block sticky-seg" style={{ "--i": 1 }}>
        <Segmented options={QUE_TABS} value={tab} onChange={setTab} />
      </div>

      {tab === "que" && (
        <TabPanel id="que" dir={dir}>
          <section className="card" style={{ "--i": 0 }}>
            <p style={{ margin: 0 }} className="muted">
              Cada vez que pisas corriendo o saltando, los músculos de la pantorrilla tiran del borde interno de la tibia.
              Si ese esfuerzo se repite más de lo que el hueso aguanta, la zona se irrita y empieza a doler.
            </p>
            <p style={{ margin: "10px 0 0" }} className="muted">
              Suele aparecer después de entrenar más de lo habitual: más kilómetros, más días seguidos o una superficie más dura.
            </p>
          </section>

          <section className="block" style={{ "--i": 1 }}>
            <BlockHead eyebrow="En cifras" title="Lo que dicen los datos" />
            <Carousel label="Cifras">
              <Stat value={35} suffix="%" label="de los atletas jóvenes lo sufren" />
              <Stat text="6–8" suffix=" sem" label="es lo que suele tardar en curarse" />
              <Stat value={80} suffix="%" label="mejora con rehabilitación" />
              <Stat value={40} suffix="%" label="menos recaídas si entrenas el equilibrio" />
            </Carousel>
          </section>

          <section className="block" style={{ "--i": 2 }}>
            <BlockHead eyebrow="Anatomía" title="Qué partes se afectan" />
            <Carousel label="Anatomía">
              {[
                { name: "Periostio", desc: "La capa fina que cubre la tibia. Es lo que se inflama.", Icon: Bone },
                { name: "Tibial posterior", desc: "Músculo profundo que sujeta el arco del pie y tira del hueso en cada pisada.", Icon: Activity },
                { name: "Fascia profunda", desc: "Lámina que envuelve los músculos y se une al borde de la tibia.", Icon: HeartPulse },
              ].map((s) => (
                <div key={s.name} className="card slide mini">
                  <span className="icon-tile"><s.Icon size={21} /></span>
                  <div className="h3" style={{ marginTop: 12 }}>{s.name}</div>
                  <div className="small muted" style={{ marginTop: 4 }}>{s.desc}</div>
                </div>
              ))}
            </Carousel>
          </section>

          <Tip className="block" c="var(--accent)" Icon={Check} style={{ "--i": 3 }}>
            Con descanso del impacto y un plan de ejercicios, la mayoría vuelve a entrenar sin dolor en 6 a 8 semanas.
          </Tip>
        </TabPanel>
      )}

      {tab === "sintomas" && (
        <TabPanel id="sintomas" dir={dir}>
          <section className="card" style={{ "--i": 0 }}>
            <BlockHead title="Cómo saber si es esto" />
            <ul className="list">
              {[
                "Duele la cara interna de la tibia, en la mitad de abajo.",
                "Molesta al empezar a correr y se calma al entrar en calor.",
                "Te duele si aprietas el borde interno del hueso.",
                "Puede haber una hinchazón leve.",
              ].map((s) => (
                <li key={s}>
                  <span className="ic check-ic"><Check size={16} strokeWidth={3} /></span>
                  <span className="small muted">{s}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="alert-card block" style={{ "--i": 1 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", color: "var(--danger)" }}>
              <TriangleAlert size={22} strokeWidth={2.4} />
              <h2 className="h2" style={{ fontSize: 18 }}>Ve al médico si…</h2>
            </div>
            <ul className="list" style={{ marginTop: 12 }}>
              <li><span className="ic" style={{ color: "var(--danger)" }}><ChevronRight size={18} strokeWidth={3} /></span><span className="small" style={{ color: "#fecdd3" }}>El dolor sigue durante todo el entrenamiento y después.</span></li>
              <li><span className="ic" style={{ color: "var(--danger)" }}><ChevronRight size={18} strokeWidth={3} /></span><span className="small" style={{ color: "#fecdd3" }}>Duele en reposo o por la noche: puede ser una fractura por estrés.</span></li>
            </ul>
          </section>
        </TabPanel>
      )}

      {tab === "riesgos" && (
        <TabPanel id="riesgos" dir={dir}>
          <BlockHead eyebrow="Factores de riesgo" title="Qué lo hace más probable" />
          <div className="stack">
            {[
              { Icon: TrendingUp, title: "Subir de golpe", short: "Más kilómetros o intensidad de repente", text: "Es la causa más común. El hueso necesita semanas para adaptarse a más carga." },
              { Icon: Footprints, title: "Pisada y calzado", short: "Pie plano o zapatillas gastadas", text: "Si el pie se hunde hacia dentro al pisar (pronación) o las zapatillas ya no amortiguan, la tibia recibe más tensión." },
              { Icon: Mountain, title: "Superficies duras", short: "Siempre asfalto o cemento", text: "Correr siempre en duro multiplica el impacto. Alterna con hierba, tierra o pista." },
              { Icon: Dumbbell, title: "Poca fuerza", short: "Core, glúteos o pantorrillas débiles", text: "Si estos músculos no aguantan, la pierna absorbe peor cada pisada." },
              { Icon: Activity, title: "Técnica de carrera", short: "Zancada larga, caer de talón", text: "Pasos más cortos y frecuentes reducen el golpe que llega a la tibia." },
              { Icon: Apple, title: "Nutrición", short: "Poca vitamina D o calcio", text: "Son necesarios para que el hueso se recupere entre entrenamientos." },
              { Icon: RotateCcw, title: "Haberlo tenido antes", short: "Hasta 6 de cada 10 recaen", text: "Si ya lo sufriste, sigue con los ejercicios de prevención aunque ya no te duela." },
            ].map((r, k) => (
              <Expand key={r.title} i={k} Icon={r.Icon} title={r.title} short={r.short} open={open === k} onToggle={() => setOpen(open === k ? null : k)}>
                {r.text}
              </Expand>
            ))}
          </div>
        </TabPanel>
      )}
    </div>
  );
}

/* ───────────────────────── Prevención ───────────────────────── */
const PREV_TABS = [
  { id: "habitos", label: "Hábitos", Icon: ShieldCheck },
  { id: "calentamiento", label: "Calentamiento", Icon: Flame },
];

function Prevencion({ celebrate }) {
  const [tab, setTab, dir] = useTabs("setm-tab-prev", PREV_TABS);
  const [sel, setSel] = useState(0);
  const [done, setDone] = useStored("setm-warmup", []);
  const total = WARMUP.reduce((s, w) => s + w.time, 0);
  const doneMin = WARMUP.reduce((s, w, i) => s + (done.includes(i) ? w.time : 0), 0);
  const toggle = (i) => {
    vibrate(10);
    const next = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    setDone(next);
    if (next.length === WARMUP.length && done.length !== WARMUP.length) celebrate("¡Calentamiento completo!");
  };
  const tip = PREVENTION_TIPS[sel];

  return (
    <div className="stagger">
      <PhotoHeader i={0} img={imgPrev} focus="50% 45%" c="var(--accent)" BadgeIcon={ShieldCheck} badge="Prevención"
        title="Evita la lesión" text="Seis hábitos y un calentamiento de 10 minutos." />

      <div className="block sticky-seg" style={{ "--i": 1 }}>
        <Segmented options={PREV_TABS} value={tab} onChange={setTab} />
      </div>

      {tab === "habitos" && (
        <TabPanel id="habitos" dir={dir}>
          <div className="habit-grid" style={{ "--i": 0 }}>
            {PREVENTION_TIPS.map((t, k) => (
              <button key={t.title} className={`habit rp tap ${sel === k ? "on" : ""}`} onClick={() => { setSel(k); vibrate(8); }} aria-pressed={sel === k}>
                <span className="habit-ic"><t.Icon size={22} /></span>
                <span className="habit-title">{t.title}</span>
              </button>
            ))}
          </div>
          <div key={sel} className="card habit-detail" style={{ "--i": 1 }}>
            <div className="eyebrow">{tip.short}</div>
            <h3 className="h2" style={{ fontSize: 19, marginTop: 4 }}>{tip.title}</h3>
            <p className="small muted" style={{ margin: "8px 0 0" }}>{tip.desc}</p>
          </div>
          <Tip className="block" c="var(--accent)" Icon={ListChecks} style={{ "--i": 2 }}>
            Ningún hábito funciona solo. Juntos pueden reducir el riesgo hasta un <strong>60–70%</strong> (British Journal of Sports Medicine).
          </Tip>
        </TabPanel>
      )}

      {tab === "calentamiento" && (
        <TabPanel id="calentamiento" dir={dir}>
          <section className="card" style={{ "--i": 0 }}>
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}><TimerIcon size={14} /> {total} min antes de entrenar</div>
            <h2 className="h2" style={{ marginTop: 3 }}>Calentamiento</h2>
            <div className="progress" style={{ marginTop: 12 }}><span style={{ width: `${(doneMin / total) * 100}%` }} /></div>
            <div className="small tnum" style={{ marginTop: 6, fontWeight: 700, color: "var(--ink-2)" }}>{doneMin} de {total} min · se guarda en tu teléfono</div>
            <div style={{ marginTop: 8 }}>
              {WARMUP.map((w, i) => (
                <button key={w.act} className={`check rp ${done.includes(i) ? "on" : ""}`} onClick={() => toggle(i)} aria-pressed={done.includes(i)}>
                  <span className="check-box"><Check size={15} strokeWidth={3.2} /></span>
                  <span className="check-text small" style={{ flex: 1 }}>{w.act}</span>
                  <span className="tag tnum">{w.time} min</span>
                </button>
              ))}
            </div>
            {done.length > 0 && (
              <button className="btn btn-soft rp" style={{ marginTop: 10 }} onClick={() => setDone([])}>
                <RotateCcw size={16} /> <span>Reiniciar</span>
              </button>
            )}
          </section>
        </TabPanel>
      )}
    </div>
  );
}

/* ───────────────────────── Ejercicios ───────────────────────── */
function Ejercicios({ onOpen }) {
  const [phase, setPhase] = useStored("setm-phase", "Todos");
  const phases = ["Todos", ...Object.keys(PHASE)];
  const list = phase === "Todos" ? EXERCISES : EXERCISES.filter((e) => e.phase === phase);

  return (
    <div className="stagger">
      <PhotoHeader i={0} img={imgEjer} focus="50% 30%" c="var(--accent)" BadgeIcon={Dumbbell} badge="Ejercicios"
        title="Entrena tus piernas" text="Toca uno para ver los pasos y usar el temporizador." />

      <div className="chips block sticky-seg" style={{ "--i": 1, marginTop: 20 }} role="tablist">
        {phases.map((p) => {
          const PIcon = PHASE[p]?.Icon || ListChecks;
          return (
            <button key={p} role="tab" aria-selected={phase === p} className={`chip rp tap ${phase === p ? "on" : ""}`} onClick={() => { setPhase(p); vibrate(8); }}>
              <PIcon size={16} /> <span>{p}</span>
            </button>
          );
        })}
      </div>

      <div key={phase} className="ex-grid stagger" style={{ "--i": 2 }}>
        {list.map((ex, i) => (
          <button key={ex.id} className="photo ex-tile tap rp pop" style={{ "--i": i }} onClick={() => onOpen(ex.id)}>
            <img src={ex.img} alt="" style={{ objectPosition: ex.focus }} loading="lazy" />
            <span className="tag tag-glass">{ex.phase}</span>
            <span className="h3">{ex.title}</span>
            <span className="ex-dose tnum"><TimerIcon size={13} strokeWidth={2.4} /> {ex.duration}</span>
          </button>
        ))}
      </div>

      <Tip className="block" c="var(--accent)" Icon={TriangleAlert} style={{ "--i": 3 }}>
        Si durante un ejercicio el dolor pasa de 3/10, para y consulta con un fisioterapeuta.
      </Tip>
    </div>
  );
}

function ExerciseSheet({ ex, onClose }) {
  const [closing, setClosing] = useState(false);
  const [drag, setDrag] = useState(0);
  const startY = useRef(null);
  if (!ex) return null;
  const ph = PHASE[ex.phase];
  const close = () => { setClosing(true); setTimeout(onClose, 260); };

  const onTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const onTouchMove = (e) => {
    if (startY.current === null) return;
    setDrag(Math.max(0, e.touches[0].clientY - startY.current));
  };
  const onTouchEnd = () => {
    if (drag > 110) close(); else setDrag(0);
    startY.current = null;
  };

  return (
    <>
      <div className={`sheet-backdrop ${closing ? "closing" : ""}`} onClick={close} />
      <div className={`sheet ${closing ? "closing" : ""} ${drag ? "dragging" : ""}`} role="dialog" aria-modal="true" aria-label={ex.title}
        style={{ "--c": ph.c, transform: drag ? `translateY(${drag}px)` : undefined }}>
        <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <PhotoHeader className="sheet-photo" img={ex.img} focus={ex.focus} c={ph.c} BadgeIcon={ph.Icon} badge={`${ex.phase} · ${ex.level}`} title={ex.title}>
            <span className="ex-dose tnum" style={{ color: "#fff", fontSize: 15 }}><TimerIcon size={16} /> {ex.duration}</span>
          </PhotoHeader>
          <div className="grabber" />
        </div>
        <button className="close-btn rp tap" onClick={close} aria-label="Cerrar"><X size={20} strokeWidth={2.6} /></button>

        <div className="sheet-body">
          <div className="eyebrow" style={{ marginBottom: 12 }}>Paso a paso</div>
          <ol className="steps stagger">
            {ex.steps.map((s, i) => (
              <li key={s} style={{ "--i": i }}><span className="step-n tnum">{i + 1}</span><span className="muted">{s}</span></li>
            ))}
          </ol>

          <Tip c={ph.c} Icon={Sparkles} style={{ marginTop: 16 }}><strong>Clave:</strong> {ex.tip}</Tip>

          <div className="eyebrow" style={{ marginTop: 20, marginBottom: 10 }}>Temporizador</div>
          <Timer seconds={ex.timer.s} label={ex.timer.label} />
        </div>
      </div>
    </>
  );
}

function Timer({ seconds, label }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          clearInterval(ref.current);
          setRunning(false);
          vibrate([200, 100, 200]);
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [running]);

  const C = 2 * Math.PI * 46;
  const done = left === 0;
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className={`timer ${done ? "done" : ""} ${running ? "running" : ""}`}>
      <div className="timer-ring">
        <svg width="108" height="108" viewBox="0 0 108 108">
          <defs>
            <linearGradient id="g-timer" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff7a45" />
              <stop offset="1" stopColor="#ff3d7f" />
            </linearGradient>
          </defs>
          <circle cx="54" cy="54" r="46" fill="none" stroke="var(--surface-2)" strokeWidth="9" />
          <circle className="prog" cx="54" cy="54" r="46" fill="none" stroke="url(#g-timer)" strokeWidth="9" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - left / seconds)} />
        </svg>
        <div className="timer-num tnum">{done ? <Check size={36} strokeWidth={3} /> : mm ? `${mm}:${ss}` : left}</div>
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="h3">{done ? "¡Listo!" : label}</div>
        <div className="small muted tnum">{seconds} segundos</div>
        <div className="timer-controls">
          <button className="icon-btn main rp tap" onClick={() => { if (done) setLeft(seconds); setRunning((r) => !r); vibrate(10); }}
            aria-label={running ? "Pausar" : "Iniciar"}>
            {running ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
          </button>
          <button className="icon-btn rp tap" onClick={() => { setRunning(false); setLeft(seconds); }} aria-label="Reiniciar">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Recuperación ───────────────────────── */
const RECU_TABS = [
  { id: "plan", label: "Plan", Icon: ListChecks },
  { id: "alertas", label: "Alertas", Icon: TriangleAlert },
  { id: "consejos", label: "Consejos", Icon: Sparkles },
];

function Recuperacion({ celebrate }) {
  const [tab, setTab, dir] = useTabs("setm-tab-recu", RECU_TABS);
  const [open, setOpen] = useStored("setm-stage-open", 0);
  const [checks, setChecks] = useStored("setm-recovery", {});
  const toggle = (i, j) => {
    vibrate(10);
    const key = `${i}-${j}`;
    const next = { ...checks, [key]: !checks[key] };
    setChecks(next);
    const stage = RECOVERY_STAGES[i];
    const was = stage.tasks.every((_, k) => checks[`${i}-${k}`]);
    const now = stage.tasks.every((_, k) => next[`${i}-${k}`]);
    if (now && !was) celebrate(`¡Fase ${i + 1} completada!`);
  };
  const totalTasks = RECOVERY_STAGES.reduce((s, st) => s + st.tasks.length, 0);
  const doneTasks = Object.values(checks).filter(Boolean).length;

  return (
    <div className="stagger">
      <PhotoHeader i={0} img={imgRecu} focus="50% 35%" c="var(--accent)" BadgeIcon={HeartPulse} badge="Recuperación"
        title="Vuelve a correr" text="Cuatro fases. Pasa a la siguiente solo si ya no te duele." />

      <div className="block sticky-seg" style={{ "--i": 1 }}>
        <Segmented options={RECU_TABS} value={tab} onChange={setTab} />
      </div>

      {tab === "plan" && (
        <TabPanel id="plan" dir={dir}>
          <div className="card overall" style={{ "--i": 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="h3">Tu progreso</span>
              <span className="tnum grad-text" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22 }}>{Math.round((doneTasks / totalTasks) * 100)}%</span>
            </div>
            <div className="progress" style={{ marginTop: 10 }}><span style={{ width: `${(doneTasks / totalTasks) * 100}%` }} /></div>
          </div>

          <div className="timeline block" style={{ "--i": 1 }}>
            {RECOVERY_STAGES.map((stage, i) => {
              const isOpen = open === i;
              const n = stage.tasks.filter((_, j) => checks[`${i}-${j}`]).length;
              const pct = n / stage.tasks.length;
              const R = 24, C = 2 * Math.PI * R;
              return (
                <div key={stage.title} className={`stage ${isOpen ? "open" : ""}`} style={{ "--c": "var(--accent)" }}>
                  <button className="stage-head rp" onClick={() => { setOpen(isOpen ? null : i); vibrate(8); }} aria-expanded={isOpen}>
                    <span className="stage-num tnum">
                      {pct === 1 ? <Check size={20} strokeWidth={3} /> : i + 1}
                      <svg className="stage-ring" viewBox="0 0 52 52" aria-hidden="true">
                        <circle cx="26" cy="26" r={R} fill="none" stroke="var(--c)" strokeOpacity=".2" strokeWidth="2.5" />
                        <circle cx="26" cy="26" r={R} fill="none" stroke="var(--c)" strokeWidth="2.5" strokeLinecap="round"
                          strokeDasharray={C} strokeDashoffset={C * (1 - pct)} transform="rotate(-90 26 26)" />
                      </svg>
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span className="small tnum" style={{ display: "block", color: "var(--ink-3)", fontWeight: 700 }}>{stage.week} · {n}/{stage.tasks.length}</span>
                      <span className="h3" style={{ display: "block" }}>{stage.title}</span>
                    </span>
                    <span className="stage-chev"><ChevronDown size={22} /></span>
                  </button>
                  <div className={`acc-body ${isOpen ? "open" : ""}`}>
                    <div>
                      <div style={{ padding: "8px 12px 12px", borderTop: "1px solid var(--line)" }}>
                        {stage.tasks.map((t, j) => {
                          const on = !!checks[`${i}-${j}`];
                          return (
                            <button key={t} className={`check rp ${on ? "on" : ""}`} onClick={() => toggle(i, j)} aria-pressed={on}>
                              <span className="check-box"><Check size={15} strokeWidth={3.2} /></span>
                              <span className="check-text small">{t}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
      )}

      {tab === "alertas" && (
        <TabPanel id="alertas" dir={dir}>
          <section className="alert-card" style={{ "--i": 0 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", color: "var(--danger)" }}>
              <TriangleAlert size={24} strokeWidth={2.4} />
              <h2 className="h2" style={{ fontSize: 19 }}>Ve al médico ya si…</h2>
            </div>
            <ul className="list" style={{ marginTop: 14 }}>
              {[
                "Te duele en reposo o te despierta por la noche",
                "El dolor está en un punto muy concreto (puede ser una fractura por estrés)",
                "La zona se hincha mucho o cambia de color",
                "El dolor va a más aunque descanses",
                "Notas calor intenso o latidos en la tibia",
              ].map((f) => (
                <li key={f}>
                  <span className="ic" style={{ color: "var(--danger)" }}><ChevronRight size={18} strokeWidth={3} /></span>
                  <span className="small" style={{ color: "#fecdd3" }}>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </TabPanel>
      )}

      {tab === "consejos" && (
        <TabPanel id="consejos" dir={dir}>
          <Carousel label="Consejos">
            {[
              { Icon: Snowflake, title: "Hielo y reposo", desc: "Hielo 15–20 min, compresión y pierna en alto durante las primeras 48–72 h." },
              { Icon: NotebookPen, title: "Lleva un diario", desc: "Apunta el dolor (0–10), qué entrenaste y cuánto. Verás qué te sienta mal." },
              { Icon: Stethoscope, title: "Pide ayuda", desc: "Un fisioterapeuta o médico deportivo. Un podólogo puede revisar tu pisada." },
            ].map((t) => (
              <div key={t.title} className="card slide mini">
                <span className="icon-tile"><t.Icon size={21} /></span>
                <div className="h3" style={{ marginTop: 12 }}>{t.title}</div>
                <div className="small muted" style={{ marginTop: 4 }}>{t.desc}</div>
              </div>
            ))}
          </Carousel>
        </TabPanel>
      )}
    </div>
  );
}
