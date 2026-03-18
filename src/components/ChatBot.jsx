import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import grambeeLogo from "@/assets/icons/grambee-logo.svg";
import bgGrambee from "@/assets/bg-grambee.png";

import ResetIcon from "@/icons/ResetIcon";
import HeadphonesIcon from "@/icons/HeadphonesIcon";
import FrameIcon from "@/icons/FrameIcon";
import SendIcon from "@/icons/SendIcon";

import { SkeletonAvaChat } from '@/shared/Skeleton';

import useGetFaq from "@/hooks/api/Faq/useGetFaq";
import useFaqAsk from '@/hooks/api/Faq/useFaqAsk';

import { useChatStore } from "@/store/chatStore";
import { useUserStore } from '@/store/userStore';

const ChatBot = () => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [isRotating, setIsRotating] = useState(false);

    const messageContainerRef = useRef();

    const { chat, addMessageChat, clearChat } = useChatStore()
    const { faq, faqLoading } = useGetFaq()

    const { userLocal } = useUserStore()

    const isLoading = !userLocal

    useEffect(() => {
        if (chat.length === 0) {
            addMessageChat({
                from: "grambee",
                name: 'GRAMBEE.BOT',
                text: `Привет! Я могу ответить на любой твой вопрос связанный с @GRAMBEEBOT\n\n <mark>Просто напиши мне!</mark>`,
                date: new Date().toLocaleString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
            })
        }
    }, [chat])
    
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [chat])

    const { askQuestion } = useFaqAsk()

    const handleResetClick = async () => {
        setIsRotating(true);
        
        setTimeout(async () => {
            if (clearChat) {
                await clearChat();
            }
            setIsRotating(false);
        }, 500);
    };

    const handleSend = async () => {
        if (!value.trim()) return

        addMessageChat({
            from: "user",
            name: `${userLocal?.firstName} ${userLocal?.lastName}`,
            text: value,
            date: new Date().toLocaleString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            }),
        })

        await askQuestion({
            question: value,
            threshold: 0.3
        }, {
            onSuccess: (response) => {
                addMessageChat({
                    from: "grambee",
                    name: 'GRAMBEE.BOT',
                    text: response.answer,
                    date: new Date().toLocaleString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                })
                setValue('')
            }
        })
    }

    return (
        <ChatBotContainer $isActive={isActive}>
            <BgChat $isActive={isActive} src={bgGrambee} alt="bgGrambee icon" />
            <ChatHead>
                <ChatHeadLogo src={grambeeLogo} alt="logo" />
                <HeadContent>
                    <h3>GRAMBEE.BOT <HeadphonesIcon width={14} height={14} colorFirst="#6A7080" colorSecond="#6A7080" uniqueId="chat" /></h3>
                    <p>Online</p>
                </HeadContent>
                <ButtonFull onClick={handleResetClick}>
                    <RotatingIcon $isRotating={isRotating}>
                    <ResetIcon width={20} height={20} color="currentColor"/>
                   </RotatingIcon>
                </ButtonFull>
                <ButtonFull $isActive={isActive} onClick={() => setIsActive(!isActive)}>
                    <FrameIcon width={16} height={16} colorFirst="currentColor" colorSecond="currentColor" />
                </ButtonFull>
            </ChatHead>
            <MessageContainer ref={messageContainerRef} $isActive={isActive}>
                {chat.map((item) => (
                    <Message
                        $position={item.from == "grambee" ? 'left' : 'right'}
                        key={item.id}
                    >
                        {isLoading ? (
                            <SkeletonAvaChat />
                        ) : (
                            <MessageLogo src={item.from == "grambee" ? grambeeLogo : userLocal?.avatarUrl} alt="logo" />
                        )}
                        <MessageBlock>
                            <MessageFrom
                                $position={item.from == "grambee" ? 'left' : 'right'}
                            >{item.name}</MessageFrom>
                            <TextContainer $position={item.from == "grambee" ? 'left' : 'right'}>
                                <Text dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br />') }} />
                                <DateText>{item.date}</DateText>
                            </TextContainer>
                            {/* <Commands>
                            <Сommand onClick={() => handleSend()}>Как дела?</Сommand>
                            <Сommand>Помоги с трафиком</Сommand>
                            <Сommand>Помоги с трафиком</Сommand>
                            <Сommand>Помоги с трафиком</Сommand>
                        </Commands> */}
                        </MessageBlock>
                    </Message>
                ))}
            </MessageContainer>
            <ChatFooter $isActive={isActive}>
                <ChatFooterLogo src={grambeeLogo} alt="logo" />
                <ChatInput
                    type="text"
                    placeholder="Задайте вопрос боту..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <ChatButton onClick={() => handleSend()}>
                    <SendIcon
                        width={23}
                        height={21}
                        colorFirst="#FFD26D"
                        colorSecond="#FFB81A"
                    />
                </ChatButton>
            </ChatFooter>
        </ChatBotContainer>

    )
}

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const ChatBotContainer = styled.div`
    position: relative;
    display: flex;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid #272A33;
    border-bottom: 0;
    ${({ $isActive }) => ($isActive && `
        position: fixed;
        inset: 0;
        z-index: 10;
        border-radius: 0;
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
    backdrop-filter: blur(16px);
    width: 100%;
    z-index: 1;
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
        display: flex;
        align-items: center;
        gap: 10px;
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
const ButtonFull = styled.button`
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
    
    ${({ $isActive }) => ($isActive && `
        color: #FFB81A !important;
    `)}
`
const RotatingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  animation: ${({$isRotating}) => $isRotating ? rotateAnimation : 'none'} 0.5s ease-in-out;
  transform-origin: center center;
  
  svg {
    display: block;
    width: 100%;
    height: 100%;
    
    * {
      transform-box: fill-box;
      transform-origin: center;
    }
  }
