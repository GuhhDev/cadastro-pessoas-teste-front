import axios from 'axios';

export function getAPIClient(ctx?: any) {
    const api = axios.create({
        baseURL: process.env.API_URL,
    });

    api.interceptors.request.use((config) => {
        return config;
    });

    return api;
}