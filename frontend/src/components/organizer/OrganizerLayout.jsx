import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './ORG_Sidebar';
import SharedNavbar from '../../SharedNavbar';

const OrganizerLayout = ({ children, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SharedNavbar
        user={user}
        hideNavigation={true}
        pageTitle="Organizer Panel"
        hideProfileOption={true}
        enableDropdown={true}
        hideThemeToggle={true}
        onNavigate={(path) => {
          if (path === 'home') navigate('/dashboard');
          if (path === 'settings') navigate('/settings');
        }}
        onAuthOpen={() => { }}
        onProfileClick={() => navigate('/settings')}
        onLogout={onLogout}
      />
      <div className="flex">
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 p-3 sm:p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OrganizerLayout;