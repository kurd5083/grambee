import { apiClientV2 } from "@/api/apiClient";

export const statsResource = async ({ resourceId, dateFrom, dateTo }) => {
    try {
        const response = await apiClientV2.get(`/api/invite-tracking/resource-period-stats`, {params: { resourceId, dateFrom, dateTo  }})
        return response.data
    } catch (err) {
        throw err
    }
}