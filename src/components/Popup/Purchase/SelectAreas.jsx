import { useState } from "react";
import styled from "styled-components";

import TgSplashIcon from "@/icons/TgSplashIcon";

import Radio from "@/shared/Radio";
import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

const SelectAreas = () => {
    const { openPopup, goBack } = usePopupStore();

    const { receipt, setTypeCoverage } = useReceiptStore();

    const handleNext = () => {
        if (!receipt.typeCoverage) {
            return alert('выбирете охваты')
        }

        receipt.typeCoverage === 'constantly' ? (
            openPopup('select-channel-constantly', 'Выберите канал', { step: 3, text: 'Можете выбрать канал или же написать ссылку' })
        ) : receipt.typeCoverage === 'once-day' && (
            openPopup('select-channel-once-day', 'Выберите канал', { step: 3, text: 'Можете выбрать канал или же написать ссылку' })
        )
    }
    
    return (
        <Container>
            <SelectAreasContainer>
                <RadioContainer>
                    <Radio 
                        checked={receipt.typeCoverage === "constantly"} 
                        onChange={() => setTypeCoverage("constantly")} 
                        text="Грамби постоянно будет отслеживать и “накручивать” наних нужное кол-во просмотров" 
                        view="circleTextMore">
                        Постоянно
                    </Radio>
                    <Radio 
                        checked={receipt.typeCoverage === "once-day"} 
                        onChange={() => setTypeCoverage("once-day")} 
                        text="Грамби будет на конкретный пост давать просмотры и повышать охват(хоть 10 сразу)" 
                        view="circleTextMore">
                        Единоразово
                    </Radio>
                </RadioContainer>
                {receipt.typeCoverage === 'constantly' && (
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