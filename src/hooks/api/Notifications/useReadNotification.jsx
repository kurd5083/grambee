import { readNotification } from '@/api/Notifications/readNotification'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useReadNotification = () => {
    const queryClient = useQueryClient()

    const { mutate: readNotificationMutate, isPending: isReading } = useMutation({
        mutationFn: ({id}) => readNotification({id}),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
        },
    })
    
    return { readNotificationMutate, isReading }
}

export default useReadNotification
