import styled from 'styled-components';
import channel_ava from '@/assets/channel-ava.png';
import SpeakerIcon from "@/icons/SpeakerIcon";

const ChannelBlock = ({ type, name, username, disabled, onClick }) => {
  return (
    <ChannelContainer>
      {/* <ChannelAva src={channel_ava} alt="ava icon" /> */}
      <ItemDefoultAva>
        <SpeakerIcon width={18} height={16} color="#6A7080CC" />
      </ItemDefoultAva>
      <ChannelText>
        <p>{name}</p>
        <span>{username}</span>
      </ChannelText>
      {type == "button" ? (
        <ChannelButton onClick={onClick} disabled={disabled}>{disabled ? 'Включение...' : 'Включить'}</ChannelButton>
      ) : (
        <ChannelSubText>{subscribers} подписчиков</ChannelSubText>
      )}
    </ChannelContainer>
  )
}

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 14px;
  background: radial-gradient(circle at center, #579AFF, #236EDE);
  margin-bottom: 16px;
`;
const ChannelAva = styled.img`
  width: 37px;
  height: 37px;
  object-fit: cover;
  border-radius: 10px;
`;
const ItemDefoultAva = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #333845;
`
const ChannelText = styled.div`
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
const ChannelButton = styled.button`
  color: #3C83EE;
  font-size: 14px;
  background: #FFFFFF;
  padding: 13px 16px;
  border-radius: 10px;
`;
const ChannelSubText = styled.p`
  font-size: 12px;
  font-weight: 700;
`;

export default ChannelBlock