import React, { useState } from 'react';
import { Search, Eye, Check, X } from 'lucide-react';

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
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search organizers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="All Status">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Organizers Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ORGANIZER</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ORGANIZATION</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">REQUEST DATE</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {organizers.map((organizer) => (
                <tr key={organizer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${organizer.bgColor} rounded-full flex items-center justify-center text-white font-medium text-sm`}>
                        {organizer.initials}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{organizer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{organizer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{organizer.organization}</td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 text-sm text-gray-500">{organizer.requestDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye size={16} />
                      </button>
                      {organizer.status === 'pending' && (
                        <>
                          <button className="p-1 text-gray-400 hover:text-green-600">
                            <Check size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <X size={16} />
                          </button>
                        </>
                      )}
                      {organizer.status === 'approved' && (
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Eye size={16} />
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