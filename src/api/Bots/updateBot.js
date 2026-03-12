import { apiClientV2 } from "@/api/apiClient";

export const updateBot = async ({ id, data }) => {
    try {
        const response = await apiClientV2.patch(`/bots/${id}`, data)
        return response.data
    } catch (err) {
        throw err
    }
}