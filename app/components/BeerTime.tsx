"use client"

import { useEffect, useState } from "react"
import { Beer, Clock, Calendar } from "lucide-react"
import Footer from "./footer"
import { VisitorCounter } from "./VisitorsCounter"
import { ShareButtons } from "./ShareButtons"
export default function BeerTime() {
  const [currentTime, setCurrentTime] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-beer-yellow/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl w-full space-y-12 text-center">
          {/* Main heading */}
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-beer-yellow/20 rounded-full mb-4 animate-bounce">
              <Beer className="w-12 h-12 text-primary" />
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-balance">
              <span className="text-foreground">Já pode</span>
              <br />
              <span className="text-primary">beber?</span>
            </h1>
          </div>

          {/* Answer section */}
          <div className="space-y-8">
            <div className="inline-block">
              <div className="bg-card border-2 border-primary rounded-2xl px-12 py-8 shadow-2xl">
                <p className="text-5xl md:text-7xl font-bold text-primary animate-pulse">SIM!</p>
              </div>
            </div>

            <p className="text-2xl md:text-4xl font-semibold text-muted-foreground text-balance">
              {"Sempre é hora de tomar uma gelada 🍺"}
            </p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card border border-border rounded-xl p-6 space-y-3 hover:border-primary transition-colors">
              <Clock className="w-8 h-8 text-primary mx-auto" />
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Horário Atual</p>
              <p className="text-2xl font-bold text-foreground">{mounted ? currentTime : "00:00:00"}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-3 hover:border-primary transition-colors">
              <Calendar className="w-8 h-8 text-primary mx-auto" />
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Dias Disponíveis</p>
              <p className="text-2xl font-bold text-foreground">7/7</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-3 hover:border-primary transition-colors">
              <Beer className="w-8 h-8 text-primary mx-auto" />
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Horário de Funcionamento
              </p>
              <p className="text-2xl font-bold text-foreground">24/7</p>
            </div>

            <VisitorCounter />
          </div>

          <div className="pt-8">
            <div className="bg-card border border-border rounded-xl p-6 hover:border-beer-gold hover:shadow-lg hover:shadow-beer-yellow/10 transition-all">
              <ShareButtons />
            </div>
          </div>
          
          <div className="pt-8">
            <p className="text-lg text-muted-foreground text-pretty">
              {"Beba com moderação. Aprecie cada momento. 🍻"}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
