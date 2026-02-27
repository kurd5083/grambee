import styled from "styled-components";


import internet from '@/assets/icons/internet.svg';
import fire from '@/assets/icons/fire.svg';
import TgSplashIcon from "@/icons/TgSplashIcon";
import HeadphonesIcon from "@/icons/HeadphonesIcon";
import FileIcon from "@/icons/FileIcon";
import ArrowIcon from "@/icons/ArrowIcon";

import OptionCard from "@/components/OptionCard";
import ChatBot from "@/components/ChatBot";

const Account = () => {
    return (
        <AccountContainer>
            <ChatBot/>
            <OptionContainer>
                <OptionCard
                    title="Связаться с техподдержкой"
                    icon={<HeadphonesIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />}
                    bgIcon={
                        <HeadphonesIcon width={90} height={90} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg" />
                    }
                    direction="vertical"
                    right="33px"
                    margin={8}
                    onClick={() => window.open('https://t.me/ASSISTGB', "_blank")}
                />
                <OptionCard
                    title="Подписаться на нас"
                    icon={<TgSplashIcon width={16} height={13} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />}
                    bgIcon={
                        <TgSplashIcon width={119} height={90} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg" />
                    }
                    direction="vertical"
                    margin={8}
                    right="23px"
                    bottom="-10px"
                />
            </OptionContainer>
            <AdditionallyHead>
                <Icon src={fire} alt="fire icon" />
                <HeadTitle>Дополнительно</HeadTitle>
            </AdditionallyHead>
            <AdditionallyList>
                <li>
                    <ImgContainer><img src={internet} alt="internet"/></ImgContainer>
                    <h3>Наш веб-сайт</h3>
                    <ArrowContainer >
                        <ArrowIcon width={6} height={10} color="#D6DCEC" />
                    </ArrowContainer>
                </li>
                <li>
                    <ImgContainer><FileIcon width={13} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" /></ImgContainer>
                    <h3 onClick={() => window.open("https://docs.grambee.net/", "_blank")}>Документация</h3>
                    <ArrowContainer onClick={() => window.open("https://docs.grambee.net/", "_blank")}>
                        <ArrowIcon width={6} height={10} color="#D6DCEC" />
                    </ArrowContainer>
                </li>
            </AdditionallyList>
        </AccountContainer>
    )
}


const AccountContainer = styled.div`
    padding: 0 24px;
`
const OptionContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 24px;

    @media(max-width: 400px) {
        flex-direction: column;
    }
`
const AdditionallyHead = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`
const Icon = styled.img`
  margin-right: 16px;
`
const HeadTitle = styled.h3`
  font-size: 20px;
  line-height: 22px;
  flex-grow: 1;
`
const AdditionallyList = styled.ul`
	display: flex;
	flex-direction: column;
	margin-top: 24px;
	gap: 24px;
	max-height: 150px;
	overflow-y: auto;
	scrollbar-width: none;
	padding-bottom: 24px;

	li {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-bottom: 24px;
		border-bottom: 1px solid #30343F;

		h3 {
			font-size: 16px;
            flex-grow: 1;
            cursor: pointer;
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
const ArrowContainer = styled.button`
    width: 32px;
    height: 32px;
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid #272A33;
    cursor: pointer;
`;

export default Account