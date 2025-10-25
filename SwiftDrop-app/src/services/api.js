// delivery-app/src/services/api.js
import axios from 'axios';

const API_BASE = process.env.API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = global?.deliveryToken || null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

