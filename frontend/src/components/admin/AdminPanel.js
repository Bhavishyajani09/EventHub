import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import Organizers from './Organizers';
import Settings from './Settings';
import AdminUserManagement from '../../pages/admin/AdminUserManagement';
import AdminEvents from '../../pages/admin/AdminEvents';
import AdminBooking from '../adminBooking';

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