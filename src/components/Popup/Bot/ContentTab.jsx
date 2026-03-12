import { useState } from "react";
import styled from "styled-components";

import grambeeLogo from "@/assets/icons/grambee-logo.svg";
import robot from "@/assets/icons/robot.svg";
import chat from "@/assets/icons/chat.svg";
import PaperIcon from "@/icons/PaperIcon";
import ImgIcon from "@/icons/ImgIcon";
import MessageIcon from "@/icons/MessageIcon";
import MapIcon from "@/icons/MapIcon";
import TextIcon from "@/icons/TextIcon";
import SettingIcon from "@/icons/SettingIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import StarIcon from "@/icons/StarIcon";

import InfoRow from "@/shared/InfoRow";
import Button from "@/shared/Button";

import useUpdateBot from "@/hooks/api/Bots/useUpdateBot";
import useSendMessage from "@/hooks/api/Bots/useSendMessage";

import { useUserStore } from '@/store/userStore';
import { useToastStore } from "@/store/toastStore";
import { usePopupStore } from "@/store/popupStore";
import { useBotStore } from "@/store/botStore";


const ContentTab = () => {
    const [isFocused, setIsFocused] = useState(false);

    const { bot, setBoostButtonText, setBotButtonText, setChannelButtonText, setChatButtonText, setSubscriptionMessage } = useBotStore();

    const { popup } = usePopupStore()

    const { renewBot } = useUpdateBot({ id: popup.data.botId });
    const { postPreview } = useSendMessage();

    const { userLocal } = useUserStore()
    const { showToast } = useToastStore();

    const handlePreview = () => {
        postPreview({
            userId: userLocal?.telegramId,
            text: bot.subscriptionMessage,
            buttons: JSON.stringify([
                { "text": "Вступить12", "url": "https://t.me/grambee" },
                { "text": "Вступить", "url": "https://t.me/grambee" },
                { "text": "Забустить", "url": "https://t.me/grambee" },
                { "text": "Вступить12", "url": "https://t.me/grambee" }
            ])
        },
        {
            onSuccess: () => {
                showToast("Сообщение успешно отправленно!", "success");
            },
            onError: (error) => {
                showToast(
                    error?.message || "Ошибка отправки сообщения",
                    "error"
                );
            }
        })
    }

    const handleSave = () => {
        renewBot({
            channelButtonText: bot.channelButtonText,
            chatButtonText: bot.chatButtonText,
            botButtonText: bot.botButtonText,
            boostButtonText: bot.boostButtonText
        }, {
            onSuccess: () => {
                showToast("Бот успешно обновлён!", "success");
            },
            onError: (error) => {
                showToast(
                    error?.message || "Ошибка при обновлении бота",
                    "error"
                );
            }
        })
    }

    return (
        <>
            <ButtonContainer onClick={() => handlePreview()}>
                <Button variant="primary"><mark>Предпросмотр поста</mark></Button>
            </ButtonContainer>
            <InfoContainer>
                <InfoRow
                    label="Текст кнопки в канале"
                    labelIcon={<SpeakerIcon width={16} height={16} color="#FFB000" />}
                    input={true}
                    inputValue={bot.channelButtonText}
                    onChange={(e) => setChannelButtonText(e.target.value)}
                />
                <InfoRow
                    label="Текст кнопки в чате"
                    labelIcon={<img src={chat} alt="chat" />}
                    input={true}
                    inputValue={bot.chatButtonText}
                    onChange={(e) => setChatButtonText(e.target.value)}
                />
                <InfoRow
                    label="Текст кнопки ботов"
                    labelIcon={<img src={robot} alt="robot" />}
                    input={true}
                    inputValue={bot.botButtonText}
                    onChange={(e) => setBotButtonText(e.target.value)}
                />
                <InfoRow
                    label="Текст кнопки бустов"
                    labelIcon={<StarIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="content" />}
                    input={true}
                    inputValue={bot.boostButtonText}
                    onChange={(e) => setBoostButtonText(e.target.value)}
                />
            </InfoContainer>
            <ContentTitle>Сообщение при подписке</ContentTitle>
            <ContentActions>
                <ActionsIcon><PaperIcon width={16} height={18} color="currentColor" /></ActionsIcon>
                <ActionsIcon><ImgIcon width={18} height={18} color="currentColor" /></ActionsIcon>
                <ActionsIcon><MessageIcon width={18} height={18} color="currentColor" /></ActionsIcon>
                <ActionsIcon><MapIcon width={16} height={18} color="currentColor" /></ActionsIcon>
                <ActionsIcon><TextIcon width={18} height={20} color="currentColor" /></ActionsIcon>
                <ActionsIcon><SettingIcon width={21} height={22} color="currentColor" /></ActionsIcon>
            </ContentActions>
            <ChatBotContainer>
                <ChatBot>
                    <Message $isFocused={isFocused}>
                        <MessageLogo src={grambeeLogo} alt="logo" />
                        <MessageBlock>
                            <MessageFrom>GRAMBEE.BOT</MessageFrom>
                            <MessageText
                                $isFocused={isFocused}
                                placeholder="Введите текст"
                                value={bot.subscriptionMessage}
                                onChange={(e) => setSubscriptionMessage(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            <Commands>
                                {bot.channelButtonText &&
                                    <Сommand>
                                        {bot.channelButtonText}
                                        <ImgContainer>
                                            <SpeakerIcon width={12} height={12} color="#FFB000" />
                                        </ImgContainer>
                                    </Сommand>
                                }
                                {bot.chatButtonText &&
                                    <Сommand>
                                        {bot.chatButtonText}
                                        <ImgContainer>
                                            <img src={chat} alt="chat" />
                                        </ImgContainer>
                                    </Сommand>
                                }
                                {bot.botButtonText &&
                                    <Сommand>
                                        {bot.botButtonText}
                                        <ImgContainer>
                                            <img src={robot} alt="robot" />
                                        </ImgContainer>
                                    </Сommand>
                                }
                                {bot.boostButtonText &&
                                    <Сommand>
                                        {bot.boostButtonText}
                                        <ImgContainer>
                                            <StarIcon width={12} height={12} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="contentView" />
                                        </ImgContainer>
                                    </Сommand>
                                }
                            </Commands>
                        </MessageBlock>
                    </Message>
                </ChatBot>
            </ChatBotContainer>
            <ButtonSaveContainer onClick={() => handleSave()}>
                <Button variant="primary"><mark>Сохранить</mark></Button>
            </ButtonSaveContainer>
        </>
    )
}

const ButtonContainer = styled.div`
    width: 100%;
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 25px;
`
const ContentTitle = styled.h2`
    margin-top: 32px;
    font-size: 24px;
`
const ContentActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 26px;
`
const ActionsIcon = styled.div`
    color: #6A7080;

    &:hover {
        color: #D6DCEC;
    }

    svg {
        cursor: pointer;
    }
`
const ChatBotContainer = styled.div`
    position: relative;
    margin-top: 32px;
    border-radius: 24px;
    border: 1px solid #272A33;
    overflow: hidden;
   
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        display: block;
        background-image: url('/src/assets/bg-grambee.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        pointer-events: none;
        z-index: 1;
    }
`
const ChatBot = styled.div`
    box-sizing: border-box;
    position: relative;
    overflow-y: auto;
	scrollbar-width: none;
    height: 195px;
`
const Message = styled.div`
    position: relative;
    display: flex;
    gap: 12px;
    position: ${({ $isFocused }) => $isFocused ? 'static' : 'absolute'};
    top: 24px;
    left: 24px;
    height: 100%;
    z-index: 2;
`
const MessageLogo = styled.img`
    width: 32px;
    height: 32px;
`
const MessageBlock = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
`
const MessageFrom = styled.p`
    margin-top: 8px;
    font-size: 14px;
    font-weight: 700;
`
const MessageText = styled.textarea`
    box-sizing: border-box;
    margin-top: 8px;
    padding: 10px 14px;
    border-radius: 4px 24px 24px 24px;
    border: none;
    background-color: #1F222B;
    width: 264px;
    font-size: 12px;
    color: #FFFFFF;
    resize: none;
    min-height: 84px;
    scrollbar-width: none;
    z-index: 4;
    
    ${({ $isFocused }) => $isFocused && `
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
    `}

    &::placeholder {
        color: #6A7080CC;
        transition: color 0.2s ease-in-out;
    }

    &:focus {
        outline: none;

        &::placeholder {
            color: #6A7080;
        }
    }
`
const Commands = styled.div`
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`
const Сommand = styled.button`
    position: relative;
    font-size: 12px;
    background-color: #272A33;
    border-radius: 8px;
    padding: 8px 16px;

    &:hover {
        background-color: #1f222b;
    }
`
const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: #1E2128;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    position: absolute;
    left: -8px;
    top: -6px;
    img {
        width: 12px;
        height: 12px;
    }
`
const ButtonSaveContainer = styled.div`
  margin-top: 32px;
  width: 100%;
`

export default ContentTab