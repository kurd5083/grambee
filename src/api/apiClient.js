import axios from 'axios';
import { publicClient } from './publicClient';

const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    headers: { Accept: 'application/json' },
  });

  client.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const initData = window.Telegram?.WebApp?.initData;

          if (!initData) {
            throw new Error('InitData отсутствует');
          }

          const response = await publicClient.post('/auth/refresh', { initData });

          const newToken = response.data?.accessToken;

          if (newToken) {
            localStorage.setItem('accessToken', newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return client(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
        }
      }

      const errorMessage = error.response?.data?.message || 'Произошла ошибка';
      return Promise.reject(new Error(errorMessage));
    }
  );

  return client;
};

export const apiClientV1 = createApiClient('https://api.grambee.net/api/v1');
export const apiClientV2 = createApiClient('https://trafficgrambee.pro/api/v1');