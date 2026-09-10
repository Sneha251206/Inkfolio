import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchArticles = async () => {
  try {
    const response = await api.get('/articles/');
    return response.data;
  } catch (error) {
    console.warn('Backend API offline, using local fallback state:', error);
    return null;
  }
};

export const fetchArticleById = async (id) => {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend API offline, using fallback:', error);
    return null;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await api.post('/articles/', articleData);
    return response.data;
  } catch (error) {
    console.error('Error creating article:', error);
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
