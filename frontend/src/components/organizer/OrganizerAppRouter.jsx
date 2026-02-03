import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import OrganizerLayout from './OrganizerLayout';
import Dashboard from './ORG_Dashboard';
import MyEvents from './ORG_MyEvents_New';
import CreateEvent from './ORG_CreateEvent_New';
import BookingsManagement from './ORG_BookingsManagement_New';
import ReviewsRatings from './ORG_ReviewsRatings';
import ReportsAnalytics from './ORG_ReportsAnalytics';
import Settings from './ORG_Settings';

function OrganizerAppRouter() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/');
  };

  return (
    <OrganizerLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<MyEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/bookings" element={<BookingsManagement />} />
        <Route path="/reviews" element={<ReviewsRatings />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </OrganizerLayout>
  );
}

export default OrganizerAppRouter;