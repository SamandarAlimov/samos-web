const API_URL = 'https://samos-backend.onrender.com/api';

export const apiLogin = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const apiRegister = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const apiAddPost = async (content, username, token) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify({ content, username }),
  });
  return response.json();
};

export const apiGetPosts = async (token) => {
  const response = await fetch(`${API_URL}/posts`, {
    headers: { 'Authorization': token },
  });
  return response.json();
};

export const apiSendMessage = async (content, username, token) => {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify({ content, username }),
  });
  return response.json();
};

export const apiGetMessages = async (token) => {
  const response = await fetch(`${API_URL}/messages`, {
    headers: { 'Authorization': token },
  });
  return response.json();
};