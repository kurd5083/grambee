import { useQuery } from '@tanstack/react-query'
import { getReferralCode } from '@/api/getReferralCode'

const useGetReferralCode = ({ telegramId }) => {
    const { data: code, isLoading: codeLoading } = useQuery({
        queryKey: ['referral-code', telegramId],
        queryFn: () => getReferralCode({ telegramId }),
        enabled: !!telegramId
    })
    return { code, codeLoading }
}

export default useGetReferralCode
