import { useMutation, useQueryClient } from '@tanstack/react-query'
import { readNotificationsAll } from '@/api/Notifications/readNotificationsAll'

const useReadNotificationsAll = () => {
    const queryClient = useQueryClient()

    const { mutate: readNotificationsAllMutate, isPending: isReadingAll } = useMutation({
        mutationFn: () => readNotificationsAll(),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
        },
    })
    
    return { readNotificationsAllMutate, isReadingAll }
}

export default useReadNotificationsAll
