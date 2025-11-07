"use client"

import { Volume2, VolumeX, Share2 } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import * as Popover from "@radix-ui/react-popover"

export function AudioPlayer() {
  const [muted, setMuted] = useState(true)
  const [canPlay, setCanPlay] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasNativeShare, setHasNativeShare] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = "Já pode beber? SIM! Sempre é hora de tomar uma gelada! 🍺"

  useEffect(() => {
    setMounted(true)
    setHasNativeShare(typeof navigator !== "undefined" && "share" in navigator)
    
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

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    window.open(url, "_blank")
    setIsShareOpen(false)
  }

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=600,height=400")
    setIsShareOpen(false)
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=600,height=400")
    setIsShareOpen(false)
  }

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=600,height=400")
    setIsShareOpen(false)
  }

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Já pode beber?",
          text: shareText,
          url: shareUrl,
        })
        setIsShareOpen(false)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3">
      {/* Botão de Som */}
      <button
        onClick={toggleMute}
        className="inline-flex items-center justify-center rounded-full p-3 bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 hover:border-beer-gold hover:bg-card transition-all shadow-lg"
        aria-label={muted ? "Ativar som" : "Silenciar som"}
        title={muted ? "Ativar som" : "Silenciar som"}
      >
        {muted ? (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Volume2 className="h-5 w-5 text-beer-gold" />
        )}
      </button>

      {/* Botão de Compartilhar com Popover */}
      <Popover.Root open={isShareOpen} onOpenChange={setIsShareOpen}>
        <Popover.Trigger asChild>
          <button
            className="inline-flex items-center justify-center rounded-full p-3 bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 hover:border-beer-gold hover:bg-card transition-all shadow-lg"
            aria-label="Compartilhar"
            title="Compartilhar"
          >
            <Share2 className="h-5 w-5 text-beer-gold" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="z-50 w-72 rounded-lg border-2 border-beer-gold/30 bg-card/95 backdrop-blur-sm p-4 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            sideOffset={8}
            side="left"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-beer-gold/20">
                <Share2 className="w-4 h-4 text-beer-gold" />
                <p className="text-sm font-semibold text-foreground">Compartilhar</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={shareOnWhatsApp}
                  className="flex items-center justify-center gap-2 rounded-md text-xs font-medium transition-colors h-9 px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </button>

                <button
                  onClick={shareOnFacebook}
                  className="flex items-center justify-center gap-2 rounded-md text-xs font-medium transition-colors h-9 px-3 bg-[#1877F2] hover:bg-[#166FE5] text-white"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>

                <button
                  onClick={shareOnTwitter}
                  className="flex items-center justify-center gap-2 rounded-md text-xs font-medium transition-colors h-9 px-3 bg-[#1DA1F2] hover:bg-[#1A8CD8] text-white"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Twitter
                </button>

                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center justify-center gap-2 rounded-md text-xs font-medium transition-colors h-9 px-3 bg-[#0A66C2] hover:bg-[#095196] text-white"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </button>

                {mounted && hasNativeShare && (
                  <button
                    onClick={shareNative}
                    className="col-span-2 flex items-center justify-center gap-2 rounded-md text-xs font-medium transition-colors h-9 px-3 border border-beer-gold text-beer-gold bg-transparent hover:bg-beer-gold/10"
                  >
                    <Share2 className="w-4 h-4" />
                    Mais opções
                  </button>
                )}
              </div>
            </div>
            <Popover.Arrow className="fill-card/95" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
