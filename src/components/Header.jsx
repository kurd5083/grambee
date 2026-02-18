import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import head_ava from '@/assets/head-ava.png';
import PlusIcon from '@/icons/PlusIcon';
import BellIcon from '@/icons/BellIcon';
import { usePopupStore } from "@/store/popupStore";

const Header = () => {
  const { popup, openPopup } = usePopupStore()
	const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderAva src={head_ava} alt="ava user" onClick={() => navigate('/account')}/>
      <InfoUser onClick={() => navigate('/account')}>
        <UserName>Arseniy Popkov</UserName>
        <UserLevel>уровень: <mark>новичек</mark></UserLevel>
      </InfoUser>
      <HeaderBalance>
        1,876 <mark>₽</mark>
        <ButtonBalance onClick={() => navigate('/replenish')}>
          <PlusIcon width={10} height={10} colorFirst = "#FFD26D" colorSecond = "#FFB81A" />
        </ButtonBalance>
      </HeaderBalance>
      <BellContainer onClick={() => openPopup('notifications')}>
        <BellIcon 
          colorFirst={popup.content == 'notifications' ? '#FFD26D' : '#EFF5FF'}  
          colorSecond={popup.content == 'notifications' ? '#FFB81A' : '#EFF5FF'}
        />
        <BellCount>13</BellCount>
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
  cursor: pointer;
`;
const InfoUser = styled.div`
  flex-grow: 1;
  cursor: pointer;
`;
const UserName = styled.p`
  font-weight: 700;
`;
const UserLevel = styled.span`
  text-transform: uppercase;
  color: #6A7080;
  font-weight: 700;
  font-size: 10px;
`;
const HeaderBalance = styled.p`
  padding: 4px 4px 4px 16px;
  border: 1px solid #272A33;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
`;
const ButtonBalance = styled.button`
  width: 32px;
  height: 32px;
  background-color: #272A33;
  border-radius: 12px;
  margin-left: 10px;
  &:hover {
		background-color: #33363f;
	}
`;
const BellContainer = styled.div`
  position: relative;
  cursor: pointer;
`;
const BellCount = styled.p`
  position: absolute;
  top: -6px;
  right: -11px;
  border-radius: 50%;
  padding: 4px;
  background-color: #FF3C79;
  font-size: 10px;
  line-height: 10px;
  font-weight: 700;
  box-shadow: 0 0 6px 1px #ff3c7a97;
`;

export default Header
