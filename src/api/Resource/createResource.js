import { apiClientV2 } from "@/api/apiClient";

export const createResource = async ({ userTelegramId, data }) => {
    try {
        const response = await apiClientV2.post(`/traffic/resources/${userTelegramId}`, data)
        return response.data
    } catch (err) {
        throw err
    }
}