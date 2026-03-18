import styled from "styled-components";
import { useNavigate } from "react-router";

import StarIcon from "@/icons/StarIcon";

import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";

import Flags from "@/components/Flags";
import SpeedMode from "@/components/SpeedMode";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

import { flagsList } from "@/data/flagsList";

const PurchaseCoverageOnceDay = () => {
    const { goBack } = usePopupStore()
    const navigate = useNavigate();
    
    const { receipt, setRegions } = useReceiptStore();
    const { showToast } = useToastStore();

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
        if(receipt.regions.lenght == 0) {
            return showToast("Выбирете страну", "error");
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
                <Flags regions={receipt.regions} select={selectRegions}/>
                <SpeedMode/>
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