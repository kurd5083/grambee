import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "@/api/getTransactions"

const useGetTransactions = ({telegramId}) => {
    const { data: transactions, isLoading: transactionsLoading } = useQuery({
        queryKey: ['transactions', telegramId],
        queryFn: () => getTransactions({ telegramId }),
        enabled: !!telegramId
    })
    return { transactions, transactionsLoading }
}

export default useGetTransactions