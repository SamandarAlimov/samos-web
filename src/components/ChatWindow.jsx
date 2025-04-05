import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatBubble from './ChatBubble';
import { getMessages, sendMessage } from '../utils/api';
import { connectSocket, joinRoom, sendMessage as socketSendMessage, onMessage, disconnectSocket } from '../utils/socket';

const ChatWindow = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const currentUserId = localStorage.getItem('userId'); // Bu ID autentifikatsiyadan olinadi

  useEffect(() => {
    // Avvalgi xabarlarni olish
    const fetchMessages = async () => {
      try {
        const data = await getMessages(receiverId);
        setMessages(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load messages');
        setLoading(false);
      }
    };
    fetchMessages();

    // Socket.io ulanishini boshlash
    connectSocket();
    const roomId = [currentUserId, receiverId].sort().join('-'); // Xona ID si sifatida user ID’larni birlashtiramiz
    joinRoom(roomId);

    // Yangi xabarni qabul qilish
    onMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      disconnectSocket();
    };
  }, [receiverId, currentUserId]);

  useEffect(() => {
    // Har doim oxirgi xabarga scroll qilish
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      content: newMessage,
      senderId: currentUserId,
      receiverId,
      createdAt: new Date(),
    };

    try {
      const savedMessage = await sendMessage(newMessage, receiverId);
      const roomId = [currentUserId, receiverId].sort().join('-');
      socketSendMessage(roomId, savedMessage);
      setNewMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gray-100 rounded-lg shadow-lg">
      {/* Chat xabarlari */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Xabar yuborish formasi */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Send
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default ChatWindow;