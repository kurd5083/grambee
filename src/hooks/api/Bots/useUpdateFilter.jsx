import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFilter } from '@/api/Bots/updateFilter'

const useUpdateFilter = ({ botId }) => {
    const queryClient = useQueryClient()

    const { mutate: renewFilter } = useMutation({
        mutationFn: (data) => updateFilter({ botId, data }),
        onSuccess: () => {
            queryClient.invalidateQueries(['filters'])
        },
    })
    return { renewFilter }
}

export default useUpdateFilter
