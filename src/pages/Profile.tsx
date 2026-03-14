import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        {message && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-200">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
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
