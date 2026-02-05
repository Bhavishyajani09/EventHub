import { useState } from "react";
import { Search, Filter, Download, Eye, X } from "lucide-react";
import { bookings } from "../../lib/data";

// const bookings = [
//   {
//     id: "BK-2024-001",
//     date: "2024-07-15",
//     name: "Sarah Johnson",
//     email: "sarah.j@email.com",
//     event: "Summer Music Festival 2024",
//     tickets: 2,
//     category: "Gold",
//     amount: "180",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-002",
//     date: "2024-07-16",
//     name: "Mike Chen",
//     email: "mike.chen@email.com",
//     event: "Tech Innovation Summit",
//     tickets: 1,
//     category: "VIP",
//     amount: "150",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-003",
//     date: "2024-07-17",
//     name: "Emily Davis",
//     email: "emily.d@email.com",
//     event: "Gourmet Food Festival",
//     tickets: 4,
//     category: "Silver",
//     amount: "200",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-004",
//     date: "2024-07-18",
//     name: "James Wilson",
//     email: "james.w@email.com",
//     event: "Contemporary Art Exhibition",
//     tickets: 2,
//     category: "Gold",
//     amount: "120",
//     payment: "Refunded",
//     status: "Cancelled",
//   },
//   {
//     id: "BK-2024-005",
//     date: "2024-07-19",
//     name: "Lisa Anderson",
//     email: "lisa.a@email.com",
//     event: "Summer Music Festival 2024",
//     tickets: 3,
//     category: "Silver",
//     amount: "135",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-006",
//     date: "2024-07-15",
//     name: "Sarah Johnson",
//     email: "sarah.j@email.com",
//     event: "Summer Music Festival 2024",
//     tickets: 2,
//     category: "Gold",
//     amount: "180",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-007",
//     date: "2024-07-16",
//     name: "Mike Chen",
//     email: "mike.chen@email.com",
//     event: "Tech Innovation Summit",
//     tickets: 1,
//     category: "VIP",
//     amount: "150",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-008",
//     date: "2024-07-17",
//     name: "Emily Davis",
//     email: "emily.d@email.com",
//     event: "Gourmet Food Festival",
//     tickets: 4,
//     category: "Silver",
//     amount: "200",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-009",
//     date: "2024-07-18",
//     name: "James Wilson",
//     email: "james.w@email.com",
//     event: "Contemporary Art Exhibition",
//     tickets: 2,
//     category: "Gold",
//     amount: "120",
//     payment: "Refunded",
//     status: "Cancelled",
//   },
//   {
//     id: "BK-2024-011",
//     date: "2024-07-18",
//     name: "James Wilson",
//     email: "james.w@email.com",
//     event: "Contemporary Art Exhibition",
//     tickets: 2,
//     category: "Gold",
//     amount: "120",
//     payment: "Refunded",
//     status: "Cancelled",
//   },
// ];

