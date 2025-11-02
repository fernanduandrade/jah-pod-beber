import { Metadata } from "next"
import { StatsDashboard } from "../components/StatsDashboard"
import Footer from "../components/footer"
import { Beer } from "lucide-react"

export const metadata: Metadata = {
  title: "Estatísticas | Já Pode Beber?",
  description: "Estatísticas de visitantes e dados analíticos do Já Pode Beber?",
}

export default function StatsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-beer-yellow/30 rounded-full mb-4">
              <Beer className="w-12 h-12 text-beer-gold" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Estatísticas
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe as visitas e dados do Já Pode Beber?
            </p>
          </div>

          {/* Dashboard */}
          <StatsDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
