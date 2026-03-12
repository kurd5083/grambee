import { apiClientV2 } from "@/api/apiClient";

export const getProgressUser = async ({ telegramId }) => {
    try {
        const response = await apiClientV2.get(`/users/progress/${telegramId}`)
        return response.data
    } catch (err) {
        throw err
    }
}