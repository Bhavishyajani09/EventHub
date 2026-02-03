import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import OrganizerPanel from './OrganizerPanel';

function OrganizerAppRouter() {
  const { user, logout } = useAuth();

  // Handle URL changes for organizer routes
  useEffect(() => {
    const path = window.location.pathname;
    if (!path.startsWith('/organizer')) {
      window.history.pushState({}, '', '/organizer');
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="App">
      <OrganizerPanel user={user} onLogout={handleLogout} />
    </div>
  );
}

export default OrganizerAppRouter;