import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import PlusIcon from '@/icons/PlusIcon';
import BellIcon from '@/icons/BellIcon';

import { SkeletonAvaHeader, SkeletonName, SkeletonLevel } from '@/shared/Skeleton';

// import useGetBalance from '@/hooks/api/useGetBalance';
import { usePopupStore } from "@/store/popupStore";
import { useUserStore } from '@/store/userStore';
import useGetNotifications from "@/hooks/api/Notifications/useGetNotifications";

const Header = () => {
  const { popup, openPopup } = usePopupStore()
  
  const navigate = useNavigate();

  const { userLocal } = useUserStore()
  const isLoading = !userLocal
  const { notifications } = useGetNotifications({ telegramId: userLocal?.telegramId });

  return (
    <HeaderContainer>
      {isLoading ? (
        <SkeletonAvaHeader />
      ) : (
        <HeaderAva
          src={userLocal.avatarUrl}
          alt="ava user"
          onClick={() => navigate('/account')}
        />
      )}
      <InfoUser>
        {isLoading ? (
          <>
            <SkeletonName />
            <SkeletonLevel />
          </>
        ) : (
          <>
            <UserName onClick={() => navigate('/account')}>
              {userLocal.firstName} {userLocal.lastName}
            </UserName>
            <UserLevel onClick={() => openPopup('level-system', 'Система уровней')}>
              уровень: <mark>новичок</mark>
            </UserLevel>
          </>
        )}
      </InfoUser>
      <HeaderBalance>
        <p>
          {userLocal?.balance?.d 
            ? Number(userLocal.balance.d.join('.')).toFixed(2)
            : '0.00'} <mark>₽</mark>
        </p>
        <ButtonBalance onClick={() => navigate('/replenish')}>
          <PlusIcon width={10} height={10} colorFirst="#FFD26D" colorSecond="#FFB81A" />
        </ButtonBalance>
      </HeaderBalance>
      <BellContainer onClick={() => openPopup('notifications')}>
        <BellIcon
          width={18}
          height={20}
          colorFirst={popup.content == 'notifications' ? '#FFD26D' : '#EFF5FF'}
          colorSecond={popup.content == 'notifications' ? '#FFB81A' : '#EFF5FF'}
        />
        <BellCount>{notifications?.length || 0}</BellCount>
      </BellContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px;
  z-index: 10;
`;
const HeaderAva = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;
const InfoUser = styled.div`
  flex-grow: 1;
`;
const UserName = styled.p`
  font-weight: 700;
  cursor: pointer;
`;
const UserLevel = styled.span`
  text-transform: uppercase;
  color: #6A7080;
  font-weight: 700;
  font-size: 10px;
  
  mark {
    cursor: pointer;
  }
`;
const HeaderBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
  border: 1px solid #272A33;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  p {
    margin-left: 12px;
    @media(max-width: 400px) {
      display: none;
    }
  }
`;
const ButtonBalance = styled.button`
  width: 32px;
  height: 32px;
  background-color: #272A33;
  border-radius: 12px;

  &:hover {
		background-color: #33363f;
	}
`;
const BellContainer = styled.div`
  position: relative;
  cursor: pointer;
`;
const BellCount = styled.p`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -6px;
  right: -11px;
  border-radius: 50%;
  padding: 4px;
  min-width: 18px;
  background-color: #FF3C79;
  font-size: 10px;
  line-height: 10px;
  font-weight: 700;
  box-shadow: 0 0 6px 1px #ff3c7a97;
`;

export default Header
