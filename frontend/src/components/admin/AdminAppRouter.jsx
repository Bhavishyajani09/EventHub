import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminPanel from './AdminPanel';

function AdminAppRouter() {
  const { user, logout } = useAuth();

  // Handle URL changes for admin routes
  useEffect(() => {
    const path = window.location.pathname;
    if (!path.startsWith('/admin')) {
      window.history.pushState({}, '', '/admin');
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="App">
      <AdminPanel user={user} onLogout={handleLogout} />
    </div>
  );
}

export default AdminAppRouter;