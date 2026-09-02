// /lib/config.ts
// TODA la copy editable de la landing vive aquí.

// ─── Tipos ────────────────────────────────────────────────────────────

export type Color = "green" | "amber" | "red"

export type HorasId = "menos-8" | "8-12" | "12-15" | "mas-15"
export type SintomaId =
  | "grasa-abdominal"
  | "no-baja-peso"
  | "cortisol-mananas"
  | "insomnio-3am"
  | "cafeina"
  | "energia-cero"
  | "espalda-cuello"
  | "libido-baja"
  | "sofa-noche"
  | "antojos-dulce"
export type ImpactoId = "nada" | "poco" | "bastante" | "mucho"
export type CompromisoId = "solucionar" | "seguir"

// ─── Sección 1 · Hero ─────────────────────────────────────────────────

export const hero = {
  etiqueta: "GRATUITO · THE HEALTH DEALER",
  titulo: "1h de gym no compensa 15h sentado.",
  subtitulo:
    "Por qué entrenas duro, comes bien, y sigues sin bajar grasa.",
  parrafo:
    "Este no es otro PDF de estiramientos. Es el mecanismo exacto que sabotea tus resultados aunque hagas todo bien — y el protocolo de 5 puntos para desarmarlo sin añadir una hora más de gym.",
  botonEmpezar: "Empezar",
  scrollHint: "↓  LEE EN 4 MINUTOS",
}

// ─── Sección 2 · El mecanismo ─────────────────────────────────────────

export const mecanismo = {
  etiqueta: "PRIMERO · POR QUÉ NO BAJAS GRASA",
  titulo:
    "La señal que tu cuerpo recibe durante todo el día es más importante que esforzarte más entrenando.",
  parrafo1:
    "De la silla del trabajo al sillón cuando llegas a casa, eso es síntoma. Despertarte a las 3 de la mañana con la cabeza a mil, otro síntoma. Y como resultado: grasa abdominal que te cuesta muchísimo eliminar. Y eso es la señal de que tu sistema nervioso está hiperestimulado y tu cortisol elevado.",
  flujoTabs: [
    { id: "sentado", label: "8h silla trabajo" },
    { id: "comidas", label: "2h desplazamientos" },
    { id: "sofa", label: "4h sofá noche" },
    { id: "senal", label: "Baja demanda + alta activación mental" },
    { id: "cortisol", label: "Cortisol crónico", highlight: true },
    { id: "modo", label: "Modo almacenamiento" },
  ],
  parrafo2:
    "Un cuerpo que recibe la señal de \"siéntate y aguanta\" durante 15h dispara cortisol de forma sostenida. Y un cuerpo con cortisol crónico entra en modo almacenamiento: guarda reservas — sobre todo en el abdomen —, retiene líquido, y raciona tu energía. Por eso vuelves a casa vacío aunque \"no hayas hecho tanto\". Por eso la grasa abdominal no baja aunque comes bien.",
  parrafo3:
    "La 1h de gym llega tarde. Estás intentando compensar un sprint sobre un motor que lleva 15h en ralentí. Y el motor en ralentí no descansa — se degrada. La solución no es entrenar más. Es cortar la señal en los momentos exactos que la disparan.",
} as const

// ─── Sección 3 · El protocolo ─────────────────────────────────────────

