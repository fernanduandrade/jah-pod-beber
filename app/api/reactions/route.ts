import { neon } from "@neondatabase/serverless"
import { NextRequest } from "next/server"
import type { Reaction, ReactionResponse } from "../../types/api"
import { reactionSchema } from "../../lib/validations"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(): Promise<Response> {
  try {
    const result = await sql`
      SELECT emoji, count
      FROM reactions
      ORDER BY count DESC, emoji ASC
    `

    const reactions: Reaction[] = result.map((row: any) => ({
      id: row.id || 0,
      emoji: row.emoji,
      count: Number(row.count),
    }))

    return Response.json({
      success: true,
      reactions,
    })
  } catch (error) {
    console.error("Error fetching reactions:", error)
    return Response.json(
      {
        success: false,
        reactions: [],
        error: "Failed to fetch reactions",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json()

    // Validate
    const validation = reactionSchema.safeParse(body)
    if (!validation.success) {
      return Response.json(
        {
          success: false,
          error: validation.error.errors[0].message,
        } as ReactionResponse,
        { status: 400 }
      )
    }

    const { emoji } = validation.data

    // Upsert reaction (increment if exists, create if not)
    const result = await sql`
      INSERT INTO reactions (emoji, count)
      VALUES (${emoji}, 1)
      ON CONFLICT (emoji) 
      DO UPDATE SET 
        count = reactions.count + 1,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, emoji, count
    `

    const reaction: Reaction = {
      id: result[0].id,
      emoji: result[0].emoji,
      count: Number(result[0].count),
    }

    return Response.json({
      success: true,
      reaction,
    } as ReactionResponse)
  } catch (error) {
    console.error("Error creating/updating reaction:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to process reaction",
      } as ReactionResponse,
      { status: 500 }
    )
  }
}
