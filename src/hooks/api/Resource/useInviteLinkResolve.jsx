import { useMutation } from '@tanstack/react-query'
import { inviteLinkResolve } from '@/api/Resource/inviteLinkResolve'

const useInviteLinkResolve = () => {
  const { mutate: inviteLink, isPending: isGetting } = useMutation({
    mutationFn: ({ inviteLink }) => inviteLinkResolve({ inviteLink }),
  })
  return { inviteLink, isGetting }
}

export default useInviteLinkResolve