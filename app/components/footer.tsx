import { Github, Linkedin, Heart } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-muted-foreground">Criado por</p>
            <p className="text-base font-semibold text-foreground">Fernando Andrade</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <ThemeToggle />
            <a
              href="https://github.com/fernanduandrade"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/fernanduandrade"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>

            <a
              href="https://heartdevs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">He4rt Developers</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Início
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="/stats"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Estatísticas
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Sobre
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-xs text-muted-foreground">© 2025 Já Pode Beber</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
