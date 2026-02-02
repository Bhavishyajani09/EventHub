import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Search, Filter, Download, Eye, X } from "lucide-react";
import { bookings } from "../../lib/data";

export default function BookingsManagement() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className={`p-4 sm:p-6 space-y-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      {/* Header */}
      <div>
        <h1 className={`text-2xl sm:text-3xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Bookings Management</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Track and manage all ticket bookings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Bookings", value: bookings.length },
          { label: "Confirmed", value: bookings.filter(b => b.status === "Confirmed").length },
          { label: "Cancelled", value: bookings.filter(b => b.status === "Cancelled").length },
          { label: "Revenue", value: `$${bookings.filter(b => b.status === "Confirmed" && b.payment === "Paid").reduce((sum, b) => sum + Number(b.amount), 0)}` },
        ].map((item, i) => (
          <div key={i} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow p-4 sm:p-6`}>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</p>
            <p className={`text-lg sm:text-2xl font-semibold mt-2 ${
              item.label === "Confirmed" ? "text-green-600" :
              item.label === "Cancelled" ? "text-red-600" :
              isDark ? "text-white" : "text-black"
            }`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>All Bookings</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              View and manage ticket bookings
            </p>
          </div>
          <button
            onClick={() => {}}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-colors ${
              isDark 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search booking, user, event..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table - Mobile Cards / Desktop Table */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow`}>
        {/* Mobile Cards */}
        <div className="block sm:hidden">
          {bookings.filter(b => {
            const text = search.toLowerCase().trim();
            const matchesSearch = b.id.toLowerCase().includes(text) || b.name.toLowerCase().includes(text) || b.event.toLowerCase().includes(text);
            const matchesStatus = statusFilter === "All" || b.status === statusFilter;
            return matchesSearch && matchesStatus;
          }).map((item) => (
            <div key={item.id} className={`p-4 border-b last:border-b-0 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.id}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.name}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "Confirmed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {item.status}
                </span>
              </div>
              <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.event}</p>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.tickets} tickets • ${item.amount}</span>
                <div className="flex gap-2">
                  <button className={`p-2 rounded hover:bg-opacity-10 ${isDark ? 'text-blue-400 hover:bg-blue-400' : 'text-blue-600 hover:bg-blue-600'}`}>
                    <Eye size={16} />
                  </button>
                  <button className={`p-2 rounded hover:bg-opacity-10 ${isDark ? 'text-green-400 hover:bg-green-400' : 'text-green-600 hover:bg-green-600'}`}>
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className={`${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
              <tr>
                <th className="p-3 text-left">Booking ID</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left hidden lg:table-cell">Event</th>
                <th className="p-3 text-left">Tickets</th>
                <th className="p-3 text-left hidden md:table-cell">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.filter(b => {
                const text = search.toLowerCase().trim();
                const matchesSearch = b.id.toLowerCase().includes(text) || b.name.toLowerCase().includes(text) || b.event.toLowerCase().includes(text);
                const matchesStatus = statusFilter === "All" || b.status === statusFilter;
                return matchesSearch && matchesStatus;
              }).map((item) => (
                <tr key={item.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <td className={`p-3 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.id}</td>
                  <td className="p-3">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.email}</p>
                  </td>
                  <td className={`p-3 hidden lg:table-cell ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.event}</td>
                  <td className={`p-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.tickets}</td>
                  <td className={`p-3 hidden md:table-cell ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>${item.amount}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Confirmed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button className={`p-2 rounded hover:bg-opacity-10 ${isDark ? 'text-blue-400 hover:bg-blue-400' : 'text-blue-600 hover:bg-blue-600'}`}>
                        <Eye size={16} />
                      </button>
                      <button className={`p-2 rounded hover:bg-opacity-10 ${isDark ? 'text-green-400 hover:bg-green-400' : 'text-green-600 hover:bg-green-600'}`}>
                        <Download size={16} />
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

