import { deleteNotification } from '@/api/Notifications/deleteNotification'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteNotification = () => {
    const queryClient = useQueryClient()

    const { mutate: removeNotificationMutate, isPending: isDeleting } = useMutation({
        mutationFn: ({id}) => deleteNotification({id}),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
        },
    })
    
    return { removeNotificationMutate, isDeleting }
}

export default useDeleteNotification
