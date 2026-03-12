import { apiClientV2 } from "@/api/apiClient";

export const updateFilter = async ({ botId, data }) => {
    try {
        const response = await apiClientV2.post(`/bots/${botId}/filters`, data)
        return response.data
    } catch (err) {
        throw err
    }
}