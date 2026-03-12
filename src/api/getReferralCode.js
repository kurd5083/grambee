import { apiClientV1 } from "@/api/apiClient";

export const getReferralCode = async ({ telegramId }) => {
    try {
        const response = await apiClientV1.get(`/referral/code/${telegramId}`)
        return response.data
    } catch (err) {
        throw err
    }
}