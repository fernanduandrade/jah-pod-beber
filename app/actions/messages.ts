"use server";

import { neon } from "@neondatabase/serverless";
import type { Message, MessageRequest, MessageResponse } from "../types/api";
import { messageSchema } from "../lib/validations";

const queryFunction = neon(process.env.DATABASE_URL!);

export async function getMessages() {
  try {
    const result = await queryFunction`
      SELECT id, message, author, created_at
      FROM messages
      ORDER BY created_at DESC
      LIMIT 20
    `;

    const messages: Message[] = result.map((row: any) => ({
      id: row.id,
      message: row.message,
      author: row.author || "Anônimo",
      created_at: row.created_at.toISOString(),
    }));

    return {
      success: true,
      messages,
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {
      success: false,
      messages: [],
      error: "Failed to fetch messages",
    };
  }
}

export async function createMessage(
  body: MessageRequest
): Promise<MessageResponse> {
  try {
    const validation = messageSchema.safeParse(body);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.errors[0].message,
      };
    }

    const { message, author } = validation.data;

    // Insert message
    const result = await queryFunction`
      INSERT INTO messages (message, author)
      VALUES (${message}, ${author || null})
      RETURNING id, message, author, created_at
    `;

    const newMessage: Message = {
      id: result[0].id,
      message: result[0].message,
      author: result[0].author || "Anônimo",
      created_at: result[0].created_at.toISOString(),
    };

    return {
      success: true,
      message: newMessage,
    };
  } catch (error) {
    console.error("Error creating message:", error);
    return {
      success: false,
      error: "Failed to create message",
    };
  }
}
