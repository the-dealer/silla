"use client"

import { useState, type FormEvent } from "react"
import { hero, LS_EMAIL } from "@/lib/config"
import { trackEvent } from "@/lib/pixel"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Props = {
  onUnlock: () => void
  hydrated: boolean
}

export default function Hero({ onUnlock, hydrated }: Props) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError(hero.errorEmail)
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      localStorage.setItem(LS_EMAIL, trimmed)
    } catch {
      /* noop */
    }
    trackEvent("AntisillaLead", { email: trimmed })
    setTimeout(() => {
      onUnlock()
      setSubmitting(false)
    }, 250)
  }

  return (
    <section className="bg-cream text-carbon px-6 md:px-10 py-24 md:py-36">
      <div className="mx-auto w-full max-w-3xl">
        {/* Etiqueta */}
        <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] text-deep font-sans">
          <span aria-hidden>—</span>
          <span>{hero.etiqueta}</span>
        </div>

        {/* Título masivo serif */}
        <h1 className="mt-8 font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-carbon">
          {hero.titulo}
        </h1>

        {/* Subtítulo serif más pequeño */}
        <p className="mt-8 font-display text-2xl md:text-3xl leading-tight text-carbon/80">
          {hero.subtitulo}
        </p>

        {/* Párrafo body */}
        <p className="mt-8 text-base md:text-lg leading-relaxed text-carbon/70 max-w-2xl">
          {hero.parrafo}
        </p>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 max-w-lg"
          aria-label="Formulario de acceso al protocolo"
        >
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder={hero.emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError(null)
              }}
              disabled={!hydrated || submitting}
              className="flex-1 min-h-12 rounded-full border border-carbon/20 bg-white px-6 py-3 text-base text-carbon placeholder:text-carbon/40 focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/20"
              aria-invalid={!!error}
              aria-describedby={error ? "email-error" : undefined}
            />
            <button
              type="submit"
              disabled={!hydrated || submitting}
              className="min-h-12 rounded-full bg-deep px-8 py-3 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 hover:bg-deep/90 active:scale-[0.98]"
            >
              {submitting ? "Enviando…" : hero.botonEnviar}
            </button>
          </div>
          {error && (
            <p id="email-error" role="alert" className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}
          <p className="mt-4 text-xs md:text-sm text-carbon/50 leading-relaxed">
            {hero.legal}
          </p>
        </form>

        {/* Scroll hint */}
        <div className="mt-20 text-xs md:text-sm tracking-[0.2em] text-carbon/40 font-sans">
          {hero.scrollHint}
        </div>
      </div>
    </section>
  )
}
