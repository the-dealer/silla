"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Score from "./Score"

type Props = {
  open: boolean
  onClose: () => void
}

// Modal a pantalla completa. Se abre con `open` y se cierra con la X o con ESC.
// Cuando está abierto bloquea el scroll del body para que el usuario no
// desplace la landing por debajo.
export default function ScoreModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return

    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="score-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Diagnóstico"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-cream overflow-y-auto"
        >
          {/* Cabecera fija con botón cerrar */}
          <div className="sticky top-0 z-10 bg-cream/95 backdrop-blur border-b border-carbon/10">
            <div className="mx-auto max-w-2xl px-6 md:px-10 py-4 flex items-center justify-between">
              <div className="text-xs tracking-[0.2em] text-deep font-sans">
                DIAGNÓSTICO
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar diagnóstico"
                className="w-10 h-10 rounded-full border border-carbon/20 flex items-center justify-center text-carbon/60 hover:text-carbon hover:border-carbon/40 transition"
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 5 L15 15 M15 5 L5 15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido del score */}
          <div className="px-6 md:px-10 py-12 md:py-20">
            <div className="mx-auto max-w-2xl">
              <Score onClose={onClose} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
