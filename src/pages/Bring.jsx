import { useState, useMemo } from "react";
import styled from "styled-components";

import cryptoBot from '@/assets/icons/crypto-bot.svg';
import fire from '@/assets/icons/fire.svg';
import UsdtIcon from "@/icons/UsdtIcon";
import ArrowOblique from "@/icons/ArrowOblique";

import Button from "@/shared/Button";

import BlockWithArrow from "@/components/BlockWithArrow";
import TitleHead from "@/components/TitleHead";

import useWithdrawalFunds from "@/hooks/api/useWithdrawalFunds";

import { useUserStore } from '@/store/userStore';
import { useToastStore } from "@/store/toastStore";

const paymentMetrics = [
    {
        currency: "USDT",
        img: <UsdtIcon width={16} height={16} colorFirst="#09FF98" colorSecond="#09FF98" uniqueId="small" />,
        bg: '#17322D',
        title: 'Tether USDT',
        text: "TRC 20"

    },
    {
        currency: "USDTcryptobot",
        img: <img src={cryptoBot} alt="cryptoBot" />,
        bg: '#272A33',
        title: 'Tether USDT (cryptobot)',
        text: "TRC 20"
    },
]

const Bring = () => {
    const [selectState, setSelectState] = useState({
        state: false,
        currency: paymentMetrics[0]
    });
    const [amount, setAmount] = useState("0");
    const [walletAddress, setWalletAddress] = useState('')
    const { conclusionFunds, isCalculation } = useWithdrawalFunds()
    const { userLocal } = useUserStore()
    const { showToast } = useToastStore();

    const changeInput = (text) => {
        const digits = text.replace(/\D/g, "").slice(0, 7)
        setAmount(digits)
    }
    const formatted = amount ? Number(amount).toLocaleString("en-US") : ""

    const handleBring = () => {
        if (!amount || Number(amount) <= 0) {
            showToast("Введите сумму для вывода", "error");
            return;
        }
        
        if (!walletAddress) {
            showToast("Введите адрес получателя", "error");
            return;
        }

        conclusionFunds({
            telegramId: String(userLocal.telegramId),
            amount: Number(amount),
            asset: "USDT",
            walletAddress,
            description: "Withdrawal to main wallet"
        }, {
            onSuccess: () => {
                showToast("Средства успешно выведены!", "success");
                setAmount("");
                setWalletAddress("");
            },
            onError: (error) => {
                showToast(
                    error?.message || "Ошибка при выводе средств",
                    "error"
                );
            }
        })
    }

    const calculateCommission = (amount) => {
        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) return 0;
        return Number((numAmount * 0.015).toFixed(2));
    };

    const calculateFinalAmount = (amount) => {
        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) return 0;
        const commission = calculateCommission(amount);
        return Number((numAmount - commission).toFixed(2));
    };

    const commission = useMemo(() => calculateCommission(amount), [amount]);
    const finalAmount = useMemo(() => calculateFinalAmount(amount), [amount]);

    return (
        <BringContainer>
            <TitleHead icon={<ArrowOblique width={24} height={24} colorFirst="#FFD26D" colorSecond="#FFB81A" />} title="Вывод" />
            <BringContent>
                <BringSubtext><mark>Сумма вывода</mark></BringSubtext>
                <AmountRow>
                    <BalanceCount
                        value={formatted}
                        placeholder="0"
                        onChange={(e) => changeInput(e.target.value)}
                        onBlur={() => {
                            if (!amount) setValue("0")
                        }}
                        style={{ width: `${Math.max(formatted.length, 1)}ch` }}
                    />
                    <mark>₽</mark>
                </AmountRow>
                <BlockWithArrow
                    type="select"
                    options={paymentMetrics}
                    state={selectState.state}
                    value={selectState.currency}
                    onChange={setSelectState}
                    onClick={() => setSelectState({ ...selectState, state: !selectState.state })}
                />
                <HeadTitle><img src={fire} alt="fire icon" /> Детали вывода</HeadTitle>
                <InputLabel>
                    Адрес получателя
                    <input
                        type="text"
                        placeholder="Введите адрес"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                    />
                </InputLabel>
                <PaymentInputs>
                    <InputLabel>
                        Комиссия сети
                        <input type="text" value={commission > 0 ? `${commission} ₽` : "0 ₽"} placeholder="Комиссия сети" readOnly />
                    </InputLabel>
                    <InputLabel>
                        Конечная стоимость
                        <input type="text" value={finalAmount > 0 ? `${finalAmount} ₽` : "0 ₽"} placeholder="Конечная стоимость" readOnly />
                    </InputLabel>
                </PaymentInputs>
                <ButtonContainer>
                    <Button variant="goldButton" onClick={() => handleBring()} disabled={isCalculation}>{isCalculation ? 'Вывод...' : 'Вывести'}</Button>
                </ButtonContainer>
            </BringContent>
        </BringContainer>
    )
}

const BringContainer = styled.div`
  position: relative;
  padding: 0 24px 40px;

  &::before {
    content: '';
    position: absolute;
    top: -275px;
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
    top: 150px;
    right: -250px;
    width: 100%;
    height: 100%;
    background: url('src/assets/grid.png') no-repeat;
    z-index: -1;
  }
`;
const BringContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`
const BringSubtext = styled.span`
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
const BringCount = styled.p`
    box-sizing: border-box;
    font-size: 64px;
    line-height: 64px;
    color: #D6DCEC;
`
const HeadTitle = styled.h3`
  display: flex;
  width: 100%;
  gap: 16px;
  font-size: 20px;
  line-height: 22px;
  flex-grow: 1;
  margin-top: 24px;
  margin-bottom: 16px;
`
const PaymentInputs = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    width: 100%;
    margin-top: 16px;

    @media(max-width: 430px) {
        flex-direction: column;
    }
`
const InputLabel = styled.label`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    font-size: 16px;
    font-weight: 600;

    input {
        box-sizing: border-box;
        font-size: 16px;
        border: none;
        background: transparent;
        color: #D6DCEC;
        font-weight: 600;
        border-bottom: 1px solid #272A33;
        padding-bottom: 24px;

        &::placeholder {
            color: #6A7080CC;
            transition: color 0.2s ease-in-out;
        }

        &:focus {
            outline: none;
            border-color: #FFB81A;

            &::placeholder {
                color: #D6DCEC;
            }
        }

        &:hover {
            border-color: #FFD26D;
        }
    }
`
const ButtonContainer = styled.div`
    margin-top: 8px;
    width: 100%;
`

export default Bring