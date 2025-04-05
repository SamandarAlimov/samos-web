import React from 'react';
import { motion } from 'framer-motion';

const ChatBubble = ({ message, isOwnMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg shadow ${
          isOwnMessage
            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p>{message.content}</p>
        <p className={`text-xs mt-1 ${isOwnMessage ? 'text-green-100' : 'text-gray-500'}`}>
          {new Date(message.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatBubble;