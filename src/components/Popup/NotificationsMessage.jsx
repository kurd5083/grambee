import styled from "styled-components";

import TimeIcon from '@/icons/TimeIcon';
import HeadphonesIcon from "@/icons/HeadphonesIcon";
import CrossIcon from '@/icons/CrossIcon';

import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";

const NotificationsMessage = () => {
  const { closePopup } = usePopupStore()

  return (
    <NotificationsContainer>
      <NotificationsHeader>
        <ImgContainer><TimeIcon width={16} height={16} color="#4DFFA6"/></ImgContainer>
        <PopupClose onClick={closePopup}>
          <CrossIcon width={8} height={8} color="#D6DCEC"/>
        </PopupClose>
      </NotificationsHeader>
      <NotificationsItem>
        <ItemDate>13.11.2025</ItemDate>
        <ItemTitle>Удержание средств для ресурса трафика: #T406</ItemTitle>
        <ItemDesc>Блок отражает объём и структуру удержанных средств
          по источнику #T406. Информация применяется для
          финансового контроля, расчёта обязательств и оценки
          надёжности трафика.</ItemDesc>
          <mark onClick={()=> window.open('https://t.me/ASSISTGB', "_blank")}>
            <HeadphonesIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" />Обратиться в поддержку
          </mark>
      </NotificationsItem>

      <Buttons>
        <Button variant="outline">Удалить</Button>
        <Button variant="primaryWhiteText">Прочитать</Button>
      </Buttons>
    </NotificationsContainer>
  )
}

const NotificationsContainer = styled.div`
  padding: 0 24px 24px;
`
const NotificationsHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`
const PopupClose = styled.button`
  width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 1px solid #272A33;
`;
const NotificationsItem = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;

  mark {
    cursor: pointer;
    margin-top: 24px;
    display: flex;
    gap: 16px;
    align-items: center;
    font-size: 14px;
  }
`

const ItemDate = styled.span`
  font-size: 10px;
  color: #6A7080CC;
`
const ItemTitle = styled.h4`
  font-size: 24px;
  line-height: 26px;
  font-weight: 700;
  margin-top: 16px;
`
const ItemDesc = styled.p`
  font-size: 12px;
  line-height: 18px;
  margin-top: 24px;
  color: #6A7080CC;
`
const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #272A33;
  padding: 12px;
  border-radius: 12px;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
`

export default NotificationsMessage