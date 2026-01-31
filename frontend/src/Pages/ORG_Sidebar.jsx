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
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); // collapse state

  return (
    <div className="flex">
      {/* ===== Sidebar ===== */}
      <aside
        className={`
          bg-white mt-4 border-r h-screen transition-all duration-300
          ${collapsed ? "w-16" : "w-64"} flex flex-col
          relative
        `}
      >
        {/* ===== Collapse Button ===== */}
        <button
          className="absolute -right-3 top-4 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-indigo-700 z-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* ===== Logo ===== */}
        {!collapsed && (
          <h2 className="text-2xl font-bold mb-8 px-2">EventPro</h2>
        )}

        {/* ===== Navigation ===== */}
        <nav className="flex-1 space-y-1 px-2">
          <SidebarItem
            to="/"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={location.pathname === "/"}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/events"
            icon={<Calendar size={18} />}
            label="My Events"
            active={location.pathname === "/events"}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/create-event"
            icon={<PlusCircle size={18} />}
            label="Create Event"
            active={location.pathname === "/create-event"}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/bookings"
            icon={<ClipboardList size={18} />}
            label="Bookings"
            active={location.pathname === "/bookings"}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/reviews"
            icon={<Star size={18} />}
            label="Reviews & Ratings"
            active={location.pathname === "/reviews"}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/reports"
            icon={<BarChart3 size={18} />}
            label="Reports & Analytics"
            active={location.pathname === "/reports"}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/settings"
            icon={<Settings size={18} />}
            label="Settings"
            active={location.pathname === "/settings"}
            collapsed={collapsed}
          />
        </nav>
      </aside>
    </div>
  );
}

/* ===== Sidebar Item ===== */
function SidebarItem({ to, icon, label, active, collapsed }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100
        ${active ? "bg-indigo-100 text-indigo-600 font-medium" : "text-gray-700"}
      `}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
