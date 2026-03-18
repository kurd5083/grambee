import { apiClientV1 } from "@/api/apiClient";

export const getUserTelegram = async ({ telegramId }) => {
    try {
        const response = await apiClientV1.get(`/users/telegram/${telegramId}`)
        return response.data
    } catch (err) {
        throw err
    }
}

