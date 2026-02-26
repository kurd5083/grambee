import { useState } from "react"
import styled from 'styled-components';

import bot from "@/assets/icons/bot.svg";
import question from "@/assets/icons/question.svg";
import cheque from "@/assets/icons/cheque.svg";
import SpeakerIcon from "@/icons/SpeakerIcon";
import EditIcon from "@/icons/EditIcon";

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";
import Note from "@/shared/Note";
import Checkbox from "@/shared/Checkbox";
import { ContainerPadding } from "@/shared/ContainerPadding";
import { GapContainer } from "@/shared/GapContainer";

import СhoicePeriod from "@/components/СhoicePeriod";
import Chart from '@/components/Chart';
import MainIndicators from "@/components/MainIndicators";
import StatisticList from "@/components/StatisticList";
import ChannelBlock from "@/components/ChannelBlock";
import TabsNav from "@/components/TabsNav";

const tabs = [
  { label: "Общая", value: "general" },
  { label: "Статистика", value: "statistics" },
];

const Resource = () => {
  const [activeTab, setActiveTav] = useState('general')
  const [token, setToken] = useState("");
  const [link, setLink] = useState("");
  const [checked, setChecked] = useState("");

  return (
    <>
      <TabsNav
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTav}
        itemWidth="130px"
        containerGap="32px"
        textAlign="center"
      />
      {activeTab == 'general' ? (
        <ContainerPadding>
          <TextBlock>
            <Label>Параметры ресурса</Label>
            <Status><mark>Итоговый чек</mark> <img src={cheque} alt="cheque icon" /></Status>
          </TextBlock>
          <ChannelBlock type="button"/>
          <StatisticList />
          <ButtonEditContainer>
            <Button
              variant="outline"
              iconLeft={<EditIcon width={16} height={16} color="#6A7080"/>}
            >
              Изменить лимиты
            </Button>
          </ButtonEditContainer>
          <Note><p>По истечению <mark>длительности рекламной кампании</mark> произойдет расчётный час, и вас уведомят о результатах</p></Note>
          <TextBlock>
            <Label>Способ замены ссылки</Label>
          </TextBlock>
          <GapContainer gap="24px">
          <CheckboxContainer>
            <Checkbox
              checked={checked == "grambee"}
              onChange={() => setChecked("grambee")}
            >
              Заменять через Grambee
            </Checkbox>
            <Checkbox
              checked={checked == "manually"}
              onChange={() => setChecked("manually")}
            >
              Вручную
            </Checkbox>
          </CheckboxContainer>
          <InputField
            id="link"
            label="Инвайт ссылка"
            labelIcon={question}
            placeholder="Ссылка на канал"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            icon={<SpeakerIcon width={18} height={16} color="#FFB000" />}
            inputAction="Сохранить"
          />
          </GapContainer>
          <GapContainer gap="24px">
          <Note><p>По истечению <mark>длительности рекламной кампании</mark> произойдет расчётный час, и вас уведомят о результатах</p></Note>
          <InputField
            id="token"
            label="Введите бота-чекера"
            status={!token ? "Токен не установлен" : "Токен установлен"}
            placeholder="Введите токен"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            icon={<img src={bot} alt="bot" />}
          />
          </GapContainer>
        </ContainerPadding>
      ) : (
        <>
          <ContainerPadding>
            <СhoicePeriod />
          </ContainerPadding>
          <Chart />
          <ContainerPadding>
            <IndicatorsContainer>
              <MainIndicators />
            </IndicatorsContainer>
            <StatisticList />
          </ContainerPadding>
        </>
      )}
      <ButtonSaveContainer>
        <Button variant="primary"><mark>Сохранить</mark></Button>
      </ButtonSaveContainer>
    </>
  )
}

const ButtonEditContainer = styled.div`
  margin-top: 16px;
`
const TextBlock = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
`;
const Status = styled.p`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #6a7080;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div:first-child  {
    padding-bottom: 16px;
    border-bottom: 1px solid #272A33;
  }
`
const ButtonSaveContainer = styled.button`
  margin-top: 32px;
  width: 100%;
  padding: 0 24px 24px;
`
const IndicatorsContainer = styled.div`
  margin-bottom: 32px;
  width: 100%;
`

export default Resource