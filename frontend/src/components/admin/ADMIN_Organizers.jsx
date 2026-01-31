import React, { useState } from 'react';

const Organizers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const organizers = [
    { 
      id: 1, 
      name: 'Alex Turner', 
      email: 'alex@musiccorp.com', 
      organization: 'Music Corp Events', 
      status: 'pending', 
      requestDate: '2026-01-22',
      initials: 'AT',
      bgColor: 'bg-purple-500'
    },
    { 
      id: 2, 
      name: 'Maria Garcia', 
      email: 'maria@techevents.com', 
      organization: 'Tech Events Inc', 
      status: 'approved', 
      requestDate: '2026-01-20',
      initials: 'MG',
      bgColor: 'bg-pink-500'
    },
    { 
      id: 3, 
      name: 'James Wilson', 
      email: 'james@comedyclub.com', 
      organization: 'Comedy Club Productions', 
      status: 'pending', 
      requestDate: '2026-01-23',
      initials: 'JW',
      bgColor: 'bg-purple-500'
    },
    { 
      id: 4, 
      name: 'Sophie Chen', 
      email: 'sophie@sportsevents.com', 
      organization: 'Sports Events Management', 
      status: 'approved', 
      requestDate: '2026-01-18',
      initials: 'SC',
      bgColor: 'bg-purple-500'
    }
  ];

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
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full sm:w-auto"
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <svg className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Organizers Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ORGANIZER</th>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">EMAIL</th>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">ORGANIZATION</th>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">REQUEST DATE</th>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {organizers.map((organizer) => (
                <tr key={organizer.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${organizer.bgColor} rounded-full flex items-center justify-center text-white font-medium text-sm`}>
                        {organizer.initials}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{organizer.name}</div>
                        <div className="text-sm text-gray-500 sm:hidden">{organizer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">{organizer.email}</td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden lg:table-cell">{organizer.organization}</td>
                  <td className="px-3 sm:px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      organizer.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : organizer.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {organizer.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{organizer.requestDate}</td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-green-600" title="Approve">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600" title="Reject">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
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