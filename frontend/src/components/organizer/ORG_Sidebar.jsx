import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  ClipboardList,
  Star,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const { isDark } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-all duration-300 z-40 group
          ${collapsed ? "w-16" : "w-64"} 
          ${mobileOpen ? "fixed" : "lg:relative lg:block hidden"}
          flex flex-col relative
        `}
      >
        {/* Collapse Toggle - Desktop Only */}
        <div className="hidden lg:flex absolute -right-4 top-6 z-10">
          <button
            className={`w-8 h-8 ${isDark ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'} border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100`}
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} /> : <ChevronLeft size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 pb-4 p-5">
          <SidebarItem
            to="/organizer/"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={location.pathname === "/organizer/"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
            isDark={isDark}
          />
          <SidebarItem
            to="/organizer/events"
            icon={<Calendar size={18} />}
            label="My Events"
            active={location.pathname === "/organizer/events"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
            isDark={isDark}
          />
          <SidebarItem
            to="/organizer/create-event"
            icon={<PlusCircle size={18} />}
            label="Create Event"
            active={location.pathname === "/organizer/create-event"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
            isDark={isDark}
          />
          <SidebarItem
            to="/organizer/bookings"
            icon={<ClipboardList size={18} />}
            label="Bookings"
            active={location.pathname === "/organizer/bookings"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
            isDark={isDark}
          />
          <SidebarItem
            to="/organizer/reviews"
            icon={<Star size={18} />}
            label="Reviews & Ratings"
            active={location.pathname === "/organizer/reviews"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
            isDark={isDark}
          />
          <SidebarItem
            to="/organizer/reports"
            icon={<BarChart3 size={18} />}
            label="Reports & Analytics"
            active={location.pathname === "/organizer/reports"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
            isDark={isDark}
          />
          <SidebarItem
            to="/organizer/settings"
            icon={<Settings size={18} />}
            label="Settings"
            active={location.pathname === "/organizer/settings"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
            isDark={isDark}
          />
        </nav>
      </aside>
    </>
  );
}

/* Sidebar Item */
function SidebarItem({ to, icon, label, active, collapsed, onClick, isDark }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
        ${
          active
            ? "bg-indigo-100 text-indigo-600 font-medium"
            : isDark 
              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
              : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      {icon}
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
