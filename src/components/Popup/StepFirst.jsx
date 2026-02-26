import { useState } from "react"
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import bot from "@/assets/icons/bot.svg";
import robot from "@/assets/icons/robot.svg";
import chat from "@/assets/icons/chat.svg";
import FileIcon from "@/icons/FileIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import StarIcon from "@/icons/StarIcon";

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";
import Radio from "@/shared/Radio";
import { ContainerPadding } from "@/shared/ContainerPadding";
import { GapBlock } from "@/shared/GapBlock";

import OptionCard from "@/components/OptionCard";
import { usePopupStore } from "@/store/popupStore";

const StepFirst = () => {
  const [token, setToken] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { openPopup } = usePopupStore()

  return (
    <>
      <ContainerPadding>
        <OptionCard
          title="API Документация"
          text="Интеграция с проектами"
          icon={<FileIcon width={13} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />}
          bgIcon={
            <FileIcon width={95} height={117} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg" />
          }
          direction="horizontal"
          bottom="-60px"
          right="48px"
          onClick={() => window.open("https://docs.grambee.net/", "_blank")}
        />
      </ContainerPadding>
      <PartnersEarn>
        <PartnersTitle><StarIcon width={24} height={23} colorFirst="#FFD26D" colorSecond="#FFB81A" />Сколько зарабатывают наши партнёры?</PartnersTitle>
        <PartnersList>
          <PartnersItem>
            <h3>30 <mark>₽</mark></h3>
            <p>За буст</p>
          </PartnersItem>
          <PartnersItem>
            <h3>0.5 <mark>₽</mark></h3>
            <p>За охват</p>
          </PartnersItem>
          <PartnersItem>
            <h3>2 <mark>₽</mark></h3>
            <p>За подписчика</p>
          </PartnersItem>
        </PartnersList>
      </PartnersEarn>
      <StepTitle>Тип продавца</StepTitle>
      <GapBlock gap="24px">
        <RadioContainer
          spaceBetween={10}
          slidesPerView="auto"
          slidesOffsetBefore={24}
          slidesOffsetAfter={24}
        >
          <SwiperSlideRadio>
            <Radio checked={selectedIndex === 0} onChange={() => setSelectedIndex(0)} view="circle">
              <SpeakerIcon width={18} height={16} color="#FFB000" /> Канал
            </Radio>
          </SwiperSlideRadio>
          <SwiperSlideRadio>
            <Radio checked={selectedIndex === 1} onChange={() => setSelectedIndex(1)} view="circle">
              <img src={robot} alt="robot" /> Канал
            </Radio>
          </SwiperSlideRadio>
          <SwiperSlideRadio>
            <Radio checked={selectedIndex === 2} onChange={() => setSelectedIndex(2)} view="circle">
              <img src={chat} alt="chat" /> Чат
            </Radio>
          </SwiperSlideRadio>
        </RadioContainer>
        <ContainerPadding>
          <InputField
            id="token"
            label="Введите бота-чекера"
            status={!token ? "Токен не установлен" : "Токен установлен"}
            placeholder="Введите токен"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            icon={<img src={bot} alt="bot" />}
          />
        </ContainerPadding>
      </GapBlock>
      <Buttons>
        <Button variant="default">Отмена</Button>
        <Button variant="primary" onClick={() => openPopup('step-second', 'Создание бота', { step: 2 })}>Далее</Button>
      </Buttons>
    </>
  )
}

const PartnersEarn = styled.div`
  margin-top: 32px;
  padding: 0 24px;
`
const PartnersTitle = styled.h2`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  font-size: 24px;
  line-height: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  max-width: 320px;
  
  img {
    margin-top: 5px;
  }
`
const PartnersList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  gap: 8px;
`
const PartnersItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 0;
  background-color: #272A33;
  border-radius: 16px;

  h3 {
    font-size: 40px;
    line-height: 32px;
    font-weight: 700;

    mark {
      font-size: 32px;
    }
  }
  p {
    font-size: 12px;
    font-weight: 700;
    color: #6A7080;
  }
`
const StepTitle = styled.h2`
  margin-top: 24px;
  font-size: 20px;
  padding: 0 24px;
`
const RadioContainer = styled(Swiper)`
  display: flex;
  gap: 10px;
  margin: 0;
  margin-top: 24px;
`
const SwiperSlideRadio = styled(SwiperSlide)`
  width: auto;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  padding: 0 24px 24px;
`

export default StepFirst