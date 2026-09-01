// /components/animations/Anim02.tsx
// Pulso: doble contracción rápida. Simboliza el corte de media mañana.

type Props = { className?: string }

export default function Anim02({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="42" className="anim-ring text-deep" />
      <g className="anim-pulso">
        <circle cx="50" cy="50" r="24" fill="#066AA7" />
      </g>
    </svg>
  )
}
