import { useState } from "react";
import styled from "styled-components";

import createBot from "@/assets/create-bot.png";

import Button from "@/shared/Button";
import Radio from "@/shared/Radio";
import InputField from "@/shared/InputField";
import { ContainerPadding } from "@/shared/ContainerPadding";
import WarningBox from "@/shared/WarningBox";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

import { checkBotAdmin } from "@/api/Resource/checkBotAdmin";

const ChoosingTypeTraffic = () => {
    const { openPopup, goBack } = usePopupStore()
    const { receipt, setCheckerBotToken, setVerificationEnabled } = useReceiptStore();

    const { showToast } = useToastStore();

    const handleNext = () => {
        if (receipt.verificationEnabled == null) return showToast("Выбирите тип трафика", "error");
   
        if (receipt.verificationEnabled) {
            if (!receipt.checkerBotToken) return showToast("Введите токен бота", "error");

            checkBotAdmin({ botToken: receipt.checkerBotToken, channelId: receipt.channelId })
                .then((adminResponse) => {
                    if (!adminResponse?.isAdmin) return showToast(adminResponse?.message || "Бот не является администратором канала", "error");
                    openPopup('scale-audience', 'Масштабы закупки аудитории', { step: 5, text: 'Укажите нужные вам параметры аудитории' })
                })
                .catch((error) => {
                    return showToast(error?.message || "Ошибка при проверке бота", "error");
                })
        } else {
            openPopup('scale-audience', 'Масштабы закупки аудитории', { step: 5, text: 'Укажите нужные вам параметры аудитории' })
        }
    }

    return (
        <ContainerPadding>
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
            {receipt.verificationEnabled ? (
                <>
                    <ChoosingTypeContainer>
                        <InputField
                            id="checkerBotToken"
                            label="Токен бота-чекера"
                            placeholder="1245231521:AAHwPlf1t3mzjwx8uhlFXojD2lmpr021..."
                            value={receipt.checkerBotToken}
                            onChange={(e) => setCheckerBotToken(e.target.value)}
                            status={<mark>Инструкция</mark>}
                        />
                        <Button variant="blueDark">Добавить бота в администраторы</Button>
                    </ChoosingTypeContainer>
                    <ButtonsActions>
                        <Button variant="default">
                            <img src={createBot} alt="createBot" />
                            Создать бота-чекер
                        </Button>
                        <Button variant="default">Проверить бота</Button>
                    </ButtonsActions>
                </>
            ) : receipt.verificationEnabled === false && (
                <WarningBox text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, dicta." />
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

    @media (width <= 430px) {
        grid-template-columns: 1fr;
    }
`
const ChoosingTypeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
`
const ButtonsActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding-bottom: 24px;
`

export default ChoosingTypeTraffic