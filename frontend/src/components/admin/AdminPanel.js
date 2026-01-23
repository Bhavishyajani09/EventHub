import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
      case 'organizers':
      case 'events':
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
            <p className="text-gray-600">This section will be implemented in future updates.</p>
          </div>
        );
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