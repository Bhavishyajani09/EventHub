import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adminService from '../../services/adminService';

const AdminEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsEvent, setDetailsEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await adminService.getAllEvents();
      if (response.success) {
        const mappedEvents = response.events.map(event => ({
          id: event._id,
          title: event.title,
          location: event.location,
          date: new Date(event.date).toLocaleDateString() + ' at ' + new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          organizer: event.organizer?.name || 'Unknown',
          status: event.approvalStatus || 'pending',
          isPublished: event.isPublished,
          rejectionReason: event.rejectionReason,
          color: 'bg-gradient-to-br from-blue-500 to-blue-600',
          image: event.image,
          rawEvent: event
        }));
        setEvents(mappedEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      await adminService.approveEvent(eventId);
      fetchEvents(); // Refresh events
    } catch (error) {
      alert('Failed to approve event');
    }
  };

  const handleReject = (event) => {
    setSelectedEvent(event);
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    try {
      await adminService.rejectEvent(selectedEvent.id, rejectionReason);
      setShowRejectModal(false);
      setSelectedEvent(null);
      setRejectionReason('');
      fetchEvents(); // Refresh events
    } catch (error) {
      alert('Failed to reject event');
    }
  };

  const handleViewDetails = (event) => {
    setDetailsEvent(event);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      approved: 'bg-green-100 text-green-800 border border-green-200',
      rejected: 'bg-red-100 text-red-800 border border-red-200'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || event.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-80">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
            />
          </div>
        </div>
        <div className="w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200 bg-white border-gray-100">
              {/* Event Header with Color or Image */}
              <div className="h-64 flex items-center justify-center relative overflow-hidden bg-white">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-top bg-gray-50 rounded-lg"
                  />
                ) : (
                  <svg className="w-16 h-16 text-gray-400 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>

              {/* Event Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg leading-tight text-gray-900">{event.title}</h3>
                  {getStatusBadge(event.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-500 tracking-wide uppercase">
                    BY - <span className="text-sm font-black text-indigo-600 tracking-normal normal-case">{event.organizer}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewDetails(event)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>
                  {event.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(event.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title="Approve Event"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleReject(event)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Reject Event"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  )}
                  {event.status === 'rejected' && event.rejectionReason && (
                    <div className="text-xs text-red-600 mt-2">
                      <strong>Reason:</strong> {event.rejectionReason}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500">No events found matching your criteria</p>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && detailsEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setDetailsEvent(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column - Image */}
                <div className="flex justify-center items-center mt-8">
                  {detailsEvent.image ? (
                    <img
                      src={detailsEvent.image}
                      alt={detailsEvent.title}
                      className="w-full h-64 object-cover object-top bg-gray-50 rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Right Column - Details */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{detailsEvent.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(detailsEvent.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Location:</span>
                      <p className="text-gray-900">{detailsEvent.location}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Date:</span>
                      <p className="text-gray-900">{detailsEvent.date}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Organizer:</span>
                      <p className="text-gray-900 font-black">BY- {detailsEvent.organizer}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Published:</span>
                      <p className="text-gray-900">{detailsEvent.isPublished ? 'Yes' : 'No'}</p>
                    </div>
                    {detailsEvent.rawEvent?.category && (
                      <div>
                        <span className="font-medium text-gray-600">Category:</span>
                        <p className="text-gray-900">{detailsEvent.rawEvent.category}</p>
                      </div>
                    )}
                    {detailsEvent.rawEvent?.capacity && (
                      <div>
                        <span className="font-medium text-gray-600">Capacity:</span>
                        <p className="text-gray-900">{detailsEvent.rawEvent.capacity}</p>
                      </div>
                    )}
                    {detailsEvent.rawEvent?.price && (
                      <div>
                        <span className="font-medium text-gray-600">Price starts from :</span>
                        <p className="text-gray-900">₹{detailsEvent.rawEvent.price}</p>
                      </div>
                    )}
                  </div>

                  {detailsEvent.rawEvent?.description && (
                    <div>
                      <span className="font-medium text-gray-600">Description:</span>
                      <p className="text-gray-900 text-sm mt-1">{detailsEvent.rawEvent.description}</p>
                    </div>
                  )}

                  {detailsEvent.status === 'rejected' && detailsEvent.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <span className="font-medium text-red-800">Rejection Reason:</span>
                      <p className="text-red-700 text-sm mt-1">{detailsEvent.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-4 pt-3 border-t">
                {detailsEvent.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleApprove(detailsEvent.id);
                        setShowDetailsModal(false);
                        setDetailsEvent(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setDetailsEvent(null);
                        handleReject(detailsEvent);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setDetailsEvent(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Reject Event</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to reject "{selectedEvent?.title}"?
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={3}
                placeholder="Please provide a reason for rejection..."
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedEvent(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={!rejectionReason.trim()}
              >
                Reject Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;