import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotification } from "@/api/Notifications/createNotification";

 const useCreateNotification = () => {
    const queryClient = useQueryClient()

    const {mutate: addNotification} = useMutation({
        mutationFn: (data) => createNotification(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
        },
    })
    return { addNotification }
}

export default useCreateNotification