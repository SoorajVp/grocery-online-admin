import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:4000/api/admin',
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Example: Add Authorization header
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        // You can also log requests here
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // if (error.response.status === 401) {
            //     console.error('Unauthorized, redirecting to login...');
            //     window.location.href = '/login';
            // } else {
            //     console.error('Response Error:', error.response);
            // }
            console.error('Response Error:', error.response);

        } else {
            console.error('Network/Server Error:', error);
        }
        return Promise.reject(error);
    }
);

export default api;
