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
        console.error("falha ao atualizar o contador:", error)
      } finally {
        setIsLoading(false)
      }
    }

    incrementAndFetch()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 space-y-3">
        <Users className="w-8 h-8 text-primary mx-auto animate-pulse" />
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Visitantes</p>
        <p className="text-2xl font-bold text-foreground">...</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-3 hover:border-primary transition-colors">
      <Users className="w-8 h-8 text-primary mx-auto" />
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Pessoas que já sabem a horár de beber 😎🍻
        </p>
      <p className="text-2xl font-bold text-foreground">{count?.toLocaleString("pt-BR") || 0}</p>
    </div>
  )
}
