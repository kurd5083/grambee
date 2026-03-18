import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApiLinksOnly } from '@/api/Bots/updateApiLinksOnly'

const useUpdateApiLinksOnly = ({ id }) => {
    const queryClient = useQueryClient()

    const { mutate: renewApiLinks } = useMutation({
        mutationFn: (data) => updateApiLinksOnly({ id, data }),
        onSuccess: () => {
            queryClient.invalidateQueries(['bots'])
        },
    })
    return { renewApiLinks }
}

export default useUpdateApiLinksOnly
