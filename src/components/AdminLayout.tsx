import React, { useContext, useState, useEffect } from 'react';
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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || 'A';
  };

  const navigationItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '⭕' },
    { path: '/admin/users', label: 'Officers', icon: '👥' },
    { path: '/admin/api-modules', label: 'Registrations', icon: '👥' },
    { path: '/admin/rate-plans', label: 'Query History', icon: '🔍' },
    { path: '/admin/logs', label: 'Credits & Billing', icon: '💳' },
    { path: '/admin/manual-requests', label: 'API Management', icon: '⚙️' },
    { path: '/admin/broadcasts', label: 'Live Requests', icon: '📈' },
  ];

  return (
    <div className="admin-layout">
      
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">⚡</div>
            <div>
              <div className="logo-text">PickMe</div>
              <div className="logo-subtitle">Intelligence</div>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '1rem' }}>
          <button
            onClick={handleLogout}
            className="nav-item"
            style={{ 
              width: '100%', 
              border: 'none', 
              background: 'none',
              textAlign: 'left',
              color: 'var(--secondary-color)'
            }}
          >
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <h1 className="header-title">Admin Control Panel</h1>
          </div>
          
          <div className="header-right">
            <div className="system-status">
              <div className="status-dot"></div>
              <span className="status-text">System Online</span>
            </div>
            
            <div className="header-actions">
              <button className="theme-toggle" onClick={toggleTheme}>
                {isDark ? '☀️' : '🌙'}
              </button>
              
              <div className="user-profile">
                <div className="user-avatar">{getUserInitials()}</div>
                <div className="user-info">
                  <div className="user-name">
                    {user?.first_name || user?.username} {user?.last_name}
                  </div>
                  <div className="user-role">admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;