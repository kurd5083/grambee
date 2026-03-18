
import { apiClientV2 } from "@/api/apiClient";

export const checkBotAdmin = async ({ botToken, channelId }) => {
    try {
        const response = await apiClientV2.get(`/traffic/check-bot-admin`, {params: { botToken, channelId }})
        return response.data
    } catch (err) {
        throw err
    }
}