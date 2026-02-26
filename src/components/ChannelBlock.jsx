import styled from 'styled-components';
import channel_ava from '@/assets/channel-ava.png';

const ChannelBlock = ({ type }) => {
    return (
        <ChannelContainer>
            <ChannelAva src={channel_ava} alt="ava icon" />
            <ChannelText>
                <p>Antropia Digital</p>
                <span>t.me/antropiadigital</span>
            </ChannelText>
            {type == "button" ? (
                <ChannelButton>Выключить</ChannelButton>
            ) : (
                <ChannelSubText>1.500 подписчиков</ChannelSubText>
            )}
        </ChannelContainer>
    )
}

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
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