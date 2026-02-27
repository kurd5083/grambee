import { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router";

import question from "@/assets/icons/question.svg";
import calendar from '@/assets/icons/calendar.svg';
import UserIcon from "@/icons/UserIcon";
import EditIcon from "@/icons/EditIcon";
import ArrowIcon from "@/icons/ArrowIcon";

import InputField from "@/shared/InputField";
import Radio from "@/shared/Radio";
import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";
import { GapContainer } from "@/shared/GapContainer";

import { useReceiptStore } from "@/store/receiptStore";
import { usePopupStore } from "@/store/popupStore";

const BasicInformation = () => {
    const [nameCompany, setNameCompany] = useState('')
    const [botStatAPI, setBotStatAPI] = useState(false)
    const { openPopup, goBack } = usePopupStore()

    const navigate = useNavigate();

    const { receipt, setDailyTraffic, setCompDuration, setSpeedMode } = useReceiptStore();

     const handleNext = () => {
        if(!receipt.dailyTraffic) {
            return alert('выбирете суточный трафик')
        }        
        if(!receipt.compDuration) {
            return alert('выбирете длительность комп.')
        }  
        if(!receipt.speedMode) {
            return alert('выбирите режим скорости')
        } 
        
        navigate('/final-receipt')
    }

    return (
        <>
            <ContainerPadding>
                <GapContainer gap="24px">
                    <InputField
                        id="nameCompany"
                        label="Название рекламной компании"
                        placeholder="Private125"
                        value={nameCompany}
                        onChange={(e) => setNameCompany(e.target.value)}
                        labelIcon={question}
                    />
                    <InputContainer>
                        <InputField
                            id="dailyTraffic"
                            label="Суточный трафик"
                            placeholder="Суточный трафик"
                            value={receipt.dailyTraffic}
                            onChange={(e) => setDailyTraffic(e.target.value)}
                            icon={<UserIcon width={16} height={16} colorFirst='#FFD26D' colorSecond='#FFB81A' />}
                            iconRight={<EditIcon width={16} height={16} color='currentColor' />}
                        />
                        <InputField
                            id="compDuration"
                            label="Длительность комп."
                            placeholder="Длительность комп."
                            value={receipt.compDuration}
                            onChange={(e) => setCompDuration(e.target.value)}
                            icon={<img src={calendar} alt="calendar" />}
                            iconRight={<ArrowContainer>
                                <ArrowIcon width={6} height={10} color="currentColor" />
                                <ArrowIcon width={6} height={10} color="currentColor" />
                            </ArrowContainer>}
                        />
                    </InputContainer>
                    <Title>Режим скорости <img src={question} alt="question"/></Title>
                    <RadioContainer>
                        <Radio
                            checked={receipt.speedMode === 'two-hours'}
                            onChange={() => setSpeedMode('two-hours')}
                            text="1-2 часа"
                            view="circleNoBG">
                            Быстрый
                        </Radio>
                        <Radio
                            checked={receipt.speedMode === 'twelve-hours'}
                            onChange={() => setSpeedMode('twelve-hours')}
                            text="Около 12 часов"
                            view="circleNoBG">
                            Средний
                        </Radio>
                        <Radio
                            checked={receipt.speedMode === 'twenty-four-hours'}
                            onChange={() => setSpeedMode('twenty-four-hours')}
                            text="Около 24 часов"
                            view="circleNoBG">
                            Медленный
                        </Radio>
                    </RadioContainer>
                    <Radio
                        checked={botStatAPI === true}
                        onChange={() => setBotStatAPI(!botStatAPI)}
                        text="Если включено, бот будет проверять выполнения задания перед проверкой"
                        view="circleTextMoreNoBG"
                    >
                        Использовать BotStat API
                    </Radio>
                </GapContainer>
            </ContainerPadding>
            <Buttons>
                <Button variant="default" onClick={() => goBack()}>Назад</Button>
                <Button variant="primary"onClick={handleNext}>Далее</Button>
            </Buttons>
        </>
    )
}

const ArrowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    color: #6A7080;
    flex: 1;
    
    svg {
        cursor: pointer;
        &:hover {
            color: #D6DCEC;
        }
    }

    &>svg:first-child {
        transform: rotate(-90deg);
    }

    &>svg:last-child {
        transform: rotate(90deg);
    }
`
const InputContainer = styled.div`
    display: flex;
    gap: 8px;
`
const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
`;
const RadioContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    @media(max-width: 400px) {
        grid-template-columns: 1fr;
    }
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`

export default BasicInformation