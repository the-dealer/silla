"use client"

import {
  buildWhatsappMessage,
  cta,
  revealNoQuiere,
  revealQuiereSolucionar,
  PLAZAS_DISPONIBLES,
  WHATSAPP_NUMBER,
  type CompromisoId,
  type Nivel,
} from "@/lib/config"
import { trackEvent } from "@/lib/pixel"
import ContadorPlazas from "./ContadorPlazas"

type Props = {
  compromiso: CompromisoId
  nivel: Nivel
  onReiniciar: () => void
}

export default function Reveal({ compromiso, nivel, onReiniciar }: Props) {
  if (compromiso === "seguir") {
    return (
      <div className="bg-cream text-carbon px-6 md:px-10 py-24 md:py-32">
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight text-carbon">
            {revealNoQuiere.titulo}
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-carbon/75">
            {revealNoQuiere.mensaje}
          </p>
          <button
            type="button"
            onClick={onReiniciar}
            className="mt-12 text-sm text-carbon/40 underline underline-offset-4 hover:text-carbon/70"
          >
            Reiniciar el diagnóstico
          </button>
        </div>
      </div>
    )
  }

  const r = revealQuiereSolucionar[nivel]
  const plazasAgotadas = PLAZAS_DISPONIBLES === 0

  const mensaje = buildWhatsappMessage(nivel)
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`

  const handleClick = () => trackEvent("WhatsAppClick", { nivel })

  return (
    <div className="bg-cream text-carbon px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto w-full max-w-2xl">
        {/* Reveal del nivel */}
        <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] text-deep font-sans">
          <span aria-hidden>—</span>
          <span>{cta.tuResultado}</span>
        </div>

        <h2 className="mt-8 font-display font-bold text-5xl md:text-7xl leading-[0.95] tracking-tight text-carbon">
          {r.titulo}
        </h2>

        <p className="mt-8 text-lg md:text-xl leading-relaxed text-carbon/80">
          {r.mensaje}
        </p>

        {/* Bloque CTA */}
        <div className="mt-16 rounded-2xl border border-deep/25 bg-white p-8 md:p-10">
          <h3 className="font-display font-semibold text-2xl md:text-3xl leading-tight text-carbon">
            {cta.titulo}
          </h3>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-carbon/75">
            {cta.descripcion}
          </p>

          <ContadorPlazas />

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
      </div>
    </div>
  )
}
