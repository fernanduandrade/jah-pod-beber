import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const result = await sql`
      SELECT count FROM visitors WHERE id = 1
    `

    const count = result[0]?.count || 0
    return Response.json({ count })
  } catch (error) {
    return Response.json({ count: 0 }, { status: 500 })
  }
}

export async function POST() {
  try {
    const result = await sql`
      UPDATE visitors 
      SET count = count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING count
    `
    const count = result[0]?.count || 0
    return Response.json({ count })
  } catch (error) {
    return Response.json({ count: 0 }, { status: 500 })
  }
}
