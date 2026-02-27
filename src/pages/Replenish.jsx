import { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import tb from '@/assets/icons/tb.svg';
import tbBg from '@/assets/icons/tbBg.svg';
import UsdtIcon from '@/icons/UsdtIcon';

import PlusIcon from '@/icons/PlusIcon';
import cryptoBot from '@/assets/icons/crypto-bot.svg';

import OptionCard from "@/components/OptionCard";
import TitleHead from "@/components/TitleHead";

  
const Replenish = () => {
  const [value, setValue] = useState("0");
  const navigate = useNavigate();

  const changeInput = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 7)
    setValue(digits)
  }
  const formatted = value ? Number(value).toLocaleString("en-US") : ""

  return (
    <ReplenishContainer>
      <TitleHead icon={<PlusIcon width={24} height={24} colorFirst="#FFD26D " colorSecond="#FFB81A" />} title="Пополнение" />
      <Balance>
        <BalanceSubtext><mark>Сумма пополнения</mark></BalanceSubtext>
        <AmountRow>
          <BalanceCount
            value={formatted}
            onChange={(e) => changeInput(e.target.value)}
            onBlur={() => {
              if (!value) setValue("0")
            }}
            style={{ width: `${Math.max(formatted.length, 1)}ch` }}
          />
          <mark>₽</mark>
        </AmountRow>
        <BalanceDesc>Введите предпочитаемую сумму для пополнения в рублях</BalanceDesc>
        <BalanceMenu>
          <MenuItem $active={value == 1000} onClick={() => setValue(1000)}>1.000 <mark>₽</mark></MenuItem>
          <MenuItem $active={value == 2500} onClick={() => setValue(2500)}>2.500 <mark>₽</mark></MenuItem>
          <MenuItem $active={value == 5000} onClick={() => setValue(5000)}>5.000 <mark>₽</mark></MenuItem>
        </BalanceMenu>
        <BalanceWay>
          <WayContainer>
            <OptionCard
              title="T-Банк"
              text="Рубли (RUB)"
              icon={<img src={tb} alt="tb"/>}
              bgIcon={<img src={tbBg} alt="tb"/>}
              direction="vertical"
              onClick={() => navigate("/payment")}
            />
            <OptionCard
              title="Tether USDT"
              text="Crypto TRC20"
              icon={<UsdtIcon width={16} height={16} colorFirst="#09FF98" colorSecond="#09FF98"  uniqueId="small" />}
              bgIcon={
                <UsdtIcon width={98} height={98} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg"/>
              }
              direction="vertical"
              onClick={() => navigate("/payment")}
            />
          </WayContainer>
          <OptionCard
            title="CryptoBot"
            text="Tether USDT TRC20"
            icon={<img src={cryptoBot} alt="cryptoBot icon"/>}
            direction="horizontal"
            onClick={() => navigate("/payment")}
          />
        </BalanceWay>
      </Balance>
    </ReplenishContainer>
  )
}

const ReplenishContainer = styled.div`
    position: relative;
    padding: 0 24px 40px;

    &::before {
        content: '';
        position: absolute;
        top: -250px;
        left: -400px;
        width: 100%;
        height: 100%;
        background: url('src/assets/grid.png') no-repeat;
        transform: rotate(135deg);
        z-index: -1;
    }
    &::after {
        content: '';
        position: absolute;
        top: 300px;
        right: -275px;
        width: 100%;
        height: 100%;
        background: url('src/assets/grid.png') no-repeat;
        z-index: -1;
    }
`;
const Balance = styled.div`
    width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
    margin-top: 12px;
`
const BalanceSubtext = styled.span`
	font-size: 10px;
	text-transform: uppercase;
`
const AmountRow = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    mark {
        position: absolute;
        right: -40px;
        bottom: 28px;
        font-size: 48px;
    }
`
const BalanceCount = styled.input`
    box-sizing: border-box;
    font-size: 64px;
    line-height: 64px;
    height: auto;
    border: none;
    background: transparent;
    text-align: right;
    color: #D6DCEC;
    border-bottom: 1px dashed #6A7080;
    padding-bottom: 24px;
    min-width: 100px;
    text-align: center;
`

const BalanceDesc = styled.p`
    text-align: center;
    text-transform: uppercase;
    font-size: 10px;
    color: #6A7080CC;
    max-width: 210px;
    line-height: 14px;
`
const BalanceMenu = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    padding-bottom: 40px;
`
const MenuItem = styled.button`
    height: 48px;
    padding: 0 24px;
    background-color: ${({ $active }) => ($active ? '#272A33' : 'transparent')};
    font-size: 14px;
    font-weight: ${({ $active }) => $active ? 800 : 600};
    border-radius: 16px;
    border: 1px solid ${({ $active }) => ($active ? '#FFB81A' : '#272A33')};
    ${({ $active }) => ($active && `
        &::before {
        content: '';
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 48px;
        border-radius: 24px;
        background-color: #FFB81A;
        z-index: 1;
        }
    `)}
 
    mark {
        ${({ $active }) => $active && `
        background: radial-gradient(circle at center, #FFD26D, #FFB81A);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        `}
        color: ${({ $active }) => ($active ? 'transparent' : '#D6DCEC')};
    }
`
const BalanceWay = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 24px;
`
const WayContainer = styled.div`
    display: flex;
    gap: 8px;
    padding-bottom: 24px;
    border-bottom: 1px dashed #6A7080;
    
    @media(max-width: 400px) {
        flex-direction: column;
    }
`

export default Replenish