import { useQuery } from '@tanstack/react-query'
import { getBots } from '@/api/Bots/getBots'

const useGetBots = ({ telegramId }) => {
    const { data: bots, isLoading: botsLoading, refetch } = useQuery({
        queryKey: ['bots', telegramId],
        queryFn: () => getBots({ telegramId }),
        enabled: !!telegramId
    })
    return { bots, botsLoading, refetch }
}

export default useGetBots
