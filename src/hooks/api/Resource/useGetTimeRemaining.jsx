import { useQuery } from '@tanstack/react-query'
import { getTimeRemaining } from '@/api/Resource/getTimeRemaining'

const useGetTimeRemaining = ({ resourceId }) => {
    const { data: timeRemaining, isLoading: timeRemainingLoading } = useQuery({
        queryKey: ['time-remaining', resourceId],
        queryFn: () => getTimeRemaining({ resourceId }),
        enabled: !!resourceId
    })
    return { timeRemaining, timeRemainingLoading }
}

export default useGetTimeRemaining
