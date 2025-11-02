import { z } from "zod"

// Message validation
export const messageSchema = z.object({
  message: z
    .string()
    .min(1, "A mensagem não pode estar vazia")
    .max(280, "A mensagem não pode ter mais de 280 caracteres")
    .trim(),
  author: z
    .string()
    .min(1, "O nome não pode estar vazio")
    .max(50, "O nome não pode ter mais de 50 caracteres")
    .trim(),
})

// Reaction validation
export const reactionSchema = z.object({
  emoji: z
    .string()
    .min(1, "O emoji é obrigatório")
    .max(10, "Emoji inválido")
    .refine(
      (val) => {
        // Validar que é um emoji válido (simplificado)
        const emojiRegex =
          /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u
        return emojiRegex.test(val)
      },
      { message: "Emoji inválido" }
    ),
})

// Check-in validation (opcional, para futura expansão)
export const checkInSchema = z.object({
  timezone: z.string().optional(),
  userAgent: z.string().optional(),
})
