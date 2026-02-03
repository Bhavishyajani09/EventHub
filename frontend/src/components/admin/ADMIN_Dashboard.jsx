import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserCheck, Calendar, BookOpen, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalOrganizers: 0,
    totalEvents: 0,
    totalBookings: 0
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setStatsData(response.data.stats);
          setRecentEvents(response.data.recentEvents);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: statsData.totalUsers,
      change: '+12.5%', // Mock change for now
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Organizers',
      value: statsData.totalOrganizers,
      change: '+8.2%', // Mock change for now
      icon: UserCheck,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Events',
      value: statsData.totalEvents,
      change: '+23.1%', // Mock change for now
      icon: Calendar,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Bookings',
      value: statsData.totalBookings,
      change: '+15.3%', // Mock change for now
      icon: BookOpen,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp size={16} className="text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${stat.color.replace('bg-', 'text-')} w-6 h-6`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events by Category - Keeping as mock for now or removing if cleaner
            Let's keep it but maybe it's less relevant without real data.
            I'll keep it as a placeholder for future implementation.
         */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Events by Category</h3>
          <div className="space-y-4">
            {[
              { category: 'Technology', count: 425, color: 'bg-purple-500' },
              { category: 'Music', count: 280, color: 'bg-blue-500' },
              { category: 'Business', count: 245, color: 'bg-green-500' },
              { category: 'Art & Culture', count: 180, color: 'bg-orange-500' },
              { category: 'Sports', count: 154, color: 'bg-red-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${item.color} rounded-full mr-3`}></div>
                  <span className="text-sm text-gray-700">{item.category}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events (Replacing Platform Revenue) */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Recent Events</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentEvents.length > 0 ? (
                recentEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">by {event.organizer?.name || 'Unknown'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{new Date(event.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No recent events</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;