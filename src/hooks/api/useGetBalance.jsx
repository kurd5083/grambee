import { useQuery } from '@tanstack/react-query'
import { getBalance } from '@/api/getBalance'

const useGetBalance = ({ telegramId}) => {
    const { data: balance, isLoading: balanceLoading } = useQuery({
        queryKey: ['balance'],
        queryFn: () => getBalance({ telegramId })
    })
    return {balance, balanceLoading}
}

export default useGetBalance
