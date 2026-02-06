// import React, { useState } from "react";
// import { Calendar, MapPin, Ticket, Eye, Pencil, Trash2, Filter } from "lucide-react";
// import CommonModal from "../components/CommonModal";
// import StatusSelect from "../components/FilterStatus";
// import { eventsData } from "../lib/data";

// /* 🔹 Events Data (JSON) */
// // const initialEvents = [
// //   {
// //     id: 1,
// //     title: "Summer Music Festival 2024",
// //     date: "Jul 15, 2024 • 6:00 PM",
// //     venue: "Madison Square Garden, New York",
// //     status: "Live",
// //     sold: 450,
// //     total: 500,
// //     image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80"
// //   },
// //   {
// //     id: 2,
// //     title: "Tech Innovation Summit",
// //     date: "Aug 22, 2024 • 9:00 AM",
// //     venue: "Convention Center, San Francisco",
// //     status: "Live",
// //     sold: 320,
// //     total: 400,
// //     image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
// //   },
// //   {
// //     id: 3,
// //     title: "Gourmet Food Festival",
// //     date: "Sep 10, 2024 • 12:00 PM",
// //     venue: "Central Park, New York",
// //     status: "Draft",
// //     sold: 0,
// //     total: 300,
// //     image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
// //   },
// //   {
// //     id: 4,
// //     title: "Contemporary Art Exhibition",
// //     date: "Oct 5, 2024 • 10:00 AM",
// //     venue: "Modern Art Museum, Los Angeles",
// //     status: "Completed",
// //     sold: 280,
// //     total: 280,
// //     image: "https://images.unsplash.com/photo-1588361867550-18d59d6a40b4?auto=format&fit=crop&w=800&q=80"
// //   }
// // ];

// export default function MyEvents() {
//   const [events, setEvents] = useState(eventsData);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All Status");

//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [modalMode, setModalMode] = useState("view");


//   // Filter & Search logic
//   const filteredEvents = events.filter((event) => {
//     const matchesSearch =
//       event.title.toLowerCase().includes(search.toLowerCase()) ||
//       event.venue.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus =
//       filterStatus === "All Status" || event.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">My Events</h1>
//         <p className="text-gray-500">Manage and track all your events</p>
//       </div>

//       {/* Search + Filter */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search events by name or venue..."
//           className="w-full md:w-3/4 px-4 py-2 rounded-lg border focus:outline-none"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//          {/* 🎯 Filter with Icon */}
//           <div className="relative w-full md:w-1/4">
//             <Filter
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//             />

//             <select
//               className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option>All Status</option>
//               <option>Live</option>
//               <option>Draft</option>
//               <option>Completed</option>
//             </select>
//           </div>

//       </div>

//       {/* Events Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filteredEvents.map((event) => (
//           <div
//             key={event.id}
//             className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col"
//           >
//             {/* Event Image */}
//             <div className="w-full h-48">
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Event Info */}
//             <div className="p-4 flex-1 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <h2 className="text-lg font-semibold">{event.title}</h2>
//                   <StatusBadge status={event.status} />
//                 </div>

//                 <div className="text-sm text-gray-500 flex items-center gap-2">
//                   <Calendar size={14} />
//                   {event.date}
//                 </div>

//                 <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
//                   <MapPin size={14} />
//                   {event.venue}
//                 </div>

//                 <div className="flex items-center gap-2 text-sm mt-2">
//                   <Ticket size={16} />
//                   <span className="font-medium">
//                     Tickets Sold {event.sold}/{event.total}
//                   </span>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-2 mt-4">
//                 <button 
//                   onClick={() => {
//                     setSelectedEvent(event);
//                     setModalMode("view");   // 🔥 THIS LINE MISSING
//                     setShowModal(true);
//                   }}

//                 className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-100 flex-1 justify-center">
//                   <Eye size={14} /> View
//                 </button>
//                 <button 
//                    onClick={() => {
//                     setSelectedEvent(event);
//                     setModalMode("edit");
//                     setShowModal(true);
//                   }}
//                 className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex-1 justify-center">
//                   <Pencil size={14} /> Edit
//                 </button>
//                 <button className="flex items-center justify-center p-2 text-red-600 border hover:bg-red-100 rounded-lg">
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         {filteredEvents.length === 0 && (
//           <p className="text-gray-500 col-span-3 text-center">No events found.</p>
//         )}
//       </div>



// <CommonModal
//   open={showModal}
//   onClose={() => setShowModal(false)}
//   title={modalMode === "view" ? "Event Details" : "Edit Event"}
// >
//   {selectedEvent && modalMode === "view" && (
//     <div className="space-y-2 text-sm">
//       <p><b>Title:</b> {selectedEvent.title}</p>
//       <p><b>Date:</b> {selectedEvent.date}</p>
//       <p><b>Venue:</b> {selectedEvent.venue}</p>
//       <p><b>Status:</b> {selectedEvent.status}</p>
//       <p><b>Tickets:</b> {selectedEvent.sold}/{selectedEvent.total}</p>
//     </div>
//   )}

//   {selectedEvent && modalMode === "edit" && (
//     <div className="space-y-3 text-sm">
//       <input
//         className="w-full border px-3 py-2 rounded"
//         value={selectedEvent.title}
//         onChange={(e) =>
//           setSelectedEvent({ ...selectedEvent, title: e.target.value })
//         }
//       />

//       <input
//         className="w-full border px-3 py-2 rounded"
//         value={selectedEvent.venue}
//         onChange={(e) =>
//           setSelectedEvent({ ...selectedEvent, venue: e.target.value })
//         }
//       />

//       <select
//         className="w-full border px-3 py-2 rounded"
//         value={selectedEvent.status}
//         onChange={(e) =>
//           setSelectedEvent({ ...selectedEvent, status: e.target.value })
//         }
//       >
//         <option>Live</option>
//         <option>Draft</option>
//         <option>Completed</option>
//       </select>

//       <button
//         onClick={() => {
//           setEvents(events.map(ev =>
//             ev.id === selectedEvent.id ? selectedEvent : ev
//           ));
//           setShowModal(false);
//         }}
//         className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//       >
//         Save Changes
//       </button>
//     </div>
//   )}
// </CommonModal>


// <StatusSelect
//   value={filterStatus}
//   onChange={(e) => setFilterStatus(e.target.value)}
//   placeholder="All Status"
//   options={["Live", "Draft", "Completed"]}
// />



//     </div>
//   );
// }




// /* 🔹 Status Badge */
// function StatusBadge({ status }) {
//   const colors = {
//     Live: "bg-green-100 text-green-600",
//     Draft: "bg-yellow-100 text-yellow-600",
//     Completed: "bg-gray-200 text-gray-600"
//   };

//   return (
//     <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
//       {status}
//     </span>
//   );
// }








import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Ticket,
  Eye,
  Pencil,
  Trash2,
  Filter,
} from "lucide-react";
import CommonModal from "./ORG_CommonModal";
import { eventsData } from "../../lib/data";

/* ================= MyEvents ================= */

export default function MyEvents() {
  const [events, setEvents] = useState(eventsData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  /* 🔍 Search + Filter Logic */
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All Status" || event.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  /* ❌ Close Modal */
  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setModalMode("view");
  };

  /* 💾 Save Edit */
  const saveChanges = () => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === selectedEvent.id ? selectedEvent : ev))
    );
    closeModal();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Events</h1>
        <p className="text-gray-500">Manage and track all your events</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events by name or venue..."
          className="w-full md:w-3/4 px-4 py-2 rounded-lg border focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter */}
        <div className="relative w-full md:w-1/4">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none"
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl border overflow-hidden flex flex-col"
          >
            {/* Image */}
            <img
              src={event.image}
              alt={event.title}
              className="h-64 w-full object-cover object-top"
            />

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                  <StatusBadge status={event.status} />
                </div>

                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar size={14} /> {event.date}
                </p>

                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <MapPin size={14} /> {event.venue}
                </p>

                <p className="text-sm flex items-center gap-2 mt-2">
                  <Ticket size={16} />
                  Tickets Sold {event.sold}/{event.total}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setModalMode("view");
                    setShowModal(true);
                  }}
                  className="flex-1 border px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-gray-100"
                >
                  <Eye size={14} /> View
                </button>

                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setModalMode("edit");
                    setShowModal(true);
                  }}
                  className="flex-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-indigo-700"
                >
                  <Pencil size={14} /> Edit
                </button>

                <button className="p-2 border rounded-lg text-red-600 hover:bg-red-100">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">
            No events found.
          </p>
        )}
      </div>

      {/* Modal */}
      <CommonModal
        open={showModal}
        onClose={closeModal}
        title={modalMode === "view" ? "Event Details" : "Edit Event"}
      >
        {selectedEvent && modalMode === "view" && (
          <div className="space-y-2 text-sm">
            <p><b>Title:</b> {selectedEvent.title}</p>
            <p><b>Date:</b> {selectedEvent.date}</p>
            <p><b>Venue:</b> {selectedEvent.venue}</p>
            <p><b>Status:</b> {selectedEvent.status}</p>
            <p>
              <b>Tickets:</b> {selectedEvent.sold}/{selectedEvent.total}
            </p>
          </div>
        )}

        {selectedEvent && modalMode === "edit" && (
          <div className="space-y-3">
            <input
              className="w-full border px-3 py-2 rounded"
              value={selectedEvent.title}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, title: e.target.value })
              }
            />

            <input
              className="w-full border px-3 py-2 rounded"
              value={selectedEvent.venue}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, venue: e.target.value })
              }
            />

            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedEvent.status}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, status: e.target.value })
              }
            >
              <option>Live</option>
              <option>Draft</option>
              <option>Completed</option>
            </select>

            <button
              onClick={saveChanges}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </CommonModal>
    </div>
  );
}

/* ================= Status Badge ================= */

function StatusBadge({ status }) {
  const colors = {
    Live: "bg-green-100 text-green-600",
    Draft: "bg-yellow-100 text-yellow-600",
    Completed: "bg-gray-200 text-gray-600",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}
