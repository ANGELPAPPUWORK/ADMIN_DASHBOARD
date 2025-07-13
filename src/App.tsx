import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<div>Users Page</div>} />
          <Route path="/admin/api-modules" element={<div>API Modules Page</div>} />
          <Route path="/admin/rate-plans" element={<div>Rate Plans Page</div>} />
          <Route path="/admin/logs" element={<div>Logs Page</div>} />
          <Route path="/admin/manual-requests" element={<div>Manual Requests Page</div>} />
          <Route path="/admin/broadcasts" element={<div>Broadcasts Page</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;