`;

const MessageContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 380px;
    overflow-y: auto;
    width: 100%;
    padding: 70px 0;
    ${({ $isActive }) => ($isActive && `
        height: 100%;
    `)}
`
const BgChat = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    pointer-events: none;
`
const Message = styled.div`
    position: relative;
    display: flex;
    gap: 12px;
    padding: 16px;
    ${({ $position }) => $position == 'right' && `
        flex-direction: row-reverse;
    `}
`
const MessageLogo = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
`
const MessageBlock = styled.div`
   display: flex;
   flex-direction: column;
`
const MessageFrom = styled.p`
    margin-top: 8px;
    font-size: 14px;
    font-weight: 700;
    ${({ $position }) => $position == 'right' && `
        text-align: right;
    `}
`
const TextContainer = styled.div`
    box-sizing: border-box;
    margin-top: 8px;
    padding: 10px 14px;
    border-radius: 4px 24px 24px 24px;
    background-color: #1F222B;
    max-width: 264px;
    width: 100%;
    font-size: 12px;

    ${({ $position }) => $position == 'right' && `
        border-radius: 24px 4px 24px 24px;
    `}
`
const Text = styled.p`
    font-size: 12px;
    margin-bottom: 8px;
`
const DateText = styled.p`
    color: #6A7080CC;
    text-align: right;
    width: 100%;
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

    &:hover {
         background-color: #1f222b;
    }
`
const MessageHidden = styled.div`
    height: 1px;
    width: 100%;
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
    backdrop-filter: blur(16px);
    width: 100%;
    border-radius: 24px;
    ${({ $isActive }) => ($isActive && `
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
    &:hover {
        &::placeholder {
            color: #fff;
        }
    }
    &::placeholder {
        color: #6A7080;
    }
`
const ChatButton = styled.button`
    &:hover {
        filter: drop-shadow(0 0 10px rgba(255, 184, 26, 0.4))
    }
    &:active {
        transform: translateY(-1px);
    }
`

export default ChatBot