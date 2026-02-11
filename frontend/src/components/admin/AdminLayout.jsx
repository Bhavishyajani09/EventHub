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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SharedNavbar
        user={user}
        hideNavigation={true}
        pageTitle="Admin Panel"
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
      <div className="flex" style={{ minHeight: 'calc(100vh - 70px)' }}>
        {/* Mobile Menu Button - Styled like Organizer Sidebar */}
        <button
          className="lg:hidden fixed left-4 top-20 z-[9999] w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X size={20} className="text-gray-600" />
          ) : (
            <Menu size={20} className="text-gray-600" />
          )}
        </button>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-[9998]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            border-r transition-all duration-300 z-[9999]
            ${mobileMenuOpen ? "fixed top-0 left-0 h-screen w-64" : "w-64 lg:sticky lg:top-[70px] lg:h-[calc(100vh-70px)] lg:block hidden"}
            bg-white border-gray-200
            flex flex-col
          `}
        >
          {/* Logo/Header in Sidebar for mobile */}
          <div className="p-6 border-b border-gray-100 lg:hidden">
            <div className="flex items-center gap-3">
              <img
                src="/new_icon_favicon.png"
                alt="EventHub Logo"
                className="w-9 h-9 rounded-lg"
              />
              <div>
                <h2 className="text-base font-semibold text-gray-800">EventHub</h2>
                <p className="text-xs uppercase tracking-wide text-gray-500">Admin</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 py-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center px-6 py-3.5 text-left transition-all duration-200 group ${isActive
                    ? 'border-r-4 font-medium bg-blue-50 text-blue-600 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon size={20} className={`${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'} transition-colors duration-200`} />
                  <span className="ml-3.5 text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout in Sidebar for mobile */}
          <div className="p-4 border-t border-gray-100 lg:hidden">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${mobileMenuOpen ? 'overflow-hidden' : ''}`}>
          <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
