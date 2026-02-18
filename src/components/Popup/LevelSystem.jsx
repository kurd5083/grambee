import { useState } from "react";
import styled from "styled-components";

import progress from "@/assets/progress.svg";
import bronze from "@/assets/bronze.svg";
import platinum from "@/assets/platinum.svg";
import bronzeBack from "@/assets/bronze-back.png";

import { ContainerPadding } from "@/shared/ContainerPadding";

import TabsNav from "@/components/TabsNav";

const tabs = [
  { label: "Покупателям", value: "buyer" },
  { label: "Продавцам", value: "sellers" },
];

const LevelSystem = () => {
  const [activeTab, setActiveTav] = useState('buyer')
  const [status, setStatus] = useState('bronze')

  return (
    <ContainerPadding>
      <TabsNav
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTav}
        itemWidth="130px"
        containerGap="32px"
        textAlign="center"
      />
      <LevelProgress>
        <ProgressHeader>
          <img src={progress} alt="progress icon" />
          <h4>Прогресс до Платины</h4>
          <mark>67 %</mark>
        </ProgressHeader>
        <ProgressLine>
          <Line></Line>
        </ProgressLine>
        <ProgressTransitions>Текущий трафик: 0 переходов</ProgressTransitions>
      </LevelProgress>
      <CardsLevel>
        <CardLevel>
          <ProgressHeader>
            <img src={bronze} alt="bronze icon" />
            <h4>Бронзовый</h4>
            <StatusButton $active={status == "bronze"}>{status == "bronze" ? <mark>Текущий</mark> : 'Следующий'}</StatusButton>
          </ProgressHeader>
          <CardTitle><mark>от 100.000</mark></CardTitle>
          <CardSubTitle>Минимальный трафик в месяц</CardSubTitle>
          <CardList>
            <CardItem>
              <span>%<br />Кэшбек</span>
              <p>1%</p>
            </CardItem>
            <CardItem>
              <span>Кэшбек<br />на переход</span>
              <p>0.025 ₽</p>
            </CardItem>
            <CardItem>
              <span>Выгода при<br />10.000 переходов</span>
              <p>250 ₽</p>
            </CardItem>
          </CardList>
          <CardBack src={bronzeBack} alt="back" />
        </CardLevel>
        <CardLevel>
          <ProgressHeader>
            <img src={platinum} alt="platinum icon" />
            <h4>Платиновый</h4>
            <StatusButton $active={status == "platinum"}>{status == "platinum" ? <mark>Текущий</mark> : 'Следующий'}</StatusButton>
          </ProgressHeader>
          <CardTitle><mark>от 250.000</mark></CardTitle>
          <CardSubTitle>Минимальный трафик в месяц</CardSubTitle>
          <CardList>
            <CardItem>
              <span>%<br />Кэшбек</span>
              <p>1%</p>
            </CardItem>
            <CardItem>
              <span>Кэшбек<br />на переход</span>
              <p>0.025 ₽</p>
            </CardItem>
            <CardItem>
              <span>Выгода при<br />10.000 переходов</span>
              <p>250 ₽</p>
            </CardItem>
          </CardList>
          <CardBack src={bronzeBack} alt="back" />
        </CardLevel>
      </CardsLevel>
    </ContainerPadding>
  )
}

const LevelProgress = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 16px 24px;
  border: 1px solid #272A33;
  border-radius: 16px;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 200px;
    height: 80px;
    background: url('src/assets/grid-sec.png') no-repeat;
  }
`
const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  h4 {
    flex-grow: 1;
  }
  mark {
    font-size: 20px;
    font-weight: 700;
  }
`
const ProgressLine = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-top: 16px;
  width: 100%;
  height: 12px;
  border-radius: 16px;
  background-color: #272A33;
  padding: 3px;
`
const Line = styled.div`
  background-color: #FFB81A;
  width: 67%;
  height: 100%;
  border-radius: 16px;
`
const ProgressTransitions = styled.div`
  margin-top: 16px;
  color: #6A7080CC;
  font-size: 12px;
`
const CardsLevel = styled.span`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  max-height: 320px;
  overflow-y: auto;
  scrollbar-width: none;
  padding-bottom: 24px;
`
const CardLevel = styled.div`
  position: relative;
  border-radius: 16px;
  background-color: #1F222B;
  padding: 24px;
`
const StatusButton = styled.button`
  height: 36px;
  padding: 0 16px;
  font-weight: 800;
  background: ${({ $active }) => $active ? '#2E2A22' : '#272A33'};
  border-radius: 14px;

  mark {
    font-size: 14px;
  }
`
const CardTitle = styled.h3`
  margin-top: 4px;
  font-size: 24px;
  font-weight: 700;
`
const CardSubTitle = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: #6A7080CC;
`
const CardList = styled.ul`
  display: flex;
  gap: 40px;
  margin-top: 24px;
`
const CardItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  span {
    font-size: 12px;
    color: #6A7080CC;
  }
`
const CardBack = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`

export default LevelSystem
