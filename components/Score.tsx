"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  bloque1,
  bloque2,
  bloque3,
  bloque4,
  scoreUi,
  LS_SCORE,
  TOTAL_PASOS,
  type CompromisoId,
  type HorasId,
  type ImpactoId,
  type SintomaId,
} from "@/lib/config"
import { calcularScore } from "@/lib/score-logic"
import { trackEvent } from "@/lib/pixel"
import Reveal from "./Reveal"

type Step = 1 | 2 | 3 | 4 | "result"

type ScoreState = {
  step: Step
  horas: HorasId | null
  sintomas: SintomaId[]
  impacto: ImpactoId | null
  compromiso: CompromisoId | null
  started: boolean
}

const initialState: ScoreState = {
  step: 1,
  horas: null,
  sintomas: [],
  impacto: null,
  compromiso: null,
  started: false,
}

type Props = { onClose: () => void }

export default function Score({ onClose }: Props) {
  const [state, setState] = useState<ScoreState>(initialState)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [hydrated, setHydrated] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_SCORE)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ScoreState>
        setState((s) => ({ ...s, ...parsed }))
      }
    } catch {
      /* noop */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(LS_SCORE, JSON.stringify(state))
    } catch {
      /* noop */
    }
  }, [state, hydrated])

  useEffect(() => {
    if (!hydrated) return
    if (state.started || state.step !== 1) return
    trackEvent("ScoreStarted")
    setState((s) => ({ ...s, started: true }))
  }, [hydrated, state.started, state.step])

  const goNext = useCallback(() => {
    setDirection(1)
    setState((s) => {
      if (typeof s.step === "number" && s.step < 4) {
        return { ...s, step: (s.step + 1) as Step }
      }
      return s
    })
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setState((s) => {
      if (typeof s.step === "number" && s.step > 1) {
        return { ...s, step: (s.step - 1) as Step }
      }
      return s
    })
  }, [])

  const finalizar = useCallback(
    (compromiso: CompromisoId) => {
      const result = calcularScore(state.horas, state.sintomas, state.impacto)
      const quiereSolucionar = compromiso === "solucionar"
      if (!completedRef.current) {
        trackEvent("ScoreCompleted", {
          score: result.score,
          nivel: result.nivel,
          quiereSolucionar,
        })
        if (quiereSolucionar) {
          trackEvent("ScoreQualifiedLead", { score: result.score, nivel: result.nivel })
        }
        completedRef.current = true
      }
      setDirection(1)
      setState((s) => ({ ...s, compromiso, step: "result" }))
    },
    [state.horas, state.sintomas, state.impacto]
  )

  const reiniciar = useCallback(() => {
    completedRef.current = false
    try {
      localStorage.removeItem(LS_SCORE)
    } catch {
      /* noop */
    }
    setDirection(-1)
    setState({ ...initialState, started: true })
  }, [])

  const setHoras = (id: HorasId) => setState((s) => ({ ...s, horas: id }))
  const toggleSintoma = (id: SintomaId) =>
    setState((s) => ({
      ...s,
      sintomas: s.sintomas.includes(id)
        ? s.sintomas.filter((x) => x !== id)
        : [...s.sintomas, id],
    }))
  const setImpacto = (id: ImpactoId) => setState((s) => ({ ...s, impacto: id }))
  const setCompromiso = (id: CompromisoId) =>
    setState((s) => ({ ...s, compromiso: id }))

  const canAdvance = (() => {
    switch (state.step) {
      case 1: return state.horas !== null
      case 2: return state.sintomas.length > 0
      case 3: return state.impacto !== null
      case 4: return state.compromiso !== null
      default: return false
    }
  })()

  // Pantalla de resultado
  if (hydrated && state.step === "result" && state.compromiso) {
    const result = calcularScore(state.horas, state.sintomas, state.impacto)
    return (
      <Reveal
        compromiso={state.compromiso}
        result={result}
        onReiniciar={reiniciar}
        onClose={onClose}
      />
    )
  }

  const progressPct =
    typeof state.step === "number"
      ? ((state.step - 1) / TOTAL_PASOS) * 100
      : 100

  return (
    <div>
      {typeof state.step === "number" && (
        <div className="mb-10">
          <div className="text-xs tracking-[0.2em] text-carbon/50 font-sans">
            {scoreUi.paso} {state.step} {scoreUi.de} {TOTAL_PASOS}
          </div>
          <div className="mt-2 h-[2px] w-full overflow-hidden bg-carbon/10">
            <motion.div
              className="h-full bg-deep"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {state.step === 1 && (
          <StepShell key="1" direction={direction}>
            <BloqueHoras value={state.horas} onChange={setHoras} />
          </StepShell>
        )}
        {state.step === 2 && (
          <StepShell key="2" direction={direction}>
            <BloqueSintomas value={state.sintomas} onToggle={toggleSintoma} />
          </StepShell>
        )}
        {state.step === 3 && (
          <StepShell key="3" direction={direction}>
            <BloqueImpacto value={state.impacto} onChange={setImpacto} />
          </StepShell>
        )}
        {state.step === 4 && (
          <StepShell key="4" direction={direction}>
            <BloqueCompromiso value={state.compromiso} onChange={setCompromiso} />
          </StepShell>
        )}
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between gap-3">
        {typeof state.step === "number" && state.step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="min-h-12 rounded-full border border-carbon/25 px-6 py-3 text-sm font-medium text-carbon/60 transition hover:text-carbon hover:border-carbon/50 active:scale-[0.98]"
          >
            {scoreUi.botonAtras}
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          disabled={!canAdvance}
          onClick={() => {
            if (state.step === 4 && state.compromiso) {
              finalizar(state.compromiso)
            } else {
              goNext()
            }
          }}
          className="min-h-12 flex-1 rounded-full bg-deep px-8 py-3 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-carbon/20 disabled:text-carbon/40 hover:bg-deep/90 active:scale-[0.98]"
        >
          {state.step === 4 ? scoreUi.botonVerResultado : scoreUi.botonSiguiente}
        </button>
      </div>
    </div>
  )
}

function StepShell({ children, direction }: { children: React.ReactNode; direction: 1 | -1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 1 ? 24 : -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -24 : 24 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function OptionRadio({
  selected,
  onSelect,
  name,
  value,
  label,
  primary = false,
}: {
  selected: boolean
  onSelect: () => void
  name: string
  value: string
  label: string
  primary?: boolean
}) {
  const base = "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 transition"
  const styles = primary
    ? selected
      ? "border-deep bg-deep/10"
      : "border-deep/40 bg-white hover:bg-deep/5"
    : selected
      ? "border-carbon/60 bg-white"
      : "border-carbon/15 bg-white hover:border-carbon/30"

  return (
    <label className={`${base} ${styles}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`inline-block h-4 w-4 shrink-0 rounded-full border-2 ${
          selected
            ? primary
              ? "border-deep bg-deep"
              : "border-carbon bg-carbon"
            : "border-carbon/30"
        }`}
      />
      <span className="text-base text-carbon">{label}</span>
    </label>
  )
}

function BloqueHoras({
  value,
  onChange,
}: {
  value: HorasId | null
  onChange: (id: HorasId) => void
}) {
  return (
    <fieldset>
      <legend className="font-display font-semibold text-2xl md:text-3xl leading-tight text-carbon">
        {bloque1.titulo}
      </legend>
      <p className="mt-3 text-sm md:text-base text-carbon/60">{bloque1.subtitulo}</p>
      <div className="mt-8 space-y-3">
        {bloque1.opciones.map((op) => (
          <OptionRadio
            key={op.id}
            selected={value === op.id}
            onSelect={() => onChange(op.id)}
            name="horas"
            value={op.id}
            label={op.label}
          />
        ))}
      </div>
    </fieldset>
  )
}

function BloqueSintomas({
  value,
  onToggle,
}: {
  value: SintomaId[]
  onToggle: (id: SintomaId) => void
}) {
  return (
    <fieldset>
      <legend className="font-display font-semibold text-2xl md:text-3xl leading-tight text-carbon">
        {bloque2.titulo}
      </legend>
      <p className="mt-3 text-sm md:text-base text-carbon/60">{bloque2.subtitulo}</p>
      <div className="mt-8 space-y-3">
        {bloque2.opciones.map((op) => {
          const selected = value.includes(op.id)
          return (
            <label
              key={op.id}
              className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border px-5 py-4 transition ${
                selected
                  ? "border-deep bg-deep/10"
                  : "border-carbon/15 bg-white hover:border-carbon/30"
              }`}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggle(op.id)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                  selected ? "border-deep bg-deep" : "border-carbon/30 bg-white"
                }`}
              >
                {selected && (
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-white" fill="currentColor">
                    <path d="M7.629 13.233 4.4 10.004l1.414-1.414 1.815 1.815 5.657-5.657 1.414 1.414z" />
                  </svg>
                )}
              </span>
              <span className="text-base leading-snug text-carbon">{op.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function BloqueImpacto({
  value,
  onChange,
}: {
  value: ImpactoId | null
  onChange: (id: ImpactoId) => void
}) {
  return (
    <fieldset>
      <legend className="font-display font-semibold text-2xl md:text-3xl leading-tight text-carbon">
        {bloque3.titulo}
      </legend>
      <div className="mt-8 space-y-3">
        {bloque3.opciones.map((op) => (
          <OptionRadio
            key={op.id}
            selected={value === op.id}
            onSelect={() => onChange(op.id)}
            name="impacto"
            value={op.id}
            label={op.label}
          />
        ))}
      </div>
    </fieldset>
  )
}

function BloqueCompromiso({
  value,
  onChange,
}: {
  value: CompromisoId | null
  onChange: (id: CompromisoId) => void
}) {
  return (
    <fieldset>
      <legend className="font-display font-semibold text-2xl md:text-3xl leading-tight text-carbon">
        {bloque4.titulo}
      </legend>
      <p className="mt-3 text-sm md:text-base text-carbon/60">{bloque4.subtitulo}</p>
      <div className="mt-8 space-y-3">
        {bloque4.opciones.map((op) => (
          <OptionRadio
            key={op.id}
            selected={value === op.id}
            onSelect={() => onChange(op.id)}
            name="compromiso"
            value={op.id}
            label={op.label}
            primary={op.variant === "primary"}
          />
        ))}
      </div>
    </fieldset>
  )
}
