import axios from 'axios';

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
    error => Promise.reject(new Error(error.response?.data?.message || 'Произошла ошибка'))
  );

  return client;
};

export const apiClientV1 = createApiClient('https://api.grambee.net/api/v1');
export const apiClientV2 = createApiClient('https://trafficgrambee.pro/api/v1');