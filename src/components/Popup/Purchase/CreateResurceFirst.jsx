import { useState, useEffect } from "react";
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

const CreateResurceFirst = () => {
    const { openPopup, closePopup } = usePopupStore();
    const { receipt, setTypeFirst, resetReceipt } = useReceiptStore();
    const { showToast } = useToastStore();
    
    useEffect(() => {
        resetReceipt()
    }, [])

    const handleNext = () => {
        if (!receipt.typeFirst) return showToast("Выбирите тип ресурса", "error");

        receipt.typeFirst === 'CHANNEL' || receipt.typeFirst === 'CHAT' ? (
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
                    <Radio checked={receipt.typeFirst === 'CHANNEL'} onChange={() => setTypeFirst('CHANNEL')} view="circle">
                        <SpeakerIcon width={18} height={16} color="#FFB000" /> Канал
                    </Radio>
                </SwiperSlideRadio>
                <SwiperSlideRadio>
                    <Radio checked={receipt.typeFirst === 'BOT'} onChange={() => setTypeFirst('BOT')} view="circle">
                        <img src={robot} alt="robot" /> Бот
                    </Radio>
                </SwiperSlideRadio>
                <SwiperSlideRadio>
                    <Radio checked={receipt.typeFirst === 'CHAT'} onChange={() => setTypeFirst('CHAT')} view="circle">
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