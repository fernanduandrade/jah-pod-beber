"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Alternar tema"
      >
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-beer-gold" />
      ) : (
        <Moon className="h-5 w-5 text-beer-amber" />
      )}
    </button>
  )
}
