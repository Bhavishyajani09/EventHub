import React, { useState, useEffect } from "react";
import { BarChart3, Ticket, Calendar, DollarSign } from "lucide-react";
import organizerService from "../../services/organizerService";
import { useAuth } from "../../context/AuthContext";

const Dashboard = ({ isDark }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEvents: 0,
    publishedEvents: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Debug: Check authentication
    console.log('Current user:', user);
    console.log('Token in sessionStorage:', sessionStorage.getItem('token'));

    if (user && user.role === 'organizer') {
      fetchDashboardStats();
    } else {
      setError('Please login as an organizer to view dashboard');
      setLoading(false);
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await organizerService.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      setError('Failed to load dashboard stats');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchDashboardStats}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
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
          value={stats.totalEvents}
          icon={<Calendar size={24} />}
          bgColor="bg-blue-600 text-white"
          isDark={isDark}
        />

        <StatCard
          title="Published Events"
          value={stats.publishedEvents}
          icon={<Ticket size={24} />}
          bgColor="bg-green-600 text-white"
          isDark={isDark}
        />

        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<BarChart3 size={24} />}
          bgColor="bg-purple-600 text-white"
          isDark={isDark}
        />

        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          bgColor="bg-red-600 text-white"
          isDark={isDark}
        />
      </div>
    </div>
  );
};

function StatCard({ title, value, icon, bgColor, isDark }) {
  return (
    <div className={`group border rounded-xl p-4 sm:p-5 flex flex-col gap-2 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl ${isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-indigo-200'}`}>
      <div className="flex justify-between items-start">
        <h2 className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</h2>
        <div className={`p-2 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${bgColor}`}>
          {icon}
        </div>
      </div>
      <h1 className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h1>
    </div>
  );
}

export default Dashboard;