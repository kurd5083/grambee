import { apiClientV2 } from "@/api/apiClient";

export const inviteLinkResolve = async ({ inviteLink }) => {
    try {
        const response = await apiClientV2.post(`/invite-link/resolve`, {inviteLink})
        return response.data
    } catch (err) {
        throw err
    }
}