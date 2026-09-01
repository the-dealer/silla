// /lib/score-logic.ts
// Cálculo puro del nivel. Puntuación total = síntomas (0-10) + impacto (0-3) = 0-13.

import { bloque3, type Nivel, type SintomaId, type ImpactoId } from "./config"

export const nivelUmbrales = {
  leve: { min: 0, max: 4 },
  media: { min: 5, max: 8 },
  alta: { min: 9, max: 13 },
} as const

export function calcularNivel(total: number): Nivel {
  if (total <= nivelUmbrales.leve.max) return "leve"
  if (total <= nivelUmbrales.media.max) return "media"
  return "alta"
}

export function puntuarImpacto(id: ImpactoId | null): number {
  if (!id) return 0
  return bloque3.opciones.find((o) => o.id === id)?.puntos ?? 0
}

export function calcularResultado(
  sintomas: SintomaId[],
  impacto: ImpactoId | null
): { total: number; nivel: Nivel } {
  const total = sintomas.length + puntuarImpacto(impacto)
  return { total, nivel: calcularNivel(total) }
}
