import React from 'react';
import { Users, UserCheck, Calendar, BookOpen, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,456',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Organizers',
      value: '342',
      change: '+8.2%',
      icon: UserCheck,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Events',
      value: '1,284',
      change: '+23.1%',
      icon: Calendar,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Bookings',
      value: '8,932',
      change: '+15.3%',
      icon: BookOpen,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const topEvents = [
    { name: 'Tech Conference 2024', bookings: 1250, revenue: '$375,000', platformFee: '$18,750' },
    { name: 'Music Festival', bookings: 980, revenue: '$147,000', platformFee: '$7,350' },
    { name: 'Business Summit', bookings: 750, revenue: '$337,500', platformFee: '$16,875' },
    { name: 'Art Exhibition', bookings: 420, revenue: '$31,500', platformFee: '$1,650' }
  ];

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
        {/* Events by Category */}
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

        {/* Platform Revenue */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Platform Revenue</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.name}</h4>
                    <p className="text-sm text-gray-600">{event.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{event.platformFee}</p>
                    <p className="text-sm text-gray-600">Platform Fee (5%)</p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Platform Revenue</span>
                  <span className="font-bold text-green-600 text-lg">$44,625</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;