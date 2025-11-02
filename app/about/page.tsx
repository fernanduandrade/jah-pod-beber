import { Metadata } from "next"
import { Beer, Code, Heart, Users } from "lucide-react"
import Footer from "../components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sobre | Já Pode Beber?",
  description: "Conheça a história do projeto Já Pode Beber? e as tecnologias utilizadas.",
}

const technologies = [
  { name: "Next.js", description: "Framework React para produção" },
  { name: "React 19", description: "Biblioteca JavaScript moderna" },
  { name: "TypeScript", description: "JavaScript com tipagem estática" },
  { name: "Tailwind CSS", description: "Framework CSS utilitário" },
  { name: "Neon Database", description: "Banco de dados PostgreSQL serverless" },
  { name: "Radix UI", description: "Componentes acessíveis" },
  { name: "Recharts", description: "Biblioteca de gráficos React" },
  { name: "Vercel Analytics", description: "Analytics integrado" },
]

const contributors = [
  {
    name: "Fernando Andrade",
    github: "fernanduandrade",
    role: "Criador",
  },
  {
    name: "Gustavo",
    github: "kjkGustavo",
    role: "Contribuidor",
  },
  {
    name: "Fernando Melo",
    github: "Nandosts",
    role: "Contribuidor",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-beer-yellow/30 rounded-full mb-4">
              <Beer className="w-12 h-12 text-beer-gold" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Sobre o Projeto
            </h1>
            <p className="text-xl text-muted-foreground">
              Já Pode Beber? - A resposta é sempre SIM! 🍺
            </p>
          </div>

          {/* Story */}
          <section className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">História</h2>
            <p className="text-foreground leading-relaxed mb-4">
              O <strong>Já Pode Beber?</strong> é um projeto divertido que nasceu da
              ideia de criar algo leve e descontraído. A resposta para a pergunta
              "Já pode beber?" é sempre <strong>SIM</strong> - porque sempre é hora de
              tomar uma cerveja gelada! 🍺
            </p>
            <p className="text-foreground leading-relaxed">
              Este projeto foi desenvolvido com o objetivo de combinar diversão,
              tecnologia moderna e boas práticas de desenvolvimento. Ele serve como
              uma demonstração de várias funcionalidades interativas, analytics e
              uma experiência de usuário envolvente.
            </p>
          </section>

          {/* Technologies */}
          <section className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Code className="w-6 h-6 text-beer-gold" />
              <h2 className="text-2xl font-bold">Tecnologias Utilizadas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="bg-background/50 rounded-lg p-4 border border-beer-gold/20"
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contributors */}
          <section className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-beer-gold" />
              <h2 className="text-2xl font-bold">Contribuidores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contributors.map((contributor) => (
                <div
                  key={contributor.github}
                  className="bg-background/50 rounded-lg p-4 border border-beer-gold/20 text-center"
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    {contributor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {contributor.role}
                  </p>
                  <a
                    href={`https://github.com/${contributor.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-beer-gold hover:underline"
                  >
                    @{contributor.github}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Links */}
          <section className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-beer-gold fill-current" />
              <h2 className="text-2xl font-bold">Links</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/stats"
                className="px-4 py-2 bg-beer-gold text-primary-foreground rounded-lg font-semibold hover:bg-beer-gold/90 transition-colors"
              >
                Ver Estatísticas
              </Link>
              <a
                href="https://github.com/fernanduandrade/jah-pod-beber"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-card border-2 border-beer-gold/30 rounded-lg font-semibold hover:border-beer-gold transition-colors"
              >
                GitHub
              </a>
            </div>
          </section>

          {/* Message */}
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">
              Beba com moderação. Aprecie cada momento. 🍺
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
