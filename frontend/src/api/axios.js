import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});


api.interceptors.response.use(
  (response) => response,

  async(error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      if (originalRequest.url.includes('users-api/me/') || originalRequest.url.includes('users-api/login/')) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await axios.post('https://api.guitarzone.cl/users-api/token/refresh/', {}, { withCredentials: true });

        return api(originalRequest);

      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;