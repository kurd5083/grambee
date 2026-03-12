import { apiClientV2 } from "@/api/apiClient";

export const getFilters = async ({ botId }) => {
    try {
        const response = await apiClientV2.get(`/bots/${botId}/filters`)
        return response.data
    } catch (err) {
        throw err
    }
}