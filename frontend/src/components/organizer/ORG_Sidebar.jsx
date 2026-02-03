// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Calendar,
//   PlusCircle,
//   ClipboardList,
//   Star,
//   BarChart3,
//   Settings
// } from "lucide-react";

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r px-5 py-6">
      
//       <h2 className="text-2xl font-bold mb-8">EventPro</h2>

//       <nav className="space-y-1">
//         <SidebarItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" active={location.pathname === "/"} />
//         <SidebarItem to="/events" icon={<Calendar size={18} />} label="My Events" active={location.pathname === "/events"} />
//         <SidebarItem to="/create-event" icon={<PlusCircle size={18} />} label="Create Event" active={location.pathname === "/create-event"} />
//         <SidebarItem to="/bookings" icon={<ClipboardList size={18} />} label="Bookings" active={location.pathname === "/bookings"}/>
//         <SidebarItem to="/reviews" icon={<Star size={18} />} label="Reviews & Ratings" active={location.pathname === "/reviews"} />
//         <SidebarItem to="/reports" icon={<BarChart3 size={18} />} label="Reports & Analytics" active={location.pathname === "/reports"}/>
//         <SidebarItem to="/settings" icon={<Settings size={18} />} label="Settings" active={location.pathname === "/settings"}/>
//       </nav>
//     </aside>
//   );
// }

// /* Sidebar Item */
// function SidebarItem({ to, icon, label, active }) {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm
//         ${
//           active
//             ? "bg-indigo-100 text-indigo-600 font-medium"
//             : "text-gray-700 hover:bg-gray-100"
//         }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </Link>
//   );
// }



import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
          bg-white border-r h-screen transition-all duration-300 z-40 group
          ${collapsed ? "w-16" : "w-64"} 
          ${mobileOpen ? "fixed" : "lg:relative lg:block hidden"}
          flex flex-col relative
        `}
      >
        {/* Collapse Toggle - Desktop Only */}
        <div className="hidden lg:flex absolute -right-4 top-6 z-10">
          <button
            className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-gray-50"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} className="text-gray-600" /> : <ChevronLeft size={14} className="text-gray-600" />}
          </button>
        </div>

        {/* Logo */}
        <div className="p-4">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <img 
                src="/new_icon_favicon.png" 
                alt="EventHub Logo" 
                className="w-9 h-9 rounded-lg"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800">EventHub</h2>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Organizer</p>
              </div>
            </div>
          )}
          {collapsed && (
            <img 
              src="/new_icon_favicon.png" 
              alt="EventHub Logo" 
              className="w-8 h-8 rounded-lg mx-auto"
            />
          )}
        </div>

        <nav className="flex-1 space-y-1 px-2 pb-4">
          <SidebarItem
            to="/"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={location.pathname === "/"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/events"
            icon={<Calendar size={18} />}
            label="My Events"
            active={location.pathname === "/events"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/create-event"
            icon={<PlusCircle size={18} />}
            label="Create Event"
            active={location.pathname === "/create-event"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/bookings"
            icon={<ClipboardList size={18} />}
            label="Bookings"
            active={location.pathname === "/bookings"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/reviews"
            icon={<Star size={18} />}
            label="Reviews & Ratings"
            active={location.pathname === "/reviews"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/reports"
            icon={<BarChart3 size={18} />}
            label="Reports & Analytics"
            active={location.pathname === "/reports"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/settings"
            icon={<Settings size={18} />}
            label="Settings"
            active={location.pathname === "/settings"}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
        </nav>
      </aside>
    </>
  );
}

/* Sidebar Item */
function SidebarItem({ to, icon, label, active, collapsed, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors
        ${
          active
            ? "bg-indigo-100 text-indigo-600 font-medium"
            : "text-gray-700"
        }`}
    >
      {icon}
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
