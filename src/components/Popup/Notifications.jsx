import styled from "styled-components";

import checkmarks from "@/assets/icons/checkmarks.svg";
import BellIcon from '@/icons/BellIcon';
import DelIcon from '@/icons/DelIcon';
import TimeIcon from '@/icons/TimeIcon';

import Button from "@/shared/Button";
import NoDataAvailable from "@/shared/NoDataAvailable";
import LoadingState from "@/shared/LoadingState";

import useGetNotifications from "@/hooks/api/Notifications/useGetNotifications";
import useDeleteNotifications from "@/hooks/api/Notifications/useDeleteNotifications";
import useDeleteNotification from "@/hooks/api/Notifications/useDeleteNotification";
import useReadNotificationsAll from "@/hooks/api/Notifications/useReadNotificationsAll";

import { useUserStore } from '@/store/userStore';
import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useToastStore } from "@/store/toastStore";

const Notifications = () => {
  const { openPopup } = usePopupStore()
  const { userLocal } = useUserStore()
  const { notifications, notificationsLoading } = useGetNotifications({ telegramId: userLocal?.telegramId });
  const { removeNotificationsMutate, isDeletingAll } = useDeleteNotifications();
  const { removeNotificationMutate, isDeleting } = useDeleteNotification();
  const { readNotificationsAllMutate, isReadingAll } = useReadNotificationsAll();
  const { setNotification } = useNotificationStore();
  const { showToast } = useToastStore();

  const handleNotification = (item) => {
    setNotification(item)
    openPopup('notifications-message')
  }

  const handleDeleteAll = () => {
    if (!notifications?.length) return showToast("Нет уведомлений для удаления", "error");

    removeNotificationsMutate(null, {
      onSuccess: () => {
        showToast("Все уведомления удалены", "success");
      },
      onError: (error) => {
        showToast(error?.message || "Ошибка при удалении", "error");
      }
    });
  };

  const handleDeleteOne = (id) => {
    removeNotificationMutate({ id }, {
      onSuccess: () => {
        showToast("Уведомление удалено", "success");
      },
      onError: (error) => {
        showToast(error?.message || "Ошибка при удалении", "error");
      }
    });
  };
  const handleMarkAllAsRead = () => {
      if (!notifications?.length) {
        showToast("Нет уведомлений", "error");
        return;
      }
      readNotificationsAllMutate(null, {
        onSuccess: () => {
          showToast("Все уведомления отмечены как прочитанные", "success");
        },
        onError: (error) => {
          showToast(error?.message || "Ошибка при отметке уведомлений", "error");
        }
      })
  };

  return (
    <NotificationsContainer>
      <NotificationsHeader>
        <h3>
          <BellIcon width={21} height={24} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />
          Уведомления
        </h3>
        {notifications?.length > 0 && (
          <Button
            variant="primaryNoBorder"
            width="170px"
            onClick={handleDeleteAll}
            disabled={isDeletingAll}
          >
            {isDeletingAll ? "Удаление..." : "Удалить все"}
          </Button>
        )}
      </NotificationsHeader>
      {notificationsLoading ? (
        <Container>
          <LoadingState>Загрузка...</LoadingState>
        </Container>
      ) : notifications?.length > 0 ? (
        <>
          <NotificationsList>
            {notifications.map((item) => (
              <NotificationsItem key={item.id} $isRead={item.isRead}>
                <ImgContainer><TimeIcon width={16} height={16} color={item.isRead ? "#6A7080" : "#4DFFA6"}/></ImgContainer>
                <ItemContent>
                  <h4 onClick={() => handleNotification(item)}>{item.message}</h4>
                  <p>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</p>
                </ItemContent>
                <IconBorder
                  onClick={() => handleDeleteOne(item.id)}
                  disabled={isDeleting}
                >
                  <DelIcon width="12" height="16" color="currentColor" />
                </IconBorder>
              </NotificationsItem>
            ))}
          </NotificationsList>
          <PayButton>
            <Button 
              variant="primaryWhiteText" 
              iconLeft={<img src={checkmarks} alt="checkmarks icon" />} 
              onClick={() => handleMarkAllAsRead()}
              disabled={isReadingAll}
            >
              {isReadingAll ? "Читаете все..." : "Прочитать все"}
            </Button>
          </PayButton>
        </>
      ) : (
        <Container>
          <NoDataAvailable>
            <BellIcon width={70} height={70} colorFirst="#272A33" colorSecond="#272A33" uniqueId="big" />
            <p>У вас нет уведомлений</p>
          </NoDataAvailable>
        </Container>
      )}
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

  @media (width <= 400px) {
    button {
      font-size: 12px;
      height: 40px;
    }
  }
`
const Container = styled.div`
  margin-top: 16px;
`
const NotificationsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
  max-height: calc(60dvh - 160px);
  overflow-y: auto;
  scrollbar-width: none;
  padding-bottom: 32px;
`
const NotificationsItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #272A33;
  ${({$isRead}) => $isRead && `opacity: 0.6;`}
  
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
  gap: 8px;
  flex-grow: 1;
  h4 {
    cursor: pointer;
    
    @media (width <= 400px) {
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
  color:#6A7080;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #D6DCEC;
    border-color: #D6DCEC;
  }
`
const PayButton = styled.div`
  width: 100%;
`

export default Notifications