export const protocolo = {
  etiqueta: "EL PROTOCOLO · TOCA CADA BLOQUE",
  titulo: "5 puntos para cortar la señal sedentaria.",
  subtitulo:
    "No son ejercicios. Son intervenciones de 60-90 segundos en los momentos exactos que tu cuerpo entra en modo almacenamiento. En total, menos de 6 minutos repartidos por tu jornada.",
  bloques: [
    {
      id: "arranque",
      numero: "01",
      titulo: "El arranque del día",
      subtitulo: "Cortar la inercia postural antes de sentarte",
      momento: "Al despertar · 90 segundos",
      animacion: "expansion",
      descripcion:
        "Cuando te despiertas, tu cuerpo ya lleva 8h de inmovilidad. Si vas directo a la silla, arrancas el día en modo ahorro. Este bloque abre el sistema respiratorio y baja cortisol antes de que la jornada empiece a apilar.",
      checklist: [
        {
          titulo: "Apertura torácica en el borde de la cama",
          detalle: "3 respiraciones amplias con brazos abiertos. Reabre pecho y baja cortisol matutino.",
        },
        {
          titulo: "10 pasos descalzo por casa antes de sentarte",
          detalle: "Activa mecanorreceptores plantares. Le dice al sistema nervioso: \"día en marcha, no en almacenamiento\".",
        },
        {
          titulo: "Luz natural en los ojos 60 segundos",
          detalle: "Ancla tu ritmo circadiano. Cortisol matutino real, no cafeína compensando cortisol plano.",
        },
      ],
    },
    {
      id: "media-manana",
      numero: "02",
      titulo: "El corte de media mañana",
      subtitulo: "Reactivar el glúteo antes de que se apague",
      momento: "3h después de sentarte · 60 segundos",
      animacion: "pulso",
      descripcion:
        "A las 3h sentado, el glúteo entra en amnesia. La lumbar empieza a hacer su trabajo. Un minuto de activación aquí evita el bloqueo de cadera de la tarde y la señal de \"aguanta\" que sube cortisol.",
      checklist: [
        {
          titulo: "Levántate y camina 60 segundos",
          detalle: "No es un break de café. Es una señal metabólica. Camina, no revises el móvil de pie.",
        },
        {
          titulo: "10 puentes de glúteo apoyado en la silla",
          detalle: "Reactiva el músculo más apagado del profesional sedentario. Corta la cascada lumbar → cervical.",
        },
        {
          titulo: "3 respiraciones nasales largas",
          detalle: "Baja el pulso, corta la activación mental sostenida. Reset al sistema nervioso.",
        },
      ],
    },
    {
      id: "comida",
      numero: "03",
      titulo: "La comida",
      subtitulo: "No es qué comes. Es qué haces después",
      momento: "Post-comida · 90 segundos",
      animacion: "onda",
      descripcion:
        "El pico de glucosa post-comida es donde se decide si esa comida va a energía o a grasa abdominal. Sentarte inmediatamente después es la peor decisión metabólica del día. Y es la que hace todo el mundo.",
      checklist: [
        {
          titulo: "Camina 90 segundos justo al terminar",
          detalle: "Aplana el pico de glucosa hasta un 30%. No necesitas correr. Camina en el pasillo, en la calle, donde sea.",
        },
        {
          titulo: "Nunca vuelvas a la silla dentro de los primeros 10 min",
          detalle: "De pie hablando, ordenando algo, lo que sea. Los primeros 10 min son sagrados.",
        },
        {
          titulo: "Si no puedes salir: 20 sentadillas lentas",
          detalle: "Mismo efecto sobre la glucosa. Regla de mínimo: mover piernas grandes en los 10 min post-comida.",
        },
      ],
    },
    {
      id: "media-tarde",
      numero: "04",
      titulo: "La bajada de las 5",
      subtitulo: "El punto donde el día decide cómo termina",
      momento: "Media tarde · 60 segundos",
      animacion: "descompresion",
      descripcion:
        "A las 17-18h, si no intervienes, el cortisol sostenido pide azúcar. Los antojos de dulce de la tarde son una señal metabólica, no falta de fuerza de voluntad. Un minuto aquí decide si llegas a la noche entero o vacío.",
      checklist: [
        {
          titulo: "Descarga cervical: inclina la cabeza 3 veces a cada lado",
          detalle: "Baja tensión trapecios. Corta el patrón que dispara dolor de cabeza tensional.",
        },
        {
          titulo: "Un vaso de agua con sal antes que café",
          detalle: "La sed y el cortisol se confunden. Hidratar corta el antojo de dulce mejor que otro café.",
        },
        {
          titulo: "Sal del edificio 2 minutos si puedes",
          detalle: "Luz natural + aire = reset del ritmo. Vuelves con más energía real, no forzada.",
        },
      ],
    },
    {
      id: "noche",
      numero: "05",
      titulo: "El cierre",
      subtitulo: "Cortar la transición silla → sofá",
      momento: "Antes de sentarte en el sofá · 90 segundos",
      animacion: "descenso",
      descripcion:
        "Aquí es donde el patrón se cierra o se rompe. Ir directo de la silla del trabajo al sofá es sumar 4h más de la misma señal. Un minuto de intervención antes del sofá le dice al cuerpo: \"día cerrado, ahora descanso real\".",
      checklist: [
        {
          titulo: "Descompresión lumbar 60 segundos en el suelo",
          detalle: "Devuelve movilidad a la columna. Prepara el sistema nervioso para el sueño profundo.",
        },
        {
          titulo: "3 respiraciones 4-4-4-4 antes de encender la tele",
          detalle: "Corta la transición mental. Trabajo → descanso real, no trabajo → colapso.",
        },
        {
          titulo: "Cena y luz baja: apaga pantallas 60 min antes de dormir",
          detalle: "Melatonina real. Sin esto, el sueño no repara y el cortisol amanece disparado otra vez.",
        },
      ],
    },
  ],
  ctaTexto:
    "¿Cuánto llevas ya acumulado de este patrón? Hazte el diagnóstico.",
  ctaBoton: "Hacer el diagnóstico",
} as const

