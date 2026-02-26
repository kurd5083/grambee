
import styled from "styled-components";

import ArrowIcon from "@/icons/ArrowIcon";

import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";

import ChannelBlock from "@/components/ChannelBlock";

import { usePopupStore } from "@/store/popupStore";

const SelectChannelConstantly = () => {
    const { openPopup, goBack } = usePopupStore()

    return (
        <>
            <ContainerPadding>
                <SelectChannelTitle>Привязанный канал</SelectChannelTitle>
                <ChannelBlock type="text"/>
                <Button 
                    variant="black" 
                    iconRight={<ArrowIcon width={6} height={10} color="#D6DCEC"/>}
                    onClick={() => openPopup('additional-parameters', 'Указать доп. параметры', { text: 'Укажите нужные вам параметры аудитории' })}
                >Указать дополнительные параметры</Button>
            </ContainerPadding>
            <Buttons>
                <Button variant="default" onClick={()=> goBack()}>Назад</Button>
                <Button 
                    variant="primary" 
                    onClick={() => openPopup('purchase-coverage-constantly', 'Покупка охватов', { step: 4, text: 'Укажите нужные вам параметры для канала' })}
                >Далее</Button>
            </Buttons>
        </>
    )
}

const SelectChannelTitle = styled.h2`
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 700;
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`

export default SelectChannelConstantly