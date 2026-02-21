import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  // ESTO ES CLAVE: Permite enviar y recibir cookies (como el refresh token o el session id)
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Nota: Ya no necesitamos el interceptor que busca en localStorage 
// si el backend maneja todo por cookies. 

export default api;