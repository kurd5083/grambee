import { useQuery } from '@tanstack/react-query'
import { getFilters } from '@/api/Bots/getFilters'

const useGetFilters = ({ botId }) => {
    const { data: filters, isLoading: filtersLoading } = useQuery({
        queryKey: ['filters', botId],
        queryFn: () => getFilters({ botId }),
        enabled: !!botId
    })
    return { filters, filtersLoading }
}

export default useGetFilters
