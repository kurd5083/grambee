import { apiClientV2 } from "@/api/apiClient";

export const resourceActivate = async ({ id }) => {
    try {
        const response = await apiClientV2.patch(`/traffic/resources/${id}/activate`)
        return response.data
    } catch (err) {
        throw err
    }
}