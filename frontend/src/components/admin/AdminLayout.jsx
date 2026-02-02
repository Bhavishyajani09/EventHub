import React, { useState } from 'react';
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

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'organizers', label: 'Organizers', icon: UserCheck },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'bookings', label: 'Bookings', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex bg-gray-50" style={{ minHeight: 'calc(100vh - 70px)' }}>
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
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-8 py-4 text-left hover:bg-blue-50 transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <Icon size={22} className={`${activeTab === item.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'} transition-colors duration-200`} />
                <span className="ml-4 text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-100">
          <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group">
            <LogOut size={20} className="text-gray-500 group-hover:text-red-600 transition-colors duration-200" />
            <span className="ml-4 text-base">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;