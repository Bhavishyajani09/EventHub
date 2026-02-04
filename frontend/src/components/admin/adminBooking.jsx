import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const AdminBooking = ({ isDark }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllBookings();
      if (response.success) {
        setBookings(response.bookings);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const filteredBookings = bookings.filter(booking => {
    const userName = booking.user?.name || 'Unknown User';
    const eventName = booking.event?.title || 'Unknown Event';
    const bookingId = booking._id.slice(-6).toUpperCase();
    const email = booking.user?.email || '';

    const matchesSearch = userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookingId.includes(searchTerm.toUpperCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All Status' || booking.status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

  // Assuming amount is a number in the DB from the schema I saw earlier or consistent with previous numeric logic
  // If stored as string with currency symbol, need parsing. Based on other files, it seems to be number often.
  // The mock data had strings like '₹598'. The DB model usually stores numbers.
  // I'll handle both just in case, but prioritize number.
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => {
      const amount = b.totalAmount || b.amount || 0; // Check likely field names
      return sum + Number(amount);
    }, 0);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-[calc(100vh-64px)] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className={`flex-1 p-4 h-[calc(100vh-64px)] overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className={`p-3 rounded-lg shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-xs text-gray-500 mb-1">Total</div>
          <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalBookings}</div>
        </div>
        <div className={`p-3 rounded-lg shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-xs text-gray-500 mb-1">Confirmed</div>
          <div className="text-lg font-bold text-green-600">{confirmedBookings}</div>
        </div>
        <div className={`p-3 rounded-lg shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-xs text-gray-500 mb-1">Pending</div>
          <div className="text-lg font-bold text-yellow-600">{pendingBookings}</div>
        </div>
        <div className={`p-3 rounded-lg shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-xs text-gray-500 mb-1">Cancelled</div>
          <div className="text-lg font-bold text-red-600">{cancelledBookings}</div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search bookings..."
            className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'border-gray-200'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className={`appearance-none border rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}`}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
          <svg className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Bookings Table */}
      <div className={`rounded-lg shadow-sm h-[calc(100vh-280px)] ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="w-full table-fixed">
          <thead className={`border-b ${isDark ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <tr>
              <th className={`w-[10%] px-4 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>ID</th>
              <th className={`w-[20%] px-4 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>User</th>
              <th className={`w-[22%] px-4 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Event</th>
              <th className={`w-[13%] px-4 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Type</th>
              <th className={`w-[8%] px-4 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Qty</th>
              <th className={`w-[12%] px-4 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Amount</th>
              <th className={`w-[15%] px-4 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Date</th>
              <th className={`w-[10%] px-4 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Status</th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto h-[calc(100%-48px)]">
          <table className="w-full table-fixed">
            <tbody className={`divide-y ${isDark ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className={`hover:bg-gray-50 ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                    <td className={`w-[10%] px-4 py-3 text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking._id.slice(-6).toUpperCase()}</td>
                    <td className="w-[20%] px-4 py-3">
                      <div className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.user?.name || 'Unknown'}</div>
                      <div className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.user?.email || 'N/A'}</div>
                    </td>
                    <td className={`w-[22%] px-4 py-3 text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.event?.title || 'Unknown Event'}</td>
                    <td className={`w-[13%] px-4 py-3 text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.category || 'N/A'}</td>
                    <td className={`w-[8%] px-4 py-3 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.tickets || 0}</td>
                    <td className={`w-[12%] px-4 py-3 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{booking.totalAmount || booking.amount || 0}</td>
                    <td className={`w-[15%] px-4 py-3 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{new Date(booking.createdAt).toLocaleDateString()}</td>
                    <td className="w-[10%] px-4 py-3">{getStatusBadge(booking.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className={`px-4 py-8 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    No bookings found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;