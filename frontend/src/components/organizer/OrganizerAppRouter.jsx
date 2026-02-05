import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import OrganizerLayout from './OrganizerLayout';
import Dashboard from './ORG_Dashboard';
import MyEvents from './ORG_MyEvents_New';
import CreateEvent from './ORG_CreateEvent_New';
import EditEvent from './ORG_edit';
import BookingsManagement from './ORG_BookingsManagement_New';
import ReviewsRatings from './ORG_ReviewsRatings';
import ReportsAnalytics from './ORG_ReportsAnalytics';
import Settings from './ORG_Settings';

function OrganizerAppRouter() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/');
  };

  const handleNavigate = (page) => {
    const routes = {
      'dashboard': '/dashboard',
      'myEvents': '/events',
      'createEvent': '/create-event',
      'bookings': '/bookings',
      'reviews': '/reviews',
      'reports': '/reports',
      'settings': '/settings'
    };

    const route = routes[page] || '/dashboard';
    navigate(route);
  };

  return (
    <OrganizerLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard isDark={isDark} onNavigate={handleNavigate} />} />
        <Route path="/events" element={<MyEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
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