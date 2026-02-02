import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Bell, User, Search, Sun, Moon } from 'lucide-react';

const ORG_Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <nav className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 sm:px-6 py-4 flex items-center justify-between`}>
      {/* Left Side - Logo */}
      <div className="flex items-center gap-3">
        <img 
          src="/new_icon_favicon.png" 
          alt="EventHub Logo" 
          className={`w-14 h-14 rounded-lg ${isDark ? 'filter invert' : ''}`}
        />
        <div className="hidden sm:block">
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>EventHub</h1>
          <p className={`text-xs uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Organizer Panel</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - Hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} size={16} />
          <input
            type="text"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-48 lg:w-64 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Mobile Search Button */}
        <button className={`md:hidden p-2 rounded-lg transition-colors ${
          isDark 
            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        }`}>
          <Search size={20} />
        </button>

        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            isDark 
              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className={`p-2 rounded-lg transition-colors ${
          isDark 
            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        }`}>
          <Bell size={20} />
        </button>

        {/* Profile */}
        <button className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          isDark 
            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        }`}>
          <User size={20} />
          <span className="text-sm font-medium hidden sm:inline">Organizer</span>
        </button>
      </div>
    </nav>
  );
};

export default ORG_Navbar;