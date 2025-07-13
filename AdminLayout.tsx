import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-800' : '';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white" style={{background: 'linear-gradient(180deg, #2c3e90 0%, #4651a5 100%)'}}>
        <div className="p-4">
          <h1 className="text-2xl font-bold app-title">PickMe Intelligence</h1>
          <p className="text-sm panel-name">Admin Panel</p>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className={`flex items-center px-4 py-2 hover:bg-indigo-800 nav-link ${isActive('/admin/dashboard')}`}
          >
            <span className="mx-4">Dashboard</span>
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center px-4 py-2 hover:bg-indigo-800 nav-link ${isActive('/admin/users')}`}
          >
            <span className="mx-4">Users</span>
          </Link>
          <Link
            to="/admin/api-modules"
            className={`flex items-center px-4 py-2 hover:bg-indigo-800 nav-link ${isActive('/admin/api-modules')}`}
          >
            <span className="mx-4">API Modules</span>
          </Link>
          <Link
            to="/admin/rate-plans"
            className={`flex items-center px-4 py-2 hover:bg-indigo-800 nav-link ${isActive('/admin/rate-plans')}`}
          >
            <span className="mx-4">Rate Plans</span>
          </Link>
          <Link
            to="/admin/logs"
            className={`flex items-center px-4 py-2 hover:bg-indigo-800 nav-link ${isActive('/admin/logs')}`}
          >
            <span className="mx-4">Logs</span>
          </Link>
          <Link
            to="/admin/manual-requests"
            className={`flex items-center px-4 py-2 hover:bg-indigo-800 nav-link ${isActive('/admin/manual-requests')}`}
          >
            <span className="mx-4">Manual Requests</span>
          </Link>
          <Link
            to="/admin/broadcasts"
            className={`flex items-center px-4 py-2 hover:bg-indigo-800 nav-link ${isActive('/admin/broadcasts')}`}
          >
            <span className="mx-4">Broadcasts</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm app-header">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex items-center">
              <span className="mr-4">
                {user?.first_name || user?.username} {user?.last_name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 btn-primary"
                style={{backgroundColor: 'var(--secondary-color)'}}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
