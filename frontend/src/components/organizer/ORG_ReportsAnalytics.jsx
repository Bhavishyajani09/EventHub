import React, { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import organizerService from "../../services/organizerService";
import { useAuth } from "../../context/AuthContext";

export default function ReportsAnalytics({ isDark }) {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Analytics data state
  const [analyticsData, setAnalyticsData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user || user.role !== 'organizer') {
        setError('Please login as an organizer to view analytics');
        setLoading(false);
        return;
      }

      // Build query parameters
      const params = {};

      if (timeRange && !startDate && !endDate) {
        params.timeRange = timeRange;
      }

      if (selectedEvent && selectedEvent !== 'All Events') {
        params.eventId = selectedEvent;
      }

      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await organizerService.getAnalytics(params);

      if (response.success) {
        setAnalyticsData(response.data);
        setEvents(response.data.events || []);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err.response?.data?.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  // Load analytics on mount
  useEffect(() => {
    if (user && user.role === 'organizer') {
      fetchAnalytics();
    } else {
      setError('Please login as an organizer to view analytics');
      setLoading(false);
    }
  }, [user]);

  // Apply filters
  const applyFilters = () => {
    fetchAnalytics();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className={`animate-spin ${isDark ? 'text-white' : 'text-gray-900'}`} size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-red-400' : 'bg-white border-gray-200 text-red-600'}`}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-600'}`}>
        <p>No analytics data available</p>
      </div>
    );
  }

  const {
    totalRevenue = 0,
    ticketsSold = 0,
    avgTicketPrice = 0,
    conversionRate = 0,
    ticketTypeDistribution = [],
    bookingFunnel = {}
  } = analyticsData;

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
            {events.map((event) => (
              <option key={event._id} value={event._id}>
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
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Apply Filters'}
          </button>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          change="Live"
          isDark={isDark}
        />

        <StatCard
          title="Total Tickets Sold"
          value={ticketsSold}
          subtitle="From confirmed bookings"
          isDark={isDark}
        />

        <StatCard
          title="Avg Ticket Price"
          value={`₹${avgTicketPrice}`}
          subtitle="Per ticket"
          isDark={isDark}
        />

        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
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

          {ticketTypeDistribution.length === 0 ? (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No ticket data available
            </p>
          ) : (
            ticketTypeDistribution.map((item) => (
              <Distribution
                key={item.label}
                label={item.label}
                percent={item.percent}
                count={item.count}
                isDark={isDark}
              />
            ))
          )}
        </div>

        {/* Right Column: Booking Funnel (bigger) */}
        <div className={`md:col-span-8 p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Booking Funnel</h2>

          <FunnelRow
            label="Total Bookings"
            value={bookingFunnel.totalBookings || 0}
            percent="100%"
            isDark={isDark}
          />
          <FunnelRow
            label="Confirmed Bookings"
            value={bookingFunnel.confirmedBookings || 0}
            percent={`${bookingFunnel.totalBookings > 0 ? ((bookingFunnel.confirmedBookings / bookingFunnel.totalBookings) * 100).toFixed(1) : 0}%`}
            isDark={isDark}
          />
          <FunnelRow
            label="Cancelled Bookings"
            value={bookingFunnel.cancelledBookings || 0}
            percent={`${bookingFunnel.totalBookings > 0 ? ((bookingFunnel.cancelledBookings / bookingFunnel.totalBookings) * 100).toFixed(1) : 0}%`}
            isDark={isDark}
          />
          <FunnelRow
            label="Total Revenue"
            value={`₹${(bookingFunnel.totalRevenue || 0).toLocaleString()}`}
            percent={`${conversionRate}%`}
            isDark={isDark}
          />

          <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Overall Conversion Rate: <b className={isDark ? 'text-white' : 'text-gray-900'}>{conversionRate}%</b> from total bookings to confirmed bookings
          </p>
        </div>

      </div>

      {/* Insights */}
      <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Insights</h2>

        <ul className={`list-disc pl-5 text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <li>
            Your conversion rate is <b>{conversionRate}%</b> for the selected period.
          </li>
          {ticketTypeDistribution.length > 0 && (
            <li>
              {ticketTypeDistribution[0].label} tickets are leading with <b>{ticketTypeDistribution[0].percent}%</b> of total sales.
            </li>
          )}
          <li>
            Total revenue generated: <b>₹{totalRevenue.toLocaleString()}</b>
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

function Distribution({ label, percent, count, isDark }) {
  return (
    <div className="mb-3">
      <div className={`flex justify-between text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        <span>{label}</span>
        <span>{percent}% ({count} tickets)</span>
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
