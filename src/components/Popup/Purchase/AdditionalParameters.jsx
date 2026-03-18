import styled from "styled-components";

import gift from "@/assets/icons/gift.svg";
import like from "@/assets/icons/like.svg";
import flag from "@/assets/icons/flag.svg";
import ImgIcon from "@/icons/ImgIcon";
import StarIcon from "@/icons/StarIcon";
import UserIcon from "@/icons/UserIcon";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Radio from "@/shared/Radio";
import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";

const AdditionalParameters = () => {
    const { goBack } = usePopupStore();

    const { receipt, setAllowCIS, setAllowPremium, setAllowGifts, setIsAdult } = useReceiptStore();

    const handleSave = () => {
        goBack();
    };

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
                <SwiperSlideRadio>
                    <Radio
                        checked={receipt.allowCIS}
                        onChange={() => setAllowCIS(!receipt.allowCIS)}
                        text={`+ 0.25 ₽`}
                        view="noCircleText"
                    >
                        Только СНГ
                    </Radio>
                </SwiperSlideRadio>
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
                <SwiperSlideRadio>
                    <Radio
                        checked={receipt.allowPremium}
                        onChange={() => setAllowPremium(!receipt.allowPremium)}
                        view="circleBG"
                    >
                        <StarIcon width={16} height={16} colorFirst="#579AFF" colorSecond="#236EDE" uniqueId="first" />
                        Только с премиумом
                    </Radio>
                </SwiperSlideRadio>
                <SwiperSlideRadio>
                    <Radio
                        checked={receipt.allowGifts}
                        onChange={() => setAllowGifts(!receipt.allowGifts)}
                        view="circleBG"
                    >
                        <img src={gift} alt="gift" />
                        С наличием подарков
                    </Radio>
                </SwiperSlideRadio>
            </RadioContainerFirst>
            <RadioContainer
                spaceBetween={10}
                slidesPerView="auto"
                slidesOffsetBefore={24}
                slidesOffsetAfter={24}
            >
                <SwiperSlideRadio>
                    <Radio
                        checked={receipt.isAdult}
                        onChange={() => setIsAdult(!receipt.isAdult)}
                        view="circleBG"
                    >
                        <img src={like} alt="like" />
                        Взрослые (18+)
                    </Radio>
                </SwiperSlideRadio>
                {/* <SwiperSlideRadio>
                        <Radio
                            checked={receipt.img}
                            onChange={() => toggleSelectedAccount(item)}
                            view="circleBG"
                        >
                            <ImgIcon width={16} height={16} color="#56C4FF" />
                            Фотография в профиле
                        </Radio>
                    </SwiperSlideRadio> */}
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