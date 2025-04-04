import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ backgroundColor: 'var(--primary)', padding: '15px 20px', color: 'var(--white)', boxShadow: '0 2px 10px var(--shadow)' }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0 }}>SAMOS</h2>
      <div>
        <Link to="/" style={{ color: 'var(--white)', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/chat" style={{ color: 'var(--white)', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>Chat</Link>
        <Link to="/profile" style={{ color: 'var(--white)', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>Profile</Link>
        <Link to="/settings" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 'bold' }}>Settings</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;