import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resourceActivate } from '@/api/Resource/resourceActivate'

const useResourceActivate = () => {
    const queryClient = useQueryClient()

    const { mutate: activate, isPending: isEnabling } = useMutation({
        mutationFn: ({ id }) => resourceActivate({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries(['resources'])
        },
    })
    return { activate, isEnabling }
}

export default useResourceActivate