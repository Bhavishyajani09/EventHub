import React, { memo } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BarChart3, Ticket, Calendar, DollarSign } from "lucide-react";
import { eventsData, bookings } from "../../lib/data";

const Dashboard = memo(() => {
    const { isDark } = useTheme();
    const totalEvents = eventsData.length;

  const totalTicketsSold = eventsData.reduce(
    (sum, event) => sum + event.sold,
    0
  );

  const totalRevenue = totalTicketsSold * 100;

  const upcomingEvents = eventsData.filter(
    (e) => e.status === "Live" || e.status === "Draft"
  ).length;

  /* ---------- PIE CHART LOGIC ---------- */

  const ticketColors = {
    Silver: "#9CA3AF",
    Gold: "#FBBF24",
    VIP: "#8B5CF6",
  };

  const ticketCount = {};

  bookings.forEach((b) => {
    ticketCount[b.category] =
      (ticketCount[b.category] || 0) + (b.quantity || 1);
  });

  const totalTickets = Object.values(ticketCount).reduce(
    (a, b) => a + b,
    0
  );

  const pieData = Object.keys(ticketCount).map((key) => ({
    label: key,
    value: Math.round((ticketCount[key] / totalTickets) * 100),
    color: ticketColors[key],
  }));

  
  return (
    <div className={`space-y-8 p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
        <p className={`mt-1 text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Welcome back! Here's what's happening with your events.
        </p>
      </div>

{/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard
    title="Total Events"
    value={totalEvents}
    icon={<Calendar size={24} />}
    bgColor="bg-blue-600 text-white"
    isDark={isDark}
  />

  <StatCard
    title="Tickets Sold"
    value={totalTicketsSold}
    icon={<Ticket size={24} />}
    bgColor="bg-purple-600 text-white"
    isDark={isDark}
  />

  <StatCard
    title="Total Revenue"
    value={`$${totalRevenue.toLocaleString()}`}
    icon={<DollarSign size={24} />}
    bgColor="bg-green-600 text-white"
    isDark={isDark}
  />

  <StatCard
    title="Upcoming Events"
    value={upcomingEvents}
    icon={<BarChart3 size={24} />}
    bgColor="bg-red-600 text-white"
    isDark={isDark}
  />
</div>



      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Full Circle Pie Chart */}
        <div className="lg:col-span-1">
          <FullCirclePie data={pieData} isDark={isDark} />
        </div>

        {/* Recent Bookings */}
        <div className={`lg:col-span-2 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border p-6 shadow-sm transition-all duration-500 ease-out animate-[fadeSlide_0.6s_ease-out]`}>
  <h2 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Bookings</h2>
  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Latest ticket purchases</p>

<div className="overflow-x-auto transition-opacity duration-300">
  <table className="w-full min-w-[700px] text-sm">
    <thead>
      <tr className={`border-b text-left ${isDark ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
        <th className="py-2">Booking ID</th>
        <th>User</th>
        <th>Event</th>
        <th>Tickets</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {bookings.map((booking) => (
        <BookingRow
          key={booking.id}
          id={booking.id}
          user={booking.name}
          event={booking.event}
          tickets={booking.tickets}
          amount={booking.amount}
          status={booking.status}
          isDark={isDark}
        />
      ))}
    </tbody>
  </table>
  </div>
</div>

      </div>
    </div>
  );
});

/* ---------------- Components ---------------- */

function StatCard({ title, value, change, icon, bgColor, negative, isDark }) {
  return (
 <div className={`group ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 sm:p-5 flex flex-col gap-2 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-indigo-200`}>
  <div className="flex  justify-between items-start">
    <h2 className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</h2>
    <div className={`p-2 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${bgColor}`}>
      {icon}
    </div>
  </div>

  <h1 className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h1>

   {change && (
  <div className="flex items-center gap-2 text-xs sm:text-sm">
    {negative ? (
      <i className="fa-solid fa-arrow-trend-down text-red-500"></i>
    ) : (
      <i className="fa-solid fa-arrow-trend-up text-green-500"></i>
    )}

    <p className={`transition-colors duration-300 ${negative ? "text-red-500" : "text-green-600"}`}>
      {change}
      <span className={`ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>vs last month</span>
    </p>
  </div>
)}
 
</div>

  );
}

function FullCirclePie({ data, isDark }) {
  let cumulative = -90;

  const slices = data.map((slice) => {
    const start = cumulative;
    cumulative += (slice.value / 100) * 360;
    return { ...slice, start, end: cumulative };
  });

  return (
    <div className={`group ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-4 sm:p-6 flex flex-col items-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-indigo-200`}>
      <h2 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Ticket Distribution</h2>

      {/* PIE CHART */}
      <svg viewBox="0 0 200 200" className=" w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 animate-spin-once">
        <circle cx="100" cy="100" r="90" fill={isDark ? '#374151' : '#E5E7EB'} />

        {slices.map((slice, i) => {
          const startAngle = (slice.start * Math.PI) / 180;
          const endAngle = (slice.end * Math.PI) / 180;

          const x1 = 100 + 90 * Math.cos(startAngle);
          const y1 = 100 + 90 * Math.sin(startAngle);
          const x2 = 100 + 90 * Math.cos(endAngle);
          const y2 = 100 + 90 * Math.sin(endAngle);

          const largeArc = slice.end - slice.start > 180 ? 1 : 0;

          return (
            <path
              key={i}
              className="transition-opacity duration-500 hover:opacity-90"
              d={`M100 100 L${x1} ${y1} A90 90 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={slice.color}
            />
          );
        })}
      </svg>

      {/* LEGEND WITH PERCENT */}
      <div className="mt-6 w-full space-y-2">
        {data.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between text-sm transition-all duration-300 hover:translate-x-1 hover:text-indigo-600 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium">{item.label}</span>
            </div>

            <span className="font-semibold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingRow({ id, user, event, tickets, amount, status, isDark }) {
  const isCancelled =
    status?.toLowerCase() === "cancelled" ||
    status?.toLowerCase() === "cancel";

  return (
    <tr className={`border-b last:border-none transition-all duration-300 hover:scale-[1.01] animate-[rowFade_0.4s_ease-out] ${
      isDark 
        ? 'border-gray-700 hover:bg-gray-700' 
        : 'border-gray-200 hover:bg-gray-50'
    }`}>
      <td className={`py-3 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{id}</td>
      <td className={isDark ? 'text-gray-300' : 'text-gray-700'}>{user}</td>
      <td className={`whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{event}</td>
      <td className={isDark ? 'text-gray-300' : 'text-gray-700'}>{tickets}</td>
      <td className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>${amount}</td>
      <td>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300
            ${
              isCancelled
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

export default Dashboard;