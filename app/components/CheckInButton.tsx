"use client"

import { useState } from "react"
import { Beer, CheckCircle } from "lucide-react"
import type { CheckInResponse } from "../types/api"
import { ConfettiEffect } from "./ConfettiEffect"

export function CheckInButton() {
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const [confettiTrigger, setConfettiTrigger] = useState(0)

  const handleCheckIn = async () => {
    if (isCheckingIn || checkedIn) return

    setIsCheckingIn(true)

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-timezone": timezone,
        },
      })

      const data: CheckInResponse = await response.json()

      if (data.success) {
        setCheckedIn(true)
        setConfettiTrigger((prev) => prev + 1)
        
        // Reset after 3 seconds
        setTimeout(() => {
          setCheckedIn(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Failed to check in:", error)
    } finally {
      setIsCheckingIn(false)
    }
  }

  return (
    <>
      <ConfettiEffect trigger={confettiTrigger} />
      <button
        onClick={handleCheckIn}
        disabled={isCheckingIn || checkedIn}
        className={`
          inline-flex items-center gap-3 px-8 py-4 
          rounded-2xl font-bold text-lg
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            checkedIn
              ? "bg-green-500/20 border-2 border-green-500 text-green-600"
              : "bg-gradient-to-br from-beer-yellow/20 via-beer-gold/30 to-beer-amber/20 border-2 border-beer-gold hover:border-beer-gold/80 hover:shadow-lg hover:shadow-beer-yellow/30 active:scale-95"
          }
        `}
        aria-label="Fazer check-in"
      >
        {isCheckingIn ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
            <span>Fazendo check-in...</span>
          </>
        ) : checkedIn ? (
          <>
            <CheckCircle className="w-6 h-6" />
            <span>Você está bebendo! 🍺</span>
          </>
        ) : (
          <>
            <Beer className="w-6 h-6" />
            <span>Estou bebendo agora! 🍺</span>
          </>
        )}
      </button>
    </>
  )
}
