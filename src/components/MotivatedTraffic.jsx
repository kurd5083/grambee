import styled from "styled-components"

import fire from '@/assets/fire.svg';
import archive from '@/assets/archive.svg';
import refresh from '@/assets/refresh.svg';
import channel_ava from '@/assets/channel-ava.png';

import EyeIcon from "@/icons/EyeIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import TimePlusIcon from "@/icons/TimePlusIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";

import CustomSelect from "@/shared/CustomSelect";
import Button from "@/shared/Button";

import { usePopupStore } from "@/store/popupStore";

const MotivatedTraffic = () => {
  	const { popup, openPopup } = usePopupStore()

	return (
		<>
			<TrafficHead>
				<img src={fire} alt="fire icon" />
				<HeadTitle>Мотивированный трафик</HeadTitle>
				<ArchiveImg src={archive} alt="archive icon" />
				<ResetImg src={refresh} alt="refresh icon" />
			</TrafficHead>
			<TrafficBuy>
				<CustomSelect
					placeholder="Каналы"
					options={[
						{ value: "1", label: "1" },
						{ value: "2", label: "2" },
						{ value: "3", label: "3" },
					]}
					icon={<SpeakerIcon/>}
				/>
				<Button width="170px">Купить трафик</Button>
			</TrafficBuy>
			<ChannelsList>
					<ChannelItem>
						<ItemTop>
							<ItemIcon src={channel_ava} alt="ava icon" />
							<ChannelInfo>
								<InfoId># T221</InfoId>
								<InfoName>Digital Design</InfoName>
							</ChannelInfo>
							<ButtonMore onClick={() => openPopup('resource', 'Ресурс # T221')}>Детали <ArrowIcon color="#FFB81A"/></ButtonMore>
						</ItemTop>
						<ItemBottom>
							<TextContainer>
								<EyeIcon/>
								24,260
							</TextContainer>
							<TextContainer>
								<LoadingIcon/>
								54%
								<LoadingText>В процессе</LoadingText>
							</TextContainer>
								<ExtendButton>
									<TimePlusIcon/>
									Продлить
								</ExtendButton>
						</ItemBottom>
					</ChannelItem>
					<ChannelItem>
						<ItemTop>
							<ItemIcon src={channel_ava} alt="ava icon" />
							<ChannelInfo>
								<InfoId># T221</InfoId>
								<InfoName>Digital Design</InfoName>
							</ChannelInfo>
							<ButtonMore onClick={() => openPopup('resource', 'Ресурс # T221')}>Детали <ArrowIcon color="#FFB81A"/></ButtonMore>
						</ItemTop>
						<ItemBottom>
							<TextContainer>
								<EyeIcon/>
								24,260
							</TextContainer>
							<TextContainer>
								<LoadingIcon/>
								54%
								<LoadingText>В процессе</LoadingText>
							</TextContainer>
								<ExtendButton>
									<TimePlusIcon/>
									Продлить
								</ExtendButton>
						</ItemBottom>
					</ChannelItem>
					<ChannelItem>
						<ItemTop>
							<ItemIcon src={channel_ava} alt="ava icon" />
							<ChannelInfo>
								<InfoId># T221</InfoId>
								<InfoName>Digital Design</InfoName>
							</ChannelInfo>

							<ButtonMore onClick={() => openPopup('resource', 'Ресурс # T221')}>Детали <ArrowIcon color="#FFB81A"/></ButtonMore>
						</ItemTop>
						<ItemBottom>
							<TextContainer>
								<EyeIcon/>
								24,260
							</TextContainer>
							<TextContainer>
								<LoadingIcon/>
								54%
								<LoadingText>В процессе</LoadingText>
							</TextContainer>
								<ExtendButton>
									<TimePlusIcon/>
									Продлить
								</ExtendButton>
						</ItemBottom>
					</ChannelItem>
			</ChannelsList>
		</>
	)
}
const TrafficHead = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px 30px;
`
const HeadTitle = styled.h3`
  margin-left: 16px;
  font-size: 20px;
  line-height: 22px;
  flex-grow: 1;
`
const ArchiveImg = styled.img`
  margin-left: 16px;
  cursor: pointer;
`
const ResetImg = styled.img`
  margin-left: 16px;
  cursor: pointer;
`
const TrafficBuy = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px 30px;
`
const ChannelsList = styled.ul`
	box-sizing: border-box;
	padding: 0 24px;
  	display: flex;
	flex-direction: column;
	gap: 16px;
	max-height: calc(100dvh - 650px);
	min-height: 200px;
	overflow-y: auto;
	scrollbar-width: none;
	padding-bottom: 20px;
`
const ChannelItem = styled.li``
const ItemTop = styled.div`
	display: flex;
	align-items: center;
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
	gap: 16px;
	padding: 16px;
	border-radius: 0 0 16px 16px;
	background-color: #1F222B;
	border-top: 1px solid #30343F;
`
const TextContainer  = styled.p`
	display: flex;
  	align-items: center;
	gap: 10px;
	font-weight: 700;
`
const LoadingText  = styled.span`
	padding: 6px 10px;
	border-radius: 12px;
	color: #000000;
	font-size: 10px;
	font-weight: 700;
	background: radial-gradient(circle at center, #FFD26D, #FFB81A);
`
const ExtendButton  = styled.button`
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 7px;
	font-size: 10px;
	font-weight: 700;
`

export default MotivatedTraffic
