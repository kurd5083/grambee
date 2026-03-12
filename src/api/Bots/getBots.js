import { apiClientV2 } from "@/api/apiClient";

export const getBots = async ({ telegramId }) => {
    try {
        const response = await apiClientV2.get(`/bots/user/${telegramId}`)
        return response.data
    } catch (err) {
        throw err
    }
}