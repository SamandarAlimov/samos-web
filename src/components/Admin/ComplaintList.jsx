import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getComplaints, updateComplaintStatus } from '../../utils/api';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getComplaints();
        setComplaints(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load complaints');
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status);
      setComplaints(
        complaints.map((complaint) =>
          complaint.id === id ? { ...complaint, status } : complaint
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update complaint');
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Complaints</h2>
        {complaints.length === 0 ? (
          <p className="text-gray-600 text-center">No complaints found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Target</th>
                  <th className="py-3 px-4 text-left">Reason</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <motion.tr
                    key={complaint.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      {complaint.user?.username || 'Unknown User'}
                    </td>
                    <td className="py-3 px-4">
                      {complaint.targetType === 'user'
                        ? complaint.targetUser?.username || 'Unknown User'
                        : complaint.targetPost?.content?.slice(0, 30) + '...' || 'Unknown Post'}
                    </td>
                    <td className="py-3 px-4">{complaint.reason}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          complaint.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : complaint.status === 'resolved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      {complaint.status === 'pending' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStatusChange(complaint.id, 'resolved')}
                            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg"
                          >
                            Resolve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStatusChange(complaint.id, 'rejected')}
                            className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Reject
                          </motion.button>
                        </>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ComplaintList;