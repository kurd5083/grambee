import { apiClientV1 } from "@/api/apiClient";

export const createPaymentTbank = async (data) => {
    try {
        const response = await apiClientV1.post(`/tbank-payment/create-payment`, data)
        return response.data
    } catch (err) {
        throw err
    }
}