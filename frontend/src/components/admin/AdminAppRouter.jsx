import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import Dashboard from './ADMIN_Dashboard';
import Organizers from './ADMIN_Organizers';
import Settings from './ADMIN_Settings';
import AdminUserManagement from './AdminUserManagement';
import AdminEvents from './AdminEvents';
import AdminBooking from './adminBooking';

function AdminAppRouter() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/');
  };

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/organizers" element={<Organizers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<AdminUserManagement />} />
        <Route path="/events" element={<AdminEvents />} />
        <Route path="/bookings" element={<AdminBooking />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminAppRouter;