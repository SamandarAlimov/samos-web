import React, { useState } from 'react';
import { apiRegister } from '../utils/api';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRegister(username, password);
      onRegister(data);
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fade-in" style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'var(--white)', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px var(--shadow)' }}>
      <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '20px' }}>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;