import { apiClientV2 } from "@/api/apiClient";

export const getLevels = async () => {
    try {
        const response = await apiClientV2.get(`/user-levels`, {params: {includeInactive: true}})
        return response.data
    } catch (err) {
        throw err
    }
}