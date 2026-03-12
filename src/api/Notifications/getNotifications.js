import { apiClientV1 } from "@/api/apiClient";

export const getNotifications = async ({ telegramId }) => {
    try {
        const response = await apiClientV1.get(`/notifications/${telegramId}`)
        return response.data
    } catch (err) {
        throw err
    }
}