import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPosts, deletePost, updatePost } from '../../utils/api';

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(currentPage, limit);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load posts');
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
  };

  const handleSave = async (id) => {
    try {
      const updatedPost = await updatePost(id, editContent);
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, content: updatedPost.post.content } : post
        )
      );
      setEditingPostId(null);
      setEditContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">No posts found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-3 px-4 text-left">Author</th>
                    <th className="py-3 px-4 text-left">Content</th>
                    <th className="py-3 px-4 text-left">Likes</th>
                    <th className="py-3 px-4 text-left">Created At</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        {post.author?.username || 'Unknown User'}
                      </td>
                      <td className="py-3 px-4">
                        {editingPostId === post.id ? (
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          post.content.length > 50
                            ? post.content.slice(0, 50) + '...'
                            : post.content
                        )}
                      </td>
                      <td className="py-3 px-4">{post.likes?.length || 0}</td>
                      <td className="py-3 px-4">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 flex space-x-2">
                        {editingPostId === post.id ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSave(post.id)}
                              className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg"
                            >
                              Save
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setEditingPostId(null)}
                              className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                              Cancel
                            </motion.button>
                          </>
                        ) : (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEdit(post)}
                              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(post.id)}
                              className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg"
                            >
                              Delete
                            </motion.button>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PostTable;