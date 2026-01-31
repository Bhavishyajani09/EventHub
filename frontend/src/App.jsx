import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/organizer/ORG_Sidebar";
import Dashboard from "./components/organizer/ORG_Dashboard";
import MyEvents from "./components/organizer/ORG_MyEvents";
import "./index.css";
import CreateEvent from "./components/organizer/ORG_CreateEvent";
import BookingsManagement from "./components/organizer/ORG_BookingsManagement";
import ReviewsRatings from "./components/organizer/ORG_ReviewsRatings";
import Settings from "./components/organizer/ORG_Settings";
import ReportsAnalytics from "./components/organizer/ORG_ReportsAnalytics";

function App() {
  return (
      <div className="flex">
        <Sidebar />
        <main className="w-full min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<MyEvents />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/bookings" element={<BookingsManagement />} />
            <Route path="/reviews" element={<ReviewsRatings />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
