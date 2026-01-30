import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import Dashboard from "./Pages/Dashboard";
import MyEvents from "./Pages/MyEvents";
import "./index.css";
import CreateEvent from "./Pages/CreateEvent";
import BookingsManagement from "./Pages/BookingsManagement";
import ReviewsRatings from "./Pages/ReviewsRatings"
import Settings from "./Pages/Settings"
import ReportsAnalytics from "./Pages/ReportsAnalytics";

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
