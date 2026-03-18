import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resourceStop } from '@/api/Resource/resourceStop'

const useResourceStop = () => {
    const queryClient = useQueryClient()

    const { mutate: stop, isPending: isStoping} = useMutation({
        mutationFn: ({ id }) => resourceStop({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries(['resources'])
        },
    })
    return { stop, isStoping }
}

export default useResourceStop