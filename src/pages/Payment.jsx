import styled from "styled-components";

import PaymentIcon from '@/icons/PaymentIcon';
import CopyIcon from '@/icons/CopyIcon';

import qr from '@/assets/qr-cod.svg';

import Button from "@/shared/Button";

import TitleHead from "@/components/TitleHead";

const Payment = () => {
    return (
        <PaymentContainer>
            <TitleHead icon={<PaymentIcon width={24} height={24} colorFirst="#FFD26D " colorSecond="#FFB81A" />} title="Оплата" />
            <PaymentConent>
                <QrContainer>
                    <img src={qr} alt='qr' />
                </QrContainer>
                <PaymentSubtext><mark>итого к оплате</mark></PaymentSubtext>
                <AmountRow>
                    <PaymentCount>1,160</PaymentCount>
                    <mark>₽</mark>
                </AmountRow>
                <PaymentDesc>СЧËТ ДЕЙСТВУЕТ ДО 25.12.2025</PaymentDesc>

                <PaymentInputs>
                    <InputLabel>
                        Сумма
                        <input type="text" placeholder="Введите сумму" />
                    </InputLabel>
                    <InputLabel>
                        Комиссия
                        <input type="text" placeholder="Введите комиссию" />
                    </InputLabel>
                </PaymentInputs>
                <InputLabel>
                    Счёт
                    <input type="text" placeholder="Введите номер счёта" />
                    <IconContainer>
                        <CopyIcon width={16} height={18} colorFirst="#FFD26D " colorSecond="#FFB81A" />
                    </IconContainer>
                </InputLabel>
                <PayButton>
                    <Button variant="primaryWhiteText">
                        Оплатить
                    </Button>
                </PayButton>
            </PaymentConent>
        </PaymentContainer>
    )
}
const PaymentContainer = styled.div`
  position: relative;
  padding: 0 24px 40px;

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
const PaymentConent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`
const QrContainer = styled.div`
    position: relative;
    border: 1px solid #272A33;
    padding: 24px;
    border-radius: 32px;
`;
const PaymentSubtext = styled.span`
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
const PaymentDesc = styled.p`
    text-align: center;
    text-transform: uppercase;
    font-size: 10px;
    color: #6A7080CC;
    max-width: 210px;
    line-height: 14px;
`
const PaymentInputs = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    width: 100%;
    width: 100%;
    margin-top: 16px;
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

const IconContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: 24px;
    cursor: pointer;
`
const PayButton = styled.button`
    margin-top: 8px;
    width: 100%;
`

export default Payment