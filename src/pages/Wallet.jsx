import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import grid from '@/assets/grid.png';
import TimeIcon from "@/icons/TimeIcon";
import ArrowOblique from "@/icons/ArrowOblique";
import WalletIcon from '@/icons/WalletIcon';
import EyeIcon from '@/icons/EyeIcon';
import EyeCloseIcon from '@/icons/EyeCloseIcon';
import ArrowIcon from "@/icons/ArrowIcon";
import TransactionsIcon from "@/icons/TransactionsIcon";

import CustomSelect from "@/shared/CustomSelect";
import { SkeletonAvaWallet } from '@/shared/Skeleton';
import NoDataAvailable from "@/shared/NoDataAvailable";
import LoadingState from "@/shared/LoadingState";

import TitleHead from "@/components/TitleHead";
import Chart from '@/components/Chart';
import TabMenu from "@/components/TabMenu";

import useGetTransactions from "@/hooks/api/useGetTransactions";
import useCreateNotification from '@/hooks/api/Notifications/useCreateNotification';

import { usePopupStore } from "@/store/popupStore";
import { useUserStore } from '@/store/userStore';

const tabs = [
	{
		label: "Таблица",
		onClick: () => openPopup('step', 'Шаг 1 / 2')
	},
	// {
	// 	label: "Транзакции",
	// 	icon: transactions
	// },
	{
		label: "Выгрузить",
		onClick: () => openPopup('resource', 'Ресурс #T356')
	}
];

const Wallet = () => {
	const [eyeState, setEyeState] = useState(localStorage.getItem('state-eye') === 'true');
	const [isActive, setIsActive] = useState(false)
	const navigate = useNavigate();	
	
	const { openPopup } = usePopupStore()
	const { userLocal } = useUserStore()

	const { addNotification } = useCreateNotification()

	const isLoading = !userLocal
	const { transactions, transactionsLoading } = useGetTransactions({ telegramId: userLocal?.telegramId })

	useEffect(() => {
		if (userLocal?.telegramId) {
			addNotification({
				telegramId: Number(userLocal?.telegramId),
				message: "Your balance has been updated",
				sellerId: "123",
				sellerIds: [
					"mybot:123",
					"anotherbot:456"
				],
				photoUrl: "https://t.me/i/userpic/320/GGg05xPKfkrn_5K5qiBU-V-DFSbNzv2f87WKGxbCCAc.svg",
				resourceId: 228
			})
		}
	}, [userLocal?.telegramId])
	
	const handleEye = () => {
		const newState = !eyeState;
		setEyeState(newState);
		localStorage.setItem('state-eye', newState);
	};

	return (
		<>
			<TitleHead
				icon={<WalletIcon width={24} height={23} colorFirst="#FFD26D " colorSecond="#FFB81A" />}
				title="Кошелёк"
			>
				<EyeContainer onClick={() => handleEye()}>
					{eyeState ? (
						<EyeIcon width={18} height={18} color="#6A7080" />
					) : (
						<EyeCloseIcon width={18} height={18} color="#6A7080" />
					)}
				</EyeContainer>
			</TitleHead>
			<MyBalance>
				{isLoading ? (
					<SkeletonAvaWallet />
				) : (
					<AvaUser src={userLocal?.avatarUrl} alt="ava user" />
				)}
				<GridImage src={grid} alt="grid img" />
				<BalanceContainer>
					<BalanceAction>
						<ActionButton onClick={() => navigate('/replenish')}>
							<ArrowOblique width={18} height={18} colorFirst="#FFD26D" colorSecond="#FFB81A" />
						</ActionButton>
						ПОПОЛНИТЬ
					</BalanceAction>
					<Balance>
						<BalanceSubtext><mark>ОСНОВНОЙ БАЛАНС:</mark></BalanceSubtext>
						<BalanceCount >
							{!eyeState ?
								'.......' :
								<>{userLocal?.balance?.d ? Number(userLocal.balance.d.join('.')).toFixed(2) : '0.00'} <mark>₽</mark></>
							}
						</BalanceCount>
						<BalanceHold>На удержании: {!eyeState ? '.....' : Number(userLocal?.holdBalance?.d.join('.')).toFixed(2) || 0}</BalanceHold>
					</Balance>
					<BalanceAction>
						<ActionButton onClick={() => navigate('/bring')} $rotate={true}>
							<ArrowOblique width={18} height={18} colorFirst="#FFD26D" colorSecond="#FFB81A" />
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
			<Chart type="full" />
			<TransactionsContainer $isActive={isActive}>
				<TransactionsHead>
					<TransactionsIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />
					<h2>Транзакции</h2>
					<span onClick={() => setIsActive(!isActive)}><mark>{isActive ? 'Меньше' : 'Больше'}</mark><ArrowIcon width={7} height={13} color="#FFB81A" /></span>
				</TransactionsHead>
				{transactionsLoading ? (
					<TransactionsList $isActive={isActive}>
						<LoadingState>Загрузка...</LoadingState>
					</TransactionsList>
				) : transactions?.length > 0 ? (
					<TransactionsList $isActive={isActive}>
						{transactions.map(transaction => (
							<li key={transaction.id}>
								<ImgContainer>
									<TimeIcon width={16} height={16} color="#FFB81A" />
								</ImgContainer>
								<h3>{transaction.description}</h3>
								<span>{transaction.type == "DEPOSIT" ? '+' : '-'}{transaction.amount}<mark>₽</mark></span>
							</li>
						))}
					</TransactionsList>
				) : (
					<TransactionsList $isActive={isActive}>
						<NoDataAvailable>
							<TransactionsIcon width={70} height={70} colorFirst="#272A33" colorSecond="#272A33" uniqueId="big" />
							<p>У вас нет транзакций</p>
						</NoDataAvailable>
					</TransactionsList>
				)}
			</TransactionsContainer>
			{/* <TabMenu tabs={tabs} /> */}
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
	object-fit: cover;
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
	font-size: 42px;
	line-height: 42px;
	
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
const TransactionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 16px 24px 24px;
	background-color: #1F222B;
	border-radius: 16px;

	${({ $isActive }) =>
		$isActive && `
			position: fixed;
			inset: 0;
			z-index: 10;
			border-radius: 0;
			margin: 0;
			justify-content: flex-start;
		`
	}
`
const TransactionsHead = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 24px 24px 0;
	
	h2 {
		font-size: 20px;
	}
	span {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 11px;
		flex-grow: 1;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}
`
const TransactionsList = styled.ul`
	display: flex;
	flex-direction: column;
	margin-top: 24px;
	gap: 24px;
	max-height: ${({ $isActive }) => $isActive ? '100%' : '150px'};
	overflow-y: auto;
	scrollbar-width: none;
	padding: 0 24px 24px;


	li {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-bottom: 24px;
		border-bottom: 1px solid #30343F;

		h3 {
			font-size: 16px;
		}
		span {
			display: flex;
			justify-content: flex-end;
			gap: 5px;
			flex-grow: 1;
			flex-shrink: 0;
		}
		&:last-child {
			border: 0;
			padding-bottom: 0;
		}
	}
`
const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #272A33;
  padding: 12px;
  border-radius: 12px;
`
export default Wallet