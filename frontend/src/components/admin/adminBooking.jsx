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
      amount: '₹598',
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
      amount: '₹199',
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
      amount: '₹135',
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
      amount: '₹500',
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
      amount: '₹100',
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
    .reduce((sum, b) => sum + parseInt(b.amount.replace('₹', '')), 0);

  return (
    <div className="flex-1 p-4 bg-gray-50 h-screen overflow-hidden">
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Total</div>
          <div className="text-lg font-bold text-gray-900">{totalBookings}</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Confirmed</div>
          <div className="text-lg font-bold text-green-600">{confirmedBookings}</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Pending</div>
          <div className="text-lg font-bold text-yellow-600">{pendingBookings}</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
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
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-280px)]">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-[10%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="w-[20%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="w-[22%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th className="w-[13%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="w-[8%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="w-[12%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="w-[10%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto h-[calc(100%-48px)]">
          <table className="w-full table-fixed">
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="w-[10%] px-4 py-3 text-sm font-medium text-gray-900 truncate">{booking.bookingId}</td>
                  <td className="w-[20%] px-4 py-3">
                    <div className="text-sm font-medium text-gray-900 truncate">{booking.user}</div>
                    <div className="text-xs text-gray-500 truncate">{booking.email}</div>
                  </td>
                  <td className="w-[22%] px-4 py-3 text-sm text-gray-900 truncate">{booking.event}</td>
                  <td className="w-[13%] px-4 py-3 text-sm text-gray-900 truncate">{booking.ticketType}</td>
                  <td className="w-[8%] px-4 py-3 text-sm text-gray-900">{booking.quantity}</td>
                  <td className="w-[12%] px-4 py-3 text-sm text-gray-900">{booking.amount}</td>
                  <td className="w-[15%] px-4 py-3 text-sm text-gray-900">{booking.date}</td>
                  <td className="w-[10%] px-4 py-3">{getStatusBadge(booking.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;