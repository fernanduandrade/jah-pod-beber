"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

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

  const getIcon = () => {
    if (theme === "dark") return <Moon className="h-5 w-5 text-beer-gold" />
    if (theme === "light") return <Sun className="h-5 w-5 text-beer-gold" />
    return <Monitor className="h-5 w-5 text-beer-gold" />
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Selecionar tema"
        >
          {getIcon()}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[12rem] overflow-hidden rounded-lg border-2 border-beer-gold/30 bg-card/95 backdrop-blur-sm p-1 shadow-xl animate-in fade-in-50 zoom-in-95"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item
            onClick={() => setTheme("light")}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-beer-gold/10 focus:bg-beer-gold/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <Sun className="h-4 w-4" />
            <span>Claro</span>
            {theme === "light" && (
              <span className="ml-auto text-beer-gold">✓</span>
            )}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => setTheme("dark")}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-beer-gold/10 focus:bg-beer-gold/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <Moon className="h-4 w-4" />
            <span>Escuro</span>
            {theme === "dark" && (
              <span className="ml-auto text-beer-gold">✓</span>
            )}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-beer-gold/20" />

          <DropdownMenu.Item
            onClick={() => setTheme("system")}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-beer-gold/10 focus:bg-beer-gold/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <Monitor className="h-4 w-4" />
            <span>Sistema</span>
            {theme === "system" && (
              <span className="ml-auto text-beer-gold">✓</span>
            )}
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-card/95" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
