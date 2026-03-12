import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResource } from '@/api/Resource/createResource'

const useCreateResource = ({ userTelegramId }) => {
    const queryClient = useQueryClient()

    const { mutate: addResource } = useMutation({
        mutationFn: (data) => createResource({ userTelegramId, data }),
        onSuccess: () => {
            queryClient.invalidateQueries(['resources'])
        },
    })
    return { addResource }
}

export default useCreateResource