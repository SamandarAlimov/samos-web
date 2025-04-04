import React from 'react';

const PostCard = ({ content, username }) => (
  <div className="slide-up" style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px var(--shadow)', marginBottom: '20px' }}>
    <p>{content}</p>
    <small style={{ color: '#666' }}>Posted by {username}</small>
    <button style={{ backgroundColor: 'var(--secondary)', marginTop: '10px' }}>Like</button>
  </div>
);

export default PostCard;