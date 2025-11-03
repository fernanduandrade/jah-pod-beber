-- Migration: Expand visitor tracking and add new tables
-- Execute this migration before deploying the new features

-- Expand visitors table (if needed)
-- Note: The existing visitors table structure is kept for backward compatibility
-- We'll create a new visitor_logs table for detailed tracking

-- Create visitor_logs table for detailed visitor tracking
CREATE TABLE IF NOT EXISTS visitor_logs (
  id SERIAL PRIMARY KEY,
  hour INTEGER NOT NULL CHECK (hour >= 0 AND hour <= 23),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  date DATE NOT NULL,
  timezone VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_visitor_logs_date ON visitor_logs(date);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_hour ON visitor_logs(hour);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_day_of_week ON visitor_logs(day_of_week);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_created_at ON visitor_logs(created_at);

-- Create messages table for message wall
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  author VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for messages
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Create reactions table
CREATE TABLE IF NOT EXISTS reactions (
  id SERIAL PRIMARY KEY,
  emoji VARCHAR(10) NOT NULL,
  count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(emoji)
);

-- Create index for reactions
CREATE INDEX IF NOT EXISTS idx_reactions_emoji ON reactions(emoji);

-- Create check_ins table (optional, for future check-in feature)
CREATE TABLE IF NOT EXISTS check_ins (
  id SERIAL PRIMARY KEY,
  timezone VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for check_ins
CREATE INDEX IF NOT EXISTS idx_check_ins_created_at ON check_ins(created_at DESC);
