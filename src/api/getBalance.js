import { apiClientV1 } from "@/api/apiClient";

export const getBalance = async ({ telegramId }) => {
    try {
        const response = await apiClientV1.get(`/balance/${telegramId}`)
        return response.data
    } catch (err) {
        throw err
    }
}