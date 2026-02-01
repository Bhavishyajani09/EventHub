import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/organizer/ORG_Sidebar";
import SharedNavbar from "./SharedNavbar";
import AdminPanel from "./components/admin/AdminPanel";
import UserHome from "./components/user/USER_Home";
import "./index.css";

// Lazy load components for better performance
const Dashboard = lazy(() => import("./components/organizer/ORG_Dashboard"));
const MyEvents = lazy(() => import("./components/organizer/ORG_MyEvents"));
const CreateEvent = lazy(() => import("./components/organizer/ORG_CreateEvent"));
const BookingsManagement = lazy(() => import("./components/organizer/ORG_BookingsManagement"));
const ReviewsRatings = lazy(() => import("./components/organizer/ORG_ReviewsRatings"));
const Settings = lazy(() => import("./components/organizer/ORG_Settings"));
const ReportsAnalytics = lazy(() => import("./components/organizer/ORG_ReportsAnalytics"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

function App() {
  const [isDark, setIsDark] = useState(false);
  const [user] = useState({ name: "Organizer" });

  return (
    <Routes>
      {/* User Routes - Default */}
      <Route path="/" element={<UserHome />} />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminPanel />} />
      
      {/* Organizer Routes */}
      <Route path="/organizer/*" element={
        <div className="min-h-screen bg-gray-100">
          <SharedNavbar 
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            hideNavigation={true}
            pageTitle="Organizer Dashboard"
            onNavigate={() => {}}
            onAuthOpen={() => {}}
            onProfileClick={() => {}}
          />
          
          <div className="flex">
            <Sidebar />
            <main className="flex-1 transition-all duration-300 overflow-x-hidden">
              <div className="p-2 sm:p-4 md:p-6 lg:p-8">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/events" element={<MyEvents />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/bookings" element={<BookingsManagement />} />
                    <Route path="/reviews" element={<ReviewsRatings />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/reports" element={<ReportsAnalytics />} />
                  </Routes>
                </Suspense>
              </div>
            </main>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
