// /components/animations/Anim05.tsx
// Descenso: punto que desciende. Simboliza el cierre del día y bajada al descanso.

type Props = { className?: string }

export default function Anim05({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="42" className="anim-ring text-deep" />
      {/* línea guía vertical */}
      <line x1="50" y1="20" x2="50" y2="80" stroke="#066AA7" strokeWidth="0.5" opacity="0.3" />
      {/* punto que desciende */}
      <circle cx="50" cy="50" r="6" fill="#066AA7" className="anim-descenso" />
    </svg>
  )
}
