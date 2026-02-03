import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserAppRouter from "./components/user/USER_AppRouter";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<UserAppRouter />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;