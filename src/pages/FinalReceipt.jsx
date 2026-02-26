import styled from "styled-components";

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import channel_ava from '@/assets/channel-ava.png';
import calendar from '@/assets/icons/calendar.svg';
import finalReceipt from "@/assets/icons/final-receipt.svg";
import StarIcon from "@/icons/StarIcon";
import HeadphonesIcon from "@/icons/HeadphonesIcon";
import UserIcon from "@/icons/UserIcon";

import { ContainerPadding } from "@/shared/ContainerPadding";
import { GapBlock } from "@/shared/GapBlock";

import Radio from "@/shared/Radio";
import Button from "@/shared/Button";

import ParamsBlocks from "@/components/ParamsBlocks";
import BlockWithArrow from "@/components/BlockWithArrow";
import TitleHead from "@/components/TitleHead";

import { useReceiptStore } from "@/store/receiptStore";
import { flagsList } from "@/data/flagsList";

const FinalReceipt = () => {
    const { receipt } = useReceiptStore()
    console.log(receipt)
    return (
        <FinalReceiptContainer>
            <ContainerPadding>
                <TitleHead icon={<img src={finalReceipt} alt='finalReceipt' />} title="Итоговый чек" />
                <FinalReceiptContent>
                    <ReceiptSubtext><mark>стоимость трафика</mark></ReceiptSubtext>
                    <AmountRow>
                        <PaymentCount>{receipt.price}</PaymentCount>
                        <mark>₽</mark>
                    </AmountRow>
                    <ReceiptDesc onClick={() => window.open('https://t.me/ASSISTGB', "_blank")}>
                        <HeadphonesIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" />
                        <mark>Обратиться в поддержку</mark>
                    </ReceiptDesc>
                </FinalReceiptContent>
                <GapBlock>
                    <BlockWithArrow
                        img={<img src={channel_ava} alt="channel_ava" />}
                        type="pass"
                        title={receipt.channel?.name}
                        text={receipt.channel?.username}
                        onClick=""
                    />
                    {receipt.numberSubscribers && (
                        <ParamsBlocks options={[
                            { value: `${receipt.numberSubscribers || 0}`, iconLeft: <UserIcon width={16} height={16} colorFirst='#FFD26D' colorSecond='#FFB81A' /> },
                            { value: `${receipt.numberCampaignDays || 0} дней`, iconLeft: <img src={calendar} alt="calendar" /> }
                        ]} />
                    )}
                    <SelectChannelBlock>
                        <Col>
                            <span>Ссылка</span>
                            <p>t.me/antropia..</p>
                        </Col>
                        <Col>
                            <span>Кол-во охватов</span>
                            <p>1,600</p>
                        </Col>
                        <Col>
                            <span>Стоимость</span>
                            <p><mark>1.200 р</mark></p>
                        </Col>
                    </SelectChannelBlock>
                </GapBlock>
                <FinalReceiptTitle>Выбранные страны</FinalReceiptTitle>
                {receipt.countries && receipt.countries.length > 0 ? (
                    <FlagsBlocks>
                        {receipt.countries?.map((item, index) => (
                            <Flag key={index}>
                                <img src={flagsList.find((flag) => flag.code == item.code)?.flag} alt={item.code} />
                                <p>+{item.price} ₽</p>
                            </Flag>
                        ))}
                    </FlagsBlocks>
                ) : (
                    <Text>Нету выбранных стран</Text>
                )}
                {receipt.typeTraffic && (
                    <>
                        <FinalReceiptTitle>Тип выбранного трафика</FinalReceiptTitle>
                        <Text>{receipt.typeTraffic}</Text>
                    </>
                )}
                {receipt.typeCoverage && (
                    <>
                        <FinalReceiptTitle>Тип охватов</FinalReceiptTitle>
                        <Text>{receipt.typeCoverage}</Text>
                    </>
                )}
                
            </ContainerPadding>
            {receipt.selectedFilters && receipt.selectedFilters.length > 0 && (
                <>
                <FinalReceiptTitle>Выбранные фильтры<span>{receipt.selectedFilters?.length || 0}</span></FinalReceiptTitle>
                <RadioContainer
                    spaceBetween={10}
                    slidesPerView="auto"
                    slidesOffsetBefore={24}
                    slidesOffsetAfter={24}
                >
                    {receipt.selectedFilters?.map((item, index) => (
                        <SwiperSlideRadio key={index}>
                            <Radio text={`+ ${item.price} ₽`} view="noCircleIcon">
                                {item.icon}
                                {item.name}
                            </Radio>
                        </SwiperSlideRadio>
                    ))}
                </RadioContainer>
                </>
            )}

            {receipt.premiumCoverage && (
                <ButtonContainer>
                    <Button variant="blue">
                        <StarIcon width={16} height={16} colorFirst="#FFFFFF" colorSecond="#FFFFFF" uniqueId="third" />
                        Премиум охваты
                    </Button>
                </ButtonContainer>
            )}
            <SaveReceipt><mark>Сохранить квитанцию</mark></SaveReceipt>
        </FinalReceiptContainer>
    )
}

const FinalReceiptContainer = styled.div`
  position: relative;
  padding-bottom: 24px;

  &::before {
    content: '';
    position: absolute;
    top: 100px;
    left: -200px;
    width: 100%;
    height: 100%;
    background: url('src/assets/grid.png') no-repeat;
    z-index: -1;
  }
  &::after {
    content: '';
    position: absolute;
    top: -350px;
    right: -100px;
    width: 100%;
    height: 100%;
    background: url('src/assets/grid.png') no-repeat;
    transform: rotate(135deg);
    
    z-index: -1;
  }
`;
const FinalReceiptContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`
const ReceiptSubtext = styled.span`
    font-size: 10px;
    text-transform: uppercase;
    margin-top: 8px;
`
const AmountRow = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 16px;

    mark {
        font-size: 48px;
    }
`
const PaymentCount = styled.p`
    box-sizing: border-box;
    font-size: 64px;
    line-height: 64px;
    color: #D6DCEC;
`
const ReceiptDesc = styled.p`
	display: flex;
	align-items: center;
	gap: 16px;
    font-size: 14px;
    cursor: pointer;
`
const SelectChannelBlock = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
`
const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    
    span {
        color: #6A7080;
        font-weight: 700;
    }
`
const FlagsBlocks = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
	margin-top: 24px;
`
const Flag = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    
    img {
        width: 46px;
        height: 46px;
        object-fit: cover;
        border-radius: 50%;
    }

    p {
        font-size: 14px;
        color: #6A7080;
    }
`
const FinalReceiptTitle = styled.h2`
    display: flex;
    justify-content: center;
    gap: 14px;
	margin-top: 24px;
    font-size: 24px;

    span {
        color: #454A59;
    }
`
const Text = styled.p`
    display: flex;
    justify-content: center;
	margin-top: 16px;
    font-size: 14px;
    color: #6A7080CC;
`
const RadioContainer = styled(Swiper)`
    margin-top: 24px;
    display: flex;
    gap: 10px;
`
const SwiperSlideRadio = styled(SwiperSlide)`
    width: auto;
`
const ButtonContainer = styled.div`
    margin-top: 24px;
    padding: 0 24px;
`
const SaveReceipt = styled.p`
    margin-top: 36px;
	display: flex;
    justify-content: center;
    cursor: pointer;
`

export default FinalReceipt