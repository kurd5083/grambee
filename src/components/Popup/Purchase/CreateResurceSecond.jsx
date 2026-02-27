import { useState } from "react";
import styled from "styled-components";

import eyeCilia from '@/assets/icons/eye-cilia.svg';
import fireFilling from '@/assets/icons/fire-filling.svg';
import people from '@/assets/icons/people.svg';
import StarIcon from "@/icons/StarIcon";

import Button from "@/shared/Button";
import Radio from "@/shared/Radio";

import { usePopupStore } from "@/store/popupStore";


const CreateResurceSecond = () => {
    const { openPopup, closePopup } = usePopupStore();
    const [selectedRadio, setSelectedRadio] = useState('subscribers');

    return (
        <>
            <CreateResurceTitle>Выберите, какой тип трафика вам нужен:</CreateResurceTitle>
            <RadioContainer>
                <Radio checked={selectedRadio === 'subscribers'} onChange={() => setSelectedRadio('subscribers')} text="2.3 ₽ за подписчика" view="circleText">
                    <img src={people} alt="people" />
                    Подписчики
                </Radio>
                <Radio checked={selectedRadio === 'boosts'} onChange={() => setSelectedRadio('boosts')} text="1.5 ₽ за буст" view="circleText">
                    <StarIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" />
                    Бусты
                </Radio>
                <Radio checked={selectedRadio === 'coverage'} onChange={() => setSelectedRadio('coverage')} text="1.63 ₽ за охват" view="circleText">
                    <img src={eyeCilia} alt="eyeCilia" />
                    Охваты
                </Radio>
                <Radio checked={selectedRadio === 'applications'} onChange={() => setSelectedRadio('applications')} text="4.5 ₽ за заявку" view="circleText">
                    <img src={fireFilling} alt="fireFilling" />
                    Заявки
                </Radio>
            </RadioContainer>
            <Buttons>
                <Button variant="default" onClick={() => closePopup()}>Отмена</Button>
                <Button variant="primary"
                    onClick={() => {
                        selectedRadio === 'subscribers' ? (
                            openPopup('select-channel', 'Выберите канал', { step: 3, text: 'Можете выбрать канал или же написать ссылку' })
                        ) : selectedRadio === 'boosts' ? (
                            openPopup('fill-fields-below', 'Заполните поля ниже', { step: 3, text: 'Укажите основные данные для вашего ресурса' })
                        ) : selectedRadio === 'coverage' ? (
                            openPopup('select-areas', 'Выберите охваты', { step: 3, text: 'Определитесь с нужным типом трафика для вас' })
                        ) : (
                            openPopup('select-channel-application', 'Выберите канал', { step: 3, text: 'Можете выбрать канал или же написать ссылку'})
                        )
                        
                    }}
                >Далее</Button>
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
    @media(max-width: 430px) {
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
