import React from 'react';

const ProfileCard = ({ username }) => (
  <div className="fade-in" style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'var(--white)', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px var(--shadow)', textAlign: 'center' }}>
    <img src="/assets/profile-icon.svg" alt="Profile" style={{ width: '100px', marginBottom: '20px' }} />
    <h2 style={{ color: 'var(--primary)' }}>{username}</h2>
    <p style={{ color: '#666' }}>Member since April 2025</p>
    <button style={{ backgroundColor: 'var(--secondary)' }}>Edit Profile</button>
  </div>
);

export default ProfileCard;