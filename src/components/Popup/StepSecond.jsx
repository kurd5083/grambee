import styled from 'styled-components';

import ArrowIcon from "@/icons/ArrowIcon";
import EditIcon from "@/icons/EditIcon";

import { GapContainer } from "@/shared/GapContainer";
import InputField from "@/shared/InputField";
import Button from "@/shared/Button";

import { ContainerPadding } from "@/shared/ContainerPadding";

import useCreateBot from "@/hooks/api/Bots/useCreateBot";

import { useToastStore } from "@/store/toastStore";
import { usePopupStore } from "@/store/popupStore";
import { useBotStore } from "@/store/botStore";

const StepSecond = () => {
  const { closePopup, goBack } = usePopupStore()
  const { bot, setRequiredChannelsCount, setChannelButtonText, setChatButtonText, setBotButtonText, setBoostButtonText } = useBotStore();

  const { addBot, isAdding } = useCreateBot();
  const { showToast } = useToastStore();

  const handleSave = () => {
    if (!bot.requiredChannelsCount) return showToast("Введите количество каналов", "error");
    if (!bot.channelButtonText) return showToast("Введите текст кнопки каналов", "error");
    if (!bot.botButtonText) return showToast("Введите текст кнопки просмотров поста", "error");
    if (!bot.boostButtonText) return showToast("Введите текст кнопки буста", "error");
    if (!bot.chatButtonText) return showToast("Введите текст кнопки частов", "error");

    addBot(bot, {
      onSuccess: () => {
        showToast("Бот успешно создан!", "success");
        closePopup()
      },
      onError: (error) => {
        showToast(
          error?.message || "Ошибка при создании бота",
          "error"
        );
      }
    })
  }

  return (
    <>
      <ContainerPadding>
        <GapContainer gap="16px">
          <InputField
            id="numberChannels"
            label="Кол-во каналов"
            placeholder="Введите текст"
            value={bot.requiredChannelsCount}
            onChange={(e) => setRequiredChannelsCount(e.target.value)}
            iconRight={<ArrowContainer>
              <ArrowIcon width={6} height={10} color="currentColor" />
              <ArrowIcon width={6} height={10} color="currentColor" />
            </ArrowContainer>}
          />
          <InputField
            id="numberChannels"
            label="Текст кнопки каналов"
            placeholder="Введите текст"
            value={bot.channelButtonText}
            onChange={(e) => setChannelButtonText(e.target.value)}
            iconRight={<EditIcon width={16} height={16} color="currentColor" />}
          />
          <InputField
            id="numberChannels"
            label="Текст кнопки просмотров поста"
            placeholder="Введите текст"
            value={bot.botButtonText}
            onChange={(e) => setBotButtonText(e.target.value)}
            iconRight={<EditIcon width={16} height={16} color="currentColor" />}
          />
          <InputField
            id="numberChannels"
            label="Текст кнопки буста"
            placeholder="Введите текст"
            value={bot.boostButtonText}
            onChange={(e) => setBoostButtonText(e.target.value)}
            iconRight={<EditIcon width={16} height={16} color="currentColor" />}
          />
          <InputField
            id="numberChannels"
            label="Текст кнопки чатов"
            placeholder="Введите текст"
            value={bot.chatButtonText}
            onChange={(e) => setChatButtonText(e.target.value)}
            iconRight={<EditIcon width={16} height={16} color="currentColor" />}
          />
        </GapContainer>
      </ContainerPadding>
      <Buttons>
        <Button variant="default" onClick={() => goBack()}>Назад</Button>
        <Button variant="primary" onClick={() => handleSave()} disabled={isAdding}>{isAdding ? 'Сохранение...' : 'Сохранить'}</Button>
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