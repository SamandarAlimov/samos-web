import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';

const LoginPage = () => {
  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    window.location.href = '/';
  };

  const handleRegister = (data) => {
    alert('Registered! Now log in.');
  };

  return (
    <div>
      <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <LoginForm onLogin={handleLogin} />
        <RegisterForm onRegister={handleRegister} />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;