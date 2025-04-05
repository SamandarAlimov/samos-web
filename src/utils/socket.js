import { io } from 'socket.io-client';

let socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io('https://samos-backend.onrender.com', {
      auth: { token: localStorage.getItem('token') },
      path: '/socket.io',
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }
};

export const sendMessage = (message) => {
  if (socket) {
    socket.emit('message', message);
  }
};

export const onMessage = (callback) => {
  if (socket) {
    socket.on('message', callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default socket;