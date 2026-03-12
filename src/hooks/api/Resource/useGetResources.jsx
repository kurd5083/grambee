import { useQuery } from '@tanstack/react-query'
import { getResources } from '@/api/Resource/getResources'

const useGetResources = ({ userTelegramId }) => {
    const { data: resources, isLoading: resourcesLoading, refetch } = useQuery({
        queryKey: ['resources', userTelegramId],
        queryFn: () => getResources({ userTelegramId }),
        enabled: !!userTelegramId
    })
    return { resources, resourcesLoading, refetch  }
}

export default useGetResources
