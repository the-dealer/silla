// /lib/score-logic.ts
// Cálculo del score 1-10 con pesos por síntoma y regla especial de "síntomas hot"
// (los directamente ligados a grasa + cortisol). Cero dependencias externas.

import type { HorasId, ImpactoId, SintomaId } from "./config"

// Síntomas del eje grasa + cortisol. Cada uno pesa el doble.
// Si el usuario marca 3+ de estos, el score sube a mínimo 6 (rojo).
export const SINTOMAS_HOT: SintomaId[] = [
  "grasa-abdominal",
  "no-baja-peso",
  "cortisol-mananas",
  "insomnio-3am",
]

const PESO_HOT = 2
const PESO_NORMAL = 1

const PESOS_HORAS: Record<HorasId, number> = {
  "menos-8": 0,
  "8-12": 1,
  "12-15": 2,
  "mas-15": 3,
}

const PESOS_IMPACTO: Record<ImpactoId, number> = {
  nada: 0,
  poco: 1,
  bastante: 2,
  mucho: 3,
}

export type Nivel = "bajo" | "medio" | "alto"
export type Color = "green" | "amber" | "red"

export type ScoreResult = {
  score: number       // 1-10
  nivel: Nivel
  color: Color
  hotCount: number    // cuántos hot marcó
  hotRuleApplied: boolean
}

// Total máximo bruto:
//   horas (0-3) + síntomas (4 hot × 2 + 6 normales × 1 = 14) + impacto (0-3) = 20
const MAX_RAW = 20

export function calcularScore(
  horas: HorasId | null,
  sintomas: SintomaId[],
  impacto: ImpactoId | null
): ScoreResult {
  const puntosHoras = horas ? PESOS_HORAS[horas] : 0
  const puntosImpacto = impacto ? PESOS_IMPACTO[impacto] : 0

  const puntosSintomas = sintomas.reduce((sum, id) => {
    return sum + (SINTOMAS_HOT.includes(id) ? PESO_HOT : PESO_NORMAL)
  }, 0)

  const totalRaw = puntosHoras + puntosSintomas + puntosImpacto
  let score = Math.round((totalRaw / MAX_RAW) * 10)

  // Regla especial: 3+ síntomas hot → mínimo 6 (rojo)
  const hotCount = sintomas.filter((s) => SINTOMAS_HOT.includes(s)).length
  const hotRuleApplied = hotCount >= 3
  if (hotRuleApplied) {
    score = Math.max(score, 6)
  }

  // Clamp 1-10 (mínimo 1 aunque no hayan marcado casi nada)
  score = Math.max(1, Math.min(10, score))

  const nivel: Nivel = score <= 3 ? "bajo" : score <= 5 ? "medio" : "alto"
  const color: Color = score <= 3 ? "green" : score <= 5 ? "amber" : "red"

  return { score, nivel, color, hotCount, hotRuleApplied }
}
