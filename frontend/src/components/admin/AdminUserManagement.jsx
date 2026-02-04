import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserManagement = ({ isDark }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        // Map backend user to frontend structure
        const mappedUsers = response.data.users.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || 'N/A',
          status: user.isBlocked ? 'Blocked' : 'Unblocked',
          registered: new Date(user.createdAt).toLocaleDateString(),
          avatar: user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (userId) => {
    console.log('Attempting to toggle block status for user:', userId);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/admin/users/${userId}/block`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Block/Unblock response:', response.data);

      if (response.data.success) {
        const newStatus = response.data.user.isBlocked ? 'Blocked' : 'Unblocked';
        setUsers(prevUsers => prevUsers.map(user =>
          user.id === userId ? { ...user, status: newStatus } : user
        ));
        alert(`User ${newStatus.toLowerCase()} successfully`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status: ' + (error.response?.data?.message || error.message));
    }
  };

  const getAvatarColor = (index) => {
    const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-cyan-500', 'bg-purple-500', 'bg-indigo-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-3 border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`appearance-none px-3 py-2 pr-8 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
          >
            <option>All Status</option>
            <option>Unblocked</option>
            <option>Blocked</option>
          </select>
          <svg className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className={`rounded-lg shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className={`border-b ${isDark ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <th className={`px-3 sm:px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>USER</th>
                  <th className={`px-3 sm:px-6 py-4 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>EMAIL</th>
                  <th className={`px-3 sm:px-6 py-4 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>PHONE</th>
                  <th className={`px-3 sm:px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>STATUS</th>
                  <th className={`px-3 sm:px-6 py-4 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>REGISTERED</th>
                  <th className={`px-3 sm:px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>ACTIONS</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className={`transition-colors ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${getAvatarColor(index)}`}>
                          {user.avatar}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                          <div className={`text-sm sm:hidden ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</td>
                    <td className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.phone}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Unblocked'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.registered}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {user.status === 'Blocked' ? (
                          <button
                            className="p-1 text-gray-400 hover:text-green-600"
                            onClick={() => handleStatusChange(user.id)}
                            title="Unblock User"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            className="p-1 text-gray-400 hover:text-red-600"
                            onClick={() => handleStatusChange(user.id)}
                            title="Block User"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
          <span className="font-medium">8</span> results
        </div>
        <div className="flex space-x-2">
          <button className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
            Previous
          </button>
          <button className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;