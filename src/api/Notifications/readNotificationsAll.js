import { apiClientV1 } from "@/api/apiClient";

export const readNotificationsAll = async () => {
    try {
        const response = await apiClientV1.patch(`/notifications/read/all`)
        return response.data
    } catch (err) {
        throw err
    }
}