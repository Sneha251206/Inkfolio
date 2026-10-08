import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Generous 60s timeout to allow Render free-tier cold starts to spin up without premature aborts
  timeout: 60000,
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

// Automatic retry on timeout or 502-504 gateway wake-up errors for Render cold-starts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || config._hasRetried) {
      return Promise.reject(error);
    }

    const isWakeupError = 
      error.code === 'ECONNABORTED' || 
      !error.response || 
      (error.response?.status >= 502 && error.response?.status <= 504);

    if (isWakeupError) {
      config._hasRetried = true;
      // Wait 2.5 seconds before retrying once while container starts
      await new Promise((resolve) => setTimeout(resolve, 2500));
      return api(config);
    }

    return Promise.reject(error);
  }
);

// Ping backend in the background on site load to trigger cold-start immediately
export const pingBackend = () => {
  api.get('/health', { timeout: 30000 }).catch(() => {
    // Non-blocking background keepalive ping
  });
};

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

export const forgotPasswordApi = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPasswordApi = async ({ token, new_password }) => {
  const response = await api.post('/auth/reset-password', { token, new_password });
  return response.data;
};

// Editorial Content API methods
export const fetchArticles = async () => {
  try {
    const response = await api.get('/articles');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchArticleById = async (id) => {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await api.post('/articles', articleData);
    return response.data;
  } catch (error) {
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

// Trigger background ping on module load
if (typeof window !== 'undefined') {
  pingBackend();
}

export default api;
