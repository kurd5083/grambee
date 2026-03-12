
import { apiClientV2 } from "@/api/apiClient";

export const regenerateApiKey = async ({ id }) => {
    try {
        const response = await apiClientV2.post(`/bots/${id}/regenerate-api-key`)
        return response.data
    } catch (err) {
        throw err
    }
}