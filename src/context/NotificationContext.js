import React, { createContext, useState, useEffect } from 'react';
import { getNotifications } from '../utils/api';
import { connectSocket, onMessage, disconnectSocket } from '../utils/socket';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.read).length);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };
    fetchNotifications();

    // Socket.io orqali yangi bildirishnomalarni qabul qilish
    connectSocket();
    onMessage((message) => {
      // Yangi xabar kelganda bildirishnoma qo‘shish
      const newNotification = {
        id: message.id,
        type: 'message',
        content: `New message from ${message.senderId}`,
        userId: message.receiverId,
        createdAt: message.createdAt,
        read: false,
      };
      setNotifications((prev) => [...prev, newNotification]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => prev - 1);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};