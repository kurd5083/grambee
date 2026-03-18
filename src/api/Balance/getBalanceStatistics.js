import { apiClientV1 } from "@/api/apiClient";

export const getBalanceStatistics = async ({ telegramId, startDate, endDate }) => {
    try {
        const response = await apiClientV1.get(`/balance/${telegramId}/statistics`, { params: { startDate, endDate }})
        return response.data
    } catch (err) {
        throw err
    }
}