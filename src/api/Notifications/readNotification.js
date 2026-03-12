import { apiClientV1 } from "@/api/apiClient";

export const readNotification = async ({ id }) => {
    try {
        const response = await apiClientV1.put(`/notifications/${id}/read`)
        return response.data
    } catch (err) {
        throw err
    }
}