import { useState } from "react";
import styled from "styled-components";

import TgSplashIcon from "@/icons/TgSplashIcon";

import Radio from "@/shared/Radio";
import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

const SelectAreas = () => {
    const [selectedRadio, setSelectedRadio] = useState('constantly');
    const { openPopup, goBack } = usePopupStore();

    const { setTypeCoverage } = useReceiptStore();

    const handleNext = () => {
        if (!selectedRadio) {
            return alert('выбирете охваты')
        }

        const type = selectedRadio == 'constantly' ? 'Постоянно' : 'Единоразово'
        setTypeCoverage(type)
        
        selectedRadio === 'constantly' ? (
            openPopup('select-channel-constantly', 'Выберите канал', { step: 3, text: 'Можете выбрать канал или же написать ссылку' })
        ) : selectedRadio === 'once-day' && (
            openPopup('select-channel-once-day', 'Выберите канал', { step: 3, text: 'Можете выбрать канал или же написать ссылку' })
        )
    }
    
    return (
        <Container>
            <SelectAreasContainer>
                <RadioContainer>
                    <Radio checked={selectedRadio === "constantly"} onChange={() => setSelectedRadio("constantly")} text="Грамби постоянно будет отслеживать и “накручивать” наних нужное кол-во просмотров" view="circleTextMore">
                        Постоянно
                    </Radio>
                    <Radio checked={selectedRadio === "once-day"} onChange={() => setSelectedRadio("once-day")} text="Грамби будет на конкретный пост давать просмотры и повышать охват(хоть 10 сразу)" view="circleTextMore">
                        Единоразово
                    </Radio>
                </RadioContainer>
                {selectedRadio === 'constantly' && (
                    <Button variant="blurGradient">
                        <TgSplashIcon width={16} height={13} colorFirst="#F7F9FF" colorSecond="#F7F9FF" />
                        Привязать свой канал
                    </Button>
                )}
            </SelectAreasContainer>
            <Buttons>
                <Button variant="default" onClick={() => goBack()}>Назад</Button>
                <Button variant="primary" onClick={handleNext}>Далее</Button>
            </Buttons>
        </Container>
    )
}
const Container = styled.div`
    padding: 0 24px;
`
const SelectAreasContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`
const RadioContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    @media(max-width: 430px) {
        grid-template-columns: 1fr;
    }
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding-bottom: 24px;
`

export default SelectAreas