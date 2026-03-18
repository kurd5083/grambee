import styled, { keyframes } from "styled-components"
import { useState, useEffect, useMemo } from "react";

import botIcon from "@/assets/icons/bot-icon.svg";
import check from "@/assets/icons/check.svg";
import beeLamp from "@/assets/bee-lamp.png";
import LoadingIcon from "@/icons/LoadingIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import PolyhedronIcon from "@/icons/PolyhedronIcon";
import CrossIcon from "@/icons/CrossIcon";
import SubscribeIcon from "@/icons/SubscribeIcon";
import UnsubscribeIcon from "@/icons/UnsubscribeIcon";
import TotalIcon from "@/icons/TotalIcon";
import DelIcon from "@/icons/DelIcon";

import NoDataAvailable from "@/shared/NoDataAvailable";
import LoadingState from "@/shared/LoadingState";

import useDeleteResource from "@/hooks/api/Resource/useDeleteResource";
import useResourceArchive from "@/hooks/api/Resource/useResourceArchive";
import useDeleteBot from "@/hooks/api/Bots/useDeleteBot";
import useResourceStop from "@/hooks/api/Resource/useResourceStop";
import useResourceActivate from "@/hooks/api/Resource/useResourceActivate";

import { usePopupStore } from "@/store/popupStore";
import { useBotStore } from "@/store/botStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

import { statsResource } from "@/api/Resource/statsResource";

