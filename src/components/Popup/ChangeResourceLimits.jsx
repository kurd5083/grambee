import styled from 'styled-components';
import { useState, useEffect } from 'react';

import question from "@/assets/icons/question.svg";

import InputField from "@/shared/InputField";
import { GapContainer } from "@/shared/GapContainer";
import { ContainerPadding } from "@/shared/ContainerPadding";
import Note from "@/shared/Note";
import Button from "@/shared/Button";

import useUpdateParams from "@/hooks/api/Resource/useUpdateParams";
import useCalculatePrice from '@/hooks/api/Resource/useCalculatePrice';

import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

const ChangeResourceLimits = () => {
    const [dayLimitDiff, setDayLimitDiff] = useState(0);
    const [activeDaysDiff, setActiveDaysDiff] = useState(0);
    const [dayLimitPrice, setDayLimitPrice] = useState(0);
    const [activeDaysPrice, setActiveDaysPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { receipt, setDayLimit, setActiveDays } = useReceiptStore();

    const [originalDayLimit] = useState(receipt.dayLimit || 0);
    const [originalActiveDays] = useState(receipt.activeDays || 0);

    const { renewParams, isChange } = useUpdateParams({ id: receipt.id })
    const { computePrice, priceLoading } = useCalculatePrice()
    const { showToast } = useToastStore();

    const isLoading = isChange;

    useEffect(() => {
        const dayDiff = Math.max(0, (parseInt(receipt.dayLimit) || 0) - originalDayLimit);
        const daysDiff = Math.max(0, (parseInt(receipt.activeDays) || 0) - originalActiveDays);

        setDayLimitDiff(dayDiff);
        setActiveDaysDiff(daysDiff);
    }, [receipt.dayLimit, receipt.activeDays, originalDayLimit, originalActiveDays]);

    useEffect(() => {
        setTotalPrice(dayLimitPrice + activeDaysPrice);
    }, [dayLimitPrice, activeDaysPrice]);

    useEffect(() => {
        const dayDiff = parseInt(receipt.dayLimit) - originalDayLimit;
        const daysDiff = parseInt(receipt.activeDays) - originalActiveDays;

        if (dayDiff === 0) {
            setDayLimitPrice(0);
        }
        if (daysDiff === 0) {
            setActiveDaysPrice(0);
        }
    }, [receipt.dayLimit, receipt.activeDays]);

    const handleDayLimitChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        if (value >= originalDayLimit) {
            setDayLimit(value);

            const dayDiff = value - originalDayLimit;
            if (dayDiff > 0) {
                computePrice({
                    type: "BOT",
                    quantity: dayDiff,
                    linkChangeDays: 1,
                    allowPremium: false,
                    allowRussian: false,
                    allowForeign: false,
                    allowCIS: false,
                    allowMixed: false,
                }, {
                    onSuccess: (response) => {
                        setDayLimitPrice(response.totalPrice || 0);
                    },
                    onError: (error) => {
                        console.error(error);
                    }
                });
            } else {
                setDayLimitPrice(0);
            }
        }
    };

    const handleActiveDaysChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        if (value >= originalActiveDays) {
            setActiveDays(value);

            const daysDiff = value - originalActiveDays;
            if (daysDiff > 0) {
                computePrice({
                    type: "BOT",
                    quantity: daysDiff,
                    linkChangeDays: 1,
                    allowPremium: false,
                    allowRussian: false,
                    allowForeign: false,
                    allowCIS: false,
                    allowMixed: false,
                }, {
                    onSuccess: (response) => {
                        setActiveDaysPrice(response.totalPrice || 0);
                    },
                    onError: (error) => {
                        console.error(error);
                    }
                });
            } else {
                setActiveDaysPrice(0);
            }
        }
    };
    const handleSave = () => {
        renewParams({
            activeDays: receipt.activeDays,
            dayLimit: receipt.dayLimit,
        }, {
            onSuccess: () => {
                showToast("Лимиты успешно изменены", "success");
                goBack();
            },
            onError: (error) => {
                showToast(error?.message || "Ошибка при изменении лимитов", "error");
            }
        })
    }

    return (
        <>
            <ContainerPadding>
                <GapContainer gap="24px">
                    <InputField
                        id="dayLimit"
                        label="Новый дневной лимит"
                        labelIcon={question}
                        value={receipt.dayLimit}
                        onChange={handleDayLimitChange}
                    />
                    <InputField
                        id="activeDays"
                        label="Новые активные дни"
                        labelIcon={question}
                        value={receipt.activeDays}
                        onChange={handleActiveDaysChange}
                    />
                </GapContainer>
                <Note><p>Вы можете только увеличивать лимиты. Доплата рассчитывается автоматически на основе изменений.</p></Note>
                <CalculationContainer>
                    <CalculationRow $isPositive={dayLimitDiff > 0}>
                        <span>Изменение дневного лимита:</span>
                        <Value $isPositive={dayLimitDiff > 0}>
                            {dayLimitDiff > 0 ? '+' : ''}{dayLimitDiff}
                        </Value>
                    </CalculationRow>
                    <CalculationRow $isPositive={activeDaysDiff > 0}>
                        <span>Изменение активных дней:</span>
                        <Value $isPositive={activeDaysDiff > 0}>
                            {activeDaysDiff > 0 ? '+' : ''}{activeDaysDiff}
                        </Value>
                    </CalculationRow>
                    <Divider />
                    <TotalRow>
                        <span>К оплате:</span>
                        <TotalPrice>
                            {priceLoading ? '...' : totalPrice.toFixed(2)} $
                        </TotalPrice>
                    </TotalRow>
                </CalculationContainer>
            </ContainerPadding>
            <ButtonSaveContainer onClick={() => handleSave()}>
                <Button variant="primary" disabled={isLoading}><mark>{isLoading ? 'Сохранение...' : 'Сохранить'}</mark></Button>
            </ButtonSaveContainer>
        </>
    )
}

const CalculationContainer = styled.div`
    background-color: #1F222B;
    border-radius: 16px;
    padding: 20px;
    margin-top: 20px;
`;

const CalculationRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    color: ${({ $isPositive }) => $isPositive ? '#4CAF50' : '#FFFFFF'};
`;

const Value = styled.span`
    font-weight: 700;
    color: ${({ $isPositive }) => $isPositive ? '#4CAF50' : '#FFFFFF'};
`;

const Divider = styled.div`
    height: 1px;
    background-color: #333845;
    margin: 16px 0;
`;

const TotalRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-size: 18px;
    font-weight: 700;
`;

const TotalPrice = styled.span`
    color: #FFB81A;
    font-size: 24px;
`;

const ButtonSaveContainer = styled.div`
    box-sizing: border-box;
    margin-top: 32px;
    width: 100%;
    padding: 0 24px 24px;
`

export default ChangeResourceLimits;