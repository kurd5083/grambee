import { useState } from "react";
import styled from "styled-components";

import flag from "@/assets/icons/flag.svg";
import UserIcon from "@/icons/UserIcon";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Radio from "@/shared/Radio";
import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

import { fiterList } from "@/data/fiterList";

const countryFilters = [
    {
        id: "cis",
        title: "Только СНГ",
        price: 0.25,
    },
    {
        id: "target",
        title: "Подходящий ЦА",
        price: 0.5,
    },
    {
        id: "world",
        title: "Весь мир",
        price: 0.25,
    },
]

const AdditionalParameters = () => {
    const [selectedCountry, setSelectedCountry] = useState(countryFilters[0])
    const [selectedAccountFirst, setSelectedAccountFirst] = useState(fiterList[0])
    const [selectedAccountSecond, setSelectedAccountSecond] = useState(fiterList[2])

    const { goBack } = usePopupStore();
    const { setFilters } = useReceiptStore();
    const handleSave = () => {
        setFilters([selectedAccountFirst, selectedAccountSecond]);
        goBack()
    }
    return (
        <>
            <AdditionalTitle>
                <img src={flag} alt="flag" />
                Фильтры по странам:
            </AdditionalTitle>
            <RadioContainer
                spaceBetween={10}
                slidesPerView="auto"
                slidesOffsetBefore={24}
                slidesOffsetAfter={24}
            >
                {countryFilters.map((item) => (
                    <SwiperSlideRadio key={item.id}>
                        <Radio
                            checked={selectedCountry.id === item.id}
                            onChange={() => setSelectedCountry(item)}
                            text={`+ ${item.price} ₽`}
                            view="noCircleText"
                        >
                            {item.title}
                        </Radio>
                    </SwiperSlideRadio>
                ))}
            </RadioContainer>
            <AdditionalTitle>
                <UserIcon width={16} height={16} colorFirst='#FFD26D' colorSecond='#FFB81A' />
                Фильтры по аккаунтам:
            </AdditionalTitle>
            <RadioContainerFirst
                spaceBetween={10}
                slidesPerView="auto"
                slidesOffsetBefore={24}
                slidesOffsetAfter={24}
            >
                {fiterList.slice(0, 2).map((item, index) => (
                    <SwiperSlideRadio key={index}>
                        <Radio
                            checked={selectedAccountFirst.code === item.code}
                            onChange={() => setSelectedAccountFirst(item)}
                            view="circleBG"
                        >
                            {item.icon}
                            {item.name}
                        </Radio>
                    </SwiperSlideRadio>
                ))}
            </RadioContainerFirst>
            <RadioContainer
                spaceBetween={10}
                slidesPerView="auto"
                slidesOffsetBefore={24}
                slidesOffsetAfter={24}
            >
                {fiterList.slice(2, 4).map((item, index) => (
                    <SwiperSlideRadio key={index}>
                        <Radio
                            checked={selectedAccountSecond.code === item.code}
                            onChange={() => setSelectedAccountSecond(item)}
                            view="circleBG"
                        >
                            {item.icon}
                            {item.name}
                        </Radio>
                    </SwiperSlideRadio>
                ))}
            </RadioContainer>
            <Buttons>
                <Button variant="default" onClick={() => goBack()}>Назад</Button>
                <Button variant="primary" onClick={handleSave}>Сохранить</Button>
            </Buttons>
        </>
    )
}

const RadioContainer = styled(Swiper)`
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
`
const RadioContainerFirst = styled(Swiper)`
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
`
const SwiperSlideRadio = styled(SwiperSlide)`
    width: auto;
`
const AdditionalTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 14px;
    font-weight: 700;
    padding: 0 24px;
    margin-bottom: 24px;
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 24px 24px;
`

export default AdditionalParameters