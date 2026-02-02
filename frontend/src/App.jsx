import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserAppRouter from "./components/user/USER_AppRouter";
import AdminPanel from "./components/admin/AdminPanel";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/*" element={<UserAppRouter />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
