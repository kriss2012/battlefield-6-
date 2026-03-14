import { useState, useEffect } from 'react';
import { leaderboardApi } from '../services/api';

interface LeaderboardEntry {
  player_id: string;
  player_name: string;
  kills: number;
  deaths: number;
  kd_ratio: number;
  wins: number;
  losses: number;
  win_rate: number;
  score: number;
  level: number;
  rank: string;
  platform: string;
  last_updated: string;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<'kd_ratio' | 'score' | 'wins' | 'level'>('kd_ratio');
  const [stats, setStats] = useState<any>(null);
  const [page, setPage] = useState(0);
  const limit = 50;

  useEffect(() => {
    fetchLeaderboard();
    fetchStats();
  }, [orderBy, page]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);

    const result = await leaderboardApi.getLeaderboard(orderBy, limit, page * limit);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setLeaderboard(result.leaderboard || []);
    setLoading(false);
  };

  const fetchStats = async () => {
    const result = await leaderboardApi.getLeaderboardStats();
    if (!result.error) {
      setStats(result.stats);
    }
  };

  const getSortLabel = () => {
    switch (orderBy) {
      case 'kd_ratio':
        return 'K/D Ratio';
      case 'score':
        return 'Score';
      case 'wins':
        return 'Wins';
      case 'level':
        return 'Level';
      default:
        return 'K/D Ratio';
    }
  };

  const getMedalColor = (position: number) => {
    if (position === 1) return 'text-yellow-400';
    if (position === 2) return 'text-gray-300';
    if (position === 3) return 'text-amber-600';
    return 'text-gray-500';
  };

  const getMedalIcon = (position: number) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `#${position}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Global Leaderboard</h1>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Total Players</div>
              <div className="text-2xl font-bold">{parseInt(stats.total_players || 0).toLocaleString()}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Average K/D</div>
              <div className="text-2xl font-bold">{parseFloat(stats.avg_kd || 0).toFixed(2)}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Highest K/D</div>
              <div className="text-2xl font-bold">{parseFloat(stats.max_kd || 0).toFixed(2)}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Avg Win Rate</div>
              <div className="text-2xl font-bold">{parseFloat(stats.avg_win_rate || 0).toFixed(1)}%</div>
            </div>
          </div>
        )}

        {/* Sort Controls */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-gray-400 mr-2">Sort by:</span>
            <button
              onClick={() => {
                setOrderBy('kd_ratio');
                setPage(0);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                orderBy === 'kd_ratio' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              K/D Ratio
            </button>
            <button
              onClick={() => {
                setOrderBy('score');
                setPage(0);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                orderBy === 'score' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Score
            </button>
            <button
              onClick={() => {
                setOrderBy('wins');
                setPage(0);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                orderBy === 'wins' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Wins
            </button>
            <button
              onClick={() => {
                setOrderBy('level');
                setPage(0);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                orderBy === 'level' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Level
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-gray-400">Loading leaderboard...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-red-400">{error}</div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-400">No players in leaderboard yet</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-4 font-semibold">Rank</th>
                    <th className="text-left p-4 font-semibold">Player</th>
                    <th className="text-center p-4 font-semibold">Level</th>
                    <th className="text-center p-4 font-semibold">K/D</th>
                    <th className="text-center p-4 font-semibold">Score</th>
                    <th className="text-center p-4 font-semibold">Wins</th>
                    <th className="text-center p-4 font-semibold">Win Rate</th>
                    <th className="text-center p-4 font-semibold">Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaderboard.map((entry, index) => {
                    const position = page * limit + index + 1;
                    const isTopThree = position <= 3;
                    return (
                      <tr
                        key={entry.player_id}
                        className={`hover:bg-gray-700 transition-colors ${isTopThree ? 'bg-gray-750' : ''}`}
                      >
                        <td className={`p-4 font-bold ${getMedalColor(position)}`}>
                          <span className="text-lg">{getMedalIcon(position)}</span>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold">{entry.player_name}</div>
                          <div className="text-sm text-gray-400">{entry.rank}</div>
                        </td>
                        <td className="text-center p-4">{entry.level}</td>
                        <td className="text-center p-4 font-semibold">
                          {entry.kd_ratio.toFixed(2)}
                        </td>
                        <td className="text-center p-4">{entry.score.toLocaleString()}</td>
                        <td className="text-center p-4">{entry.wins.toLocaleString()}</td>
                        <td className="text-center p-4">{entry.win_rate.toFixed(1)}%</td>
                        <td className="text-center p-4 uppercase text-xs">{entry.platform}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && leaderboard.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-gray-900 border-t border-gray-700">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-400">
                Page {page + 1} • Showing {page * limit + 1}-{page * limit + leaderboard.length}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={leaderboard.length < limit}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-2">How the Leaderboard Works</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
            <li>Rankings are based on the selected sorting criteria: {getSortLabel()}</li>
            <li>Players must be tracked in the analytics system to appear on the leaderboard</li>
            <li>Stats are updated automatically every 6 hours</li>
            <li>Top 3 players in each category are highlighted</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
