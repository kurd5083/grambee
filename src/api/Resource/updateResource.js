import { apiClientV2 } from "@/api/apiClient";

export const updateResource = async ({ id, data }) => {
    try {
        const response = await apiClientV2.patch(`/traffic/resources/${id}`, data)
        return response.data
    } catch (err) {
        throw err
    }
}