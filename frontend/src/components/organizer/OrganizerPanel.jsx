import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Dashboard from './ORG_Dashboard';
import MyEvents from './ORG_MyEvents';
import CreateEvent from './ORG_CreateEvent';
import BookingsManagement from './ORG_BookingsManagement';
import ReviewsRatings from './ORG_ReviewsRatings';
import ReportsAnalytics from './ORG_ReportsAnalytics';
import Settings from './ORG_Settings';
import Sidebar from './ORG_Sidebar';
import SharedNavbar from '../../SharedNavbar';

const OrganizerPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(false);
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'events':
        return <MyEvents />;
      case 'create-event':
        return <CreateEvent />;
      case 'bookings':
        return <BookingsManagement />;
      case 'reviews':
        return <ReviewsRatings />;
      case 'analytics':
        return <ReportsAnalytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar 
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        hideNavigation={true}
        pageTitle="Organizer Panel"
        onNavigate={() => {}}
        onAuthOpen={() => {}}
        onProfileClick={() => {}}
        onLogout={onLogout}
      />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default OrganizerPanel;