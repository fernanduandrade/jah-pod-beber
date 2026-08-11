import {
  ExternalLink,
  Github,
  Heart,
  Home,
  Info,
  Linkedin,
  BarChart3,
} from "lucide-react"

import { ThemeToggle } from "./ThemeToggle"

const relatedProjects = [
  {
    name: "Jah Pod Almossar",
    href: "https://jah-pod-al-mossar.vercel.app/",
  },
  {
    name: "Jah Pod Desistir",
    href: "https://jah-pod-desistir.vercel.app/",
  },
  {
    name: "Jah Pod Beber Água",
    href: "https://jah-bebeu-agua-hj.vercel.app/",
  },
  {
    name: "Jah Pod Jantar",
    href: "https://jah-podi-xantar.vercel.app/",
  },
]

const navigation = [
  {
    name: "Início",
    href: "/",
    icon: Home,
  },
  {
    name: "Estatísticas",
    href: "/stats",
    icon: BarChart3,
  },
  {
    name: "Sobre",
    href: "/about",
    icon: Info,
  },
]

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/fernanduandrade",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/fernanduandrade",
    icon: Linkedin,
  },
  {
    name: "He4rt Developers",
    href: "https://heartdevs.com",
    icon: Heart,
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Author */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Criado por
              </p>

              <p className="mt-1 text-lg font-semibold text-foreground">
                Fernando Andrade
              </p>
            </div>

            <ThemeToggle />
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Social
            </h3>

            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group flex w-fit items-center gap-3
                      text-sm text-muted-foreground
                      transition-colors hover:text-primary
                    "
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        social.name === "He4rt Developers"
                          ? "group-hover:fill-current"
                          : ""
                      }`}
                    />

                    <span>{social.name}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Related projects */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Família jahpod
            </h3>

            <div className="flex flex-col gap-3">
              {relatedProjects.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group flex w-fit items-center gap-2
                    text-sm text-muted-foreground
                    transition-colors hover:text-primary
                  "
                >
                  <ExternalLink
                    className="
                      h-4 w-4 text-primary
                      transition-transform
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />

                  <span>{project.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Navegação
            </h3>

            <nav className="flex flex-col gap-3">
              {navigation.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="
                      flex w-fit items-center gap-3
                      text-sm text-muted-foreground
                      transition-colors hover:text-primary
                    "
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div
          className="
            mx-auto flex max-w-7xl
            flex-col items-center justify-between
            gap-3 px-6 py-5
            sm:flex-row lg:px-8
          "
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Já Pode Beber
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Heart className="h-4 w-4 text-primary" />
            <span>Feito com propósito</span>
          </div>
        </div>
      </div>
    </footer>
  )
}