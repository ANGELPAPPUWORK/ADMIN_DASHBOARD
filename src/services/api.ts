// Mock API services for demo
export const userApi = {
  getUsers: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      data: [
        { id: 1, username: 'officer1', first_name: 'John', last_name: 'Doe', user_type: 'officer', is_active: true, credits: 100 },
        { id: 2, username: 'officer2', first_name: 'Jane', last_name: 'Smith', user_type: 'officer', is_active: true, credits: 150 },
        { id: 3, username: 'officer3', first_name: 'Bob', last_name: 'Johnson', user_type: 'officer', is_active: false, credits: 75 },
        { id: 4, username: 'admin1', first_name: 'Admin', last_name: 'User', user_type: 'admin', is_active: true, credits: 500 },
      ]
    };
  }
};

export const userLogApi = {
  getUserLogs: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      data: [
        { id: 1, username: 'officer1', command: 'search', query: 'phone number lookup', credits_used: 5, created_at: new Date().toISOString() },
        { id: 2, username: 'officer2', command: 'verify', query: 'identity verification', credits_used: 3, created_at: new Date().toISOString() },
        { id: 3, username: 'officer1', command: 'lookup', query: 'address search', credits_used: 2, created_at: new Date().toISOString() },
      ]
    };
  }
};

export const manualRequestApi = {
  getManualRequests: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      data: [
        { id: 1, status: 'pending', type: 'verification', created_at: new Date().toISOString() },
        { id: 2, status: 'completed', type: 'lookup', created_at: new Date().toISOString() },
        { id: 3, status: 'pending', type: 'search', created_at: new Date().toISOString() },
      ]
    };
  }
};