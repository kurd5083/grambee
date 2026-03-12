import { apiClientV1 } from "@/api/apiClient";

export const createInvoiceCrypto = async (data) => {
    try {
        const response = await apiClientV1.post(`/crypto-pay/create-invoice`, data)
        return response.data
    } catch (err) {
        throw err
    }
}