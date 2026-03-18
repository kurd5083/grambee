import { apiClientV2 } from "@/api/apiClient";

export const resourceArchive = async ({ id }) => {
    try {
        const response = await apiClientV2.patch(`/traffic/resources/${id}/archive`)
        return response.data
    } catch (err) {
        throw err
    }
}