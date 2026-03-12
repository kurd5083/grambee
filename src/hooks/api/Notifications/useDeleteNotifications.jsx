import { deleteNotifications } from '@/api/Notifications/deleteNotifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteNotifications = () => {
    const queryClient = useQueryClient()

    const { mutate: removeNotificationsMutate, isPending: isDeletingAll } = useMutation({
        mutationFn: () => deleteNotifications(),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
        },
    })

    return { removeNotificationsMutate, isDeletingAll }
}

export default useDeleteNotifications
