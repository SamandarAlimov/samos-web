import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';
import { apiAddPost, apiGetPosts } from '../utils/api';

const HomePage = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await apiGetPosts(token);
      setPosts(posts);
    };
    fetchPosts();
  }, [token]);

  if (!token) window.location.href = '/login';

  const handleAddPost = async (e) => {
    e.preventDefault();
    const post = await apiAddPost(postContent, username, token);
    setPosts([post, ...posts]);
    setPostContent('');
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={handleAddPost} className="fade-in" style={{ margin: '40px 0', backgroundColor: 'var(--white)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 15px var(--shadow)' }}>
          <textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows="4"
            style={{ resize: 'none' }}
          />
          <button type="submit">Post</button>
        </form>
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} content={post.content} username={post.username} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;