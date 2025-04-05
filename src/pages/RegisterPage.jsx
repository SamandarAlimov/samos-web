import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
      }`}
    >
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;