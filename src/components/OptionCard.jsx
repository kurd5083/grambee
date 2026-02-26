import styled from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";

const OptionCard = ({
	icon,
	title,
	text,
	bgIcon,
	margin = 48,
	direction,
	bottom,
	right,
	onClick
}) => {
	return (
		<Card>
			<CardHeader $direction={direction}>
				<IconBox>{icon}</IconBox>
				{direction == "horizontal" && (
					<CardContent $margin={0}>
						<Title>{title}</Title>
						<Description>{text}</Description>
					</CardContent>
				)}
				<ActionButton onClick={onClick}>
					<ArrowIcon color="#D6DCEC" width={6} height={10} />
				</ActionButton>
				
			</CardHeader>
			{direction == "vertical" && (
				<CardContent $margin={margin}>
					<Title>{title}</Title>
					{text && <Description>{text}</Description>}
				</CardContent>
			)}
			{bgIcon && <BgIcon $bottom={bottom} $right={right}>{bgIcon}</BgIcon>}
		</Card>
	);
};

const Card = styled.div`
	position: relative;
	flex: 1;
	background-color: #1f222b;
	padding: 16px;
	border-radius: 16px;
	overflow: hidden;
`;
const CardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: ${({$direction}) => $direction == "horizontal" ? "center" : "flex-start"};
	gap: 16px;
`;
const IconBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #272a33;
	padding: 12px;
	border-radius: 12px;
`;
const ActionButton = styled.button`
	width: 24px;
	height: 24px;
	background-color: #383d4c;
	border-radius: 50%;
	cursor: pointer;

	&:hover {
		background-color: #4a5060;
	}

	&:active {
		transform: scale(0.95);
	}
`;
const CardContent = styled.div`
	position: relative;
	margin-top: ${({ $margin }) => $margin && `${$margin}px`};
	z-index: 1;
	flex-grow: 1;
`;
const Title = styled.h3`
	font-size: 18px;
	font-weight: 700;
	width: 130px;
`;
const Description = styled.p`
	margin-top: 8px;
	font-size: 12px;
	color: #6a7080cc;
	font-weight: 600;
`;
const BgIcon = styled.div`
    position: absolute;
    right: ${({ $right }) => $right ? `${$right}` : "16px"};
    bottom: ${({ $bottom }) => $bottom ? `${$bottom}` : 0};
    z-index: 0;
`

export default OptionCard;