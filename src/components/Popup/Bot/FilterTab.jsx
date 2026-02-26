import { useState } from "react";
import styled from "styled-components";


import like from "@/assets/icons/like.svg";
import robot from "@/assets/icons/robot.svg";
import gamble from "@/assets/icons/gamble.svg";
import spam from "@/assets/icons/spam.svg";
import eyeCilia from "@/assets/icons/eye-cilia.svg";
import external from "@/assets/icons/external.svg";
import MessageIcon from "@/icons/MessageIcon";
import StarIcon from "@/icons/StarIcon";
import TgSplashIcon from "@/icons/TgSplashIcon";

import Radio from "@/shared/Radio";

const showResources = [
  { code: "bots", name: "Боты", icon: <img src={robot} alt="bots" />},
  { code: "channels", name: "Каналы", icon: <TgSplashIcon width={16} height={16} colorFirst="#579AFF" colorSecond="#236EDE"/>},
  { code: "chats", name: "Чаты", icon: <MessageIcon width={16} height={16} color="#6A7080"/>},
  { code: "boosts", name: "Бусты", icon: <StarIcon width={16} height={16} colorFirst="#579AFF" colorSecond="#236EDE"/>},
  { code: "views", name: "Просмотры", icon: <img src={eyeCilia} alt="eye" />},
  { code: "external", name: "Внешние", icon: <img src={external} alt="external" />},
]
const permittedContent = [
  { code: "adult_18_plus", name: "Взрослые (18+)", icon: <img src={like} alt="adult" />},
  { code: "gambling", name: "Азарт", icon: <img src={gamble} alt="gambling" />},
  { code: "spam", name: "Спам-контент", icon: <img src={spam} alt="spam" />},
]

const FilterTab = () => {
    const [selectedRadio, setSelectedRadio] = useState('');
    return (
        <>
            <FilterTitle>Показывать ресурсы</FilterTitle>
            <RadioContainer>
                {showResources.map((item, index) => (
                        <Radio
                        key={index}
                            checked={selectedRadio.code === item.code}
                            onChange={() => setSelectedRadio(item)}
                            view="circleBG"
                        >
                            {item.icon}
                            {item.name}
                        </Radio>
                ))}
            </RadioContainer>
            <FilterTitle>Разрешенный контент</FilterTitle>
            <RadioContainer>
                {permittedContent.map((item, index) => (
                        <Radio 
                            key={index}
                            checked={selectedRadio.code === item.code}
                            onChange={() => setSelectedRadio(item)}
                            view="circleBG"
                        >
                            {item.icon}
                            {item.name}
                        </Radio>
                ))}
            </RadioContainer>

        </>
    )
}
const FilterTitle = styled.h2`
    margin-top: 32px;
    font-size: 18px;
    margin-bottom: 24px;
`
const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export default FilterTab