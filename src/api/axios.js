import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
