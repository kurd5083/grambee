import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resourceArchive } from '@/api/Resource/resourceArchive'

const useResourceArchive = () => {
    const queryClient = useQueryClient()

    const { mutate: archive, isPending: isArchiving} = useMutation({
        mutationFn: ({ id }) => resourceArchive({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries(['resources'])
        },
    })
    return { archive, isArchiving }
}

export default useResourceArchive