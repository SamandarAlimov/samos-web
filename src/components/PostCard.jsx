import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaComment } from 'react-icons/fa';
import { likePost, commentOnPost } from '../utils/api';

const PostCard = ({ post, onUpdate }) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const currentUserId = localStorage.getItem('userId'); // Keyinroq AuthContext'dan olinadi

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(post.id);
      onUpdate(updatedPost);
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const updatedPost = await commentOnPost(post.id, comment);
      setComment('');
      onUpdate(updatedPost);
    } catch (err) {
      console.error('Failed to comment on post:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg mb-6"
    >
      {/* Post header */}
      <div className="flex items-center mb-4">
        <img
          src={post.author?.avatar || 'https://via.placeholder.com/40'}
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold text-gray-800">{post.author?.username || 'Unknown'}</p>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post content */}
      <p className="text-gray-700 mb-4">{post.content}</p>

      {/* Like va Comment tugmalari */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            post.likes?.includes(currentUserId) ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          <FaHeart />
          <span>{post.likes?.length || 0}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-500"
        >
          <FaComment />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>

      {/* Sharhlar */}
      {showComments && (
        <div className="mt-4">
          {post.comments?.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(comment.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}

          {/* Sharh qo‘shish formasi */}
          <form onSubmit={handleComment} className="mt-4 flex space-x-3">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Post
            </motion.button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default PostCard;