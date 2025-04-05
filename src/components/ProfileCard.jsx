import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfileCard = ({ user, isOwnProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={user.avatar || 'https://via.placeholder.com/100'}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
      </div>

      {/* Username va Bio */}
      <h2 className="text-2xl font-bold text-gray-800 text-center">{user.username}</h2>
      <p className="text-gray-600 text-center mt-2">{user.bio || 'No bio available'}</p>

      {/* Statistika */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center">
          <p className="text-gray-700 font-semibold">{user.posts?.length || 0}</p>
          <p className="text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-gray-700 font-semibold">{user.followers?.length || 0}</p>
          <p className="text-gray-500">Followers</p>
        </div>
      </div>

      {/* Tugmalar */}
      <div className="mt-6 flex justify-center space-x-4">
        {isOwnProfile ? (
          <Link
            to="/edit-profile"
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </Link>
        ) : (
          <>
            <Link
              to={`/chat/${user.id}`}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg"
            >
              Message
            </Link>
            <button className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-4 py-2 rounded-lg">
              Follow
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;