import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SettingsPage = () => {
  const token = localStorage.getItem('token');
  if (!token) window.location.href = '/login';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="fade-in" style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'var(--white)', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px var(--shadow)' }}>
          <h2 style={{ color: 'var(--primary)', textAlign: 'center' }}>Settings</h2>
          <button onClick={handleLogout} style={{ backgroundColor: 'var(--error)', width: '100%' }}>Logout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;