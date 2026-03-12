import { apiClientV1 } from "@/api/apiClient";

export const loginWithTelegram = async () => {
  try {
    const initData = window.Telegram?.WebApp?.initData;

    if (!initData) {
      return console.error("InitData отсутствует! Открой WebApp через Telegram.");
    }

    const response = await apiClientV1.post('/auth/telegram', { initData });

    const accessToken = response.data.accessToken;
    localStorage.setItem('accessToken', accessToken);

    return response.data.user;
  } catch (err) {
    throw err
  }
}