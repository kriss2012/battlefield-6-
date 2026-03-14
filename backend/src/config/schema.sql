-- Player stats history table
CREATE TABLE IF NOT EXISTS player_stats_history (
  id SERIAL PRIMARY KEY,
  player_id VARCHAR(255) NOT NULL,
  player_name VARCHAR(255) NOT NULL,
  kills INTEGER,
  deaths INTEGER,
  kd_ratio DECIMAL(10, 2),
  wins INTEGER,
  losses INTEGER,
  win_rate DECIMAL(5, 2),
  score BIGINT,
  time_played INTEGER,
  headshots INTEGER,
  headshot_percentage DECIMAL(5, 2),
  accuracy DECIMAL(5, 2),
  level INTEGER,
  rank VARCHAR(100),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on player_id and recorded_at for efficient queries
CREATE INDEX IF NOT EXISTS idx_player_stats_player_id ON player_stats_history(player_id);
CREATE INDEX IF NOT EXISTS idx_player_stats_recorded_at ON player_stats_history(recorded_at);
CREATE INDEX IF NOT EXISTS idx_player_stats_composite ON player_stats_history(player_id, recorded_at);

-- Weapon stats history table
CREATE TABLE IF NOT EXISTS weapon_stats_history (
  id SERIAL PRIMARY KEY,
  player_id VARCHAR(255) NOT NULL,
  weapon_name VARCHAR(255) NOT NULL,
  kills INTEGER,
  headshots INTEGER,
  accuracy DECIMAL(5, 2),
  time_used INTEGER,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_weapon_stats_player_id ON weapon_stats_history(player_id);
CREATE INDEX IF NOT EXISTS idx_weapon_stats_recorded_at ON weapon_stats_history(recorded_at);

-- Tracked players table (players that should be monitored daily)
CREATE TABLE IF NOT EXISTS tracked_players (
  id SERIAL PRIMARY KEY,
  player_id VARCHAR(255) UNIQUE NOT NULL,
  player_name VARCHAR(255) NOT NULL,
  platform VARCHAR(50),
  last_fetched TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tracked_players_id ON tracked_players(player_id);

-- Player comparison cache table
CREATE TABLE IF NOT EXISTS player_comparisons (
  id SERIAL PRIMARY KEY,
  player_ids TEXT[] NOT NULL,
  comparison_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

-- Clean up expired comparisons periodically
CREATE INDEX IF NOT EXISTS idx_comparisons_expires ON player_comparisons(expires_at);
