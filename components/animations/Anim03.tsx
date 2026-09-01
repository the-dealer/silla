// /components/animations/Anim03.tsx
// Onda: línea que atraviesa una curva y se aplana. Simboliza aplanar el pico post-comida.

type Props = { className?: string }

export default function Anim03({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="42" className="anim-ring text-deep" />
      {/* línea base */}
      <line x1="15" y1="55" x2="85" y2="55" stroke="#066AA7" strokeWidth="0.5" opacity="0.3" />
      {/* onda animada */}
      <path
        d="M 15 55 Q 32 20, 50 55 T 85 55"
        fill="none"
        stroke="#066AA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="anim-onda"
      />
    </svg>
  )
}
