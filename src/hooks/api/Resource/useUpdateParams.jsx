import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParams } from '@/api/Resource/updateParams'

const useUpdateParams = ({ id }) => {
    const queryClient = useQueryClient()

    const { mutate: renewParams, isPending: isChange } = useMutation({
        mutationFn: (data) => updateParams({ id, data }),
        onSuccess: () => {
            queryClient.invalidateQueries(['resources'])
        },
    })
    return { renewParams, isChange }
}

export default useUpdateParams