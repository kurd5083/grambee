import { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ArrowIcon from "@/icons/ArrowIcon";
import UserIcon from "@/icons/UserIcon";
import EditIcon from "@/icons/EditIcon";
import calendar from '@/assets/icons/calendar.svg';

import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";
import InputField from "@/shared/InputField";

import Flags from "@/components/Flags";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

import { flagsList } from "@/data/flagsList";

const ScaleAudience = () => {
    const { openPopup, goBack } = usePopupStore()
    const [localCountries, setLocalCountries] = useState([]);
    const navigate = useNavigate();
    const [numberSubscribersLocal, setNumberSubscribersLocal] = useState("");
    const [numberCampaign, setNumberCampaign] = useState('');

    const { setNumberSubscribers, setNumberCampaignDays, setCountries } = useReceiptStore();

    const selectCountries = (code) => {
        let newData = [];
        if (code === "all" && localCountries.length === flagsList.length) {
            newData = [];
        } else {
            if (localCountries.find((item) => item.code == code)) {
                newData = localCountries.filter((item) => item.code !== code);
            } else {
                if (code === "all") {
                    newData = [...flagsList];
                } else {
                    newData = [...localCountries, { code, price: 1 }];
                }
            }
            
        }
        setLocalCountries(newData)
    }

    const handleNext = () => {
        if (localCountries.lenght == 0) {
            alert('выбирете страну')
            return
        } else if(numberCampaign == '') {
            alert('введите количество дней')
            return
        }else if(numberSubscribersLocal == '') {
            alert('введите количество подписчиков')
            return
        }

        setCountries(localCountries, 1)
        setNumberSubscribers(numberSubscribersLocal)
        setNumberCampaignDays(numberCampaign)
        navigate('/final-receipt')
    }

    return (
        <>
            <ContainerPadding>
                <InputContainer>
                    <InputField
                        id="numberSubscribers"
                        label="Кол-во подписчиков"
                        placeholder="Кол-во подписчиков"
                        value={numberSubscribersLocal}
                        onChange={(e) => setNumberSubscribersLocal(e.target.value)}
                        icon={<UserIcon width={16} height={16} colorFirst='#FFD26D' colorSecond='#FFB81A' />}
                        iconRight={<EditIcon width={16} height={16} color='#6A7080' />}
                    />
                    <InputField
                        id="numberCampaign"
                        label="Кол-во дней кампании"
                        placeholder="Кол-во дней"
                        value={numberCampaign}
                        onChange={(e) => setNumberCampaign(e.target.value)}
                        icon={<img src={calendar} alt="calendar" />}
                        iconRight={<ArrowIcon width={6} height={10} color="#D6DCEC" />}
                    />
                </InputContainer>
                <Flags countries={localCountries} select={selectCountries} />
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