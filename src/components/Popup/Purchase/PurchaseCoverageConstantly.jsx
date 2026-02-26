import { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router";

import fireFilling from "@/assets/icons/fire-filling.svg";
import ArrowIcon from "@/icons/ArrowIcon";
import EditIcon from "@/icons/EditIcon";
import StarIcon from "@/icons/StarIcon";

import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";
import InputField from "@/shared/InputField";

import Flags from "@/components/Flags";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

import { flagsList } from "@/data/flagsList";

const PurchaseCoverageConstantly = () => {
    const { goBack } = usePopupStore()
    const [localCountries, setLocalCountries] = useState([]);
    const navigate = useNavigate();

    const { setCountries } = useReceiptStore();

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
        if(localCountries.lenght == 0) {
            alert('выбирете страну')
            return
        }        
             
        setCountries(localCountries, 1)
        navigate('/final-receipt')
    }
    
    return (
        <>
            <ContainerPadding>
                <ParamsHead>
                    <ParamsTitle>Укажите нужный ER</ParamsTitle>
                    <ParamsText>Grambee будет поддерживать указанный\nвами ER в канале</ParamsText>
                </ParamsHead>
                <InputContainer>
                    <InputField
                        id="link"
                        placeholder="От"
                        inputAction="ER"
                    />
                    <InputField
                        id="link"
                        placeholder="до"
                        inputAction="ER"
                    />
                </InputContainer>
                <ParamsHead>
                    <ParamsTitle>Указать срок для охватов</ParamsTitle>
                    <ParamsText>Grambee будет поддерживать указанный\nвами ER в канале</ParamsText>
                </ParamsHead>
                <InputContainer>
                    <InputField
                        id="link"
                        placeholder="test"
                        iconRight={<EditIcon width={16} height={16} color="#6A7080" />}
                    />
                    <InputField
                        id="link"
                        placeholder="часы"
                        iconRight={<ArrowContainer>
                            <ArrowIcon width={6} height={10} color="currentColor" />
                            <ArrowIcon width={6} height={10} color="currentColor" />
                        </ArrowContainer>}
                    />
                </InputContainer>
                <ButtonContainer>
                    <Button variant="blue">
                        <StarIcon width={16} height={16} colorFirst="#FFFFFF" colorSecond="#FFFFFF" />
                        Премиум охваты
                    </Button>
                </ButtonContainer>
                <ParamsHead>
                    <ParamsTitle>Укажите диапазон реакций <span>(не обязательно)</span></ParamsTitle>
                    <ParamsText>Grambee будет поддерживать указанный\nвами ER в канале</ParamsText>
                </ParamsHead>
                <InputContainer>
                    <InputField
                        id="link"
                        placeholder="От"
                        iconRight={<img src={fireFilling} alt="fireFilling" />}
                    />
                    <InputField
                        id="link"
                        placeholder="До"
                        iconRight={<img src={fireFilling} alt="fireFilling" />}
                    />
                </InputContainer>
                <Flags countries={localCountries} select={selectCountries}/>
            </ContainerPadding>
            <Buttons>
                <Button variant="default" onClick={() => goBack()}>Назад</Button>
                <Button variant="primary" onClick={handleNext}>Купить кампанию</Button>
            </Buttons>
        </>
    )
}
const ParamsHead = styled.div`
    display: flex;
    flex-direction: column;
    margin: 24px 0 16px;
    &:first-child {
        margin-top: 0;
    }
`
const InputContainer = styled.div`
    display: flex;
    gap: 8px;
`
const ParamsTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 18px;
    margin-bottom: 8px;
    span {
        font-size: 14px;
        color: #6A7080CC;
    }
`
const ParamsText = styled.p`
    font-size: 14px;
    color: #6A7080CC;
    white-space: pre-wrap;
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`
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
const ButtonContainer = styled.div`
    margin-top: 24px;
`

export default PurchaseCoverageConstantly