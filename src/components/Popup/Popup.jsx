import styled from 'styled-components';

import CrossIcon from '@/icons/CrossIcon';

import { slideUp } from '@/animation/slideUp';

import UploadStatistics from '@/components/Popup/UploadStatistics';
import LevelSystem from '@/components/Popup/LevelSystem';
import Statistics from '@/components/Popup/Statistics';
import Resource from '@/components/Popup/Resource';
import ShareResources from '@/components/Popup/ShareResources';
import Bot from '@/components/Popup/Bot';
import StepFirst from '@/components/Popup/StepFirst';
import StepSecond from '@/components/Popup/StepSecond';
import Notifications from '@/components/Popup/Notifications';
import NotificationsMessage from '@/components/Popup/NotificationsMessage';
import CreateResurceFirst from '@/components/Popup/Purchase/CreateResurceFirst';
import CreateResurceSecond from '@/components/Popup/Purchase/CreateResurceSecond';
import SelectChannel from '@/components/Popup/Purchase/SelectChannel';
import ChoosingTypeTraffic from '@/components/Popup/Purchase/ChoosingTypeTraffic';
import ScaleAudience from '@/components/Popup/Purchase/ScaleAudience';
import AdditionalParameters from '@/components/Popup/Purchase/AdditionalParameters';
import SelectAreas from '@/components/Popup/Purchase/SelectAreas';
import SelectChannelBot from '@/components/Popup/Purchase/SelectChannelBot';
import SelectChannelConstantly from '@/components/Popup/Purchase/SelectChannelConstantly';
import SelectChannelOnceDay from '@/components/Popup/Purchase/SelectChannelOnceDay';
import SelectChannelApplication from '@/components/Popup/Purchase/SelectChannelApplication';
import PurchaseCoverageConstantly from '@/components/Popup/Purchase/PurchaseCoverageConstantly';
import PurchaseCoverageOnceDay from '@/components/Popup/Purchase/PurchaseCoverageOnceDay';

import useMaxResize from '@/hooks/useMaxResize';

import { usePopupStore } from "@/store/popupStore";

const Popup = () => {
	const { popup, closePopup } = usePopupStore()
	const { widthScreen } = useMaxResize();

	return (
		<PopupContainer $view={popup.content == 'notifications' || popup.content == 'notifications-message'} $width={widthScreen} onClick={closePopup}>
			<PopupContent $view={popup.content == 'notifications' || popup.content == 'notifications-message'} onClick={(e) => e.stopPropagation()}>
				{popup.content !== 'notifications' && popup.content !== 'notifications-message' && (
					<>
						<LineHead />
						{popup?.data?.step &&
							<PopupSubTitle>
								<mark>шаг </mark>
								<span>{popup.data.step} из 5</span>
							</PopupSubTitle>
						}
						<PopupTitle>{popup.name}</PopupTitle>
						{popup?.data?.text && <PopupText>{popup.data.text}</PopupText>}
						<PopupClose onClick={closePopup}>
							<CrossIcon width={8} height={8} color="#D6DCEC" />
						</PopupClose>
					</>
				)}
				<Container>
				{popup.content == 'upload-statistics' ? (
					<UploadStatistics />
				) : popup.content == 'level-system' ? (
					<LevelSystem />
				) : popup.content == 'statistics' ? (
					<Statistics />
				) : popup.content == 'resource' ? (
					<Resource />
				) : popup.content == 'share-resources' ? (
					<ShareResources />
				) : popup.content == 'bot' ? (
					<Bot />
				) : popup.content == 'step-first' ? (
					<StepFirst />
				) : popup.content == 'step-second' ? (
					<StepSecond />
				) : popup.content == 'notifications' ? (
					<Notifications />
				) : popup.content == 'notifications-message' ? (
					<NotificationsMessage />
				) : popup.content == 'create-resources-first' ? (
					<CreateResurceFirst />
				) : popup.content == 'create-resources-second' ? (
					<CreateResurceSecond />
				) : popup.content == 'select-channel' ? (
					<SelectChannel />
				) : popup.content == 'choosing-type-traffic' ? (
					<ChoosingTypeTraffic />
				) : popup.content == 'scale-audience' ? (
					<ScaleAudience />
				) : popup.content == 'additional-parameters' ? (
					<AdditionalParameters />
				) : popup.content == 'select-areas' ? (
					<SelectAreas />
				) : popup.content == 'select-channel-bot' ? (
					<SelectChannelBot />
				) : popup.content == 'select-channel-constantly' ? (
					<SelectChannelConstantly />
				) : popup.content == 'select-channel-once-day' ? (
					<SelectChannelOnceDay />
				) : popup.content == 'select-channel-application' ? (
					<SelectChannelApplication />
				) : popup.content == 'purchase-coverage-constantly' ? (
					<PurchaseCoverageConstantly />
				) : popup.content == 'purchase-coverage-once-day' && (
					<PurchaseCoverageOnceDay />
				)}
				</Container>
			</PopupContent>
		</PopupContainer>
	)
}

const PopupContainer = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	bottom: 0;
	width: ${({ $width }) => $width}px;
  	height: 100%;
	background-color: #13141AA3;
	backdrop-filter: blur(16px);
  	z-index: ${({ $view }) => $view ? 9 : 100};
`;
const PopupContent = styled.div`
	box-sizing: border-box;
	position: absolute;
	top: ${({ $view }) => $view ? '90px' : 'auto'};
	bottom: ${({ $view }) => $view ? 'auto' : 0};
	background-color: ${({ $view }) => $view ? '#1B1E24' : '#181A20'};
	border-radius: 16px;
	padding-top: 16px;
	width: ${({ $view }) => $view ? 'calc(100% - 32px)' : '100%'};
	animation: ${slideUp} 0.3s ease-out;
	max-height: 90dvh;
`;
const LineHead = styled.div`
  	width: 56px;
	height: 4px;
	border-radius: 4px;
	background-color: #FFB81A;
	margin: 0 auto;
`;
const PopupClose = styled.button`
	position: absolute;
	top: 24px;
	right: 24px;
  	width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 1px solid #272A33;
`;
const Container = styled.div`
	max-height: 60dvh;
    overflow-y: auto;
    scrollbar-width: none;
`;
const PopupSubTitle = styled.div`
	text-transform: uppercase;
  	font-size: 10px;
	line-height: 10px;
	text-align: center;
	margin-top: 16px;

	span {
		color: #6A7080;
	}
`;
const PopupText = styled.p`
  	font-size: 14px;
	line-height: 16px;
	text-align: center;
	margin-top: -8px;
	color: #6A7080CC;
	white-space: pre-line;
	padding-bottom: 24px;
`;
const PopupTitle = styled.h2`
  	font-size: 24px;
	line-height: 24px;
	text-align: center;
	margin-top: 24px;
	padding-bottom: 24px;
`;

export default Popup