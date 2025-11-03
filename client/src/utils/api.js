import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Ensure the base includes /api so endpoint calls like '/blogs' map to '/api/blogs'
let baseURL = API_URL.replace(/\/$/, '');
if (!baseURL.endsWith('/api')) baseURL = `${baseURL}/api`;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add admin passkey header from localStorage for all requests when present
api.interceptors.request.use((config) => {
  const adminPasskey = localStorage.getItem('adminPasskey');
  if (adminPasskey) {
    config.headers['x-admin-passkey'] = adminPasskey;
  }
  // If sending FormData, remove the default Content-Type so the browser
  // can set the correct multipart/form-data boundary header.
  if (config.data instanceof FormData) {
    // axios may have headers in config.headers common or in config.headers['Content-Type']
    if (config.headers && config.headers['Content-Type']) {
      delete config.headers['Content-Type'];
    }
    if (config.headers && config.headers.common && config.headers.common['Content-Type']) {
      delete config.headers.common['Content-Type'];
    }
  }

  return config;
});

// Handle unauthorized access: clear stored admin state and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('adminPasskey');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Upload API
const uploadAPI = {
  image: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  video: (file) => {
    const formData = new FormData();
    formData.append('video', file);
    return api.post('/upload/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  profile: (file) => {
    const formData = new FormData();
    formData.append('profile', file);
    return api.post('/upload/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deleteMedia: (publicId, resourceType = 'image') => {
    return api.delete('/upload/media', {
      data: { publicId, resourceType }
    });
  },
};

// Blog API
export const blogAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  getAllAdmin: () => api.get('/blogs/admin/all'),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
  getTags: () => api.get('/blogs/tags'),
  // Use the upload API for image uploads
  uploadImage: (file) => uploadAPI.image(file),
};

// Export uploadAPI
export { uploadAPI };

// Contact API
export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
  markAsReplied: (id) => api.patch(`/contact/${id}/replied`),
  delete: (id) => api.delete(`/contact/${id}`),

};

export default api;