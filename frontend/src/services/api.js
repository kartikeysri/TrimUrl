import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Handle response errors
api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

// Auth APIs
export const authAPI = {
  register: (email, password) => api.post('/auth/register', { email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
}

// URL APIs
export const urlAPI = {
  shortenUrl: (originalUrl, customCode = null) => api.post('/urls/shorten', { originalUrl, customCode }),
  getUserUrls: (page = 0, size = 10) => api.get(`/urls?page=${page}&size=${size}`),
  deleteUrl: (urlId) => api.delete(`/urls/${urlId}`),
  getAnalytics: (urlId) => api.get(`/urls/${urlId}/analytics`),
  getDashboardStats: () => api.get('/urls/stats/dashboard'),
}

// Redirect API (no auth needed)
export const redirectAPI = {
  redirectShortUrl: (shortCode) => api.get(`/r/${shortCode}`, { validateStatus: () => true }),
}

export default api
