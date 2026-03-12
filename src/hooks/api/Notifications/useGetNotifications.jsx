import { getNotifications } from "@/api/Notifications/getNotifications";
import { useQuery } from "@tanstack/react-query";

const useGetNotifications = ({ telegramId}) => {
    const {data: notifications, isLoading: notificationsLoading} = useQuery({
        queryKey: ['notifications', telegramId],
        queryFn: () => getNotifications({telegramId}),
        enabled: !!telegramId
    })
    return { notifications, notificationsLoading }
}

export default useGetNotifications