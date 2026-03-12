
import { apiClientV2 } from "@/api/apiClient";

export const createBot = async (data) => {
    try {
        const response = await apiClientV2.post(`/bots`, data)
        return response.data
    } catch (err) {
        throw err
    }
}