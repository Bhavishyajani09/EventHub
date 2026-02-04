import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import Dashboard from './ADMIN_Dashboard';
import Organizers from './ADMIN_Organizers';
import Settings from './ADMIN_Settings';
import AdminUserManagement from './AdminUserManagement';
import AdminEvents from './AdminEvents';
import AdminBooking from './adminBooking';
import SharedNavbar from '../../SharedNavbar';

const AdminPanel = ({ user, onLogout }) => {
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
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar
        user={user}
        hideNavigation={true}
        pageTitle="Admin Panel"
        hideThemeToggle={true}
        onNavigate={(path) => {
          if (path === 'home') setActiveTab('dashboard');
          if (path === 'settings') setActiveTab('settings');
        }}
        onAuthOpen={() => { }}
        onProfileClick={() => setActiveTab('settings')}
        onLogout={onLogout}
      />
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </AdminLayout>
    </div>
  );
};

export default AdminPanel;