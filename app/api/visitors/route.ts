import { neon } from "@neondatabase/serverless"
import type { VisitorCountResponse } from "../../types/api"
import { rateLimit, getRateLimitIdentifier } from "../../lib/rateLimit"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(): Promise<Response> {
  try {
    const result = await sql`
      SELECT count FROM visitors WHERE id = 1
    `

    const count = result[0]?.count || 0
    return Response.json({ count } as VisitorCountResponse)
  } catch (error) {
    console.error("Error fetching visitor count:", error)
    return Response.json(
      { count: 0, error: "Failed to fetch visitor count" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Rate limiting
    const identifier = getRateLimitIdentifier(request)
    const limit = rateLimit(identifier, { maxRequests: 5, windowMs: 60000 }) // 5 requests per minute

    if (!limit.allowed) {
      return Response.json(
        { count: 0, error: "Rate limit exceeded. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((limit.resetTime - Date.now()) / 1000)),
          },
        }
      )
    }

    // Get timezone and user agent from request headers
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

    // Log detailed visit (non-blocking)
    try {
      await sql`
        INSERT INTO visitor_logs (hour, day_of_week, date, timezone, user_agent)
        VALUES (${hour}, ${dayOfWeek}, ${date}, ${timezone}, ${userAgent})
      `
    } catch (logError) {
      // Log error but don't fail the request
      console.error("Error logging visit details:", logError)
    }

    return Response.json({ count } as VisitorCountResponse)
  } catch (error) {
    console.error("Error updating visitor count:", error)
    return Response.json(
      { count: 0, error: "Failed to update visitor count" },
      { status: 500 }
    )
  }
}
