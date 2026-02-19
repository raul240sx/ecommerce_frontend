import axios from 'axios';

const api = axios.create({
  // Leemos la variable del .env
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // USAR BACKTICKS ` para que ${token} sea reemplazado por el valor real
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;