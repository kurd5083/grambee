import { apiClientV2 } from "@/api/apiClient";

export const getResources = async ({ userTelegramId }) => {
    try {
        const response = await apiClientV2.get(`/traffic/resources/user/${userTelegramId}`)
        return response.data
    } catch (err) {
        throw err
    }
}