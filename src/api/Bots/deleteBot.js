import { apiClientV2 } from "@/api/apiClient";

export const deleteBot = async ({ id }) => {
    try {
        const response = await apiClientV2.delete(`/bots/${id}`)
        return response.data
    } catch (err) {
        throw err
    }
}