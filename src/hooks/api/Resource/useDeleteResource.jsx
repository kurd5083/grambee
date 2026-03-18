import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResource } from '@/api/Resource/deleteResource'

const useDeleteResource = () => {
    const queryClient = useQueryClient()

    const { mutate: removeResource } = useMutation({
        mutationFn: ({ id }) => deleteResource({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries(['resources'])
        },
    })
    return { removeResource }
}

export default useDeleteResource