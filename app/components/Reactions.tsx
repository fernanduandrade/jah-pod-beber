"use client";

import { useState, useEffect } from "react";
import type { Reaction, ReactionRequest, ReactionResponse } from "../types/api";
import { reactionSchema } from "../lib/validations";
import { addReaction, getReactions } from "../actions/reactions";

const REACTION_EMOJIS = [
  { emoji: "🍺", label: "Cerveja" },
  { emoji: "🍻", label: "Brindar" },
  { emoji: "🎉", label: "Celebrar" },
  { emoji: "🥳", label: "Festa" },
  { emoji: "😎", label: "Legal" },
];

export function Reactions() {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReactions();
  }, []);

  const fetchReactions = async () => {
    try {
      const data = await getReactions();
      if (data.success && data.reactions) {
        setReactions(data.reactions);
      }
    } catch (error) {
      console.error("Failed to fetch reactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReaction = async (emoji: string) => {
    const validation = reactionSchema.safeParse({ emoji });
    if (!validation.success) return;

    try {
      const payload: ReactionRequest = {
        emoji: validation.data.emoji,
      };

      const data: ReactionResponse = await addReaction(payload);

      if (data.success && data.reaction) {
        setReactions((prev) => {
          const existing = prev.find((r) => r.emoji === emoji);
          if (existing) {
            return prev.map((r) =>
              r.emoji === emoji ? { ...r, count: data.reaction!.count } : r
            );
          }
          return [...prev, data.reaction!];
        });
      }
    } catch (error) {
      console.error("Failed to submit reaction:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-beer-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Reações</h3>
      <div className="flex flex-wrap items-center gap-3">
        {REACTION_EMOJIS.map((reaction) => {
          const reactionData = reactions.find(
            (r) => r.emoji === reaction.emoji
          );
          const count = reactionData?.count || 0;

          return (
            <button
              key={reaction.emoji}
              onClick={() => handleReaction(reaction.emoji)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 border-2 border-beer-gold/30 hover:border-beer-gold hover:bg-card/80 transition-all"
              aria-label={`Reagir com ${reaction.label}`}
              title={reaction.label}
            >
              <span className="text-2xl">{reaction.emoji}</span>
              {count > 0 && (
                <span className="text-sm font-semibold text-beer-gold">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
