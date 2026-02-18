import styled from "styled-components";

import question from "@/assets/question.svg";

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
        </>
    )
}

const ButtonContainer = styled.button`
  margin-top: 32px;
  width: 100%;
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 25px;
`

export default ContentTab