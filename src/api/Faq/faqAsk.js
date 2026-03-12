import { apiClientV1 } from "@/api/apiClient";

export const faqAsk = async (data) => {
    try {
        const response = await apiClientV1.post(`/faq/ask`, data)
        return response.data
    } catch (err) {
        throw err
    }
}