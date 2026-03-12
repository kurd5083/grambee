import { apiClientV1 } from "@/api/apiClient";

export const deleteNotifications = async () => {
    try {
        const response = await apiClientV1.delete('/notifications/all')
        return response.data
    } catch (err) {
        throw err
    }
}