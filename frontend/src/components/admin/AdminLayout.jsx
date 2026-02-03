import React, { useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import SharedNavbar from '../../SharedNavbar';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = ({ children, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'organizers', label: 'Organizers', icon: UserCheck, path: '/organizers' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/events' },
    { id: 'bookings', label: 'Bookings', icon: BookOpen, path: '/bookings' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        hideNavigation={true}
        pageTitle="Admin Panel"
        hideThemeToggle={true}
        hideProfileOption={true}
        enableDropdown={true}
        onNavigate={(path) => {
          if (path === 'home') navigate('/dashboard');
          if (path === 'settings') navigate('/settings');
        }}
        onAuthOpen={() => { }}
        onProfileClick={() => navigate('/settings')}
        onLogout={onLogout}
      />
      <div className="flex" style={{ minHeight: 'calc(100vh - 70px)' }}>
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          bg-white shadow-lg transition-all duration-300 z-40 fixed left-0 top-16
          ${mobileMenuOpen ? 'block' : 'lg:block hidden'}
          w-64
        `} style={{ height: 'calc(100vh - 64px)' }}>
          {/* Navigation */}
          <nav className="py-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center px-8 py-4 text-left hover:bg-blue-50 transition-all duration-200 group ${isActive
                    ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600 font-medium'
                    : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  <Icon size={22} className={`${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'} transition-colors duration-200`} />
                  <span className="ml-4 text-base">{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;