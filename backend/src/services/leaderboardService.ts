import pool from '../config/database';
import { PlayerBatchData } from './batchFetcher';

export async function updateLeaderboardEntry(playerData: PlayerBatchData) {
  try {
    await pool.query(
      `INSERT INTO leaderboard
        (player_id, player_name, kills, deaths, kd_ratio, wins, losses, win_rate,
         score, time_played, headshots, headshot_percentage, accuracy, level, rank, last_updated)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP)
       ON CONFLICT (player_id)
       DO UPDATE SET
         player_name = $2,
         kills = $3,
         deaths = $4,
         kd_ratio = $5,
         wins = $6,
         losses = $7,
         win_rate = $8,
         score = $9,
         time_played = $10,
         headshots = $11,
         headshot_percentage = $12,
         accuracy = $13,
         level = $14,
         rank = $15,
         last_updated = CURRENT_TIMESTAMP`,
      [
        playerData.playerId,
        playerData.playerName,
        playerData.kills || 0,
        playerData.deaths || 0,
        playerData.kdRatio || 0,
        playerData.wins || 0,
        playerData.losses || 0,
        playerData.winRate || 0,
        playerData.score || 0,
        playerData.timePlayed || 0,
        0, // headshots (not in batch data)
        0, // headshot_percentage (not in batch data)
        0, // accuracy (not in batch data)
        playerData.level || 0,
        playerData.rank || 'Unknown',
      ]
    );
  } catch (error) {
    console.error(`Error updating leaderboard for ${playerData.playerName}:`, error);
  }
}

export async function batchUpdateLeaderboard(players: PlayerBatchData[]) {
  console.log(`📊 Updating leaderboard with ${players.length} players...`);

  for (const player of players) {
    await updateLeaderboardEntry(player);
  }

  console.log('✅ Leaderboard updated successfully');
}

export async function getLeaderboard(
  orderBy: 'kd_ratio' | 'score' | 'wins' | 'level' = 'kd_ratio',
  limit: number = 100,
  offset: number = 0
) {
  try {
    const result = await pool.query(
      `SELECT
         player_id,
         player_name,
         kills,
         deaths,
         kd_ratio,
         wins,
         losses,
         win_rate,
         score,
         level,
         rank,
         platform,
         last_updated
       FROM leaderboard
       ORDER BY ${orderBy} DESC NULLS LAST
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return result.rows;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export async function getPlayerRank(playerId: string, orderBy: 'kd_ratio' | 'score' | 'wins' | 'level' = 'kd_ratio') {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) + 1 as rank
       FROM leaderboard
       WHERE ${orderBy} > (
         SELECT ${orderBy}
         FROM leaderboard
         WHERE player_id = $1
       )`,
      [playerId]
    );

    if (result.rows.length > 0) {
      return parseInt(result.rows[0]?.rank || '0');
    }

    return null;
  } catch (error) {
    console.error('Error fetching player rank:', error);
    return null;
  }
}

export async function getLeaderboardStats() {
  try {
    const result = await pool.query(
      `SELECT
         COUNT(*) as total_players,
         AVG(kd_ratio) as avg_kd,
         MAX(kd_ratio) as max_kd,
         AVG(win_rate) as avg_win_rate,
         SUM(kills) as total_kills,
         SUM(deaths) as total_deaths
       FROM leaderboard`
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching leaderboard stats:', error);
    return null;
  }
}
