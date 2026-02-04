import React, { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { eventsData, bookings } from "../../lib/data";


export default function ReportsAnalytics({ isDark }) {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔹 Filter logic (example)
  const applyFilters = () => {
    console.log("Filters Applied 👇");
    console.log({
      timeRange,
      selectedEvent,
      startDate,
      endDate,
    });
  };

  /* ================= EVENTS BASED ================= */

  // 🎟 Total Tickets Sold
  const totalTicketsSold = eventsData.reduce(
    (sum, e) => sum + Number(e.sold || 0),
    0
  );

  // 🎫 Total Tickets Available
  const totalTickets = eventsData.reduce(
    (sum, e) => sum + Number(e.total || 0),
    0
  );

  // 📊 Conversion Rate (Sold / Total)
  const conversionRate =
    totalTickets === 0
      ? 0
      : ((totalTicketsSold / totalTickets) * 100).toFixed(1);

  /* ================= BOOKINGS BASED ================= */

  const confirmedBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "confirmed"
  );


  // 🎟 Ticket type wise count (from bookings)
  const ticketTypeCount = confirmedBookings.reduce((acc, b) => {
    const type = b.category;              // Silver / Gold / VIP
    const qty = Number(b.tickets || 0);   // no of tickets

    acc[type] = (acc[type] || 0) + qty;
    return acc;
  }, {});

  // 🎟 Total confirmed tickets
  const totalConfirmedTickets = Object.values(ticketTypeCount).reduce(
    (sum, val) => sum + val,
    0
  );

  // 📊 Convert to percentage
  const ticketDistribution = Object.entries(ticketTypeCount).map(
    ([type, count]) => ({
      label: type,
      percent:
        totalConfirmedTickets === 0
          ? 0
          : Math.round((count / totalConfirmedTickets) * 100),
    })
  );


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Reports & Analytics</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Analyze your event performance and trends
        </p>
      </div>

      <div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>

        {/* 🔹 Top Row – 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-3 py-2 border rounded-lg w-full ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>

          {/* Event Filter */}
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className={`px-3 py-2 border rounded-lg w-full ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option>All Events</option>
            {eventsData.map((event) => (
              <option key={event.id} value={event.title}>
                {event.title}
              </option>
            ))}
          </select>

          {/* Start Date */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`px-3 py-2 border rounded-lg w-full ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          />

          {/* End Date */}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`px-3 py-2 border rounded-lg w-full ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          />

        </div>

        {/* 🔹 Bottom Row – Actions */}
        <div className="flex flex-wrap gap-3 justify-end">

          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Apply Filters
          </button>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <StatCard
          title="Total Revenue"
          value={`₹${confirmedBookings.reduce((sum, b) => sum + Number(b.amount), 0).toLocaleString()}`}
          change="Live"
          isDark={isDark}
        />

        <StatCard
          title="Total Tickets Sold"
          value={totalConfirmedTickets}
          subtitle="From confirmed bookings"
          isDark={isDark}
        />

        <StatCard
          title="Avg Ticket Price"
          value={`₹${totalConfirmedTickets > 0 ? Math.round(confirmedBookings.reduce((sum, b) => sum + Number(b.amount), 0) / totalConfirmedTickets) : 0}`}
          subtitle="Per ticket"
          isDark={isDark}
        />

        <StatCard
          title="Conversion Rate"
          value={`${bookings.length > 0 ? ((confirmedBookings.length / bookings.length) * 100).toFixed(1) : 0}%`}
          subtitle="Confirmed vs Total bookings"
          isDark={isDark}
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Left Column: Ticket Type Distribution (smaller) */}
        <div className={`md:col-span-4 p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ticket Type Distribution
          </h2>

          {ticketDistribution.length === 0 ? (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No ticket data available
            </p>
          ) : (
            ticketDistribution.map((item) => (
              <Distribution
                key={item.label}
                label={item.label}
                percent={item.percent}
                isDark={isDark}
              />
            ))
          )}
        </div>

        {/* Right Column: Booking Funnel (bigger) */}
        <div className={`md:col-span-8 p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Booking Funnel</h2>

          <FunnelRow label="Total Bookings" value={bookings.length} percent="100%" isDark={isDark} />
          <FunnelRow label="Confirmed Bookings" value={confirmedBookings.length} percent={`${bookings.length > 0 ? ((confirmedBookings.length / bookings.length) * 100).toFixed(1) : 0}%`} isDark={isDark} />
          <FunnelRow label="Cancelled Bookings" value={bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length} percent={`${bookings.length > 0 ? ((bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length / bookings.length) * 100).toFixed(1) : 0}%`} isDark={isDark} />
          <FunnelRow label="Total Revenue" value={`₹${confirmedBookings.reduce((sum, b) => sum + Number(b.amount), 0).toLocaleString()}`} percent={`${bookings.length > 0 ? ((confirmedBookings.length / bookings.length) * 100).toFixed(1) : 0}%`} isDark={isDark} />

          <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Overall Conversion Rate: <b className={isDark ? 'text-white' : 'text-gray-900'}>{bookings.length > 0 ? ((confirmedBookings.length / bookings.length) * 100).toFixed(1) : 0}%</b> from total bookings to confirmed bookings
          </p>
        </div>

      </div>

      {/* Insights */}
      <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Insights</h2>

        <ul className={`list-disc pl-5 text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <li>
            Your conversion rate improved by <b>2.3%</b> this period.
          </li>
          <li>
            Gold tickets are best sellers at <b>35%</b> of total sales.
          </li>
          <li>
            Most drop-off occurs between <b>Add to Cart</b> and <b>Checkout</b>.
          </li>
        </ul>
      </div>

    </div>
  );
}

/* ================= Components ================= */

function StatCard({ title, value, change, subtitle, isDark }) {
  return (
    <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h3>

      {change && (
        <p className="text-green-600 text-sm flex items-center gap-1">
          <ArrowUpRight size={14} /> {change}
        </p>
      )}

      {subtitle && (
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{subtitle}</p>
      )}
    </div>
  );
}

function FunnelRow({ label, value, percent, isDark }) {
  return (
    <div className={`flex justify-between py-2 border-b last:border-0 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{label}</span>
      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {value} <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>({percent})</span>
      </span>
    </div>
  );
}

function Distribution({ label, percent, isDark }) {
  return (
    <div className="mb-3">
      <div className={`flex justify-between text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className={`h-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div
          className="h-2 bg-indigo-600 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
