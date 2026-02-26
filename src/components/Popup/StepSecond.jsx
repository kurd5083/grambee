import { useState } from "react"
import styled from 'styled-components';

import ArrowIcon from "@/icons/ArrowIcon";
import EditIcon from "@/icons/EditIcon";

import { GapBlock } from "@/shared/GapBlock";
import InputField from "@/shared/InputField";
import Button from "@/shared/Button";

import { ContainerPadding } from "@/shared/ContainerPadding";

import { usePopupStore } from "@/store/popupStore";

const StepSecond = () => {
  const { goBack } = usePopupStore()
  const [channelsCount, setChannelsCount] = useState("")
  const [channelsButtonText, setChannelsButtonText] = useState("")
  const [viewsButtonText, setViewsButtonText] = useState("")
  const [boostButtonText, setBoostButtonText] = useState("")
  const [chatsButtonText, setChatsButtonText] = useState("")

  return (
    <>
      <ContainerPadding>
        <GapBlock gap="16px">
        <InputField
          id="numberChannels"
          label="Кол-во каналов"
          placeholder="Введите текст"
          value={channelsCount}
          onChange={(e) => setChannelsCount(e.target.value)}
          iconRight={<ArrowContainer>
            <ArrowIcon width={6} height={10} color="currentColor" />
            <ArrowIcon width={6} height={10} color="currentColor" />
          </ArrowContainer>}
        />
        <InputField
          id="numberChannels"
          label="Текст кнопки каналов"
          placeholder="Введите текст"
          value={channelsButtonText}
          onChange={(e) => setChannelsButtonText(e.target.value)}
          iconRight={<EditIcon width={16} height={16} color="currentColor" />}
        />
        <InputField
          id="numberChannels"
          label="Текст кнопки просмотров поста"
          placeholder="Введите текст"
          value={viewsButtonText}
          onChange={(e) => setViewsButtonText(e.target.value)}
          iconRight={<EditIcon width={16} height={16} color="currentColor" />}
        />
        <InputField
          id="numberChannels"
          label="Текст кнопки буста"
          placeholder="Введите текст"
          value={boostButtonText}
          onChange={(e) => setBoostButtonText(e.target.value)}
          iconRight={<EditIcon width={16} height={16} color="currentColor" />}
        />
        <InputField
          id="numberChannels"
          label="Текст кнопки чатов"
          placeholder="Введите текст"
          value={chatsButtonText}
          onChange={(e) => setChatsButtonText(e.target.value)}
          iconRight={<EditIcon width={16} height={16} color="currentColor" />}
        />
        </GapBlock>
      </ContainerPadding>
      <Buttons>
        <Button variant="default" onClick={() => goBack()}>Назад</Button>
        <Button variant="primary">Сохранить</Button>
      </Buttons>
    </>
  )
}
const ArrowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    color: #6A7080;
    flex: 1;
    
    svg {
        cursor: pointer;
        &:hover {
            color: #D6DCEC;
        }
    }

    &>svg:first-child {
        transform: rotate(-90deg);
    }

    &>svg:last-child {
        transform: rotate(90deg);
    }
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  padding: 0 24px 24px;
`

export default StepSecond