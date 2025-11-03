import { neon } from "@neondatabase/serverless"
import { NextRequest } from "next/server"
import type { CheckInResponse } from "../../types/api"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const timezone = request.headers.get("x-timezone") || "UTC"
    const userAgent = request.headers.get("user-agent") || undefined

    // Get current date/time info
    const now = new Date()
    const hour = now.getUTCHours()
    const dayOfWeek = now.getUTCDay()
    const date = now.toISOString().split("T")[0]

    // Update main counter
    const result = await sql`
      UPDATE visitors 
      SET count = count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING count
    `
    const count = result[0]?.count || 0

    // Log check-in
    try {
      await sql`
        INSERT INTO check_ins (timezone, user_agent)
        VALUES (${timezone}, ${userAgent})
      `
    } catch (logError) {
      console.error("Error logging check-in:", logError)
    }

    // Log detailed visit
    try {
      await sql`
        INSERT INTO visitor_logs (hour, day_of_week, date, timezone, user_agent)
        VALUES (${hour}, ${dayOfWeek}, ${date}, ${timezone}, ${userAgent})
      `
    } catch (logError) {
      console.error("Error logging visit details:", logError)
    }

    const response: CheckInResponse = {
      success: true,
      count,
      message: "Check-in realizado com sucesso!",
    }

    return Response.json(response)
  } catch (error) {
    console.error("Error processing check-in:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to process check-in",
      } as CheckInResponse,
      { status: 500 }
    )
  }
}
