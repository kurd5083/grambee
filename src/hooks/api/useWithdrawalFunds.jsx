import { useMutation } from '@tanstack/react-query'
import { withdrawalFunds } from '@/api/withdrawalFunds'

const useWithdrawalFunds = () => {
  const { mutate: conclusionFunds, isPending: isCalculation } = useMutation({
    mutationFn: (data) => withdrawalFunds(data),
  })
  return { conclusionFunds, isCalculation }
}

export default useWithdrawalFunds