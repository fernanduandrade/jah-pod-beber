import { headers } from "next/headers"

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitOptions {
  maxRequests: number
  windowMs: number
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { maxRequests: 10, windowMs: 60000 } // 10 requests per minute default
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Clean up old entries periodically (simple cleanup)
  if (Math.random() < 0.01) {
    // 1% chance to cleanup on each call
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }
  }

  if (!entry || entry.resetTime < now) {
    // New entry or expired, reset
    const resetTime = now + options.windowMs
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    })
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetTime,
    }
  }

  if (entry.count >= options.maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  // Increment count
  entry.count++
  return {
    allowed: true,
    remaining: options.maxRequests - entry.count,
    resetTime: entry.resetTime,
  }
}

export async function getRateLimitIdentifierAction(): Promise<string> {
  const hdrs = await headers()
  const forwarded = hdrs.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown"
  const userAgent = hdrs.get("user-agent") || "unknown"
  return `${ip}:${userAgent.slice(0, 20)}`
}

export async function getAgent(): Promise<string> {
  const hdrs = await headers()
  return hdrs.get("user-agent") || "unknown"
}