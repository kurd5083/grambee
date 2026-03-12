import { useMutation } from "@tanstack/react-query";
import { regenerateApiKey } from '@/api/Bots/regenerateApiKey'

const useRegenerateApiKey = () => {
    const { mutate: regenerateApi } = useMutation({
        mutationFn: ({ id }) => regenerateApiKey({ id }),
    })
    return { regenerateApi }
}

export default useRegenerateApiKey
