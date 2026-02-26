import { useState } from "react";
import styled from "styled-components";

import question from "@/assets/icons/question.svg";
import CopyIcon from '@/icons/CopyIcon';

import InfoRow from "@/shared/InfoRow";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import ToggleSwitch from "@/shared/ToggleSwitch";
import { GapContainer } from "@/shared/GapContainer";

const GeneralTab = () => {
    const [token, setToken] = useState("");
    const [webhook, setWebhook] = useState("");
    const [checked, setChecked] = useState("");

    return (
        <>
            <InfoContainer>
                <InfoRow
                    label="Токен"
                    value="8240...gk50"
                    actionIcon={
                        <IconWrapper>
                            <CopyIcon
                                width={16}
                                height={16}
                                colorFirst="currentColor"
                                colorSecond="currentColor"
                                uniqueId="first"
                            />
                        </IconWrapper>
                    } />
                <InfoRow
                    label="Ключ доступа"
                    value="GRAM...853D"
                    actionIcon={
                        <IconWrapper>
                            <CopyIcon
                                width={16}
                                height={16}
                                colorFirst="currentColor"
                                colorSecond="currentColor"
                                uniqueId="second"
                            />
                        </IconWrapper>
                    } />
            </InfoContainer>
            <GapContainer gap="24px">
                <ToggleContainer>
                    <ToggleSwitch checked={checked} onChange={setChecked}><p>Статус</p></ToggleSwitch>
                    <ToggleSwitch checked={checked} onChange={setChecked}>
                        <p>Получать только ссылки в API</p>
                        <img src={question} alt="question icon" />
                    </ToggleSwitch>
                </ToggleContainer>

                <InputField
                    id="token"
                    label="Редактирование токена"
                    placeholder="824124:AAFmByelOqKFVa3C0Y7dYKL"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <InputField
                    id="webhook"
                    label="Webhook URL для отписок"
                    labelIcon={question}
                    placeholder="https://example.com/webhook/leaves"
                    value={webhook}
                    onChange={(e) => setWebhook(e.target.value)}
                />
            </GapContainer>
            <Buttons>
                <Button variant="default" width="100%">Выпустить новый ключ</Button>
                <Button variant="danger" width="40%">Удалить</Button>
            </Buttons>
        </>
    )
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
`
const IconWrapper = styled.div`
  color: #383d4c;
  cursor: pointer;

  &:hover {
    color: #ffb81a;
  }
`;
const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;

  & > div:first-child  {
    padding-bottom: 16px;
    border-bottom: 1px solid #272A33;
  }
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`

export default GeneralTab