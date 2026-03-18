import axios from 'axios';

export const publicClient = axios.create({
  baseURL: 'https://api.grambee.net/api/v1',
  headers: { Accept: 'application/json' },
});