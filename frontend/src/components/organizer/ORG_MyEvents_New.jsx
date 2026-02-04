import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import organizerService from '../../services/organizerService';

const MyEvents = ({ isDark }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await organizerService.getMyEvents();
      if (response.success) {
        setEvents(response.events || []);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Events error:', error);
      setError('');
      setEvents([]); // Show empty state instead of error
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await organizerService.deleteEvent(eventId);
        setEvents(events.filter(event => event._id !== eventId));
      } catch (error) {
        alert('Failed to delete event');
      }
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'published') return event.isPublished;
    if (filter === 'draft') return !event.isPublished;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>My Events</h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage your events</p>
        </div>
        <button
          onClick={() => navigate('/create-event')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Event
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={`flex space-x-1 p-1 rounded-lg w-fit ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {[
          { key: 'all', label: 'All Events' },
          { key: 'published', label: 'Published' },
          { key: 'draft', label: 'Draft' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === tab.key
                ? `shadow-sm ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-indigo-600'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className={`mt-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>No events</h3>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {filter === 'all' ? 'You haven\'t created any events yet.' : `No ${filter} events found.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDeleteEvent}
              onEdit={() => navigate(`/edit-event/${event._id}`)}
              isDark={isDark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const EventCard = ({ event, onDelete, onEdit, isDark }) => {
  return (
    <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Event Image */}
      <div className={`h-48 relative flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-contain"
            style={{ objectPosition: 'center' }}
          />
        ) : (
          <Calendar className="h-12 w-12 text-gray-400" />
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.isPublished
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
            }`}>
            {event.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4">
        <h3 className={`font-semibold text-lg mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>

        <div className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{event.capacity} capacity</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">
            ₹{event.price}
          </span>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className={`p-2 rounded ${isDark ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-700' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'}`}
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className={`p-2 rounded ${isDark ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;