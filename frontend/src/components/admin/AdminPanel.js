import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import Dashboard from './ADMIN_Dashboard';
import Organizers from './ADMIN_Organizers';
import Settings from './ADMIN_Settings';
import AdminUserManagement from './AdminUserManagement';
import AdminEvents from './AdminEvents';
import AdminBooking from './adminBooking';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'organizers':
        return <Organizers />;
      case 'settings':
        return <Settings />;
      case 'users':
        return <AdminUserManagement />;
      case 'events':
        return <AdminEvents />;
      case 'bookings':
        return <AdminBooking />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPanel;