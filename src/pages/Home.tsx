import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* User Navigation */}
        <div className="flex justify-end mb-8">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Welcome, {user?.username}!</span>
              <Link
                to="/profile"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                My Profile
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            BF6 Stats Hub
          </h1>
          <p className="text-xl text-gray-400">
            Track your stats, find servers, and compete with the community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Link
            to="/player"
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-lg border border-gray-700 hover:border-blue-500"
          >
            <div className="text-4xl mb-3">📊</div>
            <h2 className="text-xl font-bold mb-2">Player Stats</h2>
            <p className="text-gray-400 text-sm">
              Search for players and view detailed statistics
            </p>
          </Link>

          <Link
            to="/analytics"
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-lg border border-gray-700 hover:border-purple-500"
          >
            <div className="text-4xl mb-3">📈</div>
            <h2 className="text-xl font-bold mb-2">Analytics</h2>
            <p className="text-gray-400 text-sm">
              View historical trends and compare players
            </p>
          </Link>

          <Link
            to="/leaderboard"
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-lg border border-gray-700 hover:border-yellow-500"
          >
            <div className="text-4xl mb-3">🏆</div>
            <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
            <p className="text-gray-400 text-sm">
              Global rankings and top player statistics
            </p>
          </Link>

          <Link
            to="/servers"
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-lg border border-gray-700 hover:border-green-500"
          >
            <div className="text-4xl mb-3">🎮</div>
            <h2 className="text-xl font-bold mb-2">Servers</h2>
            <p className="text-gray-400 text-sm">
              Find active servers and track favorites
            </p>
          </Link>
        </div>

        {/* Additional Features */}
        <div className="mt-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">More Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/head-to-head"
              className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg border border-gray-700 hover:border-orange-500 flex items-center gap-4"
            >
              <div className="text-3xl">⚔️</div>
              <div>
                <h3 className="text-lg font-bold">Head-to-Head</h3>
                <p className="text-gray-400 text-sm">Detailed 1v1 player comparison with charts</p>
              </div>
            </Link>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 opacity-50 flex items-center gap-4">
              <div className="text-3xl">👥</div>
              <div>
                <h3 className="text-lg font-bold">Squad Tracking</h3>
                <p className="text-gray-400 text-sm">Coming Soon - Track your squad's performance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex gap-4 text-sm text-gray-500">
            <span>Real-time Stats</span>
            <span>•</span>
            <span>Historical Analytics</span>
            <span>•</span>
            <span>Global Leaderboards</span>
            <span>•</span>
            <span>Player Comparisons</span>
          </div>
        </div>
      </div>
    </div>
  );
}
