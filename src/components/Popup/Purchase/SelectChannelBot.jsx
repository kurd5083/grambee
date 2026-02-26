import { useState } from "react";
import styled from "styled-components";

import SpeakerIcon from "@/icons/SpeakerIcon";

import Button from "@/shared/Button";
import Radio from "@/shared/Radio";
import InputField from "@/shared/InputField";
import { ContainerPadding } from "@/shared/ContainerPadding";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

const SelectChannelBot = () => {
    const { openPopup, goBack } = usePopupStore()
    const [selectedRadio, setSelectedRadio] = useState('with-verification');
    const [token, setToken] = useState("");
    const [link, setLink] = useState('')
    const { setTypeTraffic, setChannel } = useReceiptStore();
    
    const handleNext = () => {
        if(!link) {
            return alert('введите сслыку на канал')
        }  
        if(!token) {
            return alert('введите токен вашего бота')
        }       
        const typeTraffic = selectedRadio == 'with-verification' ? 'С проверкой' : 'Без проверки'
         
        setTypeTraffic(typeTraffic)
        setChannel(link, link)
        openPopup('scale-audience', 'Масштабы закупки аудитории', { step: 5, text: 'Укажите нужные вам параметры аудитории' })
    }

    return (
        <ContainerPadding>
             <InputField
                    id="link"
                    placeholder="Ссылка на бота"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    icon={<SpeakerIcon width={18} height={16} color="#FFB000" />}
                    inputAction="Сохранить"
                />
            <RadioContainer>
                <Radio checked={selectedRadio === 'with-verification'} onChange={() => setSelectedRadio('with-verification')} text="2.3 ₽ за подписчика" view="circleText">
                    С проверкой
                </Radio>
                <Radio checked={selectedRadio === 'without-verification'} onChange={() => setSelectedRadio('without-verification')} text="1.8 ₽ за подписчика" view="circleText">
                    Без проверки
                </Radio>
            </RadioContainer>
            <SelectChannelContainer>
                <InputField
                    id="token"
                    label="Введите токен вашего бота"
                    placeholder="1245231521:AAHwPlf1t3mzjwx8uhlFXojD2lmpr021..."
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    status={<mark>Инструкция</mark>}
                />
                <Button variant="blueDark">Проверить исправность токена</Button>
            </SelectChannelContainer>
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

    @media(max-width: 430px) {
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