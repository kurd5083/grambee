import { useMutation } from '@tanstack/react-query'
import { createInvoiceCrypto } from '@/api/Payment/createInvoiceCrypto'

const useCreateInvoiceCrypto = () => {
    const {mutateAsync: createInvoice} = useMutation ({
        mutationFn: (data) => createInvoiceCrypto(data),
    })
  return { createInvoice }
}

export default useCreateInvoiceCrypto