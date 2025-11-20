import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Session ID management
const getSessionId = (): string => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
};

// Add session ID to all requests
api.interceptors.request.use((config) => {
    config.headers['X-Session-Id'] = getSessionId();
    if (!config.headers['Authorization']) {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});

// Product API
export const productApi = {
    getAll: (params?: {
        categoryId?: number;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
    }) => api.get('/products', { params }),

    getById: (id: string | number) => api.get(`/products/${id}`),
};

// Category API
export const categoryApi = {
    getAll: () => api.get('/categories'),
};

// Promotions API
export const promotionApi = {
    getActive: () => api.get('/promotions'),
};

// Cart API
export const cartApi = {
    getCart: () => api.get('/cart'),

    addItem: (productId: number, quantity: number) =>
        api.post('/cart/items', { productId, quantity }),

    updateItem: (id: number, quantity: number) =>
        api.put(`/cart/items/${id}`, null, { params: { quantity } }),

    removeItem: (id: number) => api.delete(`/cart/items/${id}`),

    clearCart: () => api.delete('/cart'),
};

// Order API
export const orderApi = {
    createOrder: (customerData: {
        customerName: string;
        customerEmail: string;
        customerPhone?: string;
    }) => api.post('/orders', customerData),

    getOrder: (orderNumber: string) => api.get(`/orders/${orderNumber}`),
};

// Auth API (for admin panel)
export const authApi = {
    login: (username: string, password: string) =>
        api.post('/auth/login', { username, password }),
    register: (username: string, email: string, password: string) =>
        api.post('/auth/register', { username, email, password }),
};

// Payment API
export const paymentApi = {
    createPreference: (orderNumber: string) =>
        api.post(`/payment/create_preference/${orderNumber}`),
};

export default api;
