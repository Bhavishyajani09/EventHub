import React, { useState } from "react";
import { Calendar, MapPin, Ticket, Eye, Pencil, Trash2, Filter } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import ORG_CommonModal from "./ORG_CommonModal";
import { eventsData } from "../../lib/data";

const StatusBadge = ({ status }) => {
  const { isDark } = useTheme();
  const colors = {
    Live: isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800",
    Draft: isDark ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-800",
    Completed: isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
  };
  return <span className={`px-2 py-1 text-xs rounded-full ${colors[status]}`}>{status}</span>;
};

export default function MyEvents() {
  const { isDark } = useTheme();
  const [events, setEvents] = useState(eventsData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || event.venue.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All Status" || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`p-6 min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>My Events</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage and track all your events</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events by name or venue..."
          className={`w-full md:w-3/4 px-4 py-2 rounded-lg border focus:outline-none ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="relative w-full md:w-1/4">
          <Filter size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <select
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Live</option>
            <option>Draft</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className={`rounded-xl shadow-sm border overflow-hidden flex flex-col ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="w-full h-48">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{event.title}</h2>
                  <StatusBadge status={event.status} />
                </div>

                <div className={`text-sm flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Calendar size={14} />
                  {event.date}
                </div>

                <div className={`text-sm flex items-center gap-2 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <MapPin size={14} />
                  {event.venue}
                </div>

                <div className={`flex items-center gap-2 text-sm mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Ticket size={16} />
                  <span className="font-medium">Tickets Sold {event.sold}/{event.total}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => {
                    setSelectedEvent(event);
                    setModalMode("view");
                    setShowModal(true);
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border flex-1 justify-center ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  <Eye size={14} /> View
                </button>
                <button 
                  onClick={() => {
                    setSelectedEvent(event);
                    setModalMode("edit");
                    setShowModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex-1 justify-center"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button className={`flex items-center justify-center p-2 text-red-600 border rounded-lg ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-red-100'}`}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <p className={`col-span-3 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No events found.</p>
        )}
      </div>

      <ORG_CommonModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={modalMode === "view" ? "Event Details" : "Edit Event"}
      >
        {selectedEvent && modalMode === "view" && (
          <div className="space-y-2 text-sm">
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><b>Title:</b> {selectedEvent.title}</p>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><b>Date:</b> {selectedEvent.date}</p>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><b>Venue:</b> {selectedEvent.venue}</p>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><b>Status:</b> {selectedEvent.status}</p>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><b>Tickets:</b> {selectedEvent.sold}/{selectedEvent.total}</p>
          </div>
        )}

        {selectedEvent && modalMode === "edit" && (
          <div className="space-y-3 text-sm">
            <input
              className={`w-full border px-3 py-2 rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              value={selectedEvent.title}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
            />
            <input
              className={`w-full border px-3 py-2 rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              value={selectedEvent.venue}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, venue: e.target.value })}
            />
            <select
              className={`w-full border px-3 py-2 rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              value={selectedEvent.status}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value })}
            >
              <option>Live</option>
              <option>Draft</option>
              <option>Completed</option>
            </select>
            <button
              onClick={() => {
                setEvents(events.map(ev => ev.id === selectedEvent.id ? selectedEvent : ev));
                setShowModal(false);
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </ORG_CommonModal>
    </div>
  );
}