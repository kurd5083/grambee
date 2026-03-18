import styled from "styled-components"

import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";

const Confirmation = () => {
    const { popup, closePopup } = usePopupStore();

    const handleConfirm = () => {
        popup.data.onConfirm({
            onSuccess: () => {
                closePopup();
            }
        });
    };

    return (
        <Buttons>
            <Button variant="default" onClick={() => closePopup()}>Отмена</Button>
            <Button variant={popup.data.buttonConfirm.type} onClick={() => handleConfirm()}>{popup.data.buttonConfirm.text}</Button>
        </Buttons>
    )
}

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 24px 24px;
`

export default Confirmation