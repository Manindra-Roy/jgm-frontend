// src/services/api.js
import axios from 'axios';

// Pointing directly to your local Node.js backend
const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
});

// Optional: If you eventually want customers to log in to view their order history, 
// we will add a token interceptor here later. For now, this is all we need to fetch products!
export default api;