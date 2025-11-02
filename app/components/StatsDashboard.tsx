"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, Calendar, Clock } from "lucide-react"
import type { StatsResponse } from "../types/api"

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export function StatsDashboard() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
    // Atualizar stats a cada minuto
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beer-gold mx-auto" />
          <p className="text-muted-foreground">Carregando estatísticas...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Erro ao carregar estatísticas
      </div>
    )
  }

  // Preparar dados para gráficos
  const visitsByHourData = Array.from({ length: 24 }, (_, i) => {
    const existing = stats.visitsByHour.find((v) => v.hour === i)
    return {
      hour: `${i}h`,
      count: existing?.count || 0,
    }
  })

  const visitsByDayData = stats.visitsByDay.map((day) => ({
    day: new Date(day.day).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
    dayName: DAY_NAMES[day.day_of_week],
    count: day.count,
    fullLabel: `${DAY_NAMES[day.day_of_week]}, ${new Date(day.day).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}`,
  }))

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                Total de Visitantes
              </p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {stats.totalVisits.toLocaleString("pt-BR")}
              </p>
            </div>
            <Users className="w-10 h-10 text-beer-gold" />
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                Últimas 24h
              </p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {stats.last24Hours.toLocaleString("pt-BR")}
              </p>
            </div>
            <Clock className="w-10 h-10 text-beer-gold" />
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                Últimos 7 dias
              </p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {stats.last7Days.toLocaleString("pt-BR")}
              </p>
            </div>
            <Calendar className="w-10 h-10 text-beer-gold" />
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                Taxa de Crescimento
              </p>
              <p
                className={`text-3xl font-bold mt-2 ${
                  stats.growthRate >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stats.growthRate >= 0 ? "+" : ""}
                {stats.growthRate.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-beer-gold" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits by Hour */}
        <div className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Visitas por Hora (Últimas 24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitsByHourData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis
                dataKey="hour"
                stroke="currentColor"
                className="text-sm"
                tick={{ fill: "currentColor" }}
              />
              <YAxis
                stroke="currentColor"
                className="text-sm"
                tick={{ fill: "currentColor" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--beer-gold))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Visits by Day */}
        <div className="bg-card/80 backdrop-blur-sm border-2 border-beer-gold/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Visitas por Dia (Últimos 7 dias)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitsByDayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis
                dataKey="fullLabel"
                stroke="currentColor"
                className="text-sm"
                tick={{ fill: "currentColor" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="currentColor"
                className="text-sm"
                tick={{ fill: "currentColor" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--beer-gold))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--beer-gold))", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
