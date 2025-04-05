import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import ChatWindow from '../components/ChatWindow';
import Footer from '../components/Footer';

const ChatPage = () => {
  const { userId } = useParams();
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-3xl font-bold p-4">Chat</h1>
      <ChatWindow receiverId={userId} />
      <Footer />
    </div>
  );
};

export default ChatPage;