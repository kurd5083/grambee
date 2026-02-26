import { useState } from "react"
import styled from 'styled-components';

import SpeakerIcon from "@/icons/SpeakerIcon";

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";

const ShareResources = () => {
  const [link, setLink] = useState("");
  return (
    <ShareResourcesContainer>
      <ResourcesTitle>Ваша ссылка</ResourcesTitle>
      <ResourcesSubTitle>Поделитесь этой ссылкой для привлечения партнеров</ResourcesSubTitle>
      <InputField
        id="link"
        placeholder="Ссылка на канал"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        icon={<SpeakerIcon width={18} height={16} color="#FFB000"/>}
      />
      <ButtonSaveContainer>
        <Button variant="primary"><mark>Скопировать ссылку</mark></Button>
      </ButtonSaveContainer>
    </ShareResourcesContainer>
  )
}


const ShareResourcesContainer = styled.div`
  padding: 0 24px 24px;
`
const ResourcesTitle = styled.h2`
  margin-top: 32px;
  font-size: 24px;
`
const ResourcesSubTitle = styled.p`
  margin-top: 16px;
  font-size: 12px;
  color: #6A7080CC;
`
const ButtonSaveContainer = styled.button`
  margin-top: 32px;
  width: 100%;
`
export default ShareResources
