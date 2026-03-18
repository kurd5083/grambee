import { apiClientV2 } from "@/api/apiClient";

export const deleteResource = async ({ id }) => {
    try {
        const response = await apiClientV2.delete(`/traffic/resources/${id}`)
        return response.data
    } catch (err) {
        throw err
    }
}