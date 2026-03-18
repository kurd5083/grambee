import { apiClientV2 } from "@/api/apiClient";

export const resourceStop = async ({ id }) => {
    try {
        const response = await apiClientV2.patch(`/traffic/resources/${id}/stop`)
        return response.data
    } catch (err) {
        throw err
    }
}