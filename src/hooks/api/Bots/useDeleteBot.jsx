import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBot } from "@/api/Bots/deleteBot";

 const useDeleteBot = () => {
    const queryClient = useQueryClient()

    const { mutate: removeBot } = useMutation({
        mutationFn: ({ id }) => deleteBot({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries(['bots'])
        },
    })
    return { removeBot }
}

export default useDeleteBot