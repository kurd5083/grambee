import styled, { keyframes } from "styled-components"

import check from "@/assets/icons/check.svg";
import beeLamp from "@/assets/bee-lamp.png";
import EyeIcon from "@/icons/EyeIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import TimePlusIcon from "@/icons/TimePlusIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import PolyhedronIcon from "@/icons/PolyhedronIcon";
import CrossIcon from "@/icons/CrossIcon";

import NoDataAvailable from "@/shared/NoDataAvailable";
import LoadingState from "@/shared/LoadingState";

import { usePopupStore } from "@/store/popupStore";
import { useBotStore } from "@/store/botStore";
import { useResourceStore } from "@/store/resourceStore";

const Traffic = ({ type, traffic, loading, title, text, status, filter }) => {
	const { openPopup } = usePopupStore();
	const { setResource } = useResourceStore();
	const { setBot } = useBotStore();

	const handleDetails = (item) => {
		console.log(item)
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
			})
			:
			setBot({
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

		type === 'home' || type === 'resources' ?
			openPopup('resource', `Ресурс # T${item.id}`) :
			openPopup('bot', 'Бот # T221', { botId: item.id })
	}

	const getResourceType = (item) => {
		if (item.sellerType) return "BOT";
		if (item.type === "CHANNEL") return "CHANNEL";
		if (item.type === "CHAT") return "CHAT";
		return "UNKNOWN";
	};

	return (
		<>
			{loading ? (
				<ContainerPadding>
					<LoadingState>Загрузка...</LoadingState>
				</ContainerPadding>
			) : traffic?.length > 0 ? (
				(() => {
					const statusFilteredTraffic = traffic?.filter((item) => {
						if (status === true) {
							return item.status === "ARCHIVED";
						} else {
							return item.status !== "ARCHIVED";
						}
					});
					const filteredTraffic = statusFilteredTraffic.filter((item) => {
						if (filter === "all" || !filter) return true;
						
						const resourceType = getResourceType(item);
						
						switch(filter) {
							case "channels":
								return resourceType === "CHANNEL";
							case "bots":
								return resourceType === "BOT";
							case "chats":
								return resourceType === "CHAT";
							default:
								return true;
						}
					});

					return filteredTraffic.length > 0 ? (
						<ChannelsList $type={type}>
							{filteredTraffic.map((item) => (
								<li key={item.id}>
									<ItemTop>
										<AvaContainer>
											{/* <ItemIcon src={channel_ava} alt="ava icon" /> */}
											<ItemDefoultAva>
												<SpeakerIcon width={18} height={16} color="#6A7080CC" />
											</ItemDefoultAva>
											<PolyhedronBG>
												<PolyhedronIcon width={16} height={16} color={item.checkerBotToken ? "#17EF04" : "#EF0404"}/>
												<IconContainer>
													{item.checkerBotToken ? 
														<img src={check} alt="check" />	
													: 
														<CrossIcon width={8} height={8} color="#000000"/>
													}
												</IconContainer>	
											</PolyhedronBG>
										</AvaContainer>
										<ChannelInfo>
											<InfoId># T{item.id}</InfoId>
											<InfoName>{item.name}</InfoName>
										</ChannelInfo>
										<ButtonMore onClick={() => handleDetails(item)}>Детали <ArrowIcon width={8} height={14} color="#FFB81A" /></ButtonMore>
									</ItemTop>
									<ItemBottom>
										<TextContainer>
											<EyeIcon width={16} height={11} color="#FFB81A" />
											24,260
										</TextContainer>
										<TextContainer>
											<LoadingIcon width={13} height={13} color="#FFB81A" />
											54%
											<LoadingText>
												{item.moderationStatus == "PENDING" ? "На модерации" :
													item.moderationStatus == "APPROVED" ? "Одобренный" :
														"В процессе"}
											</LoadingText>
										</TextContainer>
										<ButtonContainer>
											<ExtendButton>
												<TimePlusIcon width={13} height={13} color="#FFB81A" />
												Продлить
											</ExtendButton>
										</ButtonContainer>
									</ItemBottom>
								</li>
							))}
						</ChannelsList >
					) : (
						<ContainerPadding>
							<NoDataAvailable>
								<NoDataImg src={beeLamp} alt="bee" />
								<h3>{title}</h3>
								<p>{text}</p>
							</NoDataAvailable>
						</ContainerPadding>
					)
				})()
			) : (
				<ContainerPadding>
					<NoDataAvailable>
						<NoDataImg src={beeLamp} alt="bee" />
						<h3>{title}</h3>
						<p>{text}</p>
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
	min-height: 200px;
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
	 &:hover {
    background-color: #30333C;
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
const LoadingText = styled.span`
	padding: 6px 10px;
	border-radius: 12px;
	color: #000000;
	font-size: 10px;
	font-weight: 700;
	background: radial-gradient(circle at center, #FFD26D, #FFB81A);
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
	border-radius: 12px;
	padding: 6px 8px;
`
const NoDataImg = styled.img` 
    animation: 1s ${bounce} infinite alternate;
`
const ContainerPadding = styled.div` 
    /* padding-bottom: 30px; */
`

export default Traffic