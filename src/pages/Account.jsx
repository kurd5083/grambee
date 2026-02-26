import styled from "styled-components";

import grambeeLogo from "@/assets/icons/grambee-logo.svg";
import bgGrambee from "@/assets/bg-grambee.png";
import TgSplashIcon from "@/icons/TgSplashIcon";
import HeadphonesIcon from "@/icons/HeadphonesIcon";
import FrameIcon from "@/icons/FrameIcon";
import SendIcon from "@/icons/SendIcon";

import OptionCard from "@/components/OptionCard";

const Account = () => {
    return (
        <div>
            <ChatBot>
                <BgChat src={bgGrambee} alt="bgGrambee icon" />
                <ChatHead>
                    <ChatHeadLogo src={grambeeLogo} alt="logo" />
                    <HeadContent>
                        <h3>GRAMBEE.BOT</h3>
                        <p>Online</p>
                    </HeadContent>
                    <HeadActions>
                        <button><HeadphonesIcon width={16} height={16} colorFirst="currentColor" colorSecond="currentColor" uniqueId="chat" /></button>
                        <button><FrameIcon width={16} height={16} colorFirst="currentColor" colorSecond="currentColor" /></button>
                    </HeadActions>
                </ChatHead>
                <Message>
                    <MessageLogo src={grambeeLogo} alt="logo" />
                    <MessageBlock>
                        <MessageFrom>GRAMBEE.BOT</MessageFrom>
                        <MessageText>Привет! Я могу ответить на любой твой вопрос связанный с @GRAMBEEBOT<br/><br/><mark>Просто напиши мне!</mark></MessageText>
                        <Commands>
                            <Сommand>Как дела?</Сommand>
                            <Сommand>Помоги с трафиком</Сommand>
                            <Сommand>Помоги с трафиком</Сommand>
                            <Сommand>Помоги с трафиком</Сommand>
                        </Commands>
                    </MessageBlock>
                </Message>
                <ChatFooter>
                    <ChatFooterLogo src={grambeeLogo} alt="logo" />
                    
                    <ChatInput
                        type="text"
                        placeholder="Задайте вопрос боту..."
                    />
                    <button><SendIcon width={23} height={21} colorFirst="#FFD26D" colorSecond="#FFB81A"/></button>
                </ChatFooter>
            </ChatBot>
            <AccountContainer>
                <OptionCard
                    title="Связаться с техподдержкой"
                    icon={<HeadphonesIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />}
                    bgIcon={
                        <HeadphonesIcon width={90} height={90} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg" />
                    }
                    direction="vertical"
                    right="33px"
                    margin={8}
                    onClick={()=> window.open('https://t.me/ASSISTGB', "_blank")}
                />
                <OptionCard
                    title="Подписаться на нас"
                    icon={<TgSplashIcon width={16} height={13} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />}
                    bgIcon={
                        <TgSplashIcon width={119} height={90} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg" />
                    }
                    direction="vertical"
                    margin={8}
                    right="23px"
                    bottom="-10px"
                />
            </AccountContainer>
        </div>
    )
}

const ChatBot = styled.div`
  position: relative;
  display: flex;
  margin: 0 24px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #272A33;
  border-bottom: 0;
`
const BgChat = styled.img`
    width: 100%;
    height: 380px;
    object-fit: cover;
    pointer-events: none;
`
const ChatHead = styled.div`
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px;
    background-color: #2A2F3E3D;
    backdrop-filter: blur(8px);
    width: 100%;
`
const ChatHeadLogo = styled.img`
    width: 40px;
    height: 40px;
`
const HeadContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;

    h3 {
        font-weight: 700;
        font-size: 14px;
        line-height: 14px;
    }
    p {
        color: #6A7080CC;
        font-size: 12px;
        line-height: 12px;
    }
`
const HeadActions = styled.div`
    display: flex;
    gap: 8px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: #272A33;
        border-radius: 12px;
        color: #6A7080;
        
        &:hover {
        color: #FFB81A;
        background-color: #33363f;
        }
    }
`

const Message = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 12px;
    position: absolute;
    overflow-y: auto;
    max-height: 240px;
    padding: 16px;
    top: 73px;
`
const MessageLogo = styled.img`
    width: 32px;
    height: 32px;
`
const MessageBlock = styled.div`
   display: flex;
   flex-direction: column;
`
const MessageFrom = styled.p`
    margin-top: 8px;
    font-size: 14px;
    font-weight: 700;
`
const MessageText = styled.p`
    box-sizing: border-box;
    margin-top: 8px;
    padding: 10px 14px;
    border-radius: 4px 24px 24px 24px;
    background-color: #1F222B;
    max-width: 264px;
    width: 100%;
    font-size: 12px;
`
const Commands = styled.div`
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
`
const Сommand = styled.button`
    font-size: 14px;
    background-color: #272A33;
    border-radius: 12px;
    padding: 12px 24px;
`
const AccountContainer = styled.div`
    display: flex;
    gap: 8px;
    margin: 24px 24px 0;

    @media(max-width: 400px) {
        flex-direction: column;
    }
`
const ChatFooter = styled.div`
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    background-color: #2A2F3E3D;
    backdrop-filter: blur(8px);
    width: 100%;
    border-radius: 24px;
`
const ChatFooterLogo = styled.img`
    width: 24px;
    height: 24px;
`
const ChatInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
    transition: opacity 0.2s;

    &::placeholder {
        color: #6A7080;
    }
`

export default Account