"use client"

import { useEffect, useState } from "react"

interface ConfettiParticle {
  x: number
  y: number
  color: string
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
}

const COLORS = ["#fbbf24", "#f59e0b", "#d97706", "#92400e"] // Cores do tema cerveja

export function ConfettiEffect({ trigger }: { trigger: number }) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger > 0) {
      setIsActive(true)
      const newParticles: ConfettiParticle[] = []
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: -10,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 4,
          speedY: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
        })
      }

      setParticles(newParticles)

      // Resetar após animação
      const timer = setTimeout(() => {
        setIsActive(false)
        setParticles([])
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [trigger])

  useEffect(() => {
    if (!isActive || particles.length === 0) return

    const animate = () => {
      setParticles((prev) => {
        const updated = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            rotation: particle.rotation + particle.rotationSpeed,
            speedY: particle.speedY + 0.1, // Gravity
          }))
          .filter((particle) => particle.y < window.innerHeight + 100)

        return updated
      })
    }

    const interval = setInterval(animate, 16) // ~60fps
    return () => clearInterval(interval)
  }, [isActive, particles.length])

  if (!isActive || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-sm"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            transition: "none",
          }}
        />
      ))}
    </div>
  )
}
