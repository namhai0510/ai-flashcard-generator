import axios from 'axios';

// ✅ Dùng đúng env của Vite
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interceptor request
apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errData = error.response?.data || {
      message: error.message,
      success: false,
    };

    return Promise.reject(errData);
  }
);

export default apiClient;