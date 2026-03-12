import { useMutation } from '@tanstack/react-query'
import { createPaymentTbank } from '@/api/Payment/createPaymentTbank'

const useCreatePaymentTbank = () => {
    const {mutateAsync: createTbank} = useMutation ({
        mutationFn: (data) => createPaymentTbank(data),
    })
  return { createTbank }
}

export default useCreatePaymentTbank