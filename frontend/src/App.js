import React, { useState } from 'react';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import AdminEvents from './pages/admin/AdminEvents';
import AdminNavbar from './components/layout/AdminNavbar';
import AdminBooking from './components/adminBooking';

function App() {
  const [activeSection, setActiveSection] = useState('users');

  const renderContent = () => {
    switch (activeSection) {
      case 'events':
        return <AdminEvents />;
      case 'users':
        return <AdminUserManagement />;
      case 'bookings':
        return <AdminBooking />;
      default:
        return <AdminUserManagement />;
    }
  };

  return (
    <div className="App flex h-screen bg-gray-50">
      <AdminNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="ml-64 flex-1">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;