export default function BookingsManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);


  /* 🔍 SEARCH + FILTER (TABLE ONLY) */
  const filteredBookings = bookings.filter((b) => {
    const text = search.toLowerCase().trim();

    const matchesSearch =
      b.id.toLowerCase().includes(text) ||
      b.name.toLowerCase().includes(text) ||
      b.event.toLowerCase().includes(text);

    const matchesStatus =
      statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  /* 📊 STATS (FIXED – SEARCH SE EFFECT NAHI) */
  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (b) => b.status === "Confirmed"
  ).length;

  const cancelledBookings = bookings.filter(
    (b) => b.status === "Cancelled"
  ).length;


  const totalRevenue = bookings
    .filter((b) => b.status === "Confirmed" && b.payment === "Paid")
    .reduce((sum, b) => sum + Number(b.amount), 0);



  /* 📥 Export CSV */
  const exportCSV = () => {
    const headers = ["Booking ID", "User", "Event", "Tickets", "Amount", "Status"];
    const rows = filteredBookings.map((b) => [
      b.id,
      b.name,
      b.event,
      b.tickets,
      b.amount,
      b.status,
    ]);

    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookings.csv";
    link.click();
  };


  // 👀 View Modal
  const handleViewModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  /* 📥 DOWNLOAD TXT */
  const handleDownload = (booking) => {
    const data = `
Booking ID: ${booking.id}
Name: ${booking.name}
Email: ${booking.email}
Event: ${booking.event}
Tickets: ${booking.tickets}
Status: ${booking.status}
  `;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${booking.id}.txt`;
    link.click();
  };

  /* ❌ CANCEL */
  const handleCancel = (b) => {
    if (window.confirm(`Cancel booking ${b.id}?`)) {
      alert(`Booking ${b.id} cancelled`);
    }
  };

  // 📥 Download Ticket
  const downloadTicket = () => {
    const ticketContent = `
Booking ID: ${selectedBooking.id}
Name: ${selectedBooking.name}
Email: ${selectedBooking.email}
Event: ${selectedBooking.event}
Category: ${selectedBooking.category}
Tickets: ${selectedBooking.tickets}
Amount: $${selectedBooking.amount}
Payment Status: ${selectedBooking.payment}
  `;

    const blob = new Blob([ticketContent], {
      type: "text/plain;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedBooking.id}-ticket.txt`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };




  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Bookings Management</h1>
        <p className="text-gray-500">
          Track and manage all ticket bookings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", value: totalBookings },
          { label: "Confirmed", value: confirmedBookings },
          { label: "Cancelled", value: cancelledBookings },
          { label: "Revenue", value: `₹${totalRevenue}` },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-7">
            <p className="text-sm text-gray-500">{item.label}</p>

            <p
              className={`text-2xl font-semibold mt-2 ${item.label === "Confirmed"
                ? "text-green-600"
                : item.label === "Cancelled"
                  ? "text-red-600"
                  : "text-black"
                }`}
            >
              {item.value}
            </p>
          </div>
        ))}

      </div>

      {/* 🔍 FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">All Bookings</h2>
            <p className="text-sm text-gray-500">
              View and manage ticket bookings
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        <div className="p-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search booking, user, event..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <div className="relative">

            {/* 🔽 Filter Icon */}
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

          </div>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Booking ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Tickets</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          {/* <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{b.id}</td>

                <td className="p-3">
                  <p className="font-medium">{b.name}</p>
                  <p className="text-xs text-gray-500">
                    {b.email}
                  </p>
                </td>

                <td className="p-3">{b.event}</td>
                <td className="p-3">{b.tickets}</td>
                <td className="p-3">{b.category}</td>
                <td className="p-3">{b.amount}</td>
                <td className="p-3">{b.payment}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      b.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="p-3">
                  <button className="p-2 rounded hover:bg-gray-100">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody> */}





          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.id}</td>
                  <td className="p-3">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </td>

                  <td>{item.event}</td>
                  <td>{item.tickets}</td>
                  <td>{item.category}</td>
                  <td>${item.amount}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${item.payment === "Refunded"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-green-100 text-green-600"
                        }`}
                    >
                      {item.payment}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  {/* <td className="p-3">
                  <button className="p-2 rounded hover:bg-gray-100">
                    <Eye size={16} />
                  </button>
                </td> */}

                  <td className="p-3">
                    <div className="flex items-center gap-2">

                      {/* 👁 View */}
                      <button
                        onClick={() => handleViewModal(item)}
                        className="p-2 rounded hover:bg-gray-100 text-blue-600"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>

                      {/* ⬇ Download */}
                      <button
                        onClick={() => handleDownload(item)}
                        className="p-2 rounded hover:bg-gray-100 text-green-600"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>

                      {/* ❌ Cancel */}
                      <button
                        onClick={() => handleCancel(item)}
                        className="p-2 rounded hover:bg-gray-100 text-red-600"
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>

                    </div>
                  </td>



                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>


        </table>


        {/* 👁 MODAL */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">

              {/* ❌ Close */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <p className="text-sm text-gray-500 mb-6">
                Full information about this booking
              </p>

              {/* Booking Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">

                <div>
                  <p className="font-semibold ">Booking ID</p>
                  <p className="text-gray-500">{selectedBooking.id}</p>
                </div>

                <div>
                  <p className="font-semibold">Booking Date</p>
                  <p className="text-gray-500">{selectedBooking.date}</p>
                </div>

                <div className="col-span-2 mt-3">
                  <h3 className="font-semibold">Customer Information</h3>
                </div>

                <div>
                  <p className="font-semibold">Name</p>
                  <p className="text-gray-500">{selectedBooking.name}</p>
                </div>

                <div>
                  <p className="font-semibold">Email</p>
                  <p className=" text-gray-500">{selectedBooking.email}</p>
                </div>

                <div className="col-span-2 mt-3">
                  <h3 className="font-semibold text-gray-500">Event Information</h3>
                </div>

                <div>
                  <p className="font-semibold">Event Name</p>
                  <p className=" text-gray-500">{selectedBooking.event}</p>
                </div>

                <div>
                  <p className="font-semibold">Ticket Category</p>
                  <p className=" text-gray-500">{selectedBooking.category}</p>
                </div>

                <div>
                  <p className="font-semibold">Tickets</p>
                  <p className="font-medium text-gray-500">{selectedBooking.tickets}</p>
                </div>

                <div className="col-span-2 mt-3">
                  <h3 className="font-semibold ">Payment Information</h3>
                </div>

                <div>
                  <p className="font-semibold">Amount</p>
                  <p className=" text-gray-500">{selectedBooking.amount}</p>
                </div>

                <div>
                  <p className="font-semibold">Payment Status</p>
                  <p className="mt-2">
                    <span
                      className="font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      Amount: ₹{selectedBooking.amount}
                    </span>
                  </p>
                </div>
              </div>

              {/* Download Ticket */}
              <button
                onClick={downloadTicket}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              >
                <Download size={16} />
                Download Ticket
              </button>

            </div>
          </div>
        )}

      </div>
    </div>


  );
}


/* 🔹 STAT CARD */
function Stat({ label, value, green, red }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-semibold ${green ? "text-green-600" : red ? "text-red-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}













// import { useState } from "react";
// import { Search, Download, Eye, X } from "lucide-react";

// /* 🔹 BOOKINGS DATA */
// const bookings = [
//   {
//     id: "BK-2024-001",
//     date: "2024-07-15",
//     name: "Sarah Johnson",
//     email: "sarah.j@email.com",
//     event: "Summer Music Festival 2024",
//     tickets: 2,
//     category: "Gold",
//     amount: "180",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-002",
//     date: "2024-07-16",
//     name: "Mike Chen",
//     email: "mike.chen@email.com",
//     event: "Tech Innovation Summit",
//     tickets: 1,
//     category: "VIP",
//     amount: "150",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-003",
//     date: "2024-07-17",
//     name: "Emily Davis",
//     email: "emily.d@email.com",
//     event: "Gourmet Food Festival",
//     tickets: 4,
//     category: "Silver",
//     amount: "200",
//     payment: "Paid",
//     status: "Confirmed",
//   },
//   {
//     id: "BK-2024-004",
//     date: "2024-07-18",
//     name: "James Wilson",
//     email: "james.w@email.com",
//     event: "Contemporary Art Exhibition",
//     tickets: 2,
//     category: "Gold",
//     amount: "120",
//     payment: "Refunded",
//     status: "Cancelled",
//   },
//   {
//     id: "BK-2024-005",
//     date: "2024-07-19",
//     name: "Lisa Anderson",
//     email: "lisa.a@email.com",
//     event: "Summer Music Festival 2024",
//     tickets: 3,
//     category: "Silver",
//     amount: "135",
//     payment: "Paid",
//     status: "Confirmed",
//   },
// ];

// export default function BookingsManagement() {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   /* 🔍 SEARCH + FILTER (TABLE ONLY) */
//   const filteredBookings = bookings.filter((b) => {
//     const text = search.toLowerCase().trim();

//     const matchesSearch =
//       b.id.toLowerCase().includes(text) ||
//       b.name.toLowerCase().includes(text) ||
//       b.event.toLowerCase().includes(text);

//     const matchesStatus =
//       statusFilter === "All" || b.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   /* 📊 STATS (FIXED – SEARCH SE EFFECT NAHI) */
//   const totalBookings = bookings.length;

//   const confirmedBookings = bookings.filter(
//     (b) => b.status === "Confirmed"
//   ).length;

//   const cancelledBookings = bookings.filter(
//     (b) => b.status === "Cancelled"
//   ).length;

//   const totalRevenue = bookings
//     .filter((b) => b.status === "Confirmed" && b.payment === "Paid")
//     .reduce((sum, b) => sum + Number(b.amount), 0);

//   /* 📥 CSV EXPORT */
//   const exportCSV = () => {
//     const headers = ["ID", "Name", "Event", "Tickets", "Amount", "Status"];
//     const rows = filteredBookings.map((b) => [
//       b.id,
//       b.name,
//       b.event,
//       b.tickets,
//       b.amount,
//       b.status,
//     ]);

//     const csv = [headers, ...rows].map(r => r.join(",")).join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "bookings.csv";
//     a.click();
//   };

//   /* 👁 VIEW */
//   const handleView = (booking) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   /* 📥 DOWNLOAD TXT */
//   const handleDownload = (b) => {
//     const data = `
// Booking ID: ${b.id}
// Name: ${b.name}
// Email: ${b.email}
// Event: ${b.event}
// Tickets: ${b.tickets}
// Status: ${b.status}
//     `;