const Traffic = ({ type, traffic, loading, title, text, status, filter, apiToken }) => {
	const [loadingStates, setLoadingStates] = useState({});
	const { openPopup, closePopup } = usePopupStore();
	const { setResource, setWorkBotApiKey } = useReceiptStore();
	const { setBot } = useBotStore();
	const { showToast } = useToastStore();

	const { archive } = useResourceArchive();
	const { removeBot } = useDeleteBot();
	const { stop, isStoping } = useResourceStop();
	const { activate, isEnabling } = useResourceActivate();

	const [statsMap, setStatsMap] = useState({});
	const [loadingMap, setLoadingMap] = useState({});

	const getDateDaysAgo = (days) => {
		const date = new Date();
		date.setDate(date.getDate() - days);
		return date.toISOString().split('T')[0];
	};

	const getResourceType = (item) => {
		if (item.type === "CHANNEL") return "CHANNEL";
		if (item.type === "BOT") return "BOT";
		if (item.type === "CHAT") return "CHAT";
		return "UNKNOWN";
	};

	const filteredTraffic = useMemo(() => {
		if (!traffic?.length) return [];

		const statusFiltered = traffic.filter((item) => {
			if (status === true) {
				return item.status === "ARCHIVED";
			} else {
				return item.status !== "ARCHIVED";
			}
		});

		return statusFiltered.filter((item) => {
			if (type === 'home' && item.workBotApiKey) {
				return false;
			}
			if (type === 'resources' && item.workBotApiKey !== apiToken) {
				return false;
			}
			if (filter === "all" || !filter) return true;

			const resourceType = getResourceType(item);
			switch (filter) {
				case "CHANNEL": return resourceType === "CHANNEL";
				case "BOT": return resourceType === "BOT";
				case "CHAT": return resourceType === "CHAT";
				default: return true;
			}
		});
	}, [traffic, status, filter, type, apiToken]);

	useEffect(() => {
		const loadStats = async () => {
			if (!filteredTraffic.length) return;

			const newStatsMap = {};
			const newLoadingMap = {};

			filteredTraffic.forEach(item => {
				if (item.type !== "BOT") {
					newLoadingMap[item.id] = true;
				}
			});
			setLoadingMap(newLoadingMap);

			for (const item of filteredTraffic) {
				if (item.type === "BOT") continue;

				try {
					const stats = await statsResource({
						resourceId: item.id,
						dateFrom: getDateDaysAgo(1),
						dateTo: new Date().toISOString().split('T')[0],
					});
					newStatsMap[item.id] = stats;
				} catch (error) {
					console.error(`Error loading stats for ${item.id}:`, error);
					newStatsMap[item.id] = null;
				} finally {
					newLoadingMap[item.id] = false;
				}
			}

			setStatsMap(newStatsMap);
			setLoadingMap(newLoadingMap);
		};

		loadStats();
	}, [filteredTraffic]);

	const handleDetails = (item) => {
		type === 'home' || type === 'resources' ?
			setResource({
				id: item.id,
				name: item.name,
				pastPostsDays: item.pastPostsDays,
				username: item.username,
				inviteLink: item.inviteLink,
				checkerBotToken: item.checkerBotToken,
				price: item.price,
				dayLimit: item.dayLimit,
				activeDays: item.activeDays,
				verificationEnabled: item.verificationEnabled,
				autoLinkRefresh: item.autoLinkRefresh,
			})
			: 
			(
				setWorkBotApiKey(item.apiToken),
				setBot({
					id: item.id,
					token: item.token,
					apiToken: item.apiToken,
					boostButtonText: item.boostButtonText,
					botButtonText: item.botButtonText,
					channelButtonText: item.channelButtonText,
					chatButtonText: item.chatButtonText,
					leaveWebHookUrl: item.leaveWebHookUrl,
					isActive: item.isActive,
					apiLinksOnly: item.apiLinksOnly,
				})
			)

			type === 'home' || type === 'resources' ?
			openPopup('resource', `Ресурс # T${item.id}`) :
			openPopup('bot', 'Бот # T221', { botId: item.id })
	}
	const handleDelete = (item) => {
		openPopup('confirmation',
			type === 'home' || type === 'resources' ?
				'Архивировать ресурс трафика?' :
				'Удалить бота?',
			{
				text:
					type === 'home' || type === 'resources' ?
						`Вы уверены, что хотите архивировать ресурс “${item.name}”?\nЭто действие нельзя отменить.` :
						`Вы действительно хотите удалить бота “${item.name}”?\nЭто действие нельзя будет отменить.`,

				onConfirm: () => {
					if (type === 'home' || type === 'resources') {
						archive({ id: item.id }, {
							onSuccess: () => {
								showToast("Ресурс успешно архивирован", "success");
								closePopup();
							},
							onError: (error) => {
								showToast(error?.message || "Ошибка при архивировании", "error");
							}
						});
					} else {
						removeBot({ id: item.id }, {
							onSuccess: () => {
								showToast("Бот успешно удален", "success");
								closePopup();
							},
							onError: (error) => {
								showToast(error?.message || "Ошибка при удалении", "error");
							}
						});
					}
				},
				buttonConfirm: { text: 'Удалить', type: "danger" }
			}
		)
	}

	const handleActive = (itemId) => {
		setLoadingStates(prev => ({ ...prev, [itemId]: true }));
		activate({ id: itemId }, {
			onSuccess: () => {
				showToast("Ресурс успешно активирован!", "success");
				setLoadingStates(prev => ({ ...prev, [itemId]: false }));
			},
			onError: (error) => {
				showToast(
					error?.message || "Ошибка при активации ресурса",
					"error"
				);
				setLoadingStates(prev => ({ ...prev, [itemId]: false }));
			}
		})
	}

	const handleStop = (itemId) => {
		setLoadingStates(prev => ({ ...prev, [itemId]: true }));
		stop({ id: itemId }, {
			onSuccess: () => {
				showToast("Ресурс успешно остановлен!", "success");
				setLoadingStates(prev => ({ ...prev, [itemId]: false }));
			},
			onError: (error) => {
				showToast(
					error?.message || "Ошибка при остановке ресурса",
					"error"
				);
				setLoadingStates(prev => ({ ...prev, [itemId]: false }));
			}
		})
	}
	return (
		<>
			{loading ? (
				<ContainerPadding $type={type}>
					<LoadingState>Загрузка...</LoadingState>
				</ContainerPadding>
			) : filteredTraffic.length > 0 ? (
				<ChannelsList $type={type}>
					{filteredTraffic.map((item) => (
						<li key={item.id}>
							<ItemTop>
								<AvaContainer>
									<ItemDefoultAva>
										<SpeakerIcon width={18} height={16} color="#6A7080CC" />
									</ItemDefoultAva>
									<PolyhedronBG>
										<PolyhedronIcon width={16} height={16} color={item.checkerBotToken ? "#17EF04" : "#EF0404"} />
										<IconContainer>
											{item.checkerBotToken ?
												<img src={check} alt="check" />
												:
												<CrossIcon width={8} height={8} color="#000000" />
											}
										</IconContainer>
									</PolyhedronBG>
								</AvaContainer>
								<ChannelInfo>
									<InfoId># T{item.id}</InfoId>
									<InfoName>{item.name}</InfoName>
								</ChannelInfo>
								<ButtonMore onClick={() => handleDetails(item)}>Детали <ArrowIcon width={8} height={14} color="#FFB81A" /></ButtonMore>
								{item.status !== "ARCHIVED" && (
									<DelContainer onClick={() => handleDelete(item)}>
										<DelIcon width={14} height={14} color="currentColor" />
									</DelContainer>
								)}
							</ItemTop>
							<ItemBottom>
								{item.type == "BOT" ? (
									<TextContainer>
										<img src={botIcon} alt="botIcon" />
										0
									</TextContainer>
								) : (
									<>
										{loadingMap[item.id] ? (
											<LoadingStats>Загрузка...</LoadingStats>
										) : statsMap[item.id] ? (
											<>
												<TextContainer>
													<SubscribeIcon width={16} height={14} color="#FFB81A" />
													{statsMap[item.id].data?.stats.summary.totalJoins ?? 0}
												</TextContainer>
												<TextContainer>
													<UnsubscribeIcon width={16} height={14} color="#FFB81A" />
													{statsMap[item.id].data?.stats.summary.totalLeaves ?? 0}
												</TextContainer>
												<TextContainer>
													<TotalIcon width={16} height={16} color="#FFB81A" />
													{statsMap[item.id].data?.stats.summary.totalRemained ?? 0}
												</TextContainer>
											</>
										) : (
											<TextContainer>Нет данных</TextContainer>
										)}
									</>
								)}
								<TextContainer>
									{type == "sell" ? (
										<>
											<mark>₽</mark> 0
										</>
									) : (
										<>
											<LoadingIcon width={13} height={13} color="#FFB81A" />
											0%
										</>
									)}
									<LoadingText $moderationStatus={item.moderationStatus}>
										{item.isActive ?
											'Активный'
											:
											item.moderationStatus == "PENDING" ? "На модерации" :
												item.moderationStatus == "APPROVED" ? "Одобренный" :
													item.moderationStatus === "REJECTED" ? "Отклонен" :
														'В процессе'
										}
									</LoadingText>
								</TextContainer>
								<ButtonContainer>
									<ExtendButton
										$isActive={item.status === "ACTIVE"}
										onClick={() => item.status === "ACTIVE" ? handleStop(item.id) : handleActive(item.id)}
										disabled={loadingStates[item.id]}
									>
										{loadingStates[item.id] ? 'Загрузка...' : (item.status === "ACTIVE" ? 'Выключить' : 'Включить')}
									</ExtendButton>
								</ButtonContainer>
							</ItemBottom>
						</li>
					))}
				</ChannelsList>
			) : (
				<ContainerPadding $type={type}>
					<NoDataAvailable>
						<NoDataImg src={beeLamp} alt="bee" />
						{status ? (
							<h3>{type === 'home' || type === 'resources' ? 'Нет архивированных ресурсов.' : 'Нет архивированных ботов'}</h3>
						) : (
							<>
								<h3>{title}</h3>
								<p>{text}</p>
							</>
						)}
					</NoDataAvailable>
				</ContainerPadding>
			)}
		</>
	)
}

