import styled from "styled-components";

import TimeIcon from '@/icons/TimeIcon';
import HeadphonesIcon from "@/icons/HeadphonesIcon";
import CrossIcon from '@/icons/CrossIcon';
import ArrowIcon from "@/icons/ArrowIcon";

import Button from "@/shared/Button";

import useDeleteNotification from "@/hooks/api/Notifications/useDeleteNotification";
import useReadNotification from "@/hooks/api/Notifications/useReadNotification";

import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useToastStore } from "@/store/toastStore";

const NotificationsMessage = () => {
  const { closePopup, goBack } = usePopupStore()

  const { removeNotificationMutate, isDeleting } = useDeleteNotification();
  const { readNotificationMutate, isReading } = useReadNotification();
  const { notification } = useNotificationStore();
  const { showToast } = useToastStore();

  const handleDeleteOne = () => {
    removeNotificationMutate({ id: notification.id }, {
      onSuccess: () => {
        showToast("Уведомление удалено", "success");
        goBack();
      },
      onError: (error) => {
        showToast(error?.message || "Ошибка при удалении", "error");
      }
    });
  };
const handleReadOne = () => {
    readNotificationMutate({ id: notification.id }, {
      onSuccess: () => {
        showToast("Уведомление прочитано", "success");
        goBack();
      },
      onError: (error) => {
        showToast(error?.message || "Ошибка при прочтении", "error");
      }
    });
  };
  return (
    <NotificationsContainer>
      <NotificationsHeader>
        <HeaderLeft>
          <ArrowContainer onClick={goBack}>
            <ArrowIcon width={6} height={10} color="currentColor" />
          </ArrowContainer>
          <ImgContainer><TimeIcon width={16} height={16} color="#4DFFA6"/></ImgContainer>
        </HeaderLeft>
        <PopupClose onClick={closePopup}>
          <CrossIcon width={8} height={8} color="currentColor"/>
        </PopupClose>
      </NotificationsHeader>
      <NotificationsItem>
        <ItemDate>{new Date(notification.createdAt).toLocaleDateString('ru-RU')}</ItemDate>
        <ItemTitle>{notification.message}</ItemTitle>
        {/* <ItemDesc>Блок отражает объём и структуру удержанных средств
          по источнику #T406. Информация применяется для
          финансового контроля, расчёта обязательств и оценки
          надёжности трафика.</ItemDesc> */}
        <mark onClick={()=> window.open('https://t.me/ASSISTGB', "_blank")}>
          <HeadphonesIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="notification" />Обратиться в поддержку
        </mark>
      </NotificationsItem>
      <Buttons>
        <Button 
          variant="outline" 
          onClick={handleDeleteOne}
          disabled={isDeleting || isReading}
        >
          {isDeleting ? "Удаление..." : "Удалить"}
        </Button>
        {!notification.isRead && (
          <Button 
            variant="primaryWhiteText" 
            onClick={handleReadOne}
            disabled={isReading || isDeleting}
          >
            {isReading ? "Прочтение..." : "Прочитать"}
          </Button>
        )}
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
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
const ArrowContainer = styled.div`
  transform: rotate(180deg);
  color: #6A7080;
  cursor: pointer;

  &:hover {
    color: #D6DCEC;
  }
`;
const PopupClose = styled.button`
  width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 1px solid #272A33;
  color: #6A7080;

  &:hover {
    color: #D6DCEC;
  }
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