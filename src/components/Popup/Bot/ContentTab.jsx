import styled from "styled-components";

import grambeeLogo from "@/assets/grambee-logo.svg";
import bgGrambee from "@/assets/bg-grambee.png";
import question from "@/assets/question.svg";
import PaperIcon from "@/icons/PaperIcon";
import ImgIcon from "@/icons/ImgIcon";
import MessageIcon from "@/icons/MessageIcon";
import MapIcon from "@/icons/MapIcon";
import TextIcon from "@/icons/TextIcon";
import SettingIcon from "@/icons/SettingIcon";

import InfoRow from "@/shared/InfoRow";
import Button from "@/shared/Button";

const ContentTab = () => {
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
                <ActionsIcon><PaperIcon width="16" height="18" color="currentColor" /></ActionsIcon>
                <ActionsIcon><ImgIcon width="18" height="18" color="currentColor" /></ActionsIcon>
                <ActionsIcon><MessageIcon width="18" height="18" color="currentColor" /></ActionsIcon>
                <ActionsIcon><MapIcon width="16" height="18" color="currentColor" /></ActionsIcon>
                <ActionsIcon><TextIcon width="18" height="20" color="currentColor" /></ActionsIcon>
                <ActionsIcon><SettingIcon width="21" height="22" color="currentColor" /></ActionsIcon>
            </ContentActions>
            <ChatBot>
                <BgChat src={bgGrambee} alt="bgGrambee icon" />
                 <Message>
                                    <MessageLogo src={grambeeLogo} alt="logo" />
                                    <MessageBlock>
                                        <MessageFrom>GRAMBEE.BOT</MessageFrom>
                                        <MessageText>Тесттестетстефшлцьвфшлцьвфц<br/>вмыаяпявап</MessageText>
                                  
                                    </MessageBlock>
                                </Message>
            </ChatBot>
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
const ChatBot = styled.div`
    position: relative;
    margin-top: 32px;
    border-radius: 24px;
    border: 1px solid #272A33;
    overflow: hidden;
`
const BgChat = styled.img`
    width: 100%;
    height: 195px;
    object-fit: cover;
    pointer-events: none;
`
const Message = styled.div`
    display: flex;
    gap: 12px;
    position: absolute;
    top: 24px;
    left: 24px;
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
    margin-top: 8px;
    padding: 10px 14px;
    border-radius: 4px 24px 24px 24px;
    background-color: #1F222B;
    max-width: 264px;
    width: 100%;
    font-size: 12px;
`

export default ContentTab