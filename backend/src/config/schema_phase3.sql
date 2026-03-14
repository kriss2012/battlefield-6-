-- Phase 3: Social & Competitive Features Schema

-- Leaderboard table for global rankings
CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  player_id VARCHAR(255) UNIQUE NOT NULL,
  player_name VARCHAR(255) NOT NULL,
  kills INTEGER DEFAULT 0,
  deaths INTEGER DEFAULT 0,
  kd_ratio DECIMAL(10, 2) DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  win_rate DECIMAL(5, 2) DEFAULT 0,
  score BIGINT DEFAULT 0,
  time_played INTEGER DEFAULT 0,
  headshots INTEGER DEFAULT 0,
  headshot_percentage DECIMAL(5, 2) DEFAULT 0,
  accuracy DECIMAL(5, 2) DEFAULT 0,
  level INTEGER DEFAULT 0,
  rank VARCHAR(100),
  platform VARCHAR(50) DEFAULT 'pc',
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_kd ON leaderboard(kd_ratio DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_wins ON leaderboard(wins DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_level ON leaderboard(level DESC);

-- User accounts for authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  player_id VARCHAR(255),
  player_name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_player_id ON users(player_id);

-- Friend relationships
CREATE TABLE IF NOT EXISTS friendships (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, rejected, blocked
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, friend_user_id)
);

CREATE INDEX IF NOT EXISTS idx_friendships_user ON friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend ON friendships(friend_user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_status ON friendships(status);

-- Squads/Clans
CREATE TABLE IF NOT EXISTS squads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  tag VARCHAR(10) UNIQUE NOT NULL,
  description TEXT,
  owner_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  member_count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_squads_name ON squads(name);
CREATE INDEX IF NOT EXISTS idx_squads_tag ON squads(tag);
CREATE INDEX IF NOT EXISTS idx_squads_owner ON squads(owner_user_id);

-- Squad memberships
CREATE TABLE IF NOT EXISTS squad_members (
  id SERIAL PRIMARY KEY,
  squad_id INTEGER NOT NULL REFERENCES squads(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member', -- owner, admin, member
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(squad_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_squad_members_squad ON squad_members(squad_id);
CREATE INDEX IF NOT EXISTS idx_squad_members_user ON squad_members(user_id);

-- Squad leaderboard (aggregate stats)
CREATE TABLE IF NOT EXISTS squad_leaderboard (
  id SERIAL PRIMARY KEY,
  squad_id INTEGER UNIQUE NOT NULL REFERENCES squads(id) ON DELETE CASCADE,
  total_kills BIGINT DEFAULT 0,
  total_deaths BIGINT DEFAULT 0,
  avg_kd_ratio DECIMAL(10, 2) DEFAULT 0,
  total_wins INTEGER DEFAULT 0,
  total_losses INTEGER DEFAULT 0,
  avg_win_rate DECIMAL(5, 2) DEFAULT 0,
  total_score BIGINT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_squad_leaderboard_kd ON squad_leaderboard(avg_kd_ratio DESC);
CREATE INDEX IF NOT EXISTS idx_squad_leaderboard_score ON squad_leaderboard(total_score DESC);
