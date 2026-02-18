import { useState } from "react"
import styled from 'styled-components';

import edit from "@/assets/edit.svg";
import bot from "@/assets/bot.svg";
import speaker from "@/assets/speaker.svg";
import question from "@/assets/question.svg";
import cheque from "@/assets/cheque.svg";
import channel_ava from '@/assets/channel-ava.png';

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";
import Note from "@/shared/Note";
import Checkbox from "@/shared/Checkbox";
import { ContainerPadding } from "@/shared/ContainerPadding";

import СhoicePeriod from "@/components/СhoicePeriod";
import Chart from '@/components/Chart';
import MainIndicators from "@/components/MainIndicators";
import StatisticList from "@/components/StatisticList";

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
    <ResourceContainer>
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
          <ResourceParameters>
            <ParametersAva src={channel_ava} alt="ava icon" />
            <ParametersText>
              <p>Antropia Digital</p>
              <span>t.me/antropiadigital</span>
            </ParametersText>
            <ParametersButton>Выключить</ParametersButton>
          </ResourceParameters>
          <StatisticList />
          <ButtonEditContainer>
            <Button
              variant="outline"
              iconLeft={<img src={edit} alt="edit" />}
            >
              Изменить лимиты
            </Button>
          </ButtonEditContainer>
          <Note><p>По истечению <mark>длительности рекламной кампании</mark> произойдет расчётный час, и вас уведомят о результатах</p></Note>
          <TextBlock>
            <Label>Способ замены ссылки</Label>
          </TextBlock>
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
            icon={<img src={speaker} alt="speaker" />}
            inputAction="Сохранить"
          />
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
    </ResourceContainer>
  )
}
const ResourceContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: none;
`
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
const ResourceParameters = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 14px;
  background: radial-gradient(circle at center, #579AFF, #236EDE);
  margin-bottom: 16px;
`;

const ParametersAva = styled.img`
  width: 37px;
  height: 37px;
  object-fit: cover;
  border-radius: 10px;
`;
const ParametersText = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    font-size: 14px;
    line-height: 14px;
  }
  span {
    font-size: 12px;
    line-height: 12px;
    color: #D6DCEC99;
  }
`;
const ParametersButton = styled.button`
  color: #3C83EE;
  font-size: 14px;
  background: #FFFFFF;
  padding: 13px 16px;
  border-radius: 10px;
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