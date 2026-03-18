import styled from "styled-components";

import eyeCilia from '@/assets/icons/eye-cilia.svg';
import fireFilling from '@/assets/icons/fire-filling.svg';
import people from '@/assets/icons/people.svg';
import StarIcon from "@/icons/StarIcon";

import Button from "@/shared/Button";
import Radio from "@/shared/Radio";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

const CreateResurceSecond = () => {
    const { openPopup, closePopup } = usePopupStore();
    const { receipt, setType } = useReceiptStore();
    const { showToast } = useToastStore();
    
    const handleNext = () => {
        if (!receipt.type) return showToast("Выбирите тип метрики", "error");

        receipt.type === 'CHANNEL' ? (
            openPopup('select-channel', 'Выберите канал', { step: 3, text: 'Можете выбрать канал или же написать ссылку' })
        ) : receipt.type === 'BOOST' ? (
            openPopup('fill-fields-below', 'Заполните поля ниже', { step: 3, text: 'Укажите основные данные для вашего ресурса' })
        ) 
        // : receipt.type === 'coverage' ? (
        //     openPopup('select-areas', 'Выберите охваты', { step: 3, text: 'Определитесь с нужным типом трафика для вас' })
        // ) 
        : receipt.type === 'CHANNEL_JOIN_REQUEST' && (
            openPopup('select-channel-application', 'Выберите канал', { step: 3, text: 'Можете выбрать канал или же написать ссылку' })
        )
    }

    return (
        <>
            <CreateResurceTitle>Выберите, какой тип трафика вам нужен:</CreateResurceTitle>
            <RadioContainer>
                <Radio checked={receipt.type === 'CHANNEL'} onChange={() => setType('CHANNEL')} text="2.3 ₽ за подписчика" view="circleText">
                    <img src={people} alt="people" />
                    Подписчики
                </Radio>
                <Radio checked={receipt.type === 'BOOST'} onChange={() => setType('BOOST')} text="1.5 ₽ за буст" view="circleText">
                    <StarIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="second" />
                    Бусты
                </Radio>
                {/* <Radio checked={receipt.type === 'coverage'} onChange={() => setType('coverage')} text="1.63 ₽ за охват" view="circleText">
                    <img src={eyeCilia} alt="eyeCilia" />
                    Охваты
                </Radio> */}
                {receipt.typeFirst !== 'CHAT' && (
                    <Radio checked={receipt.type === 'CHANNEL_JOIN_REQUEST'} onChange={() => setType('CHANNEL_JOIN_REQUEST')} text="4.5 ₽ за заявку" view="circleText">
                        <img src={fireFilling} alt="fireFilling" />
                        Заявки
                    </Radio>
                )}
            </RadioContainer>
            <Buttons>
                <Button variant="default" onClick={() => closePopup()}>Отмена</Button>
                <Button variant="primary" onClick={() => handleNext()}>Далее</Button>
            </Buttons>
        </>
    )
}
const CreateResurceTitle = styled.h2`
    font-size: 14px;
	line-height: 14px;
	text-align: center;
`
const RadioContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px;
    @media (width <= 430px) {
        grid-template-columns: 1fr;
    }
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`

export default CreateResurceSecond
