import styled from 'styled-components';

import pdf from "@/assets/pdf.svg";
import excel from "@/assets/excel.svg";
import ArrowIcon from "@/icons/ArrowIcon";

const UploadStatistics = () => {
	return (
		<StatisticsContainer>
			<Card>
				<CardHead>
					<ImgContainer>
						<img src={pdf} alt="pdf icon" />
					</ImgContainer>
					<ArrowContainer>
						<ArrowIcon width={6} height={10} color="#D6DCEC" />
					</ArrowContainer>
				</CardHead>
				<CardText $colorMark="#EF5350">Выгрузить<br /> форматом <mark>PDF</mark></CardText>
			</Card>
			<Card>
				<CardHead>
					<ImgContainer>
						<img src={excel} alt="excel icon" />
					</ImgContainer>
					<ArrowContainer>
						<ArrowIcon width={6} height={10} color="#D6DCEC"/>
					</ArrowContainer>
				</CardHead>
				<CardText $colorMark="#33C481">Выгрузить<br /> форматом <mark>EXCEL</mark></CardText>
			</Card>
		</StatisticsContainer>
	)
}

const StatisticsContainer = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 8px;
	padding: 0 24px 24px;
`;
const Card = styled.div`
	flex: 1;
	padding: 16px;
	border-radius: 16px;
	background-color: #1F222B;
`;
const CardHead = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ImgContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background-color: #272A33;
	border-radius: 12px;
`;
const ArrowContainer = styled.button`
	width: 24px;
	height: 24px;
	background-color: #383D4C;
	border-radius: 50%;
`;
const CardText = styled.h3`
	margin-top: 8px;
	font-size: 16px;
	line-height: 20px;
	font-weight: 700;

	mark {
		color: ${({ $colorMark }) => $colorMark}
	}
`;

export default UploadStatistics