const bounce = keyframes`
	from {
		transform: translateY(10px)
	}
	to {
	transform: translateY(-10px)
	}
`
const ChannelsList = styled.ul`
	box-sizing: border-box;
  	display: flex;
	flex-direction: column;
	gap: 16px;
	max-height: calc(100dvh - 500px);
	min-height: 150px;
	overflow-y: auto;
	scrollbar-width: none;
	padding-bottom: ${({ $type }) => $type !== "resources" && "20px"};
`
const ItemTop = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 16px;
	padding: 22px 17px 15px;
	border-radius: 16px 16px 0 0;
	background-color: #272A33;
`
const AvaContainer = styled.div`
	position: relative;
`
const ItemIcon = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 12px;
`
const ItemDefoultAva = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	width: 40px;
	border-radius: 50%;
	background-color: #333845;
`
const PolyhedronBG = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background-color: #1F222B;
	transform: translate(25%, 25%);
`
const IconContainer = styled.div`
	display: flex;
	position: absolute;
`
const ChannelInfo = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	gap: 4px;
`
const InfoId = styled.span`
	text-transform: uppercase;
	font-size: 10px;
	color: #6A7080CC;
`
const InfoName = styled.p`
	font-weight: 700;
`
const ButtonMore = styled.button`
	display: flex;
	gap: 10px;
	align-items: center;
	height: 40px;
	padding: 0 16px;
	border-radius: 12px;
	background-color: #1F222B;
	margin-right: -10px;

	&:hover {
		background-color: #30333C;
	}
