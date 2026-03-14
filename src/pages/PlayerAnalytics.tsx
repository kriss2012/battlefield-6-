import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import KDTrendChart from '../components/KDTrendChart';
import WinRateTrendChart from '../components/WinRateTrendChart';
import PlayerComparison from '../components/PlayerComparison';
import { analyticsApi } from '../services/api';

export default function PlayerAnalytics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPlayerId = searchParams.get('playerId') || '';
  const initialPlayerName = searchParams.get('playerName') || '';

  const [playerId, setPlayerId] = useState(initialPlayerId);
  const [playerName, setPlayerName] = useState(initialPlayerName);
  const [searchInput, setSearchInput] = useState('');
  const [days, setDays] = useState(30);
  const [tracking, setTracking] = useState(false);
  const [trackMessage, setTrackMessage] = useState('');

  const handleSearch = () => {
    if (searchInput.trim()) {
      setPlayerId(searchInput.trim());
      setSearchParams({ playerId: searchInput.trim() });
    }
  };

  const handleTrackPlayer = async () => {
    if (!playerId || !playerName) {
      setTrackMessage('Please search for a player first');
      return;
    }

    setTracking(true);
    setTrackMessage('');

    const result = await analyticsApi.trackPlayer(playerId, playerName);

    if (result.error) {
      setTrackMessage(`Error: ${result.error}`);
    } else {
      setTrackMessage(`${playerName} is now being tracked! Historical data will be collected.`);
    }

    setTracking(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Player Analytics</h1>

        {/* Search Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Player</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter Player ID"
              className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Search
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="mt-4 flex items-center gap-4">
            <label className="text-gray-400">Time Range:</label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
              <option value={60}>Last 60 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>

          {/* Track Player Button */}
          {playerId && (
            <div className="mt-4">
              <button
                onClick={handleTrackPlayer}
                disabled={tracking}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                {tracking ? 'Tracking...' : 'Track This Player'}
              </button>
              {trackMessage && (
                <p className={`mt-2 ${trackMessage.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                  {trackMessage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Trend Charts */}
        {playerId && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <KDTrendChart playerId={playerId} days={days} />
            <WinRateTrendChart playerId={playerId} days={days} />
          </div>
        )}

        {/* Player Comparison */}
        <div className="mb-6">
          <PlayerComparison />
        </div>

        {/* Help Text */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">How to use Analytics</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Search for a player using their Player ID</li>
            <li>Click "Track This Player" to start collecting historical stats</li>
            <li>Historical data is collected every 6 hours automatically</li>
            <li>Trends will appear once enough data is collected</li>
            <li>Compare up to 4 players using the comparison tool</li>
            <li>Best stats are highlighted in green in the comparison table</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
