import { apiClientV1 } from "@/api/apiClient";

export const getFaq = async () => {
    try {
        const response = await apiClientV1.get(`/faq/suggested-questions`)
        return response.data
    } catch (err) {
        throw err
    }
}