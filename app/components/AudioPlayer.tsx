"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export function AudioPlayer() {
  const [muted, setMuted] = useState(true)
  const [canPlay, setCanPlay] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Criar elemento de áudio
    if (typeof window !== "undefined") {
      const audio = new Audio("/som_latinha.mp3")
      audio.preload = "auto"
      audio.volume = 0.5

      audio.addEventListener("canplaythrough", () => {
        setCanPlay(true)
      })

      audioRef.current = audio

      return () => {
        audio.removeEventListener("canplaythrough", () => {})
      }
    }
  }, [])

  const handleUserInteraction = () => {
    if (!canPlay || !audioRef.current) return

    // Tocar som apenas na primeira interação
    if (muted) {
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed:", error)
      })
      setMuted(false)
    }
  }

  useEffect(() => {
    // Adicionar listeners para primeira interação do usuário
    const events = ["click", "touchstart", "keydown"]
    const handleInteraction = () => {
      handleUserInteraction()
      // Remover listeners após primeira interação
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction)
      })
    }

    events.forEach((event) => {
      document.addEventListener(event, handleInteraction, { once: true })
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction)
      })
    }
  }, [canPlay, muted])

  const toggleMute = () => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.play().catch((error) => {
          console.log("Audio play failed:", error)
        })
        setMuted(false)
      } else {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setMuted(true)
      }
    }
  }

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-20 right-4 z-50 inline-flex items-center justify-center rounded-full p-3 bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 hover:border-beer-gold hover:bg-card transition-all shadow-lg"
      aria-label={muted ? "Ativar som" : "Silenciar som"}
      title={muted ? "Ativar som" : "Silenciar som"}
    >
      {muted ? (
        <VolumeX className="h-5 w-5 text-muted-foreground" />
      ) : (
        <Volume2 className="h-5 w-5 text-beer-gold" />
      )}
    </button>
  )
}
