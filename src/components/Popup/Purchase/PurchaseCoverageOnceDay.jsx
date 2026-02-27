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
    const { goBack } = usePopupStore()
    const navigate = useNavigate();
    
   const { receipt, setCountries } = useReceiptStore();
    
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
                    newData = [...receipt.countries, { code, price: 1 }];
                }
            }
        }
        setCountries(newData)
    }
    
    const handleNext = () => {
        if(receipt.countries.lenght == 0) {
            return alert('выбирете страну')  
        }        

        navigate('/final-receipt')
    }

    return (
        <>
            <ContainerPadding>
                <Button variant="blue">
                    <StarIcon width={16} height={16} colorFirst="#FFFFFF" colorSecond="#FFFFFF" />
                    Премиум охваты
                </Button>
                <Flags countries={receipt.countries} select={selectCountries}/>
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