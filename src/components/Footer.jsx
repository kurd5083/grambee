import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import ShopIcon from '@/icons/ShopIcon';
import DollarIcon from '@/icons/DollarIcon';
import WalletIcon from '@/icons/WalletIcon';
import ProfileIcon from '@/icons/ProfileIcon';

import useMaxResize from '@/hooks/useMaxResize';

const Footer = () => {
	const [ locationState, setLocationState ] = useState();
	const { widthScreen } = useMaxResize();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setLocationState(location.pathname);
	}, [location.pathname]);

	const isActiveWallet = ['/wallet', '/replenish', '/bring', '/payment', '/final-receipt'].includes(locationState);

	return (
		<FooterContainer $width={widthScreen}>
			<MenuItem $active={locationState == '/'} onClick={() => navigate('/')}>
				<ShopIcon 
					width={26}
					height={28}
					colorFirst={locationState == '/' ? '#FFD26D' : '#6A7080'} 
					colorSecond={locationState == '/' ? '#FFB81A' : '#6A7080'}
				/>
				Купить
			</MenuItem>
			<MenuItem $active={locationState == '/sell'} onClick={() => navigate('/sell')}>
				<DollarIcon 
					width={27}
					height={27}
					colorFirst={locationState == '/sell' ? '#FFD26D' : '#6A7080'} 
					colorSecond={locationState == '/sell' ? '#FFB81A' : '#6A7080'}
				/>
				Продать
			</MenuItem>
			<MenuItem 
				$active={isActiveWallet} 
				onClick={() => navigate('/wallet')}
			>
				<WalletIcon 
					width={30}
					height={29}
					colorFirst={isActiveWallet ? '#FFD26D' : '#6A7080'} 
					colorSecond={isActiveWallet ? '#FFB81A' : '#6A7080'}
				/>
				Кошелёк
			</MenuItem>
			<MenuItem $active={locationState == '/account'} onClick={() => navigate('/account')}>
				<ProfileIcon 
					width={29}
					height={29}
					colorFirst={locationState == '/account' ? '#FFD26D' : '#6A7080'} 
					colorSecond={locationState == '/account' ? '#FFB81A' : '#6A7080'}
				/>
				Профиль
			</MenuItem>
		</FooterContainer>
	)
}

const FooterContainer = styled.footer`
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	gap: 16px;
	width: ${({ $width }) => $width}px;
	z-index: 8;
	background-color: #13141A7A;
	backdrop-filter: blur(56px);
	overflow: hidden;
`;
const MenuItem = styled.button`
	box-sizing: border-box;
	position: relative;
	flex: 1;
 	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	padding: 24px 0 46px;
	color: ${({ $active }) => $active ? '#FFB81A' : '#6A7080'};

	${({ $active }) =>
		$active && `
			&:before {
				content: '';
				position: absolute;
				top: 0;
				height: 4px;
				width: 100%;
				border-radius: 4px;
				background-color: #FFB81A;
				z-index: 1;
			}
			&:after {
				content: '';
				position: absolute;
				top: 0px;
				lefr: 50%;
				transform: transitionX('-50%');
				width: 42px;
				height: 24px;
				background: radial-gradient(circle at center, #FFD26D, #FFB81A);
				filter: blur(32px);
			}
		`
	}
`;

export default Footer
