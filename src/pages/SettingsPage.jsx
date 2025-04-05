import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { updateUser } from '../utils/api';

const SettingsPage = () => {
  const { user, loading: authLoading, logoutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser({ username, bio, avatar });
      setSuccess('Profile updated successfully!');
      setError('');
      // Foydalanuvchi ma'lumotlarini yangilash uchun AuthContext'da yangilash kerak bo‘ladi
      // Bu yerda oddiy yondashuv sifatida sahifani qayta yuklaymiz
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      setSuccess('');
    }
  };

  if (authLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div
      className={`container mx-auto py-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}
        >
          <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2" htmlFor="avatar">
                Avatar URL
              </label>
              <input
                type="text"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter avatar URL"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-semibold"
            >
              Save Changes
            </motion.button>
          </form>

          {/* Mavzu o‘zgartirish */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Theme</h2>
            <button
              onClick={toggleTheme}
              className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>

          {/* Logout */}
          <div className="mt-8">
            <button
              onClick={() => logoutUser()}
              className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;