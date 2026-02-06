import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Ticket,
  Calendar,
  IndianRupee,
  PlusCircle,
  Users,
  ArrowRight,
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Search
} from "lucide-react";
import organizerService from "../../services/organizerService";
import { useAuth } from "../../context/AuthContext";

const Dashboard = ({ isDark, onNavigate }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEvents: 0,
    publishedEvents: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.role === 'organizer') {
      fetchDashboardData();
    } else {
      setError('Please login as an organizer to view dashboard');
      setLoading(false);
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch multiple data points in parallel
      const [statsRes, bookingsRes, eventsRes] = await Promise.all([
        organizerService.getDashboardStats(),
        organizerService.getAllBookings(),
        organizerService.getMyEvents()
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (bookingsRes.success) setRecentBookings(bookingsRes.bookings.slice(0, 5));
      if (eventsRes.success) {
        const published = (eventsRes.events || [])
          .filter(e => e.isPublished)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setUpcomingEvents(published.slice(0, 4));
      }
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Setting up your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 animate-fadeIn">
      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Dashboard
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Welcome back, <span className="font-normal text-indigo-600">{user?.name}</span>! Here's a summary of your performance.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate && onNavigate('createEvent')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
          >
            <PlusCircle size={18} />
            <span className="font-normal text-sm">Create Event</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={<IndianRupee size={20} />}
          color="#6366f1"
          bgColor="bg-indigo-50"
          isDark={isDark}
          trend="+12.5%"
          isUp={true}
          onClick={() => onNavigate && onNavigate('reports')}
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<Ticket size={20} />}
          color="#8b5cf6"
          bgColor="bg-purple-50"
          isDark={isDark}
          trend="+8.2%"
          isUp={true}
          onClick={() => onNavigate && onNavigate('bookings')}
        />
        <StatCard
          title="Live Events"
          value={stats.publishedEvents}
          icon={<Calendar size={20} />}
          color="#10b981"
          bgColor="bg-emerald-50"
          isDark={isDark}
          onClick={() => onNavigate && onNavigate('myEvents')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Bookings Section */}
        <div className={`lg:col-span-8 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm flex flex-col`}>
          <div className="p-5 border-b border-inherit flex items-center justify-between">
            <h2 className={`font-medium text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Bookings</h2>
            <button
              onClick={() => onNavigate && onNavigate('bookings')}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1 group"
            >
              View All
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            {recentBookings.length > 0 ? (
              <table className="w-full text-left">
                <thead className={isDark ? 'bg-gray-900/50' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-5 py-3 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Customer</th>
                    <th className={`px-5 py-3 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Event</th>
                    <th className={`px-5 py-3 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Amount</th>
                    <th className={`px-5 py-3 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit">
                  {recentBookings.map((booking) => (
                    <tr key={booking._id} className={`${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-[10px] ${isDark ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                            {booking.user?.name?.charAt(0)}
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.user?.name}</div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{booking.user?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-5 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {booking.event?.title}
                      </td>
                      <td className={`px-5 py-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ₹{booking.totalAmount?.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                  <Ticket size={24} />
                </div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No recent bookings found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Live Events */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Actions Card */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} shadow-sm`}>
            <h2 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <ActionButton
                label="New Event"
                icon={<PlusCircle size={20} />}
                onClick={() => onNavigate('createEvent')}
                color="indigo"
                isDark={isDark}
              />
              <ActionButton
                label="Reports"
                icon={<BarChart3 size={20} />}
                onClick={() => onNavigate('reports')}
                color="pink"
                isDark={isDark}
              />
              <ActionButton
                label="Bookings"
                icon={<ClipboardList size={20} />}
                onClick={() => onNavigate('bookings')}
                color="blue"
                isDark={isDark}
              />
              <ActionButton
                label="My Events"
                icon={<Calendar size={20} />}
                onClick={() => onNavigate('myEvents')}
                color="emerald"
                isDark={isDark}
              />
            </div>
          </div>

          {/* Upcoming Events Mini List */}
          <div className={`p-5 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
            <h2 className={`font-semibold text-base mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Upcoming Highlights</h2>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                <div key={event._id} className="flex items-center gap-3">
                  <img
                    src={event.image || 'https://via.placeholder.com/150'}
                    alt={event.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{event.title}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={12} className="text-gray-400" />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('myEvents')}
                    className={`p-1.5 rounded-lg border flex items-center justify-center hover:scale-110 active:scale-95 transition-all ${isDark ? 'border-gray-700 bg-gray-700 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
                    <ExternalLink size={14} />
                  </button>
                </div>
              )) : (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No upcoming live events.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Sub-components
function StatCard({ title, value, icon, color, bgColor, isDark, trend, isUp, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative group border rounded-2xl p-5 flex flex-col gap-3 transition-all cursor-pointer ${isDark
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
        : 'bg-white border-gray-100 hover:border-indigo-100 hover:shadow-md'
        }`}
    >
      <div className="flex justify-between items-center">
        <div className={`p-2.5 rounded-xl flex items-center justify-center`} style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : bgColor }}>
          <div style={{ color: color }}>{icon}</div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${isUp
            ? (isDark ? 'bg-green-400/10 text-green-400' : 'bg-green-50 text-green-600')
            : (isDark ? 'bg-red-400/10 text-red-400' : 'bg-red-50 text-red-600')
            }`}>
            {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <h2 className={`text-xs font-normal uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h2>
        <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h1>
      </div>
    </div>
  );
}

function ActionButton({ label, icon, onClick, color, isDark }) {
  const colorMap = {
    indigo: { light: 'bg-indigo-50 text-indigo-600', dark: 'bg-indigo-900/20 text-indigo-400' },
    pink: { light: 'bg-pink-50 text-pink-600', dark: 'bg-pink-900/20 text-pink-400' },
    blue: { light: 'bg-blue-50 text-blue-600', dark: 'bg-blue-900/20 text-blue-400' },
    emerald: { light: 'bg-emerald-50 text-emerald-600', dark: 'bg-emerald-900/20 text-emerald-400' },
  };

  const colors = colorMap[color] || colorMap.indigo;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:bg-opacity-80 active:scale-95 ${isDark ? colors.dark : colors.light}`}
    >
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
    </button>
  );
}

// Missing Lucide import in previous context
const ClipboardList = ({ size, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
  </svg>
);

export default Dashboard;
