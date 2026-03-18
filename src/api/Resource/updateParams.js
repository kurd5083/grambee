import { apiClientV2 } from "@/api/apiClient";

export const updateParams = async ({ id, data }) => {
    try {
        const response = await apiClientV2.patch(`/traffic/resources/${id}/update-params`, data)
        return response.data
    } catch (err) {
        throw err
    }
}