import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserAppRouter from './user/USER_AppRouter';
import AdminAppRouter from './admin/AdminAppRouter';
import OrganizerAppRouter from './organizer/OrganizerAppRouter';

const MainRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Route based on user role
  if (user?.role === 'admin') {
    return <AdminAppRouter />;
  } else if (user?.role === 'organizer') {
    return <OrganizerAppRouter />;
  } else {
    // Default to user section (includes non-authenticated users)
    return <UserAppRouter />;
  }
};

export default MainRouter;