import styled from "styled-components";

import fire from '@/assets/fire.svg';
import UsdtIcon from "@/icons/UsdtIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import ArrowOblique from "@/icons/ArrowOblique";

import Button from "@/shared/Button";

import TitleHead from "@/components/TitleHead";

const Bring = () => {
	return (
		<BringContainer>
			<TitleHead icon={<ArrowOblique width={24} height={24} colorFirst="#FFD26D" colorSecond="#FFB81A" />} title="Вывод" />
			<BringContent>
				<BringSubtext><mark>Сумма вывода</mark></BringSubtext>
				<AmountRow>
					<BringCount>5,200</BringCount>
					<mark>₽</mark>
				</AmountRow>
				<WayItem>
					<ItemHead>
						<ImgContainer>
						 <UsdtIcon width={16} height={16} colorFirst="#09FF98" colorSecond="#09FF98" uniqueId="small"/>
						</ImgContainer>
						<ItemBody $margin="0">
							<BodyTitle>Отправить на</BodyTitle>
							<BodyText>BEP20 Address</BodyText>
						</ItemBody>
						<ArrowContainer onClick={() => navigate('/payment')}>
							<ArrowIcon width={6} height={10} color="#D6DCEC"/>
						</ArrowContainer>
					</ItemHead>
				</WayItem>
				<HeadTitle><img src={fire} alt="fire icon" /> Детали вывода</HeadTitle>
				<InputLabel>
					Адрес получателя
					<input type="text" placeholder="Введите сумму" />
				</InputLabel>
				<PaymentInputs>
					<InputLabel>
						Комиссия сети
						<input type="text" placeholder="Введите комиссию" />
					</InputLabel>
					<InputLabel>
						Конечная стоимость
						<input type="text" placeholder="Введите номер счёта" />
					</InputLabel>
				</PaymentInputs>
                <ButtonContainer>
                <Button variant="goldButton">Вывести</Button>

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
        font-size: 48px;
    }
`
const BringCount = styled.p`
    box-sizing: border-box;
    font-size: 64px;
    line-height: 64px;
    color: #D6DCEC;
`
const WayItem = styled.div`
	box-sizing: border-box;
	position: relative;
	width: 100%;
	max-width: 320px;
	flex: 1;
	background-color: #272A330D;
	backdrop-filter: blur(16px);
	border: 1px solid #272A33;
	padding: 16px;
	border-radius: 16px;
	margin-top: 16px;
`
const ItemHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
  	gap: 16px;
`;
const ImgContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #17322D;
	padding: 10px;
	border-radius: 8px;
`
const ArrowContainer = styled.button`
	width: 24px;
	height: 24px;
	background-color: #383D4C;
	border-radius: 50%;
	transform: rotate(90deg);
`;
const ItemBody = styled.div`
  position: relative;
  margin-top: ${({ $margin }) => $margin && `${$margin}px`};
  z-index: 1;
  flex-grow: 1;
`
const BodyTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`
const BodyText = styled.p`
  font-size: 12px;
  color: #6A7080CC;
  font-weight: 600;
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