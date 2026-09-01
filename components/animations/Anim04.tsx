// /components/animations/Anim04.tsx
// Descompresión: dos líneas paralelas que se separan y vuelven. Simboliza descarga cervical.

type Props = { className?: string }

export default function Anim04({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="42" className="anim-ring text-deep" />
      <line
        x1="30"
        y1="40"
        x2="70"
        y2="40"
        stroke="#066AA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="anim-descompresion-top"
      />
      <line
        x1="30"
        y1="60"
        x2="70"
        y2="60"
        stroke="#066AA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="anim-descompresion-bottom"
      />
    </svg>
  )
}
