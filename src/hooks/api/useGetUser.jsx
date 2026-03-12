import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/api/getuser"

const useGetUser = ({ telegramId }) => {
    const {data: user, isLoading: userLoading} = useQuery({
        queryKey: ['user', telegramId],
        queryFn: () => getUser({ telegramId }),
        enabled: !!telegramId,
    })
    return { user, userLoading }
}

export default useGetUser
