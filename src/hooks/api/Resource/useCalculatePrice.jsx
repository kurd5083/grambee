import { useMutation } from "@tanstack/react-query";
import { calculatePrice } from '@/api/Resource/calculatePrice'

const useCalculatePrice = () => {
    const { mutate: computePrice } = useMutation({
        mutationFn: (data) => calculatePrice(data),
    })
    return { computePrice }
}

export default useCalculatePrice