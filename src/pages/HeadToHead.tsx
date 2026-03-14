import { useState } from 'react';
import { analyticsApi } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PlayerStats {
  player_id: string;
  player_name: string;
  kills: number;
  deaths: number;
  kd_ratio: number;
  wins: number;
  losses: number;
  win_rate: number;
  score: number;
  time_played: number;
  headshots: number;
  headshot_percentage: number;
  accuracy: number;
  level: number;
  rank: string;
}

export default function HeadToHead() {
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [player1Data, setPlayer1Data] = useState<PlayerStats | null>(null);
  const [player2Data, setPlayer2Data] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!player1Id.trim() || !player2Id.trim()) {
      setError('Please enter both player IDs');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await analyticsApi.comparePlayers([player1Id.trim(), player2Id.trim()]);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.players && result.players.length === 2) {
      setPlayer1Data(result.players[0]!);
      setPlayer2Data(result.players[1]!);
    } else if (result.players && result.players.length === 1) {
      setError('One of the players was not found. Make sure both players are tracked.');
      setPlayer1Data(result.players[0] || null);
      setPlayer2Data(null);
    } else {
      setError('Players not found. Make sure they are tracked in the system.');
    }

    setLoading(false);
  };

  const getWinner = (stat1: number, stat2: number, player: 1 | 2) => {
    if (stat1 === stat2) return false;
    if (player === 1) return stat1 > stat2;
    return stat2 > stat1;
  };

  const getChartData = () => {
    if (!player1Data || !player2Data) return [];

    return [
      {
        stat: 'K/D',
        [player1Data.player_name]: parseFloat(player1Data.kd_ratio.toFixed(2)),
        [player2Data.player_name]: parseFloat(player2Data.kd_ratio.toFixed(2)),
      },
      {
        stat: 'Win Rate',
        [player1Data.player_name]: parseFloat(player1Data.win_rate.toFixed(1)),
        [player2Data.player_name]: parseFloat(player2Data.win_rate.toFixed(1)),
      },
      {
        stat: 'Level',
        [player1Data.player_name]: player1Data.level,
        [player2Data.player_name]: player2Data.level,
      },
      {
        stat: 'Headshot %',
        [player1Data.player_name]: parseFloat(player1Data.headshot_percentage.toFixed(1)),
        [player2Data.player_name]: parseFloat(player2Data.headshot_percentage.toFixed(1)),
      },
      {
        stat: 'Accuracy',
        [player1Data.player_name]: parseFloat(player1Data.accuracy.toFixed(1)),
        [player2Data.player_name]: parseFloat(player2Data.accuracy.toFixed(1)),
      },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Head-to-Head Comparison</h1>

        {/* Player Input */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Player 1 ID</label>
              <input
                type="text"
                value={player1Id}
                onChange={(e) => setPlayer1Id(e.target.value)}
                placeholder="Enter Player 1 ID"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Player 2 ID</label>
              <input
                type="text"
                value={player2Id}
                onChange={(e) => setPlayer2Id(e.target.value)}
                placeholder="Enter Player 2 ID"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleCompare}
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold"
          >
            {loading ? 'Comparing...' : 'Compare Players'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {player1Data && player2Data && (
          <>
            {/* Player Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Player 1 Card */}
              <div className="bg-gradient-to-br from-blue-900/50 to-gray-800 rounded-lg p-6 border-2 border-blue-500">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold mb-1">{player1Data.player_name}</h2>
                  <div className="text-gray-400">{player1Data.rank}</div>
                  <div className="text-2xl font-bold text-blue-400 mt-2">Level {player1Data.level}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-gray-400">K/D Ratio</div>
                    <div className="text-xl font-bold">{player1Data.kd_ratio.toFixed(2)}</div>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-gray-400">Win Rate</div>
                    <div className="text-xl font-bold">{player1Data.win_rate.toFixed(1)}%</div>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-gray-400">Score</div>
                    <div className="text-xl font-bold">{player1Data.score.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-gray-400">Kills</div>
                    <div className="text-xl font-bold">{player1Data.kills.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Player 2 Card */}
              <div className="bg-gradient-to-br from-purple-900/50 to-gray-800 rounded-lg p-6 border-2 border-purple-500">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold mb-1">{player2Data.player_name}</h2>
                  <div className="text-gray-400">{player2Data.rank}</div>
                  <div className="text-2xl font-bold text-purple-400 mt-2">Level {player2Data.level}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-gray-400">K/D Ratio</div>
                    <div className="text-xl font-bold">{player2Data.kd_ratio.toFixed(2)}</div>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-gray-400">Win Rate</div>
                    <div className="text-xl font-bold">{player2Data.win_rate.toFixed(1)}%</div>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-gray-400">Score</div>
                    <div className="text-xl font-bold">{player2Data.score.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-gray-400">Kills</div>
                    <div className="text-xl font-bold">{player2Data.kills.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="stat" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.375rem' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Bar dataKey={player1Data.player_name} fill="#3B82F6" />
                  <Bar dataKey={player2Data.player_name} fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Stats Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-4">Statistic</th>
                    <th className="text-center p-4">{player1Data.player_name}</th>
                    <th className="text-center p-4">{player2Data.player_name}</th>
                    <th className="text-center p-4">Winner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-4 font-semibold">K/D Ratio</td>
                    <td className={`text-center p-4 ${getWinner(player1Data.kd_ratio, player2Data.kd_ratio, 1) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player1Data.kd_ratio.toFixed(2)}
                    </td>
                    <td className={`text-center p-4 ${getWinner(player1Data.kd_ratio, player2Data.kd_ratio, 2) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player2Data.kd_ratio.toFixed(2)}
                    </td>
                    <td className="text-center p-4">
                      {player1Data.kd_ratio > player2Data.kd_ratio ? player1Data.player_name : player1Data.kd_ratio < player2Data.kd_ratio ? player2Data.player_name : 'Tie'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Win Rate</td>
                    <td className={`text-center p-4 ${getWinner(player1Data.win_rate, player2Data.win_rate, 1) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player1Data.win_rate.toFixed(1)}%
                    </td>
                    <td className={`text-center p-4 ${getWinner(player1Data.win_rate, player2Data.win_rate, 2) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player2Data.win_rate.toFixed(1)}%
                    </td>
                    <td className="text-center p-4">
                      {player1Data.win_rate > player2Data.win_rate ? player1Data.player_name : player1Data.win_rate < player2Data.win_rate ? player2Data.player_name : 'Tie'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Total Kills</td>
                    <td className={`text-center p-4 ${getWinner(player1Data.kills, player2Data.kills, 1) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player1Data.kills.toLocaleString()}
                    </td>
                    <td className={`text-center p-4 ${getWinner(player1Data.kills, player2Data.kills, 2) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player2Data.kills.toLocaleString()}
                    </td>
                    <td className="text-center p-4">
                      {player1Data.kills > player2Data.kills ? player1Data.player_name : player1Data.kills < player2Data.kills ? player2Data.player_name : 'Tie'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Total Wins</td>
                    <td className={`text-center p-4 ${getWinner(player1Data.wins, player2Data.wins, 1) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player1Data.wins.toLocaleString()}
                    </td>
                    <td className={`text-center p-4 ${getWinner(player1Data.wins, player2Data.wins, 2) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player2Data.wins.toLocaleString()}
                    </td>
                    <td className="text-center p-4">
                      {player1Data.wins > player2Data.wins ? player1Data.player_name : player1Data.wins < player2Data.wins ? player2Data.player_name : 'Tie'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Total Score</td>
                    <td className={`text-center p-4 ${getWinner(player1Data.score, player2Data.score, 1) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player1Data.score.toLocaleString()}
                    </td>
                    <td className={`text-center p-4 ${getWinner(player1Data.score, player2Data.score, 2) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player2Data.score.toLocaleString()}
                    </td>
                    <td className="text-center p-4">
                      {player1Data.score > player2Data.score ? player1Data.player_name : player1Data.score < player2Data.score ? player2Data.player_name : 'Tie'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Headshot %</td>
                    <td className={`text-center p-4 ${getWinner(player1Data.headshot_percentage, player2Data.headshot_percentage, 1) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player1Data.headshot_percentage.toFixed(1)}%
                    </td>
                    <td className={`text-center p-4 ${getWinner(player1Data.headshot_percentage, player2Data.headshot_percentage, 2) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player2Data.headshot_percentage.toFixed(1)}%
                    </td>
                    <td className="text-center p-4">
                      {player1Data.headshot_percentage > player2Data.headshot_percentage ? player1Data.player_name : player1Data.headshot_percentage < player2Data.headshot_percentage ? player2Data.player_name : 'Tie'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Accuracy</td>
                    <td className={`text-center p-4 ${getWinner(player1Data.accuracy, player2Data.accuracy, 1) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player1Data.accuracy.toFixed(1)}%
                    </td>
                    <td className={`text-center p-4 ${getWinner(player1Data.accuracy, player2Data.accuracy, 2) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player2Data.accuracy.toFixed(1)}%
                    </td>
                    <td className="text-center p-4">
                      {player1Data.accuracy > player2Data.accuracy ? player1Data.player_name : player1Data.accuracy < player2Data.accuracy ? player2Data.player_name : 'Tie'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Level</td>
                    <td className={`text-center p-4 ${getWinner(player1Data.level, player2Data.level, 1) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player1Data.level}
                    </td>
                    <td className={`text-center p-4 ${getWinner(player1Data.level, player2Data.level, 2) ? 'bg-green-900/30 font-bold' : ''}`}>
                      {player2Data.level}
                    </td>
                    <td className="text-center p-4">
                      {player1Data.level > player2Data.level ? player1Data.player_name : player1Data.level < player2Data.level ? player2Data.player_name : 'Tie'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
