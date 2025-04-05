import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import { search } from '../utils/api';

const SearchPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], posts: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    try {
      const data = await search(searchQuery);
      setResults(data);
      setSearchLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      setSearchLoading(false);
    }
  };

  const handlePostUpdate = (updatedPost) => {
    setResults((prev) => ({
      ...prev,
      posts: prev.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    }));
  };

  if (authLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div
      className={`container mx-auto py-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="max-w-2xl mx-auto mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      {searchLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="max-w-2xl mx-auto">
          {/* Foydalanuvchilar */}
          {results.users.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Users</h2>
              {results.users.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 rounded-lg shadow-md mb-3 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={user.avatar || 'https://via.placeholder.com/40'}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <a href={`/profile/${user.id}`} className="text-blue-500 hover:underline">
                      {user.username}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Postlar */}
          {results.posts.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Posts</h2>
              {results.posts.map((post) => (
                <PostCard key={post.id} post={post} onUpdate={handlePostUpdate} />
              ))}
            </div>
          )}

          {results.users.length === 0 && results.posts.length === 0 && query && (
            <p className="text-gray-600 dark:text-gray-400 text-center">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;