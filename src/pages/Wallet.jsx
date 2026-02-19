import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import transactions from '@/assets/transactions.svg';
import head_ava from '@/assets/head-ava.png';
import grid from '@/assets/grid.png';
import ArrowOblique from "@/icons/ArrowOblique";
import WalletIcon from '@/icons/WalletIcon';
import EyeIcon from '@/icons/EyeIcon';
import EyeCloseIcon from '@/icons/EyeCloseIcon';

import CustomSelect from "@/shared/CustomSelect";

import TitleHead from "@/components/TitleHead";
import Chart from '@/components/Chart';
import TabMenu from "@/components/TabMenu";

import { usePopupStore } from "@/store/popupStore";

const Wallet = () => {
	const [eyeState, setEyeState] = useState(false)
	const navigate = useNavigate();

	const { openPopup } = usePopupStore()

	const tabs = [
		{
			label: "Таблица",
			onClick: () => openPopup('step', 'Шаг 1 / 2')
		},
		{
			label: "Транзакции",
			icon: transactions
		},
		{
			label: "Выгрузить",
			onClick: () => openPopup('resource', 'Ресурс #T356')
		}
	];
	return (
		<>
			<TitleHead
				icon={<WalletIcon width={24} height={23} colorFirst="#FFD26D " colorSecond="#FFB81A" />}
				title="Кошелёк"
			>
				<EyeContainer onClick={() => setEyeState(!eyeState)}>
					{eyeState ? (
						<EyeIcon width={18} height={18} color="#6A7080" />
					) : (
						<EyeCloseIcon width={18} height={18} color="#6A7080" />
					)}
				</EyeContainer>
			</TitleHead>
			<MyBalance>
				<AvaUser src={head_ava} alt="ava user" />
				<GridImage src={grid} alt="grid img" />
				<BalanceContainer>
					<BalanceAction>
						<ActionButton onClick={() => navigate('/replenish')}>
							<ArrowOblique width={18} height={18} colorFirst="#FFD26D" colorSecond="#FFB81A"/>
						</ActionButton>
						ПОПОЛНИТЬ
					</BalanceAction>
					<Balance>
						<BalanceSubtext><mark>ОСНОВНОЙ БАЛАНС:</mark></BalanceSubtext>
						<BalanceCount>21,876 <mark>₽</mark></BalanceCount>
						<BalanceHold>На удержании: 15,500 ₽</BalanceHold>
					</Balance>
					<BalanceAction>
						<ActionButton onClick={() => navigate('/bring')} $rotate={true}>
							<ArrowOblique width={18} height={18} colorFirst="#FFD26D" colorSecond="#FFB81A"/>
						</ActionButton>
						ВЫВЕСТИ
					</BalanceAction>
				</BalanceContainer>
			</MyBalance>
			<SelectContainer>
				<CustomSelect
					placeholder="Период"
					options={[
						{ value: "all", label: "Все время" },
						{ value: "24h", label: "За 24 часа" },
						{ value: "week", label: "За неделю" },
						{ value: "month", label: "За месяц" },
					]}
					width="150px"
				/>
			</SelectContainer>
			<Chart/>
			<TabMenu tabs={tabs} />
		</>
	)
}

const EyeContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;
const MyBalance = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 32px;
	padding: 0 24px;
`
const GridImage = styled.img`
  	position: absolute;
	top: 40px;
	z-index: -1;
`
const AvaUser = styled.img`
  	width: 56px;
	height: 56px;
	border-radius: 50%;
`
const BalanceContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
  	margin-top: 16px;
`
const BalanceAction = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	font-size: 10px;
`
const ActionButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 56px;
	height: 56px;
	border: 1px solid #272A33;
	border-radius: 16px;
	transform: ${({ $rotate }) => ($rotate ? 'rotate(180deg)' : 'none')};
	&:hover {
		background-color: #272A33;
	}
`
const Balance = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
`
const BalanceSubtext = styled.span`
	font-size: 10px;
	text-transform: uppercase;
`
const BalanceCount = styled.h2`
	font-size: 48px;
	line-height: 48px;
	
	mark {
		font-size: 32px;
	}
`
const BalanceHold = styled.p`
	font-size: 10px;
	text-transform: uppercase;
	color: #6A7080CC;
`
const SelectContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 18px;
`

export default Wallet