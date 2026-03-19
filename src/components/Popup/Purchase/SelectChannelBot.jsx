import { useState } from "react";
import styled from "styled-components";

import SpeakerIcon from "@/icons/SpeakerIcon";

import Button from "@/shared/Button";
import Radio from "@/shared/Radio";
import InputField from "@/shared/InputField";
import { ContainerPadding } from "@/shared/ContainerPadding";
import WarningBox from "@/shared/WarningBox";

import { extractUsernameFromLink } from "@/lib/extractUsernameFromLink";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

import { getBotInfo } from '@/api/Bots/getBotInfo';


const SelectChannelBot = () => {
    const [isCheckingToken, setIsCheckingToken] = useState(false);

    const { openPopup, goBack } = usePopupStore()
    const { receipt, setCheckerBotToken, setVerificationEnabled, setInviteLink, setName, setUsername } = useReceiptStore();
    const { showToast } = useToastStore();

    const handleNext = () => {
        if (!receipt.inviteLink) {
            return showToast("Введите ссылку на канал", "error");
        }
        if (!receipt.inviteLink.includes('t.me/')) {
            return showToast("Ссылка должна содержать t.me/", "error");
        }
        if (!receipt.inviteLink.toLowerCase().endsWith('bot')) {
            return showToast("Ссылка на бота должна заканчиваться на 'bot' или '_bot' (например: @username_bot или @usernamebot)", "error");
        }

        const expectedUsername = extractUsernameFromLink(receipt.inviteLink);

        if (!expectedUsername) {
            return showToast("Не удалось извлечь username из ссылки", "error");
        }

        setName(receipt.inviteLink)
        setUsername(receipt.inviteLink)

        if (receipt.verificationEnabled) {
            if (!receipt.checkerBotToken) return showToast("Введите токен бота", "error");

            getBotInfo({ BOT_TOKEN: receipt.checkerBotToken })
                .then((result) => {
                    if (result?.ok && result?.result) {
                        const actualUsername = result.result.username;

                        if (actualUsername.toLowerCase() === expectedUsername.toLowerCase()) {
                            showToast(`Бот @${actualUsername} успешно проверен`, "success");
                            openPopup('scale-audience', 'Масштабы закупки аудитории', { step: 5, text: 'Укажите нужные вам параметры аудитории' })
                        } else {
                            showToast(`Токен от бота @${actualUsername}, а ожидается @${expectedUsername}`, "error");
                        }
                    }
                })
                .catch((error) => {
                    return showToast(error?.message || "Неверный токен бота", "error");
                })
        } else {
            openPopup('scale-audience', 'Масштабы закупки аудитории', { step: 5, text: 'Укажите нужные вам параметры аудитории' })
        }
    }

    const handleCheckToken = () => {
        if (!receipt.checkerBotToken) return showToast("Введите токен бота", "error");
        
        if (!receipt.inviteLink) return showToast("Сначала введите ссылку на бота", "error");

        const expectedUsername = extractUsernameFromLink(receipt.inviteLink);
        
        if (!expectedUsername)  return showToast("Не удалось извлечь username из ссылки", "error");

        setIsCheckingToken(true);
        
        getBotInfo({ BOT_TOKEN: receipt.checkerBotToken })
            .then((result) => {
                if (result?.ok && result?.result) {
                    const actualUsername = result.result.username;
                    
                    if (actualUsername.toLowerCase() === expectedUsername.toLowerCase()) {
                        showToast(`Бот @${actualUsername} работает и соответствует ссылке`, "success");
                    } else {
                        showToast(`Токен от бота @${actualUsername}, а ожидается @${expectedUsername}`, "error");
                    }
                } else {
                    showToast(result?.description || "Неверный токен бота", "error");
                }
            })
            .catch((error) => {
                showToast(error?.message || "Ошибка при проверке токена", "error");
            })
            .finally(() => {
                setIsCheckingToken(false);
            });
    };

    return (
        <ContainerPadding>
            <InputField
                id="link"
                placeholder="Ссылка на бота"
                value={receipt.inviteLink}
                onChange={(e) => setInviteLink(e.target.value)}
                icon={<SpeakerIcon width={18} height={16} color="#FFB000" />}
                inputAction="Сохранить"
            />
            <RadioContainer>
                <Radio
                    checked={receipt.verificationEnabled === true}
                    onChange={() => setVerificationEnabled(true)}
                    text="2.3 ₽ за подписчика"
                    view="circleText"
                >
                    С проверкой
                </Radio>
                <Radio
                    checked={receipt.verificationEnabled === false}
                    onChange={() => setVerificationEnabled(false)}
                    text="1.8 ₽ за подписчика"
                    view="circleText"
                >
                    Без проверки
                </Radio>
            </RadioContainer>
            {receipt.verificationEnabled === true ? (
                <>
                    <SelectChannelContainer>
                        <InputField
                            id="checkerBotToken"
                            label="Введите токен вашего бота"
                            placeholder="1245231521:AAHwPlf1t3mzjwx8uhlFXojD2lmpr021..."
                            value={receipt.checkerBotToken}
                            onChange={(e) => setCheckerBotToken(e.target.value)}
                            // status={<mark>Инструкция</mark>}
                        />
                       <Button 
                            variant="blueDark" 
                            onClick={handleCheckToken}
                            disabled={isCheckingToken}
                        >
                            {isCheckingToken ? "Проверка..." : "Проверить исправность токена"}
                        </Button>
                    </SelectChannelContainer>
                </>
            ) : receipt.verificationEnabled === false && (
                <WarningBox text="При покупке трафика без проверки мы не гарантируем выполнения заказа в полном объеме" />
            )}
            <Buttons>
                <Button variant="default" onClick={() => goBack()}>Назад</Button>
                <Button variant="primary" onClick={handleNext}>Далее</Button>
            </Buttons>
        </ContainerPadding>
    )
}

const RadioContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 24px;

    @media (width <= 430px) {
        grid-template-columns: 1fr;
    }
`
const SelectChannelContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding-bottom: 24px;
`

export default SelectChannelBot