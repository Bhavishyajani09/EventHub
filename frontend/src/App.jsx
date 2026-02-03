import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainRouter from "./components/MainRouter";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<MainRouter />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;