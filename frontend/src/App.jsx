import React from "react";
import LoginAdminPage from "./pages/Admin/AdminLoginPage/AdminLoginPage";
import HomePage from "./pages/Home/Home";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Admin/AdminPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Home/unauthorized";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginadmin" element={<LoginAdminPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
