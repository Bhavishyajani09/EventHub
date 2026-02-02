import React from "react";
import { Routes, Route } from "react-router-dom";
import UserAppRouter from "./components/user/USER_AppRouter";
import AdminPanel from "./components/admin/AdminPanel";
import ORG_Panel from "./components/organizer/ORG_Panel";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminPanel />} />
      <Route path="/organizer/*" element={<ORG_Panel />} />
      <Route path="/*" element={<UserAppRouter />} />
    </Routes>
  );
}

export default App;
