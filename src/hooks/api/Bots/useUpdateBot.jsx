import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBot } from '@/api/Bots/updateBot'

const useUpdateBot = ({ id }) => {
    const queryClient = useQueryClient()

    const { mutate: renewBot } = useMutation({
        mutationFn: (data) => updateBot({ id, data }),
        onSuccess: () => {
            queryClient.invalidateQueries(['bots'])
        },
    })
    return { renewBot }
}

export default useUpdateBot
