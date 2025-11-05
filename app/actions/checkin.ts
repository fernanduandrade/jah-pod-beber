"use server";

import { neon } from "@neondatabase/serverless";
import type { CheckInResponse } from "../types/api";
import { getAgent } from "../lib/rateLimit";

const queryFunction = neon(process.env.DATABASE_URL!);

export async function checkIn(): Promise<CheckInResponse> {
  try {
    var userAgent = await getAgent();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const now = new Date();
    const hour = now.getUTCHours();
    const dayOfWeek = now.getUTCDay();
    const date = now.toISOString().split("T")[0];

    const result = await queryFunction`
      UPDATE visitors 
      SET count = count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING count
    `;
    const count = result[0]?.count || 0;

    try {
      await queryFunction`
        INSERT INTO check_ins (timezone, user_agent)
        VALUES (${timezone}, ${userAgent})
      `;
    } catch (logError) {
      console.error("Error logging check-in:", logError);
    }

    try {
      await queryFunction`
        INSERT INTO visitor_logs (hour, day_of_week, date, timezone, user_agent)
        VALUES (${hour}, ${dayOfWeek}, ${date}, ${timezone}, ${userAgent})
      `;
    } catch (logError) {
      console.error("Error logging visit details:", logError);
    }

    return {
      success: true,
      count,
      message: "Check-in realizado com sucesso!",
    };
  } catch (error) {
    console.error("Error processing check-in:", error);
    return {
      success: false,
      error: "Failed to process check-in",
    };
  }
}
