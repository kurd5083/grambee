import { apiClientV1 } from "@/api/apiClient";

export const deleteNotification = async ({ id }) => {
    try {
        const response = await apiClientV1.delete(`/notifications/${id}`)
        return response.data
    } catch (err) {
        throw err
    }
}