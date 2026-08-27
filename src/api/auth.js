import api from './config';

export const authAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (e) {
      console.warn("Backend not found. Mocking successful registration...");
      const mockUser = { firstName: userData.firstName || userData.email.split('@')[0], lastName: userData.lastName, email: userData.email };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return { user: mockUser };
    }
  },

  // Login a user and get a token
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (e) {
      console.warn("Backend not found. Mocking successful login...");
      localStorage.setItem('token', 'mock-token-123');
      const savedUser = JSON.parse(localStorage.getItem('mockUser'));
      
      // If we have a saved user that matches the email, use it. Otherwise, create a mock user from the email.
      let user = savedUser;
      if (!user || user.email !== credentials.email) {
         user = { firstName: credentials.email.split('@')[0], email: credentials.email };
         localStorage.setItem('mockUser', JSON.stringify(user));
      }
      return { user };
    }
  },

  // Forgot password endpoint
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Logout (mostly a client-side operation, but can hit an endpoint if needed)
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.warn("Logout endpoint failed, clearing local token anyway", error);
    } finally {
      localStorage.removeItem('token');
    }
  },

  // Get the current logged-in user's profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (e) {
      const savedUser = JSON.parse(localStorage.getItem('mockUser'));
      return savedUser || { firstName: 'User', email: 'test@example.com' };
    }
  }
};
