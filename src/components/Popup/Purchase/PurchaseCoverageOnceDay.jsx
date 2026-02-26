import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import StarIcon from "@/icons/StarIcon";

import Button from "@/shared/Button";

import Flags from "@/components/Flags";
import { ContainerPadding } from "@/shared/ContainerPadding";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

import { flagsList } from "@/data/flagsList";

const PurchaseCoverageOnceDay = () => {
    const [localCountries, setLocalCountries] = useState([]);
    const { goBack } = usePopupStore()
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
            return alert('выбирете страну')  
        }        
                 
        setCountries(localCountries, 1)
        navigate('/final-receipt')
    }

    return (
        <>
            <ContainerPadding>
                <Button variant="blue">
                    <StarIcon width={16} height={16} colorFirst="#FFFFFF" colorSecond="#FFFFFF" />
                    Премиум охваты
                </Button>
                <Flags countries={localCountries} select={selectCountries}/>
            </ContainerPadding>
            <Buttons>
                <Button variant="default" onClick={() => goBack()}>Назад</Button>
                <Button variant="primary" onClick={handleNext}>Купить кампанию</Button>
            </Buttons>
        </>
    )
}

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`

export default PurchaseCoverageOnceDay