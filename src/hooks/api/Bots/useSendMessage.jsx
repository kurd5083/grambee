import { useMutation } from "@tanstack/react-query";
import { sendMessage } from '@/api/Bots/sendMessage'

const useSendMessage = () => {
    const { mutate: postPreview } = useMutation({
        mutationFn: (data) => sendMessage(data),
    })
    return { postPreview }
}

export default useSendMessage
