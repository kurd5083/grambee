
import { apiClientV1 } from "@/api/apiClient";

export const sendMessage = async (data) => {
    try {
        const response = await apiClientV1.post(`/tg-api/send-message`, data)
        return response.data
    } catch (err) {
        throw err
    }
}