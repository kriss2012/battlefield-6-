import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 text-white premium-gradient">
      <div className="container mx-auto px-4 py-20 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        
        {/* User Navigation */}
        <div className="flex justify-end mb-16">
          {isAuthenticated ? (
            <div className="flex items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <span className="text-gray-400 font-bold text-sm">Welcome, {user?.username}!</span>
              <Link
                to="/profile"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all font-black text-xs uppercase"
              >
                ACCOUNT
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-bold text-sm"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all font-black text-sm"
              >
                REGISTER
              </Link>
            </div>
          )}
        </div>

        <div className="text-center mb-24 animate-fade-in relative">
          <h1 className="text-7xl md:text-8xl font-black mb-6 italic tracking-tighter">
            BF6 <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">STATS HUB</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Advanced performance tracking, real-time server telemetry, and global competitive analytics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Link
            to="/player"
            className="glass-card p-8 group hover:scale-105"
          >
            <div className="text-5xl mb-6 transition-transform group-hover:scale-110">📊</div>
            <h2 className="text-xl font-black mb-3 italic uppercase tracking-wider group-hover:text-blue-400 transition-colors">Tactical Stats</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Deep-dive into player performance with detailed metrics and class breakdowns.
            </p>
          </Link>

          <Link
            to="/analytics"
            className="glass-card p-8 group hover:scale-105"
          >
            <div className="text-5xl mb-6 transition-transform group-hover:scale-110">📈</div>
            <h2 className="text-xl font-black mb-3 italic uppercase tracking-wider group-hover:text-purple-400 transition-colors">Telemetry</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Visualize historical trends with skill signatures and performance stability charts.
            </p>
          </Link>

          <Link
            to="/leaderboard"
            className="glass-card p-8 group hover:scale-105"
          >
            <div className="text-5xl mb-6 transition-transform group-hover:scale-110">🏆</div>
            <h2 className="text-xl font-black mb-3 italic uppercase tracking-wider group-hover:text-amber-400 transition-colors">Rankings</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Global ranking system tracking the most lethal operators in the combat theater.
            </p>
          </Link>

          <Link
            to="/servers"
            className="glass-card p-8 group hover:scale-105"
          >
            <div className="text-5xl mb-6 transition-transform group-hover:scale-110">🎮</div>
            <h2 className="text-xl font-black mb-3 italic uppercase tracking-wider group-hover:text-emerald-400 transition-colors">Network</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Scan active combat zones for server availability and real-time player density.
            </p>
          </Link>
        </div>

        {/* Additional Features */}
        <div className="mt-8 max-w-7xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/head-to-head"
              className="glass-card p-6 group hover:bg-white/10 flex items-center gap-6"
            >
              <div className="text-4xl group-hover:rotate-12 transition-transform">⚔️</div>
              <div>
                <h3 className="text-lg font-black italic uppercase tracking-widest group-hover:text-orange-400 transition-colors">1v1 Comparison</h3>
                <p className="text-gray-500 text-sm font-medium">Side-by-side tactical analysis of two unique targets.</p>
              </div>
            </Link>
            <div className="glass-card p-6 opacity-30 cursor-not-allowed flex items-center gap-6 saturate-0">
              <div className="text-4xl">👥</div>
              <div>
                <h3 className="text-lg font-black italic uppercase tracking-widest">Clan Systems</h3>
                <p className="text-gray-500 text-sm font-medium">DECRYPTING... Available in future combat cycle.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center border-t border-white/5 pt-12">
          <div className="inline-flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            <span className="hover:text-blue-500 transition-colors cursor-default">Real-time Stats</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-blue-500 transition-colors cursor-default">Analytics Feed</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-blue-500 transition-colors cursor-default">Global Data</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-blue-500 transition-colors cursor-default">Target Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}
