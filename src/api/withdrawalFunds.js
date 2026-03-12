import { apiClientV1 } from "@/api/apiClient";

export const withdrawalFunds = async (data) => {
    try {
        const response = await apiClientV1.post(`/crypto-pay/withdraw`, data)
        return response.data
    } catch (err) {
        throw err
    }
}

