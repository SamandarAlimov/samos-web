import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaEnvelope } from 'react-icons/fa';

const NotificationCard = ({ notification }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <FaHeart className="text-red-500" />;
      case 'comment':
        return <FaComment className="text-blue-500" />;
      case 'message':
        return <FaEnvelope className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center p-4 bg-white rounded-lg shadow-md mb-3 hover:bg-gray-50 transition-colors"
    >
      <div className="mr-4">{getIcon(notification.type)}</div>
      <div className="flex-1">
        <p className="text-gray-800">{notification.content}</p>
        <p className="text-gray-500 text-sm">
          {new Date(notification.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </motion.div>
  );
};

export default NotificationCard;