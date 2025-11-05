"use server";

import { neon } from "@neondatabase/serverless";
import type { Reaction, ReactionRequest, ReactionResponse } from "../types/api";
import { reactionSchema } from "../lib/validations";

const queryFunction = neon(process.env.DATABASE_URL!);

export async function getReactions() {
  try {
    const result = await queryFunction`
          SELECT emoji, count
          FROM reactions
          ORDER BY count DESC, emoji ASC
        `;

    const reactions: Reaction[] = result.map((row: any) => ({
      id: row.id || 0,
      emoji: row.emoji,
      count: Number(row.count),
    }));

    return {
      success: true,
      reactions,
    };
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return {
      success: false,
      reactions: [],
      error: "Failed to fetch reactions",
    };
  }
}

export async function addReaction(
  body: ReactionRequest
): Promise<ReactionResponse> {
  try {
    const validation = reactionSchema.safeParse(body);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.errors[0].message,
      };
    }

    const { emoji } = validation.data;

    const result = await queryFunction`
          INSERT INTO reactions (emoji, count)
          VALUES (${emoji}, 1)
          ON CONFLICT (emoji) 
          DO UPDATE SET 
            count = reactions.count + 1,
            updated_at = CURRENT_TIMESTAMP
          RETURNING id, emoji, count
        `;

    const reaction: Reaction = {
      id: result[0].id,
      emoji: result[0].emoji,
      count: Number(result[0].count),
    };

    return {
      success: true,
      reaction,
    };
  } catch (error) {
    console.error("Error creating/updating reaction:", error);
    return {
      success: false,
      error: "Failed to process reaction",
    };
  }
}
