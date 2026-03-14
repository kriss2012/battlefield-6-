import axios from 'axios';

const BF6_API_BASE = 'https://api.gametools.network/bf6';

export interface PlayerBatchData {
  playerId: string;
  playerName: string;
  kills?: number;
  deaths?: number;
  kdRatio?: number;
  wins?: number;
  losses?: number;
  winRate?: number;
  score?: number;
  timePlayed?: number;
  level?: number;
  rank?: string;
}

export async function fetchMultiplePlayers(playerIds: string[]): Promise<PlayerBatchData[]> {
  try {
    if (playerIds.length === 0) {
      return [];
    }

    if (playerIds.length > 128) {
      throw new Error('Maximum 128 players can be fetched at once');
    }

    console.log(`📥 Fetching batch stats for ${playerIds.length} players...`);

    const response = await axios.post(`${BF6_API_BASE}/multiple/`, {
      playerIds: playerIds,
    });

    if (!response.data || response.data.errors) {
      console.error('Error fetching batch player data:', response.data?.errors);
      return [];
    }

    // Transform the API response to our format
    const players: PlayerBatchData[] = [];

    if (Array.isArray(response.data)) {
      for (const player of response.data) {
        players.push({
          playerId: player.playerId || player.id || '',
          playerName: player.playerName || player.name || 'Unknown',
          kills: player.kills || 0,
          deaths: player.deaths || 0,
          kdRatio: player.killDeath || player.kdRatio || 0,
          wins: player.wins || 0,
          losses: player.losses || 0,
          winRate: player.winPercent || player.winRate || 0,
          score: player.score || 0,
          timePlayed: player.timePlayed || 0,
          level: player.rank?.number || player.level || 0,
          rank: player.rank?.name || player.rankName || 'Unknown',
        });
      }
    }

    console.log(`✅ Successfully fetched ${players.length} players`);
    return players;
  } catch (error) {
    console.error('❌ Error fetching multiple players:', error);
    return [];
  }
}
