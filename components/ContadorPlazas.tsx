"use client"

import { PLAZAS_DISPONIBLES, cta } from "@/lib/config"

export default function ContadorPlazas() {
  const n = PLAZAS_DISPONIBLES

  if (n === 0) {
    return (
      <p className="mt-6 text-sm md:text-base text-red-600 font-medium" role="status">
        {cta.plazasAgotadas}
      </p>
    )
  }

  const critico = n <= 2

  return (
    <p className="mt-6 text-sm md:text-base text-carbon/70" role="status">
      Quedan{" "}
      <span
        className={
          critico
            ? "text-red-600 font-semibold animate-pulse"
            : "text-deep font-semibold"
        }
      >
        {n}
      </span>{" "}
      sesiones de valoración este mes
    </p>
  )
}
