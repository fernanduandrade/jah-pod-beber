"use server";

import { neon } from "@neondatabase/serverless";
import type { StatsResponse } from "../types/api";

const queryFunction = neon(process.env.DATABASE_URL!);

export async function getStatus(): Promise<StatsResponse> {
  try {
    const visitsByHour = await queryFunction`
              SELECT 
                hour,
                COUNT(*) as count
              FROM visitor_logs
              WHERE created_at >= NOW() - INTERVAL '24 hours'
              GROUP BY hour
              ORDER BY hour
            `;

    // Get visits by day (last 7 days)
    const visitsByDay = await queryFunction`
              SELECT 
                date,
                day_of_week,
                COUNT(*) as count
              FROM visitor_logs
              WHERE date >= CURRENT_DATE - INTERVAL '7 days'
              GROUP BY date, day_of_week
              ORDER BY date DESC
            `;

    // Get total visits
    const totalResult = await queryFunction`
              SELECT count FROM visitors WHERE id = 1
            `;
    const totalVisits = totalResult[0]?.count || 0;

    // Get visits in last 24 hours
    const last24HoursResult = await queryFunction`
              SELECT COUNT(*) as count
              FROM visitor_logs
              WHERE created_at >= NOW() - INTERVAL '24 hours'
            `;
    const last24Hours = Number(last24HoursResult[0]?.count || 0);

    // Get visits in last 7 days
    const last7DaysResult = await queryFunction`
              SELECT COUNT(*) as count
              FROM visitor_logs
              WHERE date >= CURRENT_DATE - INTERVAL '7 days'
            `;
    const last7Days = Number(last7DaysResult[0]?.count || 0);

    // Calculate growth rate (last 7 days vs previous 7 days)
    const previous7DaysResult = await queryFunction`
              SELECT COUNT(*) as count
              FROM visitor_logs
              WHERE date >= CURRENT_DATE - INTERVAL '14 days'
                AND date < CURRENT_DATE - INTERVAL '7 days'
            `;
    const previous7Days = Number(previous7DaysResult[0]?.count || 0);
    const growthRate =
      previous7Days > 0
        ? ((last7Days - previous7Days) / previous7Days) * 100
        : last7Days > 0
        ? 100
        : 0;

    return{
      visitsByHour: visitsByHour.map((row: any) => ({
        hour: Number(row.hour),
        count: Number(row.count),
      })),
      visitsByDay: visitsByDay.map((row: any) => ({
        day: row.date,
        day_of_week: Number(row.day_of_week),
        count: Number(row.count),
      })),
      totalVisits: Number(totalVisits),
      growthRate: Number(growthRate.toFixed(2)),
      last24Hours: last24Hours,
      last7Days: last7Days,
    };
  } catch (error) {
    return {
      visitsByHour: [],
      visitsByDay: [],
      totalVisits: 0,
      growthRate: 0,
      last24Hours: 0,
      last7Days: 0,
    };
  }
}
