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

const CreateResurceFirst = () => {
    const { openPopup, closePopup } = usePopupStore();
    const [selectedRadio, setSelectedRadio] = useState('channel');

    return (
        <>
            <RadioContainer
                spaceBetween={10}
                slidesPerView="auto"
                slidesOffsetBefore={24}
                slidesOffsetAfter={24}
            >
                <SwiperSlideRadio>
                    <Radio checked={selectedRadio === 'channel'} onChange={() => setSelectedRadio('channel')} view="circle">
                        <SpeakerIcon width={18} height={16} color="#FFB000" /> Канал
                    </Radio>
                </SwiperSlideRadio>
                <SwiperSlideRadio>
                    <Radio checked={selectedRadio === 'bot'} onChange={() => setSelectedRadio('bot')} view="circle">
                        <img src={robot} alt="robot" /> Бот
                    </Radio>
                </SwiperSlideRadio>
                <SwiperSlideRadio>
                    <Radio checked={selectedRadio === 'chat'} onChange={() => setSelectedRadio('chat')} view="circle">
                        <img src={chat} alt="chat" /> Чат
                    </Radio>
                </SwiperSlideRadio>
            </RadioContainer>
            <Buttons>
                <Button variant="default" onClick={() => closePopup()}>Отмена</Button>
                <Button variant="primary"
                    onClick={() => {
                        selectedRadio === 'channel' || selectedRadio === 'chat' ? (
                            openPopup('create-resources-second', 'Создание ресурса', { step: 2, text: 'Укажите основные данные вашего ресурса'})
                        ) : (
                            openPopup('select-channel-bot', 'Выберите канал', { step: 2, text: 'Можете выбрать канал или же написать ссылку'})
                        )
                    }}>Далее</Button>
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