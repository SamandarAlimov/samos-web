import axios from 'axios';

const api = axios.create({
  baseURL: 'https://samos-backend.onrender.com/api',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = (email, password) =>
  api.post('/auth/login', { email, password }).then((res) => res.data);

export const register = (username, email, password) =>
  api.post('/auth/register', { username, email, password }).then((res) => res.data);

export const getUser = (userId) => api.get(`/users/${userId}`).then((res) => res.data);

export const updateUser = (updates) => api.put('/users/me', updates).then((res) => res.data);

export const getPosts = () => api.get('/posts').then((res) => res.data);

export const likePost = (postId) => api.post(`/posts/${postId}/like`).then((res) => res.data);

export const commentOnPost = (postId, content) =>
  api.post(`/posts/${postId}/comment`, { content }).then((res) => res.data);

export const getNotifications = () => api.get('/notifications').then((res) => res.data);

export const getUserList = () => api.get('/users/list').then((res) => res.data);

export const search = (query) =>
  api.get('/search', { params: { query } }).then((res) => res.data);

export default api;