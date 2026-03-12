import { useQuery } from '@tanstack/react-query'
import { getLevels } from '@/api/Levels/getLevels'

const useGetLevels = () => {
    const { data: levels, isLoading: levelsLoading } = useQuery({
        queryKey: ['levels'],
        queryFn: () => getLevels()
    })
    return {levels, levelsLoading}
}

export default useGetLevels
