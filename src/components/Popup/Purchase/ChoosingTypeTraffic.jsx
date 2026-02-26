import { useState } from "react";
import styled from "styled-components";

import createBot from "@/assets/create-bot.png";

import Button from "@/shared/Button";
import Radio from "@/shared/Radio";
import InputField from "@/shared/InputField";
import { ContainerPadding } from "@/shared/ContainerPadding";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

const ChoosingTypeTraffic = () => {
    const { openPopup, goBack } = usePopupStore()
    const { setTypeTraffic } = useReceiptStore();
    const [selectedRadio, setSelectedRadio] = useState('with-verification');
    const [token, setToken] = useState("");

    const handleNext = () => {
        if(!token) {
            alert('Введите токен бота')
            return
        }        
        const typeTraffic = selectedRadio == 'with-verification' ? 'С проверкой' : 'Без проверки'
         
        setTypeTraffic(typeTraffic)
        openPopup('scale-audience', 'Масштабы закупки аудитории', { step: 5, text: 'Укажите нужные вам параметры аудитории' })
    }

    return (
        <ContainerPadding>
            <RadioContainer>
                <Radio checked={selectedRadio === 'with-verification'} onChange={() => setSelectedRadio('with-verification')} text="2.3 ₽ за подписчика" view="circleText">
                    С проверкой
                </Radio>
                <Radio checked={selectedRadio === 'without-verification'} onChange={() => setSelectedRadio('without-verification')} text="1.8 ₽ за подписчика" view="circleText">
                    Без проверки
                </Radio>
            </RadioContainer>
            <ChoosingTypeContainer>
                <InputField
                    id="token"
                    label="Токен бота-чекера"
                    placeholder="1245231521:AAHwPlf1t3mzjwx8uhlFXojD2lmpr021..."
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
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

    @media(max-width: 430px) {
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