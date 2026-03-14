import axios from 'axios';
import pool from '../config/database';

const BF6_API_BASE = 'https://api.gametools.network/bf6';

interface PlayerStats {
  playerId: string;
  playerName: string;
  kills: number;
  deaths: number;
  kdRatio: number;
  wins: number;
  losses: number;
  winRate: number;
  score: number;
  timePlayed: number;
  headshots: number;
  headshotPercentage: number;
  accuracy: number;
  level: number;
  rank: string;
}

export async function fetchAndStorePlayerStats(playerId: string, playerName: string) {
  try {
    console.log(`📥 Fetching stats for player: ${playerName} (${playerId})`);

    const response = await axios.get(`${BF6_API_BASE}/stats/`, {
      params: { playerid: playerId },
    });

    if (!response.data || response.data.errors) {
      console.error(`❌ Error fetching stats for ${playerName}:`, response.data.errors);
      return null;
    }

    const data = response.data;

    // Extract relevant stats
    const stats: PlayerStats = {
      playerId: playerId,
      playerName: playerName,
      kills: data.kills || 0,
      deaths: data.deaths || 0,
      kdRatio: data.killDeath || 0,
      wins: data.wins || 0,
      losses: data.losses || 0,
      winRate: data.winPercent || 0,
      score: data.score || 0,
      timePlayed: data.timePlayed || 0,
      headshots: data.headshots || 0,
      headshotPercentage: data.headshotPercent || 0,
      accuracy: data.accuracy || 0,
      level: data.rank?.number || 0,
      rank: data.rank?.name || 'Unknown',
    };

    // Store in database
    await pool.query(
      `INSERT INTO player_stats_history
        (player_id, player_name, kills, deaths, kd_ratio, wins, losses, win_rate,
         score, time_played, headshots, headshot_percentage, accuracy, level, rank)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        stats.playerId,
        stats.playerName,
        stats.kills,
        stats.deaths,
        stats.kdRatio,
        stats.wins,
        stats.losses,
        stats.winRate,
        stats.score,
        stats.timePlayed,
        stats.headshots,
        stats.headshotPercentage,
        stats.accuracy,
        stats.level,
        stats.rank,
      ]
    );

    console.log(`✅ Stats stored for ${playerName}`);
    return stats;
  } catch (error) {
    console.error(`❌ Error fetching/storing stats for ${playerName}:`, error);
    return null;
  }
}

export async function fetchTrackedPlayers() {
  try {
    const result = await pool.query(
      'SELECT player_id, player_name FROM tracked_players ORDER BY last_fetched ASC NULLS FIRST'
    );
    return result.rows;
  } catch (error) {
    console.error('❌ Error fetching tracked players:', error);
    return [];
  }
}

export async function updateTrackedPlayerFetchTime(playerId: string) {
  try {
    await pool.query(
      'UPDATE tracked_players SET last_fetched = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE player_id = $1',
      [playerId]
    );
  } catch (error) {
    console.error(`❌ Error updating fetch time for ${playerId}:`, error);
  }
}

export async function addTrackedPlayer(playerId: string, playerName: string, platform: string = 'pc') {
  try {
    await pool.query(
      `INSERT INTO tracked_players (player_id, player_name, platform)
       VALUES ($1, $2, $3)
       ON CONFLICT (player_id) DO UPDATE
       SET player_name = $2, platform = $3, updated_at = CURRENT_TIMESTAMP`,
      [playerId, playerName, platform]
    );
    console.log(`✅ Added ${playerName} to tracked players`);
  } catch (error) {
    console.error(`❌ Error adding tracked player ${playerName}:`, error);
  }
}
