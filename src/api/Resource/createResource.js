import { apiClientV2 } from "@/api/apiClient";

export const createResource = async ({ id, data }) => {
    try {
        const response = await apiClientV2.post(`/traffic/resources/${id}`, data)
        return response.data
    } catch (err) {
        throw err
    }
}