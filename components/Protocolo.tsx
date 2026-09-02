"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { protocolo } from "@/lib/config"
import Anim01 from "./animations/Anim01"
import Anim02 from "./animations/Anim02"
import Anim03 from "./animations/Anim03"
import Anim04 from "./animations/Anim04"
import Anim05 from "./animations/Anim05"

const ANIMS = { expansion: Anim01, pulso: Anim02, onda: Anim03, descompresion: Anim04, descenso: Anim05 } as const

type Props = {
  onAbrirDiagnostico: () => void
}

export default function Protocolo({ onAbrirDiagnostico }: Props) {
  const [openId, setOpenId] = useState<string | null>(protocolo.bloques[0].id)

  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id))

  return (
    <section className="bg-cream text-carbon px-6 md:px-10 py-24 md:py-32 border-t border-carbon/10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] text-deep font-sans">
          <span aria-hidden>—</span>
          <span>{protocolo.etiqueta}</span>
        </div>

        <h2 className="mt-8 font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-carbon">
          {protocolo.titulo}
        </h2>

        <p className="mt-8 text-base md:text-lg leading-relaxed text-carbon/70 max-w-2xl">
          {protocolo.subtitulo}
        </p>

        <ul className="mt-14 space-y-4">
          {protocolo.bloques.map((b) => {
            const Anim = ANIMS[b.animacion as keyof typeof ANIMS]
            const isOpen = openId === b.id
            return (
              <li
                key={b.id}
                className="rounded-2xl bg-white border border-carbon/10 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(b.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 md:gap-6 p-5 md:p-6 text-left hover:bg-warm/40 transition"
                >
                  <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-warm/60 flex items-center justify-center">
                    <Anim className="w-full h-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] md:text-xs tracking-[0.2em] text-deep font-sans">
                      BLOQUE {b.numero}
                    </div>
                    <div className="mt-1 font-display font-semibold text-xl md:text-2xl leading-tight text-carbon">
                      {b.titulo}
                    </div>
                    <div className="mt-1 text-sm md:text-base text-carbon/60">
                      {b.subtitulo}
                    </div>
                  </div>
                  <div
                    aria-hidden
                    className={`shrink-0 text-carbon/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 md:pb-8 border-t border-carbon/10 pt-6">
                        <div className="text-xs md:text-sm tracking-[0.15em] text-carbon/50 font-sans">
                          {b.momento.toUpperCase()}
                        </div>
                        <p className="mt-4 text-base md:text-lg leading-relaxed text-carbon/85">
                          {b.descripcion}
                        </p>

                        <ul className="mt-6 space-y-3">
                          {b.checklist.map((item, i) => (
                            <li
                              key={i}
                              className="rounded-xl bg-warm/50 border border-carbon/5 p-4 md:p-5"
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  aria-hidden
                                  className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-carbon/30 bg-white"
                                >
                                  <span className="h-2 w-2 rounded-sm bg-deep" />
                                </span>
                                <div className="min-w-0">
                                  <div className="font-semibold text-carbon leading-snug">
                                    {item.titulo}
                                  </div>
                                  <div className="mt-1 text-sm md:text-base text-carbon/65 italic leading-relaxed">
                                    {item.detalle}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        <div className="mt-20 text-center">
          <p className="font-display text-xl md:text-2xl leading-snug text-carbon/85 max-w-xl mx-auto">
            {protocolo.ctaTexto}
          </p>
          <button
            type="button"
            onClick={onAbrirDiagnostico}
            className="mt-8 min-h-12 rounded-full bg-deep px-10 py-3 text-base font-semibold text-white transition hover:bg-deep/90 active:scale-[0.98]"
          >
            {protocolo.ctaBoton}
          </button>
        </div>
      </div>
    </section>
  )
}
