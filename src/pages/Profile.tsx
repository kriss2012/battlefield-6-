import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import ArmoryView from '../components/ArmoryView';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user, token, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(user?.playerName || '');
  const [playerId, setPlayerId] = useState(user?.playerId || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  if (!user || !token) {
    navigate('/login');
    return null;
  }

  const handleUpdateProfile = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    const result = await authApi.updateProfile(token, {
      playerName: playerName || undefined,
      playerId: playerId || undefined,
      bio: bio || undefined,
      avatarUrl: avatarUrl || undefined,
    });

    if (result.error) {
      setError(result.error);
    } else {
      setMessage('Profile updated successfully!');
      updateUser(result.user);
      setEditing(false);
    }

    setLoading(false);
  };

  const handleChangePassword = async () => {
    setError('');
    setMessage('');

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const result = await authApi.changePassword(token, currentPassword, newPassword);

    if (result.error) {
      setError(result.error);
    } else {
      setMessage('Password changed successfully!');
      setChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col lg:flex-row gap-12 mb-12 items-start">
          {/* 3D Operator Preview Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3 glass-card overflow-hidden h-[500px] relative group"
          >
            <ArmoryView type="operator" color="#3b82f6" />
            <div className="absolute top-6 left-6 p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">Combat Entity</span>
              <h2 className="text-xl font-black italic uppercase tracking-tighter">{user.username}</h2>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[8px] font-mono text-gray-500 uppercase">Unit Integrity</span>
                <span className="text-[8px] font-mono text-emerald-400">NOMINAL</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-emerald-500" />
              </div>
            </div>
          </motion.div>

          {/* User Info Overview */}
          <div className="flex-1 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">My <span className="text-blue-500">Profile</span></h1>
                <p className="text-gray-500 font-medium">Uplink established // Operational since 2024</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-black italic text-xs uppercase tracking-widest transition-all"
                >
                  {editing ? 'CANCEL' : 'CONFIGURE'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <span className="text-[10px] text-gray-600 block mb-1 uppercase tracking-widest">Player Identity</span>
                <span className="text-lg font-black text-white italic">{user.playerName || 'UNASSIGNED'}</span>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <span className="text-[10px] text-gray-600 block mb-1 uppercase tracking-widest">Deployment Sector</span>
                <span className="text-lg font-black text-white italic">NEO-TOKYO // 01</span>
              </div>
            </div>

            <div className="glass-card p-6 min-h-[150px] relative">
              <span className="text-[10px] text-gray-600 block mb-4 uppercase tracking-widest">Combat Bio / Directives</span>
              <p className="text-gray-400 font-medium italic">"{user.bio || 'Initial directives not yet established.'}"</p>
              <div className="absolute bottom-4 right-4 text-[40px] opacity-5 pointer-events-none">📜</div>
            </div>
          </div>
        </div>

        {message && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-black italic text-xs uppercase tracking-widest">
            {message}
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 font-black italic text-xs uppercase tracking-widest">
            {error}
          </motion.div>
        )}

        {/* Profile Information */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Profile Information</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <div className="px-4 py-2 bg-gray-700 rounded-lg">{user.username}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <div className="px-4 py-2 bg-gray-700 rounded-lg">{user.email}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Player Name</label>
              {editing ? (
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your in-game name"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-700 rounded-lg">{user.playerName || 'Not set'}</div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Player ID</label>
              {editing ? (
                <input
                  type="text"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your BF6 player ID"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-700 rounded-lg">{user.playerId || 'Not set'}</div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Bio</label>
              {editing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="px-4 py-2 bg-gray-700 rounded-lg min-h-[80px]">{user.bio || 'No bio yet'}</div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Avatar URL</label>
              {editing ? (
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/avatar.jpg"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-700 rounded-lg">{user.avatarUrl || 'Not set'}</div>
              )}
            </div>

            {editing && (
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Security</h2>
            <button
              onClick={() => setChangingPassword(!changingPassword)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              {changingPassword ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {changingPassword && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Re-enter new password"
                />
              </div>

              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-semibold"
          >
            Logout
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
