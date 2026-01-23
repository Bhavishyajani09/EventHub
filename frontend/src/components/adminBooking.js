import React, { useState } from 'react';

const AdminBooking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const bookings = [
    {
      id: 1,
      bookingId: 'BK-001',
      user: 'John Doe',
      email: 'john@example.com',
      event: 'Summer Music Festival 2026',
      ticketType: 'VIP',
      quantity: 2,
      amount: '$598',
      date: '2026-01-20',
      status: 'confirmed'
    },
    {
      id: 2,
      bookingId: 'BK-002',
      user: 'Sarah Smith',
      email: 'sarah@example.com',
      event: 'Tech Conference 2026',
      ticketType: 'Standard',
      quantity: 1,
      amount: '$199',
      date: '2026-01-21',
      status: 'confirmed'
    },
    {
      id: 3,
      bookingId: 'BK-003',
      user: 'Mike Johnson',
      email: 'mike@example.com',
      event: 'Comedy Night Live',
      ticketType: 'General',
      quantity: 3,
      amount: '$135',
      date: '2026-01-22',
      status: 'pending'
    },
    {
      id: 4,
      bookingId: 'BK-004',
      user: 'Emily Brown',
      email: 'emily@example.com',
      event: 'Sports Championship Finals',
      ticketType: 'Lower Bowl',
      quantity: 2,
      amount: '$500',
      date: '2026-01-19',
      status: 'confirmed'
    },
    {
      id: 5,
      bookingId: 'BK-005',
      user: 'David Wilson',
      email: 'david@example.com',
      event: 'Cultural Festival',
      ticketType: 'Day Pass',
      quantity: 4,
      amount: '$100',
      date: '2026-01-18',
      status: 'cancelled'
    }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || booking.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + parseInt(b.amount.replace('$', '')), 0);

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Total Bookings</div>
          <div className="text-2xl font-bold text-gray-900">{totalBookings}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Confirmed</div>
          <div className="text-2xl font-bold text-green-600">{confirmedBookings}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{pendingBookings}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Cancelled</div>
          <div className="text-2xl font-bold text-red-600">{cancelledBookings}</div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search bookings..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <select
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.bookingId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{booking.user}</div>
                    <div className="text-sm text-gray-500">{booking.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.event}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.ticketType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(booking.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooking;