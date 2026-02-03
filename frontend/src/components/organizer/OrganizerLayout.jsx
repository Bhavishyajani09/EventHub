import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './ORG_Sidebar';
import SharedNavbar from '../../SharedNavbar';

const OrganizerLayout = ({ children, user, onLogout }) => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        hideNavigation={true}
        pageTitle="Organizer Panel"
        hideThemeToggle={true}
        hideProfileOption={true}
        onNavigate={(path) => {
          if (path === 'home') navigate('/');
          if (path === 'settings') navigate('/settings');
        }}
        onAuthOpen={() => { }}
        onProfileClick={() => navigate('/settings')}
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