// ─── Sección 4 · Score (modal) ────────────────────────────────────────

export const bloque1 = {
  paso: 1,
  titulo: "¿Cuántas horas al día pasas sentado?",
  subtitulo: "Suma trabajo, comidas, desplazamientos y sofá.",
  opciones: [
    { id: "menos-8", label: "Menos de 8 horas" },
    { id: "8-12", label: "Entre 8 y 12 horas" },
    { id: "12-15", label: "Entre 12 y 15 horas" },
    { id: "mas-15", label: "Más de 15 horas" },
  ],
} as const

export const bloque2 = {
  paso: 2,
  titulo: "¿Cuáles de estas señales tienes con frecuencia?",
  subtitulo: "Marca todas las que apliquen. Sé honesto.",
  opciones: [
    { id: "grasa-abdominal", label: "Grasa abdominal que no baja aunque entreno" },
    { id: "no-baja-peso", label: "Como bien, entreno, y la báscula no se mueve" },
    { id: "cortisol-mananas", label: "Me despierto ya cansado, sin hambre real" },
    { id: "insomnio-3am", label: "Me despierto a las 3AM y no vuelvo a dormir" },
    { id: "cafeina", label: "Necesito 2+ cafés al día para funcionar" },
    { id: "energia-cero", label: "Voy en piloto automático todo el día" },
    { id: "espalda-cuello", label: "Espalda, cuello o cadera bloqueados al final del día" },
    { id: "libido-baja", label: "Mi libido o rendimiento sexual está bajo" },
    { id: "sofa-noche", label: "Al llegar a casa solo puedo tumbarme en el sofá" },
    { id: "antojos-dulce", label: "Antojos de dulce por la tarde o después de cenar" },
  ],
} as const

export const bloque3 = {
  paso: 3,
  titulo: "¿Cómo te está afectando en tu vida?",
  opciones: [
    { id: "nada", label: "No me afecta, lo llevo bien", puntos: 0 },
    { id: "poco", label: "Un poco, pero puedo con ello", puntos: 1 },
    { id: "bastante", label: "Bastante, me está limitando cosas importantes", puntos: 2 },
    { id: "mucho", label: "Mucho, me está pasando factura en trabajo, familia o salud", puntos: 3 },
  ],
} as const

export const bloque4 = {
  paso: 4,
  titulo: "Última pregunta.",
  subtitulo: "Sabiendo cómo estás ahora, ¿qué quieres hacer?",
  opciones: [
    { id: "solucionar", label: "Quiero solucionarlo ya", variant: "primary" },
    { id: "seguir", label: "Me da igual seguir así", variant: "neutral" },
  ],
} as const

