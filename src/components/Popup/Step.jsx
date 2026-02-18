import { useState } from "react"
import styled from 'styled-components';

import bot from "@/assets/bot.svg";
import star from "@/assets/star.svg";
import FileIcon from "@/icons/FileIcon";

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";

import OptionCard from "@/components/OptionCard";

const Step = () => {
  const [token, setToken] = useState("");

  return (
    <div>
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
        />
      </ContainerPadding>
      <PartnersEarn>
        <PartnersTitle><img src={star} alt="star icon" />Сколько зарабатывают наши партнёры?</PartnersTitle>
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
      <Buttons>
        <Button variant="default">Отмена</Button>
        <Button variant="primary">Далее</Button>
      </Buttons>
    </div>
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
  display: flex;
  gap: 8px;
`
const PartnersItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex: 1;
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
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  padding: 0 24px 24px;
`

export default Step