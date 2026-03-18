import { useQuery } from "@tanstack/react-query"
import { getUserTelegram } from "@/api/getUserTelegram"

const useGetUser = ({ telegramId }) => {
    const {data: user, isLoading: userLoading} = useQuery({
        queryKey: ['user', telegramId],
        queryFn: () => getUserTelegram({ telegramId }),
        enabled: !!telegramId,
    })
    return { user, userLoading }
}

export default useGetUser
