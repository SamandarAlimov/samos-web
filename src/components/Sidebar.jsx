import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaEnvelope, FaCog } from 'react-icons/fa';
import { getUserList } from '../utils/api';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUserList();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-4 z-20 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <FaUser />
              <span>Profile</span>
            </Link>
            <Link
              to="/chat"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <FaEnvelope />
              <span>Messages</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <FaCog />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Chats</h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {users.map((user) => (
              <Link
                key={user.id}
                to={`/chat/${user.id}`}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src={user.avatar || 'https://via.placeholder.com/40'}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-700 dark:text-gray-200">{user.username}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
        />
      )}
    </>
  );
};

export default Sidebar;