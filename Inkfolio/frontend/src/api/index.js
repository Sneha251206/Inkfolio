import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach Authorization header if token exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('inkfolio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Authentication API methods
export const loginUser = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async ({ name, email, password, is_author }) => {
  const response = await api.post('/auth/register', {
    name,
    email,
    password,
    role: is_author ? 'author' : 'reader',
    is_author: !!is_author,
  });
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Editorial Content API methods
export const fetchArticles = async () => {
  try {
    const response = await api.get('/articles');
    return response.data;
  } catch (error) {
    console.warn('Backend API offline or unreachable, using local fallback state:', error?.message || error);
    return null;
  }
};

export const fetchArticleById = async (id) => {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend API offline, using fallback for article:', id, error?.message || error);
    return null;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await api.post('/articles', articleData);
    return response.data;
  } catch (error) {
    console.error('Error creating article on backend:', error);
    throw error;
  }
};

export const fetchAnalyticsOverview = async () => {
  try {
    const response = await api.get('/analytics/overview');
    return response.data;
  } catch (error) {
    return null;
  }
};

export default api;
