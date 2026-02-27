import { useState } from "react";

import styled from "styled-components";

import SpeakerIcon from "@/icons/SpeakerIcon";
import TgSplashIcon from "@/icons/TgSplashIcon";

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

const SelectChannel = () => {
    const { openPopup, closePopup } = usePopupStore()
    const { receipt, setChannel } = useReceiptStore();
    
    const handleNext = () => {
        if(!receipt.channel?.name) {
            alert('введите сслыку на канал')
            return
        }        
        openPopup('choosing-type-traffic', 'Выберите тип трафика', { step: 4, text: 'Определитесь с нужным типом трафика для вас' })
    }

    return (
        <>
            <SelectChannelContainer>
                <InputField
                    id="link"
                    placeholder="Ссылка на канал"
                    value={receipt.channel?.name}
                    onChange={(e) => setChannel((e.target.value, e.target.value))}
                    icon={<SpeakerIcon width={18} height={16} color="#FFB000" />}
                    inputAction="Сохранить"
                />
                <Button variant="blurGradient" onClick={() => closePopup()}>
                    <TgSplashIcon width={16} height={13} colorFirst="#F7F9FF" colorSecond="#F7F9FF" />
                    Выбрать свой канал
                </Button>
            </SelectChannelContainer>
            <Buttons>
                <Button variant="default" onClick={() => closePopup()}>Отмена</Button>
                <Button variant="primary" onClick={handleNext}>Далее</Button>
            </Buttons>
        </>
    )
}

const SelectChannelContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 24px;
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`

export default SelectChannel
