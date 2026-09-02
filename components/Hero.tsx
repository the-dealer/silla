"use client"

import { hero } from "@/lib/config"

export default function Hero() {
  const scrollToMecanismo = () => {
    const el = document.getElementById("mecanismo")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="bg-cream text-carbon px-6 md:px-10 py-24 md:py-36">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] text-deep font-sans">
          <span aria-hidden>—</span>
          <span>{hero.etiqueta}</span>
        </div>

        <h1 className="mt-8 font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-carbon">
          {hero.titulo}
        </h1>

        <p className="mt-8 font-display text-2xl md:text-3xl leading-tight text-carbon/80">
          {hero.subtitulo}
        </p>

        <p className="mt-8 text-base md:text-lg leading-relaxed text-carbon/70 max-w-2xl">
          {hero.parrafo}
        </p>

        <button
          type="button"
          onClick={scrollToMecanismo}
          className="mt-12 min-h-12 rounded-full bg-deep px-10 py-3 text-base font-semibold text-white transition hover:bg-deep/90 active:scale-[0.98]"
        >
          Empezar
        </button>

        <div className="mt-20 text-xs md:text-sm tracking-[0.2em] text-carbon/40 font-sans">
          {hero.scrollHint}
        </div>
      </div>
    </section>
  )
}
