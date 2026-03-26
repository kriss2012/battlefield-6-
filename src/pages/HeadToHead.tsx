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
    <div className="min-h-screen bg-neutral-950 text-white premium-gradient p-6">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-8 animate-fade-in">
          Head-to-Head <span className="text-blue-500">Comparison</span>
        </h1>

        {/* Player Input */}
        <div className="glass-card p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Target 01 Designation</label>
              <input
                type="text"
                value={player1Id}
                onChange={(e) => setPlayer1Id(e.target.value)}
                placeholder="Enter Player 1 ID"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Target 02 Designation</label>
              <input
                type="text"
                value={player2Id}
                onChange={(e) => setPlayer2Id(e.target.value)}
                placeholder="Enter Player 2 ID"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
              />
            </div>
          </div>
          <button
            onClick={handleCompare}
            disabled={loading}
            className="w-full px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 rounded-xl font-black italic transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest"
          >
            {loading ? 'ANALYZING TELEMETRY...' : 'INITIATE COMPARISON'}
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
            <div className="grid md:grid-cols-2 gap-8 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Player 1 Card */}
              <div className="glass-card p-8 border-l-4 border-l-blue-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-8xl grayscale tracking-tighter">01</span>
                </div>
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-1 text-white">{player1Data.player_name}</h2>
                    <div className="text-xs font-black uppercase tracking-[0.4em] text-blue-500/60 mb-4">{player1Data.rank}</div>
                    <div className="inline-block px-4 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-xs font-black text-blue-400">LEVEL {player1Data.level}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">K/D Ratio</div>
                      <div className="text-2xl font-black italic text-white">{player1Data.kd_ratio.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Win Rate</div>
                      <div className="text-2xl font-black italic text-white">{player1Data.win_rate.toFixed(1)}%</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Score</div>
                      <div className="text-2xl font-black italic text-white">{player1Data.score.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Kills</div>
                      <div className="text-2xl font-black italic text-white">{player1Data.kills.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player 2 Card */}
              <div className="glass-card p-8 border-l-4 border-l-purple-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-8xl grayscale tracking-tighter">02</span>
                </div>
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-1 text-white">{player2Data.player_name}</h2>
                    <div className="text-xs font-black uppercase tracking-[0.4em] text-purple-500/60 mb-4">{player2Data.rank}</div>
                    <div className="inline-block px-4 py-1 bg-purple-600/10 border border-purple-500/20 rounded-full text-xs font-black text-purple-400">LEVEL {player2Data.level}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">K/D Ratio</div>
                      <div className="text-2xl font-black italic text-white">{player2Data.kd_ratio.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Win Rate</div>
                      <div className="text-2xl font-black italic text-white">{player2Data.win_rate.toFixed(1)}%</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Score</div>
                      <div className="text-2xl font-black italic text-white">{player2Data.score.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Kills</div>
                      <div className="text-2xl font-black italic text-white">{player2Data.kills.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="glass-card p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500/60">Performance Delta Chart</h3>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="stat" 
                      stroke="#4b5563" 
                      fontSize={10} 
                      fontWeight="bold" 
                      tick={{ fill: '#4b5563' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#4b5563" 
                      fontSize={10} 
                      fontWeight="bold" 
                      tick={{ fill: '#4b5563' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: '#ffffff05' }}
                      contentStyle={{ 
                        backgroundColor: '#0a0a0a', 
                        border: '1px solid #ffffff10', 
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold' }} />
                    <Bar dataKey={player1Data.player_name} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey={player2Data.player_name} fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Stats Table */}
            <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <table className="w-full border-collapse">
                <thead className="bg-white/5 border-b border-white/10 text-left">
                  <tr>
                    <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-blue-500/60">Statistic_Designation</th>
                    <th className="p-6 text-center text-xs font-black uppercase tracking-[0.2em] text-blue-400">{player1Data.player_name}</th>
                    <th className="p-6 text-center text-xs font-black uppercase tracking-[0.2em] text-purple-400">{player2Data.player_name}</th>
                    <th className="p-6 text-center text-xs font-black uppercase tracking-[0.2em] text-gray-500">Operation_Dominance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-sm font-black uppercase tracking-widest text-gray-400">K/D Ratio</td>
                    <td className={`p-6 text-center text-sm font-black italic ${getWinner(player1Data.kd_ratio, player2Data.kd_ratio, 1) ? 'text-emerald-400 bg-emerald-500/5' : ''}`}>
                      {player1Data.kd_ratio.toFixed(2)}
                    </td>
                    <td className={`p-6 text-center text-sm font-black italic ${getWinner(player1Data.kd_ratio, player2Data.kd_ratio, 2) ? 'text-emerald-400 bg-emerald-500/5' : ''}`}>
                      {player2Data.kd_ratio.toFixed(2)}
                    </td>
                    <td className="p-6 text-center text-xs font-black uppercase tracking-widest text-blue-500/40">
                      {player1Data.kd_ratio > player2Data.kd_ratio ? player1Data.player_name : player1Data.kd_ratio < player2Data.kd_ratio ? player2Data.player_name : 'NEUTRAL'}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-sm font-black uppercase tracking-widest text-gray-400">Win Rate</td>
                    <td className={`p-6 text-center text-sm font-black italic ${getWinner(player1Data.win_rate, player2Data.win_rate, 1) ? 'text-emerald-400 bg-emerald-500/5' : ''}`}>
                      {player1Data.win_rate.toFixed(1)}%
                    </td>
                    <td className={`p-6 text-center text-sm font-black italic ${getWinner(player1Data.win_rate, player2Data.win_rate, 2) ? 'text-emerald-400 bg-emerald-500/5' : ''}`}>
                      {player2Data.win_rate.toFixed(1)}%
                    </td>
                    <td className="p-6 text-center text-xs font-black uppercase tracking-widest text-blue-500/40">
                      {player1Data.win_rate > player2Data.win_rate ? player1Data.player_name : player1Data.win_rate < player2Data.win_rate ? player2Data.player_name : 'NEUTRAL'}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-sm font-black uppercase tracking-widest text-gray-400">Total Kills</td>
                    <td className={`p-6 text-center text-sm font-black italic ${getWinner(player1Data.kills, player2Data.kills, 1) ? 'text-emerald-400 bg-emerald-500/5' : ''}`}>
                      {player1Data.kills.toLocaleString()}
                    </td>
                    <td className={`p-6 text-center text-sm font-black italic ${getWinner(player1Data.kills, player2Data.kills, 2) ? 'text-emerald-400 bg-emerald-500/5' : ''}`}>
                      {player2Data.kills.toLocaleString()}
                    </td>
                    <td className="p-6 text-center text-xs font-black uppercase tracking-widest text-blue-500/40">
                      {player1Data.kills > player2Data.kills ? player1Data.player_name : player1Data.kills < player2Data.kills ? player2Data.player_name : 'NEUTRAL'}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-sm font-black uppercase tracking-widest text-gray-400">Total Score</td>
                    <td className={`p-6 text-center text-sm font-black italic ${getWinner(player1Data.score, player2Data.score, 1) ? 'text-emerald-400 bg-emerald-500/5' : ''}`}>
                      {player1Data.score.toLocaleString()}
                    </td>
                    <td className={`p-6 text-center text-sm font-black italic ${getWinner(player1Data.score, player2Data.score, 2) ? 'text-emerald-400 bg-emerald-500/5' : ''}`}>
                      {player2Data.score.toLocaleString()}
                    </td>
                    <td className="p-6 text-center text-xs font-black uppercase tracking-widest text-blue-500/40">
                      {player1Data.score > player2Data.score ? player1Data.player_name : player1Data.score < player2Data.score ? player2Data.player_name : 'NEUTRAL'}
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
