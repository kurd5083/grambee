import { apiClientV2 } from "@/api/apiClient";

export const calculatePrice = async (data) => {
    try {
        const response = await apiClientV2.post(`/traffic/calculate-price`, data)
        return response.data
    } catch (err) {
        throw err
    }
}