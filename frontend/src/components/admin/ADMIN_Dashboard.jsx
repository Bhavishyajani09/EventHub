import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, UserCheck, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_URL } from '../../config';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalOrganizers: 0,
    totalEvents: 0,
    totalBookings: 0,
    categoryStats: [],
    usersGrowth: 0,
    organizersGrowth: 0,
    eventsGrowth: 0,
    bookingsGrowth: 0
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`${API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setStatsData({
            ...response.data.stats,
            categoryStats: response.data.categoryStats || []
          });
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
      change: `+${statsData.usersGrowth}%`,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      path: '/users'
    },
    {
      title: 'Total Organizers',
      value: statsData.totalOrganizers,
      change: `+${statsData.organizersGrowth}%`,
      icon: UserCheck,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      path: '/organizers'
    },
    {
      title: 'Total Events',
      value: statsData.totalEvents,
      change: `+${statsData.eventsGrowth}%`,
      icon: Calendar,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      path: '/events'
    },
    {
      title: 'Total Bookings',
      value: statsData.totalBookings,
      change: `+${statsData.bookingsGrowth}%`,
      icon: BookOpen,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      path: '/bookings'
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
            <div
              key={index}
              className="rounded-lg shadow-sm p-6 border cursor-pointer hover:shadow-md transition-shadow transition-colors duration-200 bg-white border-gray-200"
              onClick={() => navigate(stat.path)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
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
        {/* Events by Category */}
        <div className="rounded-lg shadow-sm p-6 border transition-colors duration-200 bg-white border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Events by Category</h3>
          {statsData.categoryStats && statsData.categoryStats.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsData.categoryStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="_id"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statsData.categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e5e7eb',
                      borderRadius: '0.5rem',
                      color: '#1f2937'
                    }}
                    itemStyle={{ color: '#1f2937' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p>No events found</p>
            </div>
          )}
        </div>

        {/* Recent Events */}
        <div className="rounded-lg shadow-sm border transition-colors duration-200 bg-white border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Recent Events</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentEvents.length > 0 ? (
                recentEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">by {event.organizer?.name || 'Unknown'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{new Date(event.date).toLocaleDateString()}</p>
                      <p className={`text-sm text-gray-600`}>{event.location}</p>
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