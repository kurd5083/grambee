import { apiClientV1 } from "@/api/apiClient";

export const getTransactions = async ({telegramId}) => {
    try {
        const response = await apiClientV1.get(`/balance/${telegramId}/transactions`)
        return response.data
    } catch (err) {
        throw err
    }
}