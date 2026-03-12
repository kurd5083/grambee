import { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import calendar from '@/assets/icons/calendar.svg';
import ArrowIcon from "@/icons/ArrowIcon";
import UserIcon from "@/icons/UserIcon";
import EditIcon from "@/icons/EditIcon";

import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";
import InputField from "@/shared/InputField";

import Flags from "@/components/Flags";

import useCalculatePrice from "@/hooks/api/Resource/useCalculatePrice";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

import { flagsList } from "@/data/flagsList";

const ScaleAudience = () => {
    const { openPopup, goBack } = usePopupStore()
    const navigate = useNavigate();

    const { receipt, setNumberSubscribers, setNumberCampaignDays, setCountries, setPrice } = useReceiptStore();
    const { showToast } = useToastStore();
    const { computePrice } = useCalculatePrice()

    const selectCountries = (code) => {
        let newData = [];
        if (code === "all" && receipt.countries.length === flagsList.length) {
            newData = [];
        } else {
            if (receipt.countries.find((item) => item.code == code)) {
                newData = receipt.countries.filter((item) => item.code !== code);
            } else {
                if (code === "all") {
                    newData = [...flagsList];
                } else {
                    newData = [...receipt.countries, { code, price: 1, name: flagsList.find((flag) => flag.code == code).name }];
                }
            }
        }
        setCountries(newData)
    }

    const handleNext = () => {
        if (!receipt.numberSubscribers) return showToast("Введите количество подписчиков", "error");
        if (!receipt.numberCampaignDays) return showToast("Введите количество дней", "error");
        if (receipt.countries.length == 0) return showToast("Выбирете страну", "error"); 

        computePrice({
            type: receipt.typeResource.toUpperCase(),
            quantity: Number(receipt.numberSubscribers),
            linkChangeDays: Number(receipt.numberCampaignDays),
            allowPremium: receipt.selectedFilters?.allowPremium ?? false,
            allowRussian: receipt.selectedFilters?.allowRussian ?? false,
            allowForeign: receipt.selectedFilters?.allowForeign ?? false,
            allowCIS: receipt.selectedFilters?.allowCIS ?? false,
            allowMixed: false,
            allowGifts: receipt.selectedFilters?.allowGifts ?? false,
            userLevel: "BRONZE"
        }, {
            onSuccess: (response) => {
                setPrice(response.totalPrice)
                navigate('/final-receipt')
            },
        })
    }

    return (
        <>
            <ContainerPadding>
                <InputContainer>
                    <InputField
                        id="numberSubscribers"
                        label="Кол-во подписчиков"
                        placeholder="КДП"
                        value={receipt.numberSubscribers}
                        onChange={(e) => setNumberSubscribers(e.target.value)}
                        icon={<UserIcon width={16} height={16} colorFirst='#FFD26D' colorSecond='#FFB81A' />}
                        iconRight={<EditIcon width={16} height={16} color='currentColor' />}
                    />
                    <InputField
                        id="numberCampaign"
                        label="Кол-во дней кампании"
                        placeholder="дни"
                        value={receipt.numberCampaignDays}
                        onChange={(e) => setNumberCampaignDays(e.target.value)}
                        icon={<img src={calendar} alt="calendar" />}
                        iconRight={<ArrowContainer>
                            <ArrowIcon width={6} height={10} color="currentColor" />
                            <ArrowIcon width={6} height={10} color="currentColor" />
                        </ArrowContainer>}
                    />
                </InputContainer>
                <Flags countries={receipt.countries} select={selectCountries} />
                <Button
                    variant="black"
                    iconRight={<ArrowIcon width={6} height={10} color="#D6DCEC" />}
                    onClick={() => openPopup('additional-parameters', 'Указать доп. параметры', { text: 'Укажите нужные вам параметры аудитории' })}
                >Указать дополнительные параметры</Button>
            </ContainerPadding>
            <Buttons>
                <Button variant="default" onClick={() => goBack()}>Назад</Button>
                <Button variant="primary" onClick={handleNext}>Купить кампанию</Button>
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
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`

export default ScaleAudience