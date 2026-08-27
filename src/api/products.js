import api from './config';

export const productsAPI = {
  // Fetch products with optional pagination
  // params could be { page: 1, limit: 10 }
  fetchProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data; // Expected to return { data: [...], total: ... }
  },

  // Search products by keyword
  searchProducts: async (query) => {
    const response = await api.get('/products/search', {
      params: { q: query }
    });
    return response.data;
  },

  // Filter products by category, price, etc.
  // filters could be { category: 'skincare', minPrice: 10, maxPrice: 50 }
  filterProducts: async (filters = {}) => {
    const response = await api.get('/products/filter', { params: filters });
    return response.data;
  }
};
