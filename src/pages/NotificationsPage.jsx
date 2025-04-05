import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { ThemeContext } from '../context/ThemeContext';
import NotificationCard from '../components/NotificationCard';

const NotificationPage = () => {
  const { user, loading } = useContext(AuthContext);
  const { notifications, markAsRead } = useContext(NotificationContext);
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
    <div
      className={`container mx-auto py-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="max-w-2xl mx-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className="cursor-pointer"
            >
              <NotificationCard notification={notification} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;