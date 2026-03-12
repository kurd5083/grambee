import { useMutation } from '@tanstack/react-query'
import { createUSDTPayment } from '@/api/Payment/createUSDTPayment'

const useCreateUSDTPayment = () => {
    const {mutateAsync: createUSDT} = useMutation ({
        mutationFn: (data) => createUSDTPayment(data),
    })
  return { createUSDT }
}

export default useCreateUSDTPayment