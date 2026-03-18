import { apiClientV2 } from "@/api/apiClient";

export const updateApiLinksOnly = async ({ id, data }) => {
    try {
        const response = await apiClientV2.patch(`/bots/${id}/api-links-only`, data)
        return response.data
    } catch (err) {
        throw err
    }
}