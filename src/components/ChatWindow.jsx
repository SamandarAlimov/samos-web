import React, { useState } from 'react';
import { apiSendMessage } from '../utils/api';

const ChatWindow = ({ username, initialMessages, setMessages }) => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = await apiSendMessage(message, username, token);
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: 'var(--white)', borderRadius: '10px', boxShadow: '0 4px 15px var(--shadow)', padding: '20px' }}>
      <div style={{ height: '400px', overflowY: 'auto', marginBottom: '20px' }}>
        {initialMessages.map((msg) => (
          <div key={msg.id} style={{ margin: '10px 0', textAlign: msg.username === username ? 'right' : 'left' }}>
            <span style={{ backgroundColor: msg.username === username ? 'var(--primary)' : '#E2E8F0', color: msg.username === username ? 'var(--white)' : 'var(--text)', padding: '10px 15px', borderRadius: '10px', display: 'inline-block' }}>
              {msg.content} <small style={{ fontSize: '10px', display: 'block' }}>{msg.username}</small>
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;