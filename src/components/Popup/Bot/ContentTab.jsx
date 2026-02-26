import { useState } from "react";
import styled from "styled-components";

import grambeeLogo from "@/assets/icons/grambee-logo.svg";
import question from "@/assets/icons/question.svg";
import PaperIcon from "@/icons/PaperIcon";
import ImgIcon from "@/icons/ImgIcon";
import MessageIcon from "@/icons/MessageIcon";
import MapIcon from "@/icons/MapIcon";
import TextIcon from "@/icons/TextIcon";
import SettingIcon from "@/icons/SettingIcon";

import InfoRow from "@/shared/InfoRow";
import Button from "@/shared/Button";

const ContentTab = () => {
    const [value, setValue] = useState('')
    const [isFocused, setIsFocused] = useState(false);

    return (
        <>
            <ButtonContainer>
                <Button variant="primary"><mark>Предпросмотр поста</mark></Button>
            </ButtonContainer>
            <InfoContainer>
                <InfoRow
                    label="Текст для кнопки в канале"
                    labelIcon={question}
                    actionText="Вступить"
                />
                <InfoRow
                    label="Текст для кнопки в чате"
                    labelIcon={question}
                    actionText="Вступить"
                />
                <InfoRow
                    label="Текст для кнопки для ботов"
                    labelIcon={question}
                    actionText="Запустить"
                />
                <InfoRow
                    label="Текст для кнопки для бустов"
                    labelIcon={question}
                    actionText="Запустить"
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
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </MessageBlock>
                    </Message>
                </ChatBot>
            </ChatBotContainer>
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
    height: 100%;
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

export default ContentTab