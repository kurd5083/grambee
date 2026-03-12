import styled from 'styled-components';

import SpeakerIcon from "@/icons/SpeakerIcon";

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";

import useGetReferralCode from "@/hooks/api/useGetReferralCode";
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

import { useUserStore } from "@/store/userStore";

const ShareResources = () => {
  const { userLocal } = useUserStore()
  const { code, codeLoading } = useGetReferralCode({ telegramId: userLocal?.telegramId})
  
  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <ShareResourcesContainer>
      <ResourcesTitle>Ваша ссылка</ResourcesTitle>
      <ResourcesSubTitle>Поделитесь этой ссылкой для привлечения партнеров</ResourcesSubTitle>
      <InputField
        id="link"
        placeholder="Ссылка на канал"
        value={`https://t.me/GRAMBEEBOT?start=motiv_${code?.referralCode}`}
        icon={<SpeakerIcon width={18} height={16} color="#FFB000"/>}
        readOnly={true}
      />
      <ButtonSaveContainer onClick={() => copyToClipboard(`https://t.me/GRAMBEEBOT?start=motiv_${code?.referralCode}`)}>
        <Button variant="primary"><mark>{copied ? 'Ссылка скопированна' : 'Скопировать ссылку'}</mark></Button>
      </ButtonSaveContainer>
    </ShareResourcesContainer>
  )
}

const ShareResourcesContainer = styled.div`
  padding: 0 24px 24px;
`
const ResourcesTitle = styled.h2`
  font-size: 24px;
`
const ResourcesSubTitle = styled.p`
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 12px;
  color: #6A7080CC;
`
const ButtonSaveContainer = styled.button`
  margin-top: 32px;
  width: 100%;
`

export default ShareResources