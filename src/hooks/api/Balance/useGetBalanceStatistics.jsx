import { useQuery } from '@tanstack/react-query'
import { getBalanceStatistics } from '@/api/Balance/getBalanceStatistics'

const useGetBalanceStatistics = ({ telegramId, startDate, endDate }) => {
    const { data: balanceStatistics, isLoading: balanceStatisticsLoading } = useQuery({
        queryKey: ['balance-statistics', telegramId, startDate, endDate],
        queryFn: () => getBalanceStatistics({ telegramId, startDate, endDate }),
        enabled: !!telegramId && !!startDate && !!endDate
    })
    return { balanceStatistics, balanceStatisticsLoading }
}

export default useGetBalanceStatistics
