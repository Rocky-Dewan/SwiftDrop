

import api from './api';

export const loginUser = async (phone, password) => {
  const res = await api.post('/users/login', { phone, password });
  return res.data;
};

export const registerUser = async (payload) => {
  const res = await api.post('/users/register', payload);
  return res.data;
};

export const fetchProfile = async () => {
  const res = await api.get('/users/profile');
  return res.data;
};

