import styled from 'styled-components';

import CrossIcon from '@/icons/CrossIcon';

import { slideUp } from '@/animation/slideUp';

import UploadStatistics from '@/components/Popup/UploadStatistics';
import LevelSystem from '@/components/Popup/LevelSystem';
import Statistics from '@/components/Popup/Statistics';
import Resource from '@/components/Popup/Resource';
import ShareResources from '@/components/Popup/ShareResources';
import Bot from '@/components/Popup/Bot';
import Step from '@/components/Popup/Step';
import Notifications from '@/components/Popup/Notifications';
import NotificationsMessage from '@/components/Popup/NotificationsMessage';

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
						<PopupTitle>{popup.name}</PopupTitle>
						<PopupClose onClick={closePopup}>
							<CrossIcon width={8} height={8} color="#D6DCEC"/>
						</PopupClose>
					</>
				)}
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
				) : popup.content == 'step' ? (
					<Step />
				) : popup.content == 'notifications' ? (
					<Notifications />
				) : popup.content == 'notifications-message' ? (
					<NotificationsMessage />
				) : null}
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
const PopupTitle = styled.h2`
  	font-size: 24px;
	line-height: 24px;
	text-align: center;
	margin-top: 24px;
	padding-bottom: 24px;
`;

export default Popup