import React, { useState } from 'react';
import Sidebar from './ORG_Sidebar';
import SharedNavbar from '../../SharedNavbar';

const OrganizerLayout = ({ children, user, onLogout }) => {
  const [isDark, setIsDark] = useState(false);

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
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OrganizerLayout;