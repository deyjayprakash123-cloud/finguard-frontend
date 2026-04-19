import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://finguard-backend-itbs.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
