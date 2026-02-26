import styled from "styled-components"

import channel_ava from '@/assets/channel-ava.png';

import EyeIcon from "@/icons/EyeIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import TimePlusIcon from "@/icons/TimePlusIcon";
import ArrowIcon from "@/icons/ArrowIcon";

import { usePopupStore } from "@/store/popupStore";

const Traffic = ({ type }) => {
	const { openPopup } = usePopupStore()

	return (
		<ChannelsList $type={type}>
			<li>
				<ItemTop>
					<ItemIcon src={channel_ava} alt="ava icon" />
					<ChannelInfo>
						<InfoId># T221</InfoId>
						<InfoName>Digital Design</InfoName>
					</ChannelInfo>
					<ButtonMore onClick={() =>
						type === 'home' || type === 'resources' ?
							openPopup('resource', 'Ресурс # T221') :
							openPopup('bot', 'Бот # T221')
					}>Детали <ArrowIcon width={8} height={14} color="#FFB81A" /></ButtonMore>
				</ItemTop>
				<ItemBottom>
					<TextContainer>
						<EyeIcon width={16} height={11} color="#FFB81A" />
						24,260
					</TextContainer>
					<TextContainer>
						<LoadingIcon width={13} height={13} color="#FFB81A" />
						54%
						<LoadingText>В процессе</LoadingText>
					</TextContainer>
					<ExtendButton>
						<TimePlusIcon width={13} height={13} color="#FFB81A" />
						Продлить
					</ExtendButton>
				</ItemBottom>
			</li>
			<li>
				<ItemTop>
					<ItemIcon src={channel_ava} alt="ava icon" />
					<ChannelInfo>
						<InfoId># T221</InfoId>
						<InfoName>Digital Design</InfoName>
					</ChannelInfo>
					<ButtonMore onClick={() =>
						type === 'home' || type === 'resources' ?
							openPopup('resource', 'Ресурс # T221') :
							openPopup('bot', 'Бот # T221')
					}>Детали <ArrowIcon width={8} height={14} color="#FFB81A" /></ButtonMore>
				</ItemTop>
				<ItemBottom>
					<TextContainer>
						<EyeIcon width={16} height={11} color="#FFB81A" />
						24,260
					</TextContainer>
					<TextContainer>
						<LoadingIcon width={13} height={13} color="#FFB81A" />
						54%
						<LoadingText>В процессе</LoadingText>
					</TextContainer>
					<ExtendButton>
						<TimePlusIcon width={13} height={13} color="#FFB81A" />
						Продлить
					</ExtendButton>
				</ItemBottom>
			</li>
			<li>
				<ItemTop>
					<ItemIcon src={channel_ava} alt="ava icon" />
					<ChannelInfo>
						<InfoId># T221</InfoId>
						<InfoName>Digital Design</InfoName>
					</ChannelInfo>
					<ButtonMore onClick={() =>
						type === 'home' || type === 'resources' ?
							openPopup('resource', 'Ресурс # T221') :
							openPopup('bot', 'Бот # T221')
					}>Детали <ArrowIcon width={8} height={14} color="#FFB81A" /></ButtonMore>
				</ItemTop>
				<ItemBottom>
					<TextContainer>
						<EyeIcon width={16} height={11} color="#FFB81A" />
						24,260
					</TextContainer>
					<TextContainer>
						<LoadingIcon width={13} height={13} color="#FFB81A" />
						54%
						<LoadingText>В процессе</LoadingText>
					</TextContainer>
					<ExtendButton>
						<TimePlusIcon width={13} height={13} color="#FFB81A" />
						Продлить
					</ExtendButton>
				</ItemBottom>
			</li>
		</ChannelsList>
	)
}

const ChannelsList = styled.ul`
	box-sizing: border-box;
  	display: flex;
	flex-direction: column;
	gap: 16px;
	max-height: calc(100dvh - 550px);
	min-height: 200px;
	overflow-y: auto;
	scrollbar-width: none;
	padding-bottom: ${({$type}) => $type !== "resources" && "20px"};
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
const ItemIcon = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 12px;
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
const ExtendButton = styled.button`
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 7px;
	font-size: 10px;
	font-weight: 700;
`

export default Traffic