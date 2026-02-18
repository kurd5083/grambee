import { useState } from "react"
import styled from 'styled-components';

import speaker from "@/assets/speaker.svg";

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";

const ShareResources = () => {
  const [link, setLink] = useState("");
  return (
    <ShareResourcesContainer>
      <ResourcesDescription>
        Отправляйте список ваших ресурсов клиентам<br/>
        для привлечения дополнительного заработка<br/><br/>
        Выберите тип трафика и поделитесь ссылкой
      </ResourcesDescription>
      <ResourcesTitle>Ваша ссылка</ResourcesTitle>
      <ResourcesSubTitle>Поделитесь этой ссылкой для привлечения партнеров</ResourcesSubTitle>
      <InputField
        id="link"
        placeholder="Ссылка на канал"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        icon={<img src={speaker} alt="speaker" />}
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
const ResourcesDescription = styled.p`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #6A7080CC;
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
