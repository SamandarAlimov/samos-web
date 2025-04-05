import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getStats } from '../../utils/api';

// Chart.js komponentlarini ro‘yxatdan o‘tkazish
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatsChart = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load stats');
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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

  // Line Chart: Foydalanuvchilar statistikasi
  const userChartData = {
    labels: stats.userStats.map((stat) => stat.date),
    datasets: [
      {
        label: 'New Users',
        data: stats.userStats.map((stat) => stat.count),
        fill: false,
        borderColor: '#4B6CB7',
        tension: 0.1,
      },
    ],
  };

  // Bar Chart: Postlar statistikasi
  const postChartData = {
    labels: stats.postStats.map((stat) => stat.date),
    datasets: [
      {
        label: 'New Posts',
        data: stats.postStats.map((stat) => stat.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart: Faollik statistikasi
  const activityChartData = {
    labels: ['Posts', 'Comments', 'Messages'],
    datasets: [
      {
        label: 'Activity',
        data: [
          stats.activityStats.posts,
          stats.activityStats.comments,
          stats.activityStats.messages,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistics</h2>

        {/* Umumiy statistika */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-700">Total Posts</h3>
            <p className="text-3xl font-bold text-green-900">{stats.totalPosts}</p>
          </div>
        </div>

        {/* Grafiklar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart: Foydalanuvchilar statistikasi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              New Users (Last 7 Days)
            </h3>
            <Line
              data={userChartData}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: false } } }}
            />
          </motion.div>

          {/* Bar Chart: Postlar statistikasi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              New Posts (Last 7 Days)
            </h3>
            <Bar
              data={postChartData}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: false } } }}
            />
          </motion.div>

          {/* Pie Chart: Faollik statistikasi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-4 rounded-lg shadow lg:col-span-2"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Activity Breakdown
            </h3>
            <div className="max-w-md mx-auto">
              <Pie
                data={activityChartData}
                options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: false } } }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsChart;