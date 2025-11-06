"use client"

import { useEffect, useState, useRef } from "react"
import { Users, TrendingUp } from "lucide-react"
import { getVisitors, updateVisitors } from "../actions/visitors"
interface VisitorCounterProps {
  onIncrement?: () => void
}

export function VisitorCounter({ onIncrement }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [displayCount, setDisplayCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isIncrementing, setIsIncrementing] = useState(false)
  const previousCountRef = useRef<number>(0)

  useEffect(() => {
    if (count === null)
      return

    const start = displayCount
    const end = count
    const duration = 800 // duração da animação em ms
    const startTime = Date.now()

    if (end > start) {
      setIsIncrementing(true)
      // Disparar confetti quando incrementa
      if (onIncrement && previousCountRef.current > 0) {
        onIncrement()
      }
    }

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function para suavizar a animação (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + (end - start) * easeOut)

      setDisplayCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsIncrementing(false)
        previousCountRef.current = end
      }
    }

    requestAnimationFrame(animate)
  }, [count])

  useEffect(() => {
    let ws: WebSocket | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null
    let shouldReconnect = true

    const loadInitialCount = async () => {
      try {
        const visitorsCounter = await getVisitors()
        setCount(visitorsCounter)
      } catch (error) {
        console.error("Failed to fetch visitor count:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const connectWebSocket = () => {
      if (!shouldReconnect) return

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const wsUrl = `${protocol}//${window.location.host}/api/ws`
      ws = new WebSocket(wsUrl)

      ws.onopen = () => {}

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'visitor_count_update' && typeof data.count === 'number') {
            setCount(data.count)
          }
        } catch {
        }
      }

      ws.onerror = (error) => {
      }

      ws.onclose = () => {
        ws = null
        if (shouldReconnect) {
          reconnectTimeout = setTimeout(() => {
            connectWebSocket()
          }, 3000)
        }
      }
    }

    loadInitialCount()
    updateVisitors()
    connectWebSocket()

    return () => {
      shouldReconnect = false
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
      if (ws) {
        ws.close()
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-beer-gold/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-beer-yellow/30 to-beer-gold/40 rounded-full p-4 border-2 border-beer-gold/50">
            <Users className="w-8 h-8 text-beer-gold animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-beer-gold animate-pulse">...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div
          className={`absolute inset-0 bg-beer-gold/30 rounded-full blur-xl transition-all duration-500 ${
            isIncrementing ? "scale-150 opacity-100" : "scale-100 opacity-50"
          }`}
        />
        <div
          className={`relative bg-gradient-to-br from-beer-yellow/40 to-beer-gold/50 rounded-full p-4 border-2 transition-all duration-300 ${
            isIncrementing
              ? "border-beer-gold scale-110 shadow-lg shadow-beer-gold/50"
              : "border-beer-gold/50 scale-100"
          }`}
        >
          {isIncrementing ? (
            <TrendingUp className="w-8 h-8 text-beer-gold animate-bounce" />
          ) : (
            <Users className="w-8 h-8 text-beer-gold" />
          )}
        </div>
      </div>

      <div className="text-center">
        <div
          className={`text-5xl md:text-6xl font-extrabold transition-all duration-300 ${
            isIncrementing
              ? "text-beer-gold scale-110 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
              : "text-beer-gold/90 scale-100"
          }`}
        >
          {displayCount.toLocaleString("pt-BR")}
        </div>
        {isIncrementing && (
          <div className="text-xs text-beer-gold/70 font-semibold uppercase tracking-wider animate-pulse mt-1">
            +1 pessoa bebendo agora
          </div>
        )}
      </div>
    </div>
  )
}
