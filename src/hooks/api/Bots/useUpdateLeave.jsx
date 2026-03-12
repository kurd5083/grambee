import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeave } from '@/api/Bots/updateLeave'

const useUpdateLeave = ({ botId }) => {
    const queryClient = useQueryClient()

    const { mutate: renewLeave } = useMutation({
        mutationFn: ({ leaveWebHookUrl }) => updateLeave({ botId, leaveWebHookUrl }),
        onSuccess: () => {
            queryClient.invalidateQueries(['leave'])
        },
    })
    return { renewLeave }
}

export default useUpdateLeave
