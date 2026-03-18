
import { apiClientV2 } from "@/api/apiClient";

export const getTimeRemaining = async ({ resourceId }) => {
    try {
        const response = await apiClientV2.get(`/link-refresh/time-remaining/${resourceId}`)
        return response.data
    } catch (err) {
        throw err
    }
}