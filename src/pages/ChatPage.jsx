import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatWindow from '../components/ChatWindow';
import Footer from '../components/Footer';
import { apiGetMessages } from '../utils/api';

const ChatPage = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await apiGetMessages(token);
      setMessages(messages);
    };
    fetchMessages();
  }, [token]);

  if (!token) window.location.href = '/login';

  return (
    <div>
      <Navbar />
      <div className="container" style={{ minHeight: '80vh' }}>
        <ChatWindow username={username} initialMessages={messages} setMessages={setMessages} />
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;