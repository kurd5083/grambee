import { useMutation } from "@tanstack/react-query";
import { calculatePrice } from '@/api/Resource/calculatePrice'

const useCalculatePrice = () => {
    const { mutate: computePrice, isPending: priceLoading } = useMutation({
        mutationFn: (data) => calculatePrice(data),
    })
    return { computePrice, priceLoading }
}

export default useCalculatePrice