import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import ProfileCard from '../components/ProfileCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUser } from '../utils/api';

const ProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser, loading: authLoading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(userId || currentUser.id); // Agar userId bo‘lmasa, o‘z profilini ko‘rsatadi
        setProfileUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user');
        setLoading(false);
      }
    };
    if (currentUser) {
      fetchUser();
    }
  }, [userId, currentUser, authLoading]);

  if (authLoading || loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div
      className={`container mx-auto py-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <ProfileCard user={profileUser} isOwnProfile={profileUser.id === currentUser.id} />
    </div>
  );
};

export default ProfilePage;