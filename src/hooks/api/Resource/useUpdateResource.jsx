import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResource } from '@/api/Resource/updateResource'

const useUpdateResource = ({ id }) => {
    const queryClient = useQueryClient()

    const { mutate: renewResource, isPending: isConservation } = useMutation({
        mutationFn: (data) => updateResource({ id, data }),
        onSuccess: () => {
            queryClient.invalidateQueries(['resources'])
        },
    })
    return { renewResource, isConservation }
}

export default useUpdateResource