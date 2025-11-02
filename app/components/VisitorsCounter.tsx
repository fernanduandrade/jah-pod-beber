"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        const response = await fetch("/api/visitors", {
          method: "POST",
        })
        const data = await response.json()
        setCount(data.count)
      } catch (error) {
        console.error("Failed to update visitor count:", error)
      } finally {
        setIsLoading(false)
      }
    }

    incrementAndFetch()

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch("/api/visitors")
        const data = await response.json()
        setCount(data.count)
      } catch (error) {
        console.error("Failed to fetch visitor count:", error)
      }
    }, 3000)

    return () => clearInterval(pollInterval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-beer-gold">
        <Users className="w-5 h-5 animate-pulse" />
        <span className="text-sm font-medium">...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-beer-gold animate-pulse">
      <Users className="w-5 h-5" />
      <span className="text-sm font-medium">{count?.toLocaleString("pt-BR") || 0}</span>
    </div>
  )
}
