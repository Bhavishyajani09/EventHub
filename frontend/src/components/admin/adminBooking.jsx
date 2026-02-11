import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const AdminBooking = ({ isDark }) => {
  const [orgFilter, setOrgFilter] = useState('All Organizers');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
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

  const uniqueOrganizers = [...new Set(bookings.map(b => b.event?.organizer?.name).filter(Boolean))];
  const uniqueCategories = [...new Set(bookings.map(b => b.event?.category).filter(Boolean))];

  const filteredBookings = bookings.filter(booking => {
    const orgName = booking.event?.organizer?.name || 'Unknown';
    const category = booking.event?.category || 'Unknown';

    const matchesOrg = orgFilter === 'All Organizers' || orgName === orgFilter;
    const matchesCategory = categoryFilter === 'All Categories' || category === categoryFilter;
    const matchesStatus = statusFilter === 'All Status' || booking.status === statusFilter.toLowerCase();

    return matchesOrg && matchesCategory && matchesStatus;
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
    <div className={`flex-1 p-4 sm:p-6 lg:p-8 min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-xl shadow-sm border transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Bookings</div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalBookings}</div>
        </div>
        <div className={`p-4 rounded-xl shadow-sm border transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-xs font-semibold text-green-500 uppercase tracking-wider mb-2">Confirmed</div>
          <div className="text-2xl font-bold text-green-600">{confirmedBookings}</div>
        </div>
        <div className={`p-4 rounded-xl shadow-sm border transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-2">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{pendingBookings}</div>
        </div>
        <div className={`p-4 rounded-xl shadow-sm border transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">Cancelled</div>
          <div className="text-2xl font-bold text-red-600">{cancelledBookings}</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[160px] flex-1 sm:flex-none">
            <select
              className={`appearance-none w-full border rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}`}
              value={orgFilter}
              onChange={(e) => setOrgFilter(e.target.value)}
            >
              <option>All Organizers</option>
              {uniqueOrganizers.map((org, index) => (
                <option key={index} value={org}>{org}</option>
              ))}
            </select>
            <svg className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="relative min-w-[160px] flex-1 sm:flex-none">
            <select
              className={`appearance-none w-full border rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}`}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              {uniqueCategories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <svg className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="relative min-w-[140px] flex-1 sm:flex-none">
            <select
              className={`appearance-none w-full border rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}`}
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
      </div>

      {/* Bookings Table container */}
      <div className={`rounded-xl shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className={`border-b ${isDark ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Booking ID</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Customer</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Event Details</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Organizer</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Qty</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Amount</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Booking Date</th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className={`transition-colors ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                    <td className={`px-6 py-4 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking._id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.user?.name || 'Unknown'}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.user?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{booking.event?.title || 'Unknown Event'}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.event?.category || 'General'}</div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{booking.event?.organizer?.name || 'Unknown'}</td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.tickets || 0}</td>
                    <td className={`px-6 py-4 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{booking.totalAmount || booking.amount || 0}</td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(booking.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className={`px-6 py-12 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>No bookings found matching your filters.</span>
                    </div>
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