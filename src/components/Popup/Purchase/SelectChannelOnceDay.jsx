import { useState } from "react";
import styled from "styled-components";

import TgSplashIcon from "@/icons/TgSplashIcon";

import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";
   
const SelectChannelOnceDay = () => {
    const { openPopup, goBack } = usePopupStore()
    const { receipt, setInviteLink } = useReceiptStore();
    const { showToast } = useToastStore();

    const handleNext = () => {
        if(!receipt?.name) return showToast("Выбирите канал", "error"); 
            
        openPopup('purchase-coverage-once-day', 'Покупка охватов', { step: 4, text: 'Укажите нужные вам параметры для канала' })
    }

    return (
        <>
            <ContainerPadding>
                <Button variant="blurGradient">
                    <TgSplashIcon width={16} height={13} colorFirst="#F7F9FF" colorSecond="#F7F9FF" />
                    Привязать свой канал
                </Button>
                <Table>
                    <colgroup>
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "50%" }} />
                        <col style={{ width: "25%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Ссылка</th>
                            <th>Кол-во охватов</th>
                            <th>Стоимость</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Row $active={receipt.name == 't.me/antropia..'} onClick={() => setInviteLink('t.me/antropia..')}>
                            <td>t.me/antropia..</td>
                            <td>1,600</td>
                            <td><mark>1 200 ₽</mark></td>
                        </Row>
                        <Row $active={receipt.name == 't.me/kurdnika..'} onClick={() => setInviteLink('t.me/kurdnika..')}>
                            <td>t.me/kurdnika..</td>
                            <td>3,100</td>
                            <td><mark>2 100 ₽</mark></td>
                        </Row>
                    </tbody>
                </Table>
            </ContainerPadding>
            <Buttons>
                <Button variant="default" onClick={() => goBack()}>Назад</Button>
                <Button variant="primary" onClick={handleNext}>Далее</Button>
            </Buttons>
        </>
    )
}

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 14px;

    th {
        padding: 12px 0;
        font-weight: 500;
        text-align: center;
        color: #8b90a0;
    }
    
    td {
        padding: 14px 0;
        text-align: center;
        border-top: 1px dashed #272a33;
        cursor: pointer;
    }
        tr:first-child {
            td {
                border-top: 0;
            }
        }
`;
const Row = styled.tr`
    ${({$active}) => $active && `
        background: #21242B;
    `}
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`


export default SelectChannelOnceDay