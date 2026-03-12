import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBot } from "@/api/Bots/createBot";

 const useCreateBot = () => {
    const queryClient = useQueryClient()

    const { mutate: addBot, isPending: isAdding } = useMutation({
        mutationFn: (data) => createBot(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['bots'])
        },
    })
    return { addBot, isAdding }
}

export default useCreateBot