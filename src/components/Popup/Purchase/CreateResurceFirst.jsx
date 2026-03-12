import { useState } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import chat from "@/assets/icons/chat.svg";
import robot from "@/assets/icons/robot.svg";
import SpeakerIcon from "@/icons/SpeakerIcon";

import Button from "@/shared/Button";
import Radio from "@/shared/Radio";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

import { getPriceResource } from "@/api/Resource/getPriceResource";

const CreateResurceFirst = () => {
    const { openPopup, closePopup } = usePopupStore();
    const { receipt, setTypeResource } = useReceiptStore();
    const { showToast } = useToastStore();

    const handleNext = () => {
        if (!receipt.typeResource) return showToast("Выбирите тип ресурса", "error");

        const resourceType = getPriceResource({ type: receipt.typeResource })
         
        receipt.typeResource === 'channel' || receipt.typeResource === 'chat' ? (
            openPopup('create-resources-second', 'Создание ресурса', { step: 2, text: 'Укажите основные данные вашего ресурса' })
        ) : (
            openPopup('select-channel-bot', 'Выберите канал', { step: 2, text: 'Можете выбрать канал или же написать ссылку' })
        )
    }
    
    return (
        <>
            <RadioContainer
                spaceBetween={10}
                slidesPerView="auto"
                slidesOffsetBefore={24}
                slidesOffsetAfter={24}
            >
                <SwiperSlideRadio>
                    <Radio checked={receipt.typeResource === 'channel'} onChange={() => setTypeResource('channel')} view="circle">
                        <SpeakerIcon width={18} height={16} color="#FFB000" /> Канал
                    </Radio>
                </SwiperSlideRadio>
                <SwiperSlideRadio>
                    <Radio checked={receipt.typeResource === 'bot'} onChange={() => setTypeResource('bot')} view="circle">
                        <img src={robot} alt="robot" /> Бот
                    </Radio>
                </SwiperSlideRadio>
                <SwiperSlideRadio>
                    <Radio checked={receipt.typeResource === 'chat'} onChange={() => setTypeResource('chat')} view="circle">
                        <img src={chat} alt="chat" /> Чат
                    </Radio>
                </SwiperSlideRadio>
            </RadioContainer>
            <Buttons>
                <Button variant="default" onClick={() => closePopup()}>Отмена</Button>
                <Button variant="primary" onClick={() => handleNext()}>Далее</Button>
            </Buttons>
        </>
    )
}

const RadioContainer = styled(Swiper)`
  display: flex;
  gap: 10px;
`
const SwiperSlideRadio = styled(SwiperSlide)`
  width: auto;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 0 24px 24px;
`

export default CreateResurceFirst