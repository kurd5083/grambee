
import { apiClientV1 } from "@/api/apiClient";

export const createNotification = async (data) => {
    try {
        const response = await apiClientV1.post(`/notifications`, data, {
            headers: {
                'x-request-secret': 'bETA16x1uS6L'
            }
        })
        return response.data
    } catch (err) {
        throw err
    }
}