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

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading dashboard data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="dashboard-card stat-card">
              <div className="stat-label">Total Officers</div>
              <div className="stat-value">{stats.totalUsers}</div>
            </div>
            
            <div className="dashboard-card stat-card">
              <div className="stat-label">Active Officers</div>
              <div className="stat-value">{stats.activeUsers}</div>
            </div>
            
            <div className="dashboard-card stat-card">
              <div className="stat-label">Total Credits</div>
              <div className="stat-value">{stats.totalCredits}</div>
            </div>
            
            <div className="dashboard-card stat-card">
              <div className="stat-label">Pending Requests</div>
              <div className="stat-value">{stats.pendingRequests}</div>
              {stats.pendingRequests > 0 && (
                <button 
                  onClick={() => navigate('/admin/manual-requests')}
                  className="mt-2 btn-primary text-sm"
                >
                  View Requests
                </button>
              )}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="dashboard-card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="card-title">Recent Activity</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Command
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Query
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentLogs.length > 0 ? (
                    recentLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {log.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.command}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.query.length > 30 ? `${log.query.substring(0, 30)}...` : log.query}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.credits_used}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No recent activity
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {recentLogs.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <button 
                  onClick={() => navigate('/admin/logs')}
                  className="btn-secondary text-sm"
                >
                  View All Logs
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
