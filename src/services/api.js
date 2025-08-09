import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getPosts = () => API.get('/posts');
export const getAllPosts = async () => {
  const response = await API.get('/posts');
  // Try to return either response.data.posts or response.data depending on your API structure
  return Array.isArray(response.data) ? response.data : response.data.posts;
};

export const getPostById = async (id) => {
  const response = await axios.get(`/api/posts/${id}`);
  return response;
};
export const createPost = (data) => API.post('/posts', data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
