"use client"

type Props = { visible: boolean }

export default function LockedOverlay({ visible }: Props) {
  if (!visible) return null
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 backdrop-blur-md bg-cream/75"
    />
  )
}
