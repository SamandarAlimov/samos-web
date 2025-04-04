import React from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token) window.location.href = '/login';

  return (
    <div>
      <Navbar />
      <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <ProfileCard username={username} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;