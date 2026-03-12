import { apiClientV1 } from "@/api/apiClient";

export const createUSDTPayment = async (data) => {
    try {
        const response = await apiClientV1.post(`/heleket-pay/create-simple-payment`, data)
        return response.data
    } catch (err) {
        throw err
    }
}