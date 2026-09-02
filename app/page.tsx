"use client"

import { useState } from "react"
import Hero from "@/components/Hero"
import Mecanismo from "@/components/Mecanismo"
import Protocolo from "@/components/Protocolo"
import ScoreModal from "@/components/ScoreModal"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <main>
        <Hero />
        <Mecanismo />
        <Protocolo onAbrirDiagnostico={() => setModalOpen(true)} />
      </main>
      <ScoreModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
