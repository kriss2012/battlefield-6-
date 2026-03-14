import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Combobox, Transition } from '@headlessui/react';
import { playerApi } from '../services/api';
import { PlayerCache } from '../utils/playerCache';

const PLATFORMS = [
  { id: 'all', name: 'All Platforms', icon: '🌐' },
  { id: 'pc', name: 'PC', icon: '💻' },
  { id: 'ps5', name: 'PlayStation', icon: '🎮' },
  { id: 'xboxseries', name: 'Xbox', icon: '🎯' },
  { id: 'steam', name: 'Steam', icon: '⚙️' },
];

export default function PlayerSearch() {
  const [query, setQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [playerStats, setPlayerStats] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Load recent searches on mount
  useEffect(() => {
    const recent = PlayerCache.getRecentSearches(5);
    console.log('Recent searches on mount:', recent);
    console.log('Total cached players:', PlayerCache.getPlayerCount());
    setRecentSearches(recent);
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (query.length >= 1) {
      const matches = PlayerCache.searchPlayers(query, 8);
      console.log('Query:', query, '| Suggestions:', matches);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Handle player selection from dropdown
  useEffect(() => {
    if (selectedPlayer && selectedPlayer.name) {
      handlePlayerSelect(selectedPlayer.name);
    }
  }, [selectedPlayer]);

  const handlePlayerSelect = async (playerName: string) => {
    setLoading(true);
    setError('');
    setPlayerStats(null);

    // Build search query with platform if not "all"
    let searchQuery = playerName;
    if (selectedPlatform !== 'all') {
      searchQuery = `${playerName}?platform=${selectedPlatform}`;
    }

    // Try to fetch stats directly by name
    const response = await playerApi.getPlayerStats(searchQuery);

    if (response.error || (response.data as any)?.errors) {
      setError((response.data as any)?.errors?.[0] || response.error || 'Player not found');
    } else if (response.data) {
      setPlayerStats(response.data);
      // Add to cache on successful search
      const platformToCache = selectedPlatform !== 'all' ? selectedPlatform : undefined;
      console.log('Adding to cache:', playerName, 'platform:', platformToCache);
      PlayerCache.addPlayer(playerName, platformToCache);
      // Refresh recent searches
      const recent = PlayerCache.getRecentSearches(5);
      console.log('Updated recent searches:', recent);
      setRecentSearches(recent);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setQuery('');
    setPlayerStats(null);
    setError('');
    setSelectedPlayer(null);
    setSuggestions([]);
  };

  const handleManualSearch = () => {
    if (query.trim()) {
      setSelectedPlayer({ name: query });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      handleManualSearch();
    }
  };

  const handleRecentClick = (playerName: string) => {
    setQuery(playerName);
    setSelectedPlayer({ name: playerName });
  };

  const handleClearCache = () => {
    PlayerCache.clearCache();
    setRecentSearches([]);
    setSuggestions([]);
    console.log('Cache cleared!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            ← Back to Home
          </Link>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors"
          >
            Clear Cache ({PlayerCache.getPlayerCount()})
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          {!playerStats && (
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Battlefield 2042 Stats
              </h1>
              <p className="text-xl text-gray-400">
                Track your performance and dominate the battlefield
              </p>
            </div>
          )}

          {/* Search Section */}
          <div className="mb-8">
            <div className="space-y-4">
              {/* Platform Selector */}
              <div className="flex justify-center gap-2 flex-wrap">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedPlatform === platform.id
                        ? 'bg-blue-600 text-white scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-2">{platform.icon}</span>
                    {platform.name}
                  </button>
                ))}
              </div>

              {/* Search Bar with Autocomplete */}
              <div className="relative max-w-3xl mx-auto">
                <Combobox value={selectedPlayer} onChange={setSelectedPlayer}>
                  <div className="relative">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Combobox.Input
                          className="w-full px-6 py-4 text-lg bg-gray-800 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all"
                          placeholder="Enter exact player name..."
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyPress={handleKeyPress}
                          displayValue={(player: any) => player?.name || query}
                          autoComplete="off"
                        />
                        {loading && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <div className="h-6 w-6 animate-spin rounded-full border-3 border-solid border-blue-500 border-r-transparent"></div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleManualSearch}
                        disabled={loading || !query.trim()}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                      >
                        {loading ? 'Searching...' : 'Search'}
                      </button>
                    </div>

                    <Transition
                      show={suggestions.length > 0 && query.length >= 1 && !playerStats}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Combobox.Options className="absolute mt-2 w-full bg-gray-800 border-2 border-gray-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                        <div className="p-2">
                          <div className="text-xs text-gray-400 px-3 py-2 font-semibold uppercase tracking-wide">
                            📝 Recent Searches ({suggestions.length})
                          </div>
                          {suggestions.map((player, index) => (
                            <Combobox.Option
                              key={index}
                              value={player}
                              className={({ active }) =>
                                `cursor-pointer select-none p-4 rounded-lg mb-2 last:mb-0 transition-all ${
                                  active
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-[1.02]'
                                    : 'bg-gray-700 hover:bg-gray-600'
                                }`
                              }
                            >
                              {({ active }) => (
                                <div className="flex justify-between items-center">
                                  <div className="flex-1">
                                    <div className="font-bold text-lg text-white">
                                      {player.name}
                                    </div>
                                    {player.platform && (
                                      <div className="text-sm text-gray-300 mt-1 flex items-center gap-2">
                                        <span>
                                          {PLATFORMS.find(p => p.id === player.platform)?.icon || '🎮'}
                                        </span>
                                        <span className="capitalize">{player.platform}</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className={`ml-4 ${active ? 'text-white' : 'text-blue-400'}`}>
                                    View Stats →
                                  </div>
                                </div>
                              )}
                            </Combobox.Option>
                          ))}
                        </div>
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>

                <p className="mt-3 text-center text-sm text-gray-400">
                  💡 Enter the exact player name (case sensitive) or select from recent searches
                </p>
              </div>

              {/* Recent Searches Pills */}
              {recentSearches.length > 0 && !playerStats && (
                <div className="max-w-3xl mx-auto">
                  <div className="text-sm text-gray-400 mb-2 text-center">Recent Searches:</div>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {recentSearches.map((player, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentClick(player.name)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-all flex items-center gap-2"
                      >
                        {player.platform && (
                          <span>{PLATFORMS.find(p => p.id === player.platform)?.icon || '🎮'}</span>
                        )}
                        <span>{player.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto mb-8 bg-red-900/30 border-2 border-red-700 rounded-xl p-6 backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="text-red-200 font-semibold text-lg">{error}</p>
                  <p className="text-red-300 text-sm mt-2">
                    Make sure you're using the exact player name (including capitalization)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Player Stats */}
          {playerStats && !loading && (
            <div className="space-y-6 animate-fadeIn">
              {/* Player Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-gray-600 rounded-xl p-6 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {selectedPlayer?.name || query}
                    </h2>
                    <div className="flex items-center gap-3 text-gray-300">
                      {selectedPlatform !== 'all' && (
                        <>
                          <span className="text-2xl">
                            {PLATFORMS.find(p => p.id === selectedPlatform)?.icon}
                          </span>
                          <span className="font-semibold capitalize">{selectedPlatform}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all font-semibold"
                  >
                    New Search
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(playerStats).map(([key, value]: [string, any]) => {
                  if (
                    typeof value === 'object' ||
                    Array.isArray(value) ||
                    key === 'errors' ||
                    key === 'avatar' ||
                    key === 'userName'
                  ) return null;

                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/_/g, ' ')
                    .trim()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                  return (
                    <div key={key} className="bg-gray-800 border border-gray-700 p-5 rounded-xl hover:border-blue-500 transition-all">
                      <div className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">
                        {formattedKey}
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {typeof value === 'number'
                          ? value.toLocaleString()
                          : value?.toString() || 'N/A'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {Object.keys(playerStats).filter(key =>
                typeof playerStats[key] !== 'object' &&
                !Array.isArray(playerStats[key]) &&
                key !== 'errors'
              ).length === 0 && (
                <div className="text-center py-12 bg-gray-800 rounded-xl">
                  <p className="text-gray-400 text-lg">No stats available for this player.</p>
                </div>
              )}

              {/* Additional Details */}
              {playerStats.classes && Array.isArray(playerStats.classes) && (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-6">Classes Performance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {playerStats.classes.map((classData: any, index: number) => (
                      <div key={index} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-all">
                        <div className="text-sm text-gray-400 mb-1 font-semibold uppercase">
                          {classData.className || `Class ${index + 1}`}
                        </div>
                        <div className="text-2xl font-bold text-blue-400">
                          {classData.kills || 0} kills
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!playerStats && !loading && !error && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-800 border-2 border-gray-700 rounded-xl p-12 text-center">
                <div className="text-7xl mb-6">🎯</div>
                <p className="text-gray-400 text-lg mb-6">
                  Search for any Battlefield 2042 player to view their stats
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-3xl mb-2">📊</div>
                    <p className="text-sm text-gray-300">Detailed Stats</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="text-sm text-gray-300">Performance Tracking</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-3xl mb-2">⚔️</div>
                    <p className="text-sm text-gray-300">Class Breakdown</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