`
const DelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #1F222B;
    border-radius: 12px;
    color: #6A7080;
	cursor: pointer;
        
    &:hover {
        color: #FFB81A;
        background-color: #33363f;
    }
`
const ItemBottom = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	padding: 16px;
	border-radius: 0 0 16px 16px;
	background-color: #1F222B;
	border-top: 1px solid #30343F;
`
const TextContainer = styled.p`
	display: flex;
  	align-items: center;
	gap: 10px;
	font-weight: 700;
`
const LoadingStats = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 6px 10px;
	background-color: #272A33;
	border-radius: 12px;
	color: #FFB81A;
	font-size: 12px;
	font-weight: 500;
	opacity: 0.8;
	animation: pulse 1.5s ease-in-out infinite;

	@keyframes pulse {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.6;
		}
	}
`
const LoadingText = styled.span`
	padding: 6px 10px;
	border-radius: 12px;
	color: #000000;
	font-size: 10px;
	font-weight: 700;
	${({ $moderationStatus }) => {
		switch ($moderationStatus) {
			case 'PENDING':
				return `background: radial-gradient(circle at center, #FFD26D, #FFB81A);`
			case 'APPROVED':
				return `background: radial-gradient(circle at center, #6FD26D, #2FB81A);`
			case 'REJECTED':
				return `background: radial-gradient(circle at center, #FF6D6D, #F44336);`
			default:
				return `background: radial-gradient(circle at center, #FFD26D, #FFB81A);`
		}
	}}
`

const ButtonContainer = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
`
const ExtendButton = styled.button`
	display: flex;
	align-items: center;
	gap: 7px;
	font-size: 10px;
	font-weight: 700;
	background-color: #272A33;
	color: ${({ $isActive }) => $isActive ? '#FF4B4B' : '#4CAF50'};
	border-radius: 12px;
	padding: 6px 8px;
	border: 1px solid ${({ $isActive }) => $isActive ? '#FF4B4B' : '#4CAF50'};
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: ${({ $isActive }) => $isActive ? '#FF4B4B20' : '#4CAF5020'};
		color: ${({ $isActive }) => $isActive ? '#FF6666' : '#66BB6A'};
		border-color: ${({ $isActive }) => $isActive ? '#FF6666' : '#66BB6A'};
	}
`
const NoDataImg = styled.img` 
    animation: 1s ${bounce} infinite alternate;
`
const ContainerPadding = styled.div` 
	${({ $type }) => $type != "resources" && `
		padding-bottom: 30px;
	`}
`

export default Traffic