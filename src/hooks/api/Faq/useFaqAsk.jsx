import { useMutation } from '@tanstack/react-query'
import { faqAsk } from "@/api/Faq/faqAsk"

const useFaqAsk = () => {
    const {mutateAsync: askQuestion} = useMutation ({
        mutationFn: (data) => faqAsk(data),
    })
  return { askQuestion }
}

export default useFaqAsk