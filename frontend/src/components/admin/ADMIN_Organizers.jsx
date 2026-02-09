import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const Organizers = ({ isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/organizers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        const mappedOrganizers = response.data.organizers.map(org => ({
          id: org._id,
          name: org.name,
          email: org.email,
          organization: org.name + ' Inc.',
          status: org.isBlocked ? 'Blocked' : 'Unblocked',
          requestDate: new Date(org.createdAt).toLocaleDateString(),
          initials: org.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
          bgColor: 'bg-purple-500'
        }));
        setOrganizers(mappedOrganizers);
      }
    } catch (error) {
      console.error('Error fetching organizers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const filteredOrganizers = organizers.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBlockToggle = async (id) => {
    console.log('Attempting to toggle block status for organizer:', id);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`${API_URL}/admin/organizers/${id}/block`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Organizer Block/Unblock response:', response.data);

      if (response.data.success) {
        const newStatus = response.data.organizer.isBlocked ? 'Blocked' : 'Unblocked';
        setOrganizers(prevOrgs => prevOrgs.map(org =>
          org.id === id ? { ...org, status: newStatus } : org
        ));
        alert(`Organizer ${newStatus.toLowerCase()} successfully`);
      }
    } catch (error) {
      console.error('Error updating organizer status:', error);
      alert('Failed to update organizer status: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search organizers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`appearance-none px-4 py-2 pr-8 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="All Status">All Status</option>
            <option value="Unblocked">Unblocked</option>
            <option value="Blocked">Blocked</option>
          </select>
          <svg className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Organizers Table */}
      <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className={`border-b ${isDark ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <tr>
                <th className={`px-3 sm:px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>ORGANIZER</th>
                <th className={`px-3 sm:px-6 py-4 text-left text-sm font-medium uppercase tracking-wider hidden sm:table-cell ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>EMAIL</th>
                <th className={`px-3 sm:px-6 py-4 text-left text-sm font-medium uppercase tracking-wider hidden lg:table-cell ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>ORGANIZATION</th>
                <th className={`px-3 sm:px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>STATUS</th>
                <th className={`px-3 sm:px-6 py-4 text-left text-sm font-medium uppercase tracking-wider hidden md:table-cell ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>REQUEST DATE</th>
                <th className={`px-3 sm:px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>ACTIONS</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredOrganizers.map((organizer) => (
                <tr key={organizer.id} className={`transition-colors ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${organizer.bgColor} rounded-full flex items-center justify-center text-white font-medium text-sm`}>
                        {organizer.initials}
                      </div>
                      <div className="ml-3">
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{organizer.name}</div>
                        <div className={`text-sm sm:hidden ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{organizer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-3 sm:px-6 py-4 text-sm hidden sm:table-cell ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{organizer.email}</td>
                  <td className={`px-3 sm:px-6 py-4 text-sm hidden lg:table-cell ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{organizer.organization}</td>
                  <td className="px-3 sm:px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${organizer.status === 'Unblocked'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {organizer.status}
                    </span>
                  </td>
                  <td className={`px-3 sm:px-6 py-4 text-sm hidden md:table-cell ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{organizer.requestDate}</td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {organizer.status === 'Blocked' ? (
                        <button
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Unblock"
                          onClick={() => handleBlockToggle(organizer.id)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Block"
                          onClick={() => handleBlockToggle(organizer.id)}
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
    </div>
  );
};

export default Organizers;