import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serverApi } from '../services/api';

export default function ServerBrowser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load servers on mount
  useEffect(() => {
    loadServers('');
  }, []);

  const loadServers = async (name: string) => {
    setLoading(true);
    setError('');
    const response = await serverApi.getServers(name, 30);

    if (response.error) {
      setError(response.error);
      setServers([]);
    } else if (response.data) {
      const serverData = (response.data as any).servers || [];
      setServers(serverData);
    }

    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadServers(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Server Browser</h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search servers by name..."
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
              <p className="text-red-200">Error: {error}</p>
            </div>
          )}

          {loading ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-400">Loading servers...</p>
            </div>
          ) : servers.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">
                {searchTerm ? 'No servers found matching your search.' : 'No servers available.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {servers.map((server: any) => (
                <div
                  key={server.serverId}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-blue-400">
                        {server.prefix}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                          {server.mode}
                        </span>
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                          {server.region}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {server.playerAmount}/{server.maxPlayers}
                      </div>
                      <div className="text-sm text-gray-400">Players</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>🗺️ {server.currentMap}</span>
                    {server.progress !== null && (
                      <span>⏱️ {server.progress}% Complete</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
