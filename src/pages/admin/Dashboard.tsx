import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { userApi, userLogApi, manualRequestApi } from '../../services/api';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCredits: 0,
    pendingRequests: 0
  });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersResponse = await userApi.getUsers();
        const users = usersResponse.data;
        
        // Calculate stats
        const activeUsers = users.filter((user: any) => user.is_active && user.user_type === 'officer').length;
        const totalUsers = users.filter((user: any) => user.user_type === 'officer').length;
        const totalCredits = users.reduce((sum: number, user: any) => sum + user.credits, 0);
        
        // Fetch pending requests
        const requestsResponse = await manualRequestApi.getManualRequests();
        const pendingRequests = requestsResponse.data.filter((req: any) => req.status === 'pending').length;
        
        // Fetch recent logs
        const logsResponse = await userLogApi.getUserLogs();
        const recentLogs = logsResponse.data.slice(0, 10);
        
        setStats({
          totalUsers,
          activeUsers,
          totalCredits,
          pendingRequests
        });
        
        setRecentLogs(recentLogs);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div className="loading-spinner"></div>
          <div style={{ color: 'var(--text-muted)' }}>Loading dashboard data...</div>
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'active',
      'processing': 'processing',
      'success': 'success',
      'failed': 'failed',
      'suspended': 'suspended',
      'pending': 'processing'
    };
    return statusMap[status] || 'neutral';
  };

  if (loading) {
    return (
      <AdminLayout title="Intelligence Dashboard">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div className="loading-spinner"></div>
          <div style={{ color: 'var(--text-muted)' }}>Loading dashboard data...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Intelligence Dashboard">
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: 'var(--secondary-color)',
          padding: '1rem',
          borderRadius: '0.5rem',
          textAlign: 'center'
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: 'var(--secondary-color)',
          padding: '1rem',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Intelligence Dashboard">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: 'var(--text-primary)',
          margin: '0 0 0.5rem 0'
        }}>
          Intelligence Dashboard
        </h1>
        <p style={{ 
          color: 'var(--text-muted)', 
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          Real-time overview of system operations
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: 'var(--primary-color)'
          }}>
            Last Updated: Jul 14, 2025 01:32
            <div style={{
              width: '0.5rem',
              height: '0.5rem',
              backgroundColor: 'var(--primary-color)',
              borderRadius: '50%'
            }}></div>
          </span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">Total Officers</div>
            <div className="stat-icon users">👥</div>
          </div>
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-change positive">+12% from last month</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">Active Officers</div>
            <div className="stat-icon shield">🛡️</div>
          </div>
          <div className="stat-value">{stats.activeUsers}</div>
          <div className="stat-change positive">91% online rate</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">Queries Today</div>
            <div className="stat-icon search">🔍</div>
          </div>
          <div className="stat-value">1247</div>
          <div className="stat-change positive">+8% from yesterday</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">Success Rate</div>
            <div className="stat-icon trending">📈</div>
          </div>
          <div className="stat-value">95%</div>
          <div className="stat-change positive">95.3% accuracy</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">Credits Used</div>
            <div className="stat-icon credit">💳</div>
          </div>
          <div className="stat-value">{formatNumber(stats.totalCredits)}</div>
          <div className="stat-change positive">₹48,760 revenue</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">Avg Response Time</div>
            <div className="stat-icon clock">⏱️</div>
          </div>
          <div className="stat-value">1.8s</div>
          <div className="stat-change positive">15% faster</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">Active APIs</div>
            <div className="stat-icon activity">📡</div>
          </div>
          <div className="stat-value">12</div>
          <div className="stat-change positive">All operational</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">System Status</div>
            <div className="stat-icon zap">⚡</div>
          </div>
          <div className="stat-value">Optimal</div>
          <div className="stat-change positive">99.9% uptime</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Recent Officers */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-title">
              👥 Recent Officers
            </div>
          </div>
          <div className="section-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    RK
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      Inspector Ramesh Kumar
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      +91 9791103607
                    </div>
                  </div>
                </div>
                <span className="status-badge active">Active</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #047857)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    PS
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      ASI Priya Sharma
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      +91 9876543210
                    </div>
                  </div>
                </div>
                <span className="status-badge active">Active</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    RP
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      SI Rajesh Patel
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      +91 9123456789
                    </div>
                  </div>
                </div>
                <span className="status-badge suspended">Suspended</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Requests */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-title">
              📡 Live Requests
            </div>
          </div>
          <div className="section-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                    +91 9791103607 <span style={{ 
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>PRO</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Phone Credit History
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    2025-06-28 16:25
                  </div>
                </div>
                <span className="status-badge processing">Processing</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                    +91 9876543210 <span style={{ 
                      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                      color: 'white',
        <div>
          {/* Page Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: 'var(--text-primary)',
              margin: '0 0 0.5rem 0'
            }}>
              Intelligence Dashboard
            </h1>
            <p style={{ 
              color: 'var(--text-muted)', 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              Real-time overview of system operations
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--primary-color)'
              }}>
                Last Updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '50%'
                }}></div>
              </span>
            </p>
          </div>

                      borderRadius: '0.25rem',
          <div className="dashboard-grid">
                      fontWeight: '600'
              <div className="stat-header">
                <div className="stat-label">Total Officers</div>
                <div className="stat-icon users">👥</div>
              </div>
                  </div>
              <div className="stat-change positive">+12% from last month</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Social Media Profile
                  </div>
              <div className="stat-header">
                <div className="stat-label">Active Officers</div>
                <div className="stat-icon shield">🛡️</div>
              </div>
                    2025-06-28 16:24
              <div className="stat-change positive">91% online rate</div>
                  </div>
                </div>
                <span className="status-badge success">Success</span>
              <div className="stat-header">
                <div className="stat-label">Total Credits</div>
                <div className="stat-icon credit">💳</div>
              </div>
            </div>
              <div className="stat-change positive">₹48,760 revenue</div>
          </div>
        </div>
      </div>
              <div className="stat-header">
                <div className="stat-label">Pending Requests</div>
                <div className="stat-icon clock">⏱️</div>
              </div>
      {/* Recent Activity Table */}
              <div className="stat-change neutral">Awaiting review</div>
      {recentLogs.length > 0 && (
        <div className="section-card" style={{ marginTop: '1.5rem' }}>
          <div className="section-header">
                  className="btn-primary"
                <tbody>
            <button 
              onClick={() => navigate('/admin/logs')}
              className="btn-secondary"
                        <td style={{ fontWeight: '600' }}>
            >
              View All Logs
                        <td>
          </div>
          <div style={{ overflowX: 'auto' }}>
                        <td style={{ maxWidth: '200px' }}>
              padding: '1.5rem', 
              borderBottom: '1px solid var(--border-color)',
                        <td>
              alignItems: 'center',
              justifyContent: 'space-between'
                        <td style={{ fontSize: '0.875rem' }}>
              <thead>
              {recentLogs.length > 0 && (
                <button 
                  onClick={() => navigate('/admin/logs')}
                  className="btn-secondary"
                  style={{ fontSize: '0.875rem' }}
                      <td colSpan={5} style={{ 
                        padding: '2rem', 
                        textAlign: 'center', 
                        color: 'var(--text-muted)' 
                      }}>
                  View All Logs
                </button>
              )}
                <tr>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;