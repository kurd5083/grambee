import { useQuery } from "@tanstack/react-query"
import { statsResource } from "@/api/Resource/statsResource"

const useStatsResource = ({ resourceId, dateFrom, dateTo }) => {
  const { data: statisticsResource, isLoading: statisticsResourceLoading } = useQuery({
        queryKey: ['statistics-resource', resourceId, dateFrom, dateTo],
        queryFn: () => statsResource({ resourceId , dateFrom, dateTo }),
        enabled: !!resourceId && !!dateFrom && !!dateTo
    })
    return { statisticsResource, statisticsResourceLoading }
}

export default useStatsResource
