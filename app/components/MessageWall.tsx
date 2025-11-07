"use client"

import { useState, useEffect } from "react"
import { Send, MessageSquare } from "lucide-react"
import type { Message, MessageRequest, MessageResponse } from "../types/api"
import { messageSchema } from "../lib/validations"
import { createMessage, getMessages } from "../actions/messages"

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
      const data = await getMessages()
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

      const data: MessageResponse = await createMessage(payload)

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
      <div className="flex items-center justify-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-beer-gold" />
        <h3 className="text-xl font-bold text-foreground">Mural de Mensagens</h3>
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
            className="w-full px-4 py-3 rounded-lg bg-background/50 border-2 border-beer-gold/30 focus:border-beer-gold focus:outline-none transition-all placeholder:text-muted-foreground/60"
          />
        </div>
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Deixe sua mensagem... (máximo 280 caracteres)"
            maxLength={280}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-background/50 border-2 border-beer-gold/30 focus:border-beer-gold focus:outline-none transition-all resize-none placeholder:text-muted-foreground/60"
            required
          />
          <p className="text-xs text-muted-foreground mt-1.5 text-right">
            {message.length}/280
          </p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-beer-gold text-background rounded-lg font-semibold hover:bg-beer-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-beer-gold/20 hover:shadow-beer-gold/30 hover:scale-105"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>

      {/* Messages List */}
      <div className="space-y-3 mt-8 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-beer-gold/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              Seja o primeiro a deixar uma mensagem! 🍺
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-beer-gold/20 rounded-lg p-4 hover:border-beer-gold/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-bold text-foreground text-sm">
                  {msg.author || "Anônimo"}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(msg.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
