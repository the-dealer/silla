"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { mecanismo } from "@/lib/config"
import LockedOverlay from "./LockedOverlay"

type Props = { locked: boolean }

export default function Mecanismo({ locked }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Autoplay del flujo cuando no está bloqueado
  useEffect(() => {
    if (locked) return
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % mecanismo.flujoTabs.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [locked])

  return (
    <section className="relative bg-warm text-carbon px-6 md:px-10 py-24 md:py-32 border-t border-carbon/10">
      <LockedOverlay visible={locked} />

      <div
        className={`mx-auto w-full max-w-3xl ${locked ? "select-none" : ""}`}
        aria-hidden={locked ? "true" : undefined}
      >
        {/* Etiqueta */}
        <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] text-deep font-sans">
          <span aria-hidden>—</span>
          <span>{mecanismo.etiqueta}</span>
        </div>

        {/* Título */}
        <h2 className="mt-8 font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-carbon">
          {mecanismo.titulo}
        </h2>

        {/* Párrafo 1 */}
        <p className="mt-10 text-base md:text-lg leading-relaxed text-carbon/80 max-w-2xl">
          {mecanismo.parrafo1}
        </p>

        {/* Flujo interactivo con tabs animados */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          {mecanismo.flujoTabs.map((tab, i) => {
            const isActive = i === activeIndex
            const isHighlight = "highlight" in tab && tab.highlight
            const isLast = i === mecanismo.flujoTabs.length - 1
            return (
              <div key={tab.id} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  disabled={locked}
                  aria-pressed={isActive}
                  className={`
                    rounded-full px-5 py-2.5 text-sm md:text-base font-sans font-medium
                    transition-all duration-500 whitespace-nowrap
                    ${
                      isActive
                        ? isHighlight
                          ? "bg-deep text-white shadow-md scale-105"
                          : "bg-carbon text-cream shadow-md scale-105"
                        : "bg-white text-carbon/70 hover:text-carbon border border-carbon/10"
                    }
                  `}
                >
                  {tab.label}
                </button>
                {!isLast && (
                  <span
                    aria-hidden
                    className={`text-lg transition-colors ${
                      i < activeIndex ? "text-deep" : "text-carbon/30"
                    }`}
                  >
                    →
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Bloque destacado con la revelación del step activo */}
        <div className="mt-10 min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-lg md:text-xl font-display text-carbon/90 leading-snug"
            >
              {activeIndex === 0 && "Trabajo sentado, la mayor parte del día."}
              {activeIndex === 1 && "Coche, transporte, comidas — más silla que no cuenta como \"silla\"."}
              {activeIndex === 2 && "El sofá donde \"descansas\" del trabajo. Misma postura, misma señal."}
              {activeIndex === 3 && "Tu sistema nervioso solo lee esto: baja demanda física + alta activación mental sostenida."}
              {activeIndex === 4 && "Cortisol elevado de forma crónica. No es estrés puntual, es tu línea base."}
              {activeIndex === 5 && "Y entra en modo almacenamiento: grasa abdominal, retención, energía racionada."}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Párrafos 2 y 3 */}
        <p className="mt-12 text-base md:text-lg leading-relaxed text-carbon/80 max-w-2xl">
          {mecanismo.parrafo2}
        </p>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-carbon/80 max-w-2xl">
          {mecanismo.parrafo3}
        </p>
      </div>
    </section>
  )
}
