import styled from "styled-components";

import grambeeLogo from "@/assets/icons/grambee-logo.svg";
import bgGrambee from "@/assets/bg-grambee.png";

import HeadphonesIcon from "@/icons/HeadphonesIcon";
import FrameIcon from "@/icons/FrameIcon";
import SendIcon from "@/icons/SendIcon";
import { useState } from "react";

const ChatBot = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <ChatBotContainer $isActive={isActive}>
            <BgChat $isActive={isActive} src={bgGrambee} alt="bgGrambee icon" />
            <ChatHead>
                <ChatHeadLogo src={grambeeLogo} alt="logo" />
                <HeadContent>
                    <h3>GRAMBEE.BOT</h3>
                    <p>Online</p>
                </HeadContent>
                <HeadActions>
                    <button><HeadphonesIcon width={16} height={16} colorFirst="currentColor" colorSecond="currentColor" uniqueId="chat" /></button>
                    <ButtonFull $isActive={isActive} onClick={() => setIsActive(!isActive)}>
                        <FrameIcon width={16} height={16} colorFirst="currentColor" colorSecond="currentColor" />
                    </ButtonFull>
                </HeadActions>
            </ChatHead>
            <Message $isActive={isActive}>
                <MessageLogo src={grambeeLogo} alt="logo" />
                <MessageBlock>
                    <MessageFrom>GRAMBEE.BOT</MessageFrom>
                    <MessageText>Привет! Я могу ответить на любой твой вопрос связанный с @GRAMBEEBOT<br /><br /><mark>Просто напиши мне!</mark></MessageText>
                    <Commands>
                        <Сommand>Как дела?</Сommand>
                        <Сommand>Помоги с трафиком</Сommand>
                        <Сommand>Помоги с трафиком</Сommand>
                        <Сommand>Помоги с трафиком</Сommand>
                    </Commands>
                </MessageBlock>
            </Message>
            <ChatFooter $isActive={isActive}>
                <ChatFooterLogo src={grambeeLogo} alt="logo" />
                <ChatInput
                    type="text"
                    placeholder="Задайте вопрос боту..."
                />
                <button><SendIcon width={23} height={21} colorFirst="#FFD26D" colorSecond="#FFB81A" /></button>
            </ChatFooter>
        </ChatBotContainer>

    )
}

const ChatBotContainer = styled.div`
    position: relative;
    display: flex;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid #272A33;
    border-bottom: 0;
    ${({$isActive}) => ($isActive && `
        position: fixed;
        inset: 0;
        z-index: 10;
        border-radius: 0;
    `)}
`
const BgChat = styled.img`
    width: 100%;
    height: 380px;
    object-fit: cover;
    pointer-events: none;

    ${({$isActive}) => ($isActive && `
        height: 100%;
        object-fit: cover;
    `)}
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
const ButtonFull = styled.button`
    ${({$isActive}) => ($isActive && `
        color: #FFB81A !important;
    `)}
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

    ${({$isActive}) => ($isActive && `
        max-height: calc(100vh - 140px);
    `)}
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
    ${({$isActive}) => ($isActive && `
        border-radius: 0;
    `)}
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

export default ChatBot