// Types for API requests and responses

export interface VisitorCountResponse {
  count: number
}

export interface VisitorLog {
  id: number
  hour: number
  day_of_week: number
  date: string
  timezone: string
  user_agent?: string
  created_at: string
}

export interface StatsResponse {
  visitsByHour: Array<{
    hour: number
    count: number
  }>
  visitsByDay: Array<{
    day: string
    day_of_week: number
    count: number
  }>
  totalVisits: number
  growthRate: number
  last24Hours: number
  last7Days: number
}

export interface CheckInResponse {
  success: boolean
  count?: number
  message?: string
  error?: string
}

export interface Message {
  id: number
  message: string
  author: string
  created_at: string
}

export interface MessageRequest {
  message: string
  author: string
}

export interface MessageResponse {
  success: boolean
  message?: Message
  error?: string
}

export interface Reaction {
  id: number
  emoji: string
  count: number
}

export interface ReactionRequest {
  emoji: string
}

export interface ReactionResponse {
  success: boolean
  reaction?: Reaction
  error?: string
}
