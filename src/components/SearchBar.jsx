import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { search } from '../utils/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], posts: [] });
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const data = await search(query);
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-md mx-auto"
    >
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search users or posts..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSearch} className="ml-2 text-gray-500">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Natijalar */}
      {isFocused && query && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute w-full bg-white rounded-lg shadow-lg mt-2 max-h-64 overflow-y-auto z-10"
        >
          {results.users.length === 0 && results.posts.length === 0 ? (
            <p className="p-4 text-gray-500">No results found.</p>
          ) : (
            <>
              {results.users.map((user) => (
                <Link
                  key={user.id}
                  to={`/profile/${user.id}`}
                  className="flex items-center p-4 hover:bg-gray-100"
                >
                  <img
                    src={user.avatar || 'https://via.placeholder.com/40'}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <p className="text-gray-800">{user.username}</p>
                </Link>
              ))}
              {results.posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/post/${post.id}`}
                  className="flex items-center p-4 hover:bg-gray-100"
                >
                  <p className="text-gray-800">{post.content.slice(0, 50)}...</p>
                </Link>
              ))}
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;