import styled from "styled-components";

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import channel_ava from '@/assets/channel-ava.png';
import calendar from '@/assets/icons/calendar.svg';
import finalReceipt from "@/assets/icons/final-receipt.svg";
import fireFilling from '@/assets/icons/fire-filling.svg';
import StarIcon from "@/icons/StarIcon";
import HeadphonesIcon from "@/icons/HeadphonesIcon";
import UserIcon from "@/icons/UserIcon";

import { GapContainer } from "@/shared/GapContainer";
import { ContainerPadding } from "@/shared/ContainerPadding";

import Radio from "@/shared/Radio";
import Button from "@/shared/Button";

import ParamsBlocks from "@/components/ParamsBlocks";
import BlockWithArrow from "@/components/BlockWithArrow";
import TitleHead from "@/components/TitleHead";

import { useReceiptStore } from "@/store/receiptStore";
import { flagsList } from "@/data/flagsList";
import { useEffect } from "react";

const FinalReceipt = () => {
    const { receipt, resetReceipt } = useReceiptStore()
    useEffect(() => {
        return () => {
            resetReceipt()
        }
    }, [])

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
                <GapContainer>
                    <BlockWithArrow
                        img={<img src={channel_ava} alt="channel_ava" />}
                        type="pass"
                        title={receipt.channel?.name}
                        text={receipt.channel?.username}
                        onClick=""
                    />
                    {receipt.numberSubscribers && receipt.numberCampaignDays && (
                        <ParamsBlocks options={[
                            { value: `${receipt.numberSubscribers || 0}`, iconLeft: <UserIcon width={16} height={16} colorFirst='#FFD26D' colorSecond='#FFB81A' /> },
                            { value: `${receipt.numberCampaignDays || 0} дней`, iconLeft: <img src={calendar} alt="calendar" /> }
                        ]} />
                    )}
                    {receipt.erFrom && receipt.erTo && (
                        <ParamsBlocks options={[
                            { value: <>От <mark>{receipt.erFrom || 0}</mark></>, lableRight: <mark>ER</mark> },
                            { value: <>До <mark>{receipt.erTo || 0}</mark></>, lableRight: <mark>ER</mark> }
                        ]} />
                    )}
                    {receipt.rangeReactionsFrom && receipt.rangeReactionsTo && (
                        <ParamsBlocks options={[
                            { value: <>От <mark>{receipt.rangeReactionsFrom || 0}</mark></>, iconRight: <img src={fireFilling} alt="fireFilling" /> },
                            { value: <>До <mark>{receipt.rangeReactionsTo || 0}</mark></>, iconRight: <img src={fireFilling} alt="fireFilling" /> }
                        ]} />
                    )}
                    {receipt.dailyTraffic && receipt.compDuration && (
                        <ParamsBlocks options={[
                            { value: `${receipt.dailyTraffic || 0}`, lableLeft: <mark>Бусты</mark> },
                            { value: `${receipt.compDuration || 0} дней`, lableLeft: <mark>Дни</mark> }
                        ]} />
                    )}
                    {receipt.channel?.data && (
                        <SelectChannelBlock>
                            <Col>
                                <span>Ссылка</span>
                                <p>{receipt.channel.username}</p>
                            </Col>
                            <Col>
                                <span>Кол-во охватов</span>
                                <p>{receipt.channel.data.numberCoverage}</p>
                            </Col>
                            <Col>
                                <span>Стоимость</span>
                                <p><mark>{receipt.channel.data.price} р</mark></p>
                            </Col>
                        </SelectChannelBlock>
                    )}

                </GapContainer>

                {receipt.countries && receipt.countries.length > 0 && (
                    <>
                        <FinalReceiptTitle>Выбранные страны</FinalReceiptTitle>
                        <FlagsBlocks>
                            {receipt.countries?.map((item, index) => (
                                <Flag key={index}>
                                    <img src={flagsList.find((flag) => flag.code == item.code)?.flag} alt={item.code} />
                                    <p>+{item.price} ₽</p>
                                </Flag>
                            ))}
                        </FlagsBlocks>
                    </>
                )}
                {receipt.typeTraffic && (
                    <>
                        <FinalReceiptTitle>Тип выбранного трафика</FinalReceiptTitle>
                        <Text>{receipt.typeTraffic == 'with-verification' ? 'С проверкой' : 'Без проверки'}</Text>
                    </>
                )}
                {receipt.speedMode && (
                    <>
                        <FinalReceiptTitle>Режим скорости</FinalReceiptTitle>
                        <Text>{
                            receipt.speedMode == 'two-hours' ? 'Быстрый (около 1-2 часа)' :
                                receipt.speedMode == 'twelve-hours' ? 'Средний (около 12 часов)' :
                                    'Медленный (около 24 часов)'}</Text>
                    </>
                )}
                {receipt.typeCoverage && (
                    <>
                        <FinalReceiptTitle>Тип охватов</FinalReceiptTitle>
                        <Text>{receipt.typeCoverage == 'constantly' ? 'Постоянно' : 'Единоразово'}</Text>
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
	margin-top: 32px;
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