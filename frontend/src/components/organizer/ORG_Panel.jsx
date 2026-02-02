import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ORG_Sidebar from './ORG_Sidebar';
import ORG_Dashboard from './ORG_Dashboard';
import ORG_CreateEvent from './ORG_CreateEvent';
import ORG_MyEvents from './ORG_MyEvents';
import ORG_BookingsManagement from './ORG_BookingsManagement';
import ORG_ReportsAnalytics from './ORG_ReportsAnalytics';
import ORG_ReviewsRatings from './ORG_ReviewsRatings';
import ORG_Settings from './ORG_Settings';
import ORG_Navbar from './ORG_Navbar';

const ORG_Panel = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ORG_Navbar />
      <div className="flex">
        <ORG_Sidebar />
        <div className="flex-1">
          <div className="p-6">
            <Routes>
              <Route path="/" element={<ORG_Dashboard />} />
              <Route path="/events" element={<ORG_MyEvents />} />
              <Route path="/create-event" element={<ORG_CreateEvent />} />
              <Route path="/bookings" element={<ORG_BookingsManagement />} />
              <Route path="/reviews" element={<ORG_ReviewsRatings />} />
              <Route path="/reports" element={<ORG_ReportsAnalytics />} />
              <Route path="/settings" element={<ORG_Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ORG_Panel;