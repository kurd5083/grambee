import { apiClientV2 } from "@/api/apiClient";

export const updateLeave = async ({ botId, leaveWebHookUrl }) => {
    try {
        const response = await apiClientV2.patch(`/bots/${botId}/webhook/leave`, { leaveWebHookUrl })
        return response.data
    } catch (err) {
        throw err
    }
}