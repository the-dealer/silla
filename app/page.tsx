"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Hero from "@/components/Hero"
import Mecanismo from "@/components/Mecanismo"
import Protocolo from "@/components/Protocolo"
import Score from "@/components/Score"
import { LS_UNLOCKED } from "@/lib/config"

export default function Home() {
  const [unlocked, setUnlocked] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const mecanismoRef = useRef<HTMLDivElement | null>(null)
  const scoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    try {
      if (localStorage.getItem(LS_UNLOCKED) === "true") setUnlocked(true)
    } catch {
      /* noop */
    }
    setHydrated(true)
  }, [])

  const handleUnlock = useCallback(() => {
    setUnlocked(true)
    try {
      localStorage.setItem(LS_UNLOCKED, "true")
    } catch {
      /* noop */
    }
    setTimeout(() => {
      mecanismoRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 120)
  }, [])

  const scrollToScore = useCallback(() => {
    scoreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <main>
      <Hero onUnlock={handleUnlock} hydrated={hydrated} />
      <div ref={mecanismoRef}>
        <Mecanismo locked={!unlocked} />
      </div>
      <Protocolo locked={!unlocked} onCtaClick={scrollToScore} />
      <div ref={scoreRef}>
        <Score locked={!unlocked} />
      </div>
    </main>
  )
}
