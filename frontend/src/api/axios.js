import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Cổng của Backend C++
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Tăng lên 10 giây vì AI cần thời gian suy nghĩ
});

export default apiClient;