export const scoreUi = {
  etiqueta: "DIAGNÓSTICO · MIDE TU ACUMULACIÓN",
  tituloModal: "Diagnóstico",
  botonSiguiente: "Siguiente",
  botonAtras: "Atrás",
  botonVerResultado: "Ver resultado",
  paso: "Paso",
  de: "de",
  cerrar: "Cerrar",
}

// ─── Reveal · mensajes según score ────────────────────────────────────
// Aitor: entrenar más y restringir dieta empeora el cortisol, y si no
// cortas la fuente todo va a peor. Ese mensaje adaptado por rango.

export const reveal = {
  labelScore: "TU SCORE",
  labelDe: "/10",
  labels: {
    bajo: "Acumulación baja",
    medio: "Acumulación media",
    alto: "Acumulación alta",
  },
  mensajes: {
    bajo:
      "Tu cuerpo aún compensa. Pero ojo: entrenar más o hacer más dieta con este patrón ya instalado sube cortisol en vez de bajarlo, y el margen que tienes ahora es exactamente lo que te vas a comer los próximos 5 años si no cortas la señal en la fuente. Actuar ahora te sale 10 veces más barato que actuar dentro de 5 años.",
    medio:
      "Ya tienes degradación metabólica visible. Aquí es donde la mayoría hace lo peor: sube horas de gym o baja calorías, y el cortisol se dispara todavía más — el cuerpo entra aún más en modo almacenamiento y la grasa no se mueve. La solución no está en más esfuerzo. Está en cortar la señal sedentaria en los puntos correctos del día. Si no lo haces, en 6-12 meses estás en acumulación alta.",
    alto:
      "Llevas años enviando la misma señal a tu cuerpo. Cambiar la dieta o subir horas de gym no lo va a revertir — de hecho lo empeora porque suma más cortisol al que ya tienes crónico. Y cada mes que pasa sin intervenir en la fuente, el sistema se degrada más: peor sueño, más grasa abdominal, menos energía real. Necesitas resincronizar el sistema entero, y es exactamente para lo que diseñé el programa SSE.",
  },
  hotHint:
    "Los síntomas que marcaste están directamente en el eje grasa + cortisol. Eso empuja tu score al alza aunque otros indicadores estén bien.",
}

export const revealNoQuiere = {
  titulo: "Gracias por hacer el diagnóstico.",
  mensaje:
    "Ya tienes el protocolo. Aplícalo cuando estés listo. Si algún día cambias de idea y quieres resolver esto de raíz, sabes dónde encontrarme.",
}

export const cta = {
  titulo: "Sesión de valoración gratuita con Aitor.",
  descripcion:
    "30 minutos por WhatsApp. Analizamos tu caso concreto, identificamos el punto exacto por donde entra la señal sedentaria en tu día, y te digo si el programa SSE es para ti. Sin venta forzada.",
  boton: "Reservar mi sesión",
  plazasTexto: (n: number) =>
    `Quedan ${n} sesiones de valoración este mes`,
  plazasAgotadas:
    "Plazas agotadas este mes. Vuelve el 1 del mes que viene.",
}

// Construye el mensaje pre-rellenado que se abre en WhatsApp.
export function buildWhatsappMessage(score: number, nivel: string): string {
  return `Hola Aitor, vengo de Antisilla. Mi score del diagnóstico es ${score}/10 (acumulación ${nivel}) y quiero reservar mi sesión de valoración.`
}

// ─── Persistencia ─────────────────────────────────────────────────────

export const LS_SCORE = "antisilla-score-state"

export const TOTAL_PASOS = 4

// ─── Env vars ─────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34675975982"

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ""

export const PLAZAS_DISPONIBLES = (() => {
  const raw = process.env.NEXT_PUBLIC_PLAZAS_DISPONIBLES
  const n = raw ? parseInt(raw, 10) : 5
  return Number.isFinite(n) && n >= 0 ? n : 5
})()
