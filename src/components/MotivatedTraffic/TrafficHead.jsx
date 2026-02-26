import styled from "styled-components"

import fire from '@/assets/icons/fire.svg';
import refresh from '@/assets/icons/refresh.svg';
import ArchiveIcon from "@/icons/ArchiveIcon";

const TrafficHead = ({ type }) => {
    return (
        <TrafficHeadContainer>
            {type !== 'resources' && <Icon src={fire} alt="fire icon" />}
            <HeadTitle>{type == 'resources' ? 'Собственные ресурсы' : 'Мотивированный трафик'}</HeadTitle>
            <IconContainer>
                <ArchiveIcon width={22} height={16} colorFirst="currentColor" colorSecond="currentColor" uniqueId={type}/>
            </IconContainer>
            {type !== 'resources' && <ResetImg src={refresh} alt="refresh icon" />}
        </TrafficHeadContainer>
    )
}

const TrafficHeadContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 30px;
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
const IconContainer = styled.div`
  margin-left: 16px;
  cursor: pointer;
  color: #6A7080;
  &:hover {
    color: #FFB81A;
  }
`
const ResetImg = styled.img`
  margin-left: 16px;
  cursor: pointer;
`

export default TrafficHead