//     const blob = new Blob([data], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${b.id}.txt`;
//     a.click();
//   };

//   /* ❌ CANCEL */
//   const handleCancel = (b) => {
//     if (window.confirm(`Cancel booking ${b.id}?`)) {
//       alert(`Booking ${b.id} cancelled`);
//     }
//   };

//   /* 🎟 DOWNLOAD TICKET (MODAL) */
//   const downloadTicket = () => {
//     const b = selectedBooking;
//     const ticket = `
// Booking ID: ${b.id}
// Name: ${b.name}
// Event: ${b.event}
// Category: ${b.category}
// Tickets: ${b.tickets}
// Amount: $${b.amount}
// Payment: ${b.payment}
//     `;

//     const blob = new Blob([ticket], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${b.id}-ticket.txt`;
//     a.click();
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-semibold">Bookings Management</h1>

//       {/* 📊 STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
//         <Stat label="Total Bookings" value={totalBookings} />
//         <Stat label="Confirmed" value={confirmedBookings} green />
//         <Stat label="Cancelled" value={cancelledBookings} red />
//         <Stat label="Revenue" value={`$${totalRevenue}`} />
//       </div>

//       {/* 🔍 FILTERS */}
//       <div className="bg-white p-4 rounded-xl shadow flex gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search booking, user, event..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg"
//           />
//         </div>

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border rounded-lg px-4"
//         >
//           <option value="All">All</option>
//           <option value="Confirmed">Confirmed</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>

