import { apiClientV2 } from "@/api/apiClient";

export const getPriceResource = async ({ type }) => {
    try {
        const response = await apiClientV2.get(`/prices/resource-type/${type}`)
        return response.data
    } catch (err) {
        throw err
    }
}