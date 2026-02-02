import React from 'react';

const AdminNavbar = ({ activeSection, setActiveSection }) => {
  const getIcon = (iconType, isActive) => {
    const iconClass = `w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-600'}`;
    
    switch(iconType) {
      case 'users':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'events':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'bookings':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'logout':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        );
      default:
        return null;
    }
  };

  const menuItems = [
    { id: 'users', label: 'Users' },
    { id: 'events', label: 'Events' },
    { id: 'bookings', label: 'Bookings' }
  ];

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 flex flex-col shadow-sm border-r border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">⚡</span>
          </div>
          <span className="font-bold text-lg text-gray-900">EventHub</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-3 w-full px-4 py-3 mb-2 rounded-lg text-left transition-all duration-200 ${
              activeSection === item.id 
                ? 'bg-indigo-50 text-indigo-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            {getIcon(item.id, activeSection === item.id)}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="px-4 pb-6 border-t border-gray-100 pt-4">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
          {getIcon('logout', false)}
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;