//         <button onClick={exportCSV} className="border px-4 rounded-lg">
//           Export CSV
//         </button>
//       </div>

//       {/* 📋 TABLE */}
//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">ID</th>
//               <th>User</th>
//               <th>Event</th>
//               <th>Tickets</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.length ? (
//               filteredBookings.map((b) => (
//                 <tr key={b.id} className="border-t">
//                   <td className="p-3">{b.id}</td>
//                   <td>{b.name}</td>
//                   <td>{b.event}</td>
//                   <td>{b.tickets}</td>
//                   <td>{b.status}</td>
//                   <td className="flex gap-2 p-3">
//                     <button onClick={() => handleView(b)}><Eye size={16} /></button>
//                     <button onClick={() => handleDownload(b)}><Download size={16} /></button>
//                     <button onClick={() => handleCancel(b)}><X size={16} /></button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center text-gray-400">
//                   No bookings found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 👁 MODAL */}
//       {showModal && selectedBooking && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-96 relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3"
//             >
//               <X />
//             </button>

//             <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
//             <p><b>ID:</b> {selectedBooking.id}</p>
//             <p><b>Name:</b> {selectedBooking.name}</p>
//             <p><b>Email:</b> {selectedBooking.email}</p>
//             <p><b>Event:</b> {selectedBooking.event}</p>

//             <button
//               onClick={downloadTicket}
//               className="mt-4 w-full bg-black text-white py-2 rounded-lg"
//             >
//               Download Ticket
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* 🔹 STAT CARD */
// function Stat({ label, value, green, red }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className={`text-2xl font-semibold ${green ? "text-green-600" : red ? "text-red-600" : ""}`}>
//         {value}
//       </p>
//     </div>
//   );
// }
