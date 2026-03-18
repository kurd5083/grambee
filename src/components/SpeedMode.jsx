import styled from "styled-components";

import Radio from "@/shared/Radio";

import { useReceiptStore } from "@/store/receiptStore";

const SpeedMode = () => {
    const { receipt, setSpeedMode } = useReceiptStore();

    return (
        <RadioContainer>
            <Radio
                checked={receipt.speedMode === 'HIGH'}
                onChange={() => setSpeedMode('HIGH')}
                text="1-2 часа"
                view="circleNoBG">
                Быстрый
            </Radio>
            <Radio
                checked={receipt.speedMode === 'MEDIUM'}
                onChange={() => setSpeedMode('MEDIUM')}
                text="Около 12 часов"
                view="circleNoBG">
                Средний
            </Radio>
            <Radio
                checked={receipt.speedMode === 'LOW'}
                onChange={() => setSpeedMode('LOW')}
                text="Около 24 часов"
                view="circleNoBG">
                Медленный
            </Radio>
        </RadioContainer>
    )
}

const RadioContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    
    @media (width <= 400px) {
        grid-template-columns: 1fr;
    }
`

export default SpeedMode