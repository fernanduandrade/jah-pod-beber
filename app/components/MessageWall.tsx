"use client"

import { useState, useEffect } from "react"
import { Send, MessageSquare } from "lucide-react"
import type { Message, MessageRequest, MessageResponse } from "../types/api"
import { messageSchema } from "../lib/validations"

export function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  const [author, setAuthor] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      const data = await response.json()
      if (data.success && data.messages) {
        setMessages(data.messages)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate
    const validation = messageSchema.safeParse({ message, author })
    if (!validation.success) {
      setError(validation.error.errors[0].message)
      return
    }

    setIsSubmitting(true)

    try {
      const payload: MessageRequest = {
        message: validation.data.message,
        author: validation.data.author,
      }

      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data: MessageResponse = await response.json()

      if (data.success && data.message) {
        setMessages((prev) => [data.message!, ...prev].slice(0, 10))
        setMessage("")
        setAuthor("")
      } else {
        setError(data.error || "Erro ao enviar mensagem")
      }
    } catch (error) {
      console.error("Failed to submit message:", error)
      setError("Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-6 h-6 text-beer-gold" />
        <h3 className="text-2xl font-bold">Mural de Mensagens</h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Seu nome (opcional)"
            maxLength={50}
            className="w-full px-4 py-2 rounded-lg bg-background border-2 border-beer-gold/30 focus:border-beer-gold focus:outline-none transition-colors"
          />
        </div>
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Deixe sua mensagem... (máximo 280 caracteres)"
            maxLength={280}
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-background border-2 border-beer-gold/30 focus:border-beer-gold focus:outline-none transition-colors resize-none"
            required
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {message.length}/280
          </p>
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="inline-flex items-center gap-2 px-6 py-2 bg-beer-gold text-beer-gold-foreground rounded-lg font-semibold hover:bg-beer-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {/* Messages List */}
      <div className="space-y-3 mt-6 max-h-64 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Seja o primeiro a deixar uma mensagem! 🍺
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-card/60 backdrop-blur-sm border border-beer-gold/20 rounded-lg p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-foreground">
                  {msg.author || "Anônimo"}
                </p>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
