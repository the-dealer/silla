"use client"

import { motion } from "framer-motion"
import {
  buildWhatsappMessage,
  cta,
  reveal,
  revealNoQuiere,
  PLAZAS_DISPONIBLES,
  WHATSAPP_NUMBER,
  type CompromisoId,
} from "@/lib/config"
import { trackEvent } from "@/lib/pixel"
import type { ScoreResult } from "@/lib/score-logic"

type Props = {
  compromiso: CompromisoId
  result: ScoreResult
  onReiniciar: () => void
  onClose: () => void
}

// Paleta por color del score (green/amber/red)
const COLOR_STYLES = {
  green: {
    ringHex: "#64653F",         // olive del brand
    ringClass: "text-olive",
    bgClass: "bg-olive/10",
    borderClass: "border-olive/40",
    textClass: "text-olive",
  },
  amber: {
    ringHex: "#D97706",
    ringClass: "text-amber-600",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-500/40",
    textClass: "text-amber-700",
  },
  red: {
    ringHex: "#DC2626",
    ringClass: "text-red-600",
    bgClass: "bg-red-50",
    borderClass: "border-red-500/40",
    textClass: "text-red-700",
  },
} as const

export default function Reveal({ compromiso, result, onReiniciar, onClose }: Props) {
  // Rama "no quiere" — cierra el modal
  if (compromiso === "seguir") {
    return (
      <div>
        <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight text-carbon">
          {revealNoQuiere.titulo}
        </h2>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-carbon/80">
          {revealNoQuiere.mensaje}
        </p>
        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 rounded-full bg-carbon px-8 py-3 text-base font-semibold text-cream transition hover:bg-carbon/85 active:scale-[0.98]"
          >
            Volver a la landing
          </button>
          <button
            type="button"
            onClick={onReiniciar}
            className="text-sm text-carbon/50 underline underline-offset-4 hover:text-carbon/80"
          >
            Reiniciar el diagnóstico
          </button>
        </div>
      </div>
    )
  }

  const { score, nivel, color, hotRuleApplied } = result
  const styles = COLOR_STYLES[color]
  const plazasAgotadas = PLAZAS_DISPONIBLES === 0
  const nivelLabel = reveal.labels[nivel]
  const mensaje = reveal.mensajes[nivel]

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsappMessage(score, nivel)
  )}`

  const handleClick = () => trackEvent("WhatsAppClick", { score, nivel })

  // Círculo SVG: circunferencia = 2πr con r=90 → ~565
  const RADIUS = 90
  const CIRC = 2 * Math.PI * RADIUS
  const pct = score / 10
  const dashOffset = CIRC * (1 - pct)

  return (
    <div>
      {/* Etiqueta */}
      <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] text-deep font-sans">
        <span aria-hidden>—</span>
        <span>{reveal.labelScore}</span>
      </div>

      {/* Score visual */}
      <div className={`mt-8 rounded-3xl border-2 ${styles.borderClass} ${styles.bgClass} p-8 md:p-12`}>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Círculo con score */}
          <div className="relative shrink-0">
            <svg
              viewBox="0 0 200 200"
              className={`w-44 h-44 md:w-56 md:h-56 -rotate-90 ${styles.ringClass}`}
              aria-hidden="true"
            >
              {/* Track */}
              <circle
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                opacity="0.15"
              />
              {/* Progreso */}
              <motion.circle
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                initial={{ strokeDashoffset: CIRC }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className={`font-display font-bold text-6xl md:text-7xl ${styles.textClass} leading-none`}
              >
                {score}
              </motion.div>
              <div className="mt-1 text-sm md:text-base text-carbon/50 font-sans tracking-wider">
                {reveal.labelDe}
              </div>
            </div>
          </div>

          {/* Nivel + hint hot */}
          <div className="flex-1 text-center md:text-left">
            <div className={`font-display font-bold text-3xl md:text-4xl leading-tight ${styles.textClass}`}>
              {nivelLabel}
            </div>
            {hotRuleApplied && (
              <p className="mt-4 text-sm md:text-base text-carbon/70 leading-relaxed italic">
                {reveal.hotHint}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mensaje explicativo */}
      <p className="mt-10 text-base md:text-lg leading-relaxed text-carbon/85">
        {mensaje}
      </p>

      {/* Bloque CTA */}
      <div className="mt-14 rounded-2xl border border-deep/40 bg-white p-6 md:p-8">
        <h3 className="font-display font-semibold text-2xl md:text-3xl leading-tight text-carbon">
          {cta.titulo}
        </h3>
        <p className="mt-4 text-sm md:text-base leading-relaxed text-carbon/75">
          {cta.descripcion}
        </p>

        {PLAZAS_DISPONIBLES === 0 ? (
          <p className="mt-6 text-sm md:text-base text-red-600 font-medium">
            {cta.plazasAgotadas}
          </p>
        ) : (
          <p className="mt-6 text-sm md:text-base text-carbon/70">
            Quedan{" "}
            <span
              className={
                PLAZAS_DISPONIBLES <= 2
                  ? "text-red-600 font-semibold animate-pulse"
                  : "text-deep font-semibold"
              }
            >
              {PLAZAS_DISPONIBLES}
            </span>{" "}
            sesiones de valoración este mes
          </p>
        )}

        {!plazasAgotadas && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-deep px-8 py-3 text-base font-semibold text-white transition hover:bg-deep/90 active:scale-[0.98]"
          >
            {cta.boton}
          </a>
        )}
      </div>

      {/* Reiniciar / cerrar (pequeños, al final) */}
      <div className="mt-10 flex items-center justify-center gap-6 text-sm text-carbon/50">
        <button type="button" onClick={onReiniciar} className="underline underline-offset-4 hover:text-carbon/80">
          Reiniciar diagnóstico
        </button>
        <span aria-hidden>·</span>
        <button type="button" onClick={onClose} className="underline underline-offset-4 hover:text-carbon/80">
          Volver a la landing
        </button>
      </div>
    </div>
  )
}
