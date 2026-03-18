import { useState } from "react";

import styled, { keyframes } from "styled-components"

import fire from '@/assets/icons/fire.svg';
import ArchiveIcon from "@/icons/ArchiveIcon";
import ResetIcon from "@/icons/ResetIcon";

const TrafficHead = ({ type, status, onClickArchive, onClickReset }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleResetClick = async () => {
    setIsRotating(true);
    
    if (onClickReset) {
      await onClickReset();
    }
    
    setTimeout(() => {
      setIsRotating(false);
    }, 300);
  };

  return (
    <TrafficHeadContainer>
      {type !== 'resources' && <Icon src={fire} alt="fire icon" />}
      <HeadTitle>{type == 'resources' ? 'Собственные ресурсы' : 'Мотивированный трафик'}</HeadTitle>
      <IconContainer $status={status} onClick={onClickArchive}>
        <ArchiveIcon width={22} height={16} colorFirst="currentColor" colorSecond="currentColor" uniqueId={type} />
      </IconContainer>
      {type !== 'resources' && 
        <IconContainer onClick={handleResetClick}>
          <RotatingIcon $isRotating={isRotating}>
            <ResetIcon width={20} height={20} color="currentColor"/>
          </RotatingIcon>
        </IconContainer>
      }
    </TrafficHeadContainer>
  )
}

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
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
  color:  ${({$status}) => $status ? '#FFB81A' : '#6A7080'};
  user-select: none;

  &:hover {
    color: ${({$status}) => $status ? '#FFB81A' : '#8A90A0'};
  }
  &:active {
    color: #FFB81A;
  }
`
const RotatingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  animation: ${({$isRotating}) => $isRotating ? rotateAnimation : 'none'} 0.5s ease-in-out;
  transform-origin: center center;
  
  svg {
    display: block;
    width: 100%;
    height: 100%;
    
    * {
      transform-box: fill-box;
      transform-origin: center;
    }
  }
`;

export default TrafficHead