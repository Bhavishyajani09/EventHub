import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import Dashboard from './ADMIN_Dashboard';
import Organizers from './ADMIN_Organizers';
import Settings from './ADMIN_Settings';
import AdminUserManagement from './AdminUserManagement';
import AdminEvents from './AdminEvents';
import AdminBooking from './adminBooking';
import AdminNotFound from './ADMIN_NotFound';

function AdminAppRouter() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organizers" element={<Organizers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<AdminUserManagement />} />
        <Route path="/events" element={<AdminEvents />} />
        <Route path="/bookings" element={<AdminBooking />} />
        <Route path="*" element={<AdminNotFound />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminAppRouter;