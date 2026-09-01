// /components/animations/Anim01.tsx
// Expansión: círculo que respira. Simboliza apertura torácica y bajada de cortisol.

type Props = { className?: string }

export default function Anim01({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="42" className="anim-ring text-deep" />
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="#066AA7"
        strokeWidth="1.5"
        className="anim-expansion"
      />
    </svg>
  )
}
