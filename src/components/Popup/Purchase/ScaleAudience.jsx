import { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import calendar from '@/assets/icons/calendar.svg';
import ArrowIcon from "@/icons/ArrowIcon";
import UserIcon from "@/icons/UserIcon";
import EditIcon from "@/icons/EditIcon";

import Button from "@/shared/Button";
import { GapContainer } from "@/shared/GapContainer";
import { ContainerPadding } from "@/shared/ContainerPadding";
import InputField from "@/shared/InputField";

import Flags from "@/components/Flags";
import SpeedMode from "@/components/SpeedMode";

import useCreateResource from "@/hooks/api/Resource/useCreateResource";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";
import { useUserStore } from '@/store/userStore';

import { flagsList } from "@/data/flagsList";

const ScaleAudience = () => {
    const { openPopup, goBack } = usePopupStore()
    const navigate = useNavigate();

    const { receipt, setDayLimit, setActiveDays, setRegions, setPrice } = useReceiptStore();

    const { showToast } = useToastStore();
    const { userLocal } = useUserStore()

    const { addResource } = useCreateResource({ userTelegramId: userLocal?.telegramId })

    const selectRegions = (code) => {
        let newData = [];
        if (code === "all" && receipt.regions.length === flagsList.length) {
            newData = [];
        } else {
            if (receipt.regions.includes(code)) {
                newData = receipt.regions.filter((item) => item !== code);
            } else {
                if (code === "all") {
                    newData = flagsList.map(flag => flag.code);
                } else {
                    newData = [...receipt.regions, code];
                }
            }
        }
        setRegions(newData)
    }

    const handleNext = () => {
        if (!receipt.dayLimit) return showToast("Введите количество подписчиков", "error");
        if (!receipt.activeDays) return showToast("Введите количество дней", "error");
        if (receipt.regions.length == 0) return showToast("Выбирете страну", "error");

        addResource({
            userTelegramId: Number(userLocal?.telegramId),
            type: receipt.type,

            inviteLink: receipt.inviteLink,
            name: receipt.name,
            username: receipt.username,
            channelId: receipt.channelId,

            verificationEnabled: receipt.verificationEnabled,
            checkerBotToken: receipt.checkerBotToken,

            trafficSpeed: receipt.dayLimit,
            dayLimit: receipt.dayLimit,
            activeDays: receipt.activeDays,
            speedMode: receipt.speedMode,

            regions: receipt.regions,

            allowCIS: receipt.allowCIS,
            allowGifts: receipt.allowGifts,
            allowPremium: receipt.allowPremium,

            isAdult: receipt.isAdult,
            workBotApiKey: receipt.workBotApiKey,

            // непонятно зачем в каналах это передается
            isBotMembersKey: false,
            linkRefreshDays: 1,
            allowRussian: false,
            allowForeign: false,
            allowMixed: false,
            maintainBoosts: false,
            autoPostType: "FUTURE",
            pastPostsPeriod: 7,

            posts: [],
        }, {
            onSuccess: (response) => {
                setPrice(response.price)
                showToast("Ресурс успешно создан", "success");
                navigate('/final-receipt')
            }, onError: (error) => {
                showToast(error?.message || "Ошибка при создании ресурса", "error");
            }
        })
    }

    return (
        <>
            <ContainerPadding>
                <InputContainer>
                    <InputField
                        id="dayLimit"
                        label="Кол-во подписчиков"
                        placeholder="КДП"
                        value={receipt.dayLimit}
                        onChange={(e) => setDayLimit(Number(e.target.value))}
                        icon={<UserIcon width={16} height={16} colorFirst='#FFD26D' colorSecond='#FFB81A' />}
                        iconRight={<EditIcon width={16} height={16} color='currentColor' />}
                    />
                    <InputField
                        id="activeDays"
                        label="Кол-во дней кампании"
                        placeholder="дни"
                        value={receipt.activeDays}
                        onChange={(e) => setActiveDays(Number(e.target.value))}
                        icon={<img src={calendar} alt="calendar" />}
                        iconRight={<ArrowContainer>
                            <ArrowIcon width={6} height={10} color="currentColor" />
                            <ArrowIcon width={6} height={10} color="currentColor" />
                        </ArrowContainer>}
                    />
                </InputContainer>

                <Flags regions={receipt.regions} select={selectRegions} />
                <GapContainer gap="24px">
                    <SpeedMode />
                    <Button
                        variant="black"
                        iconRight={<ArrowIcon width={6} height={10} color="#D6DCEC" />}
                        onClick={() => openPopup('additional-parameters', 'Указать доп. параметры', { text: 'Укажите нужные вам параметры аудитории' })}
                    >
                        Указать дополнительные параметры
                    </Button>
                </GapContainer>
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