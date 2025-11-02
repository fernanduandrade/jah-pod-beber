import { neon } from "@neondatabase/serverless"
import { NextRequest } from "next/server"
import type { Message, MessageResponse } from "../../types/api"
import { messageSchema } from "../../lib/validations"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(): Promise<Response> {
  try {
    const result = await sql`
      SELECT id, message, author, created_at
      FROM messages
      ORDER BY created_at DESC
      LIMIT 20
    `

    const messages: Message[] = result.map((row: any) => ({
      id: row.id,
      message: row.message,
      author: row.author || "Anônimo",
      created_at: row.created_at.toISOString(),
    }))

    return Response.json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return Response.json(
      {
        success: false,
        messages: [],
        error: "Failed to fetch messages",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json()

    // Validate
    const validation = messageSchema.safeParse(body)
    if (!validation.success) {
      return Response.json(
        {
          success: false,
          error: validation.error.errors[0].message,
        } as MessageResponse,
        { status: 400 }
      )
    }

    const { message, author } = validation.data

    // Insert message
    const result = await sql`
      INSERT INTO messages (message, author)
      VALUES (${message}, ${author || null})
      RETURNING id, message, author, created_at
    `

    const newMessage: Message = {
      id: result[0].id,
      message: result[0].message,
      author: result[0].author || "Anônimo",
      created_at: result[0].created_at.toISOString(),
    }

    return Response.json({
      success: true,
      message: newMessage,
    } as MessageResponse)
  } catch (error) {
    console.error("Error creating message:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to create message",
      } as MessageResponse,
      { status: 500 }
    )
  }
}
