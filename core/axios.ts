import axios from 'axios';

export function getAPIClient(ctx?: any) {

    const API_URL = 'https://api-backend-cadastro.onrender.com/api'

    const api = axios.create({
        baseURL: API_URL,
    });

    api.interceptors.request.use((config) => {
        return config;
    });

    return api;
}