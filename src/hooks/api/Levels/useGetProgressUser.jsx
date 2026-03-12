import { useQuery } from '@tanstack/react-query'
import { getProgressUser } from '@/api/Levels/getProgressUser'

const useGetProgressUser = ({ telegramId }) => {
    const { data: progress, isLoading: progressLoading } = useQuery({
        queryKey: ['progress', telegramId],
        queryFn: () => getProgressUser({ telegramId }),
        enabled: !!telegramId
    })
    return { progress, progressLoading }
}

export default useGetProgressUser
