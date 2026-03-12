import { useQuery } from '@tanstack/react-query'
import { getFaq } from '@/api/Faq/getFaq'

const useGetFaq = () => {
    const { data: faq, isLoading: faqLoading } = useQuery({
        queryKey: ['faq'],
        queryFn: () => getFaq()
    })
    return {faq, faqLoading}
}

export default useGetFaq
