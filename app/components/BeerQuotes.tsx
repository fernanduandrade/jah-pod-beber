"use client"

import { useEffect, useState } from "react"
import { Quote } from "lucide-react"
import { getRandomQuote } from "../data/beerQuotes"

export function BeerQuotes() {
  const [quote, setQuote] = useState("")
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setQuote(getRandomQuote())
    
    // Rotate quote every 10 seconds
    const interval = setInterval(() => {
      setFade(true)
      setTimeout(() => {
        setQuote(getRandomQuote())
        setFade(false)
      }, 300)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}>
      <div className="flex items-start gap-3 bg-card/60 backdrop-blur-sm border border-beer-gold/30 rounded-lg p-4">
        <Quote className="w-6 h-6 text-beer-gold flex-shrink-0 mt-1" />
        <p className="text-sm md:text-base text-foreground italic">
          "{quote}"
        </p>
      </div>
    </div>
  )
}
