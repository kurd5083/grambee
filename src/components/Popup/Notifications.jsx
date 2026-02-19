import styled from "styled-components";

import test1 from "@/assets/test1.svg";
import checkmarks from "@/assets/checkmarks.svg";
import BellIcon from '@/icons/BellIcon';
import DelIcon from '@/icons/DelIcon';

import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";

const Notifications = () => {
  const { openPopup } = usePopupStore()

  return (
    <NotificationsContainer>
      <NotificationsHeader>
        <h3>
          <BellIcon width={21} height={24} colorFirst="#FFD26D" colorSecond="#FFB81A"/>
          Уведомления
        </h3>
        <Button variant="primaryNoBorder" width="170px"><mark>Удалить все</mark></Button>
      </NotificationsHeader>
      <NotificationsList>
        <NotificationsItem>
          <ImgContainer><img src={test1} alt="" /></ImgContainer>
          <ItemContent>
            <h4 onClick={() => openPopup('notifications-message')}>Удержание средств для ресурса трафика: #T406</h4>
            <p>13.11.2025</p>
          </ItemContent>
          <IconBorder>
            <DelIcon width="12" height="16" color="#6A7080"/>
          </IconBorder>
        </NotificationsItem>
        <NotificationsItem>
          <ImgContainer><img src={test1} alt="" /></ImgContainer>
          <ItemContent>
            <h4 onClick={() => openPopup('notifications-message')}>Пополнение счета через T-Bank прошло успешно!</h4>
            <p>06.11.2025</p>
          </ItemContent>
          <IconBorder>
            <DelIcon width="12" height="16" color="#6A7080"/>
          </IconBorder>
        </NotificationsItem>
        <NotificationsItem>
          <ImgContainer><img src={test1} alt="" /></ImgContainer>
          <ItemContent>
            <h4 onClick={() => openPopup('notifications-message')}>Ваш счет #T304 заморожен</h4>
            <p>03.11.2025</p>
          </ItemContent>
          <IconBorder>
            <DelIcon width="12" height="16" color="#6A7080"/>
          </IconBorder>
        </NotificationsItem>
      </NotificationsList>
      <PayButton>
       <Button variant="primaryWhiteText" iconLeft={<img src={checkmarks} alt="checkmarks icon" />}>
          Прочитать все
        </Button>
      </PayButton>
    </NotificationsContainer>
  )
}

const NotificationsContainer = styled.div`
  padding: 0 24px 24px;
`
const NotificationsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  h3 {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  @media(max-width: 400px) {
    button {
      font-size: 12px;
      height: 40px;
    }
  }
`
const NotificationsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
`
const NotificationsItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #272A33;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`
const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #272A33;
  padding: 12px;
  border-radius: 12px;
`
const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  h4 {
    cursor: pointer;
    
    @media(max-width: 400px) {
      font-size: 14px;
    }
  }
  p {
    font-size: 10px;
    color: #6A7080CC;
  }
`
const IconBorder = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid #272A33;
  cursor: pointer;
`
const PayButton = styled.button`
  margin-top: 30px;
  width: 100%;
`

export default Notifications