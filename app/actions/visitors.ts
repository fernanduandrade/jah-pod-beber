"use server";
import { neon } from "@neondatabase/serverless";
import { rateLimit, getRateLimitIdentifierAction, getAgent } from "../lib/rateLimit"
import { broadcast } from "../lib/websocket"

const queryFunction = neon(process.env.DATABASE_URL!)

export async function getVisitors(): Promise<number> {
    const result = await queryFunction`SELECT count FROM visitors WHERE id = 1`
    return result[0]?.count || 0
}

export async function updateVisitors(): Promise<void> {
    const identifier = await getRateLimitIdentifierAction()
    const limit = rateLimit(identifier, { maxRequests: 5, windowMs: 60000 })
    
    if (!limit.allowed)
      return;

    var userAgent = await getAgent();
    
    const now = new Date()
    const hour = now.getUTCHours()
    const dayOfWeek = now.getUTCDay()
    const date = now.toISOString().split("T")[0]

    const result = await queryFunction`
      UPDATE visitors 
      SET count = count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING count
    `
    const newCount = result[0]?.count || 0

    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        await queryFunction`
            INSERT INTO visitor_logs (hour, day_of_week, date, timezone, user_agent)
            VALUES (${hour}, ${dayOfWeek}, ${date}, ${timezone}, ${userAgent})
        `
    } catch {
      console.error("Error logging visit details:")
    }

    try {
      broadcast({ type: 'visitor_count_update', count: newCount })
    } catch {}
}