import axios from 'axios';
import store from '../store';
import { logout } from '../store/authSlice';

const API_BASE_URL = 'http://localhost:5000/api';
// const API_BASE_URL = "https://w04-mls.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);

export const fetchAPI = async (endpoint, options = {}) => {
  const { method = 'GET', body, headers, ...rest } = options;

  const config = {
    url: endpoint,
    method,
    headers,
    ...rest,
  };

  if (body !== undefined) {
    if (typeof body === 'string') {
      try {
        config.data = JSON.parse(body);
      } catch {
        config.data = body;
      }
    } else {
      config.data = body;
    }
  }

  const response = await apiClient.request(config);
  return response.data;
};

export default apiClient;
