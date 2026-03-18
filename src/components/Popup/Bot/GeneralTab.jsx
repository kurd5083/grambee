import styled from "styled-components";

import question from "@/assets/icons/question.svg";
import CopyIcon from '@/icons/CopyIcon';

import InfoRow from "@/shared/InfoRow";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import ToggleSwitch from "@/shared/ToggleSwitch";
import { GapContainer } from "@/shared/GapContainer";

import useUpdateBot from "@/hooks/api/Bots/useUpdateBot";
import useUpdateLeave from "@/hooks/api/Bots/useUpdateLeave";
import useDeleteBot from "@/hooks/api/Bots/useDeleteBot";
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import useRegenerateApiKey from "@/hooks/api/Bots/useRegenerateApiKey";
import useUpdateApiLinksOnly from "@/hooks/api/Bots/useUpdateApiLinksOnly";

import { useBotStore } from "@/store/botStore";
import { usePopupStore } from "@/store/popupStore";
import { useToastStore } from "@/store/toastStore";

const GeneralTab = () => {
    const { popup, openPopup, closePopup } = usePopupStore()

    const { bot, setIsActive, setToken, setLeaveWebHookUrl, setApiLinksOnly } = useBotStore();
    
    const { copied, copyToClipboard } = useCopyToClipboard();
    const { renewBot } = useUpdateBot({ id: popup.data.botId });
    const { renewLeave } = useUpdateLeave({ botId: popup.data.botId })
    const { removeBot } = useDeleteBot();
    const { regenerateApi } = useRegenerateApiKey();
    const { renewApiLinks } = useUpdateApiLinksOnly({ id: popup.data.botId });

    const { showToast } = useToastStore();

    const handleNewKey = () => {
        openPopup('confirmation', 'Выпустить новый ключ доступа',
            {
                text: `Вы уверены, что хотите выпустить новый ключ доступа?\nСтарый ключ будет недействителен.\nЭто действие нельзя будет отменить.`,
                onConfirm: () => {
                    regenerateApi({ id: bot.id }, {
                        onSuccess: () => {
                            showToast("Новый ключ успешно выпущен!", "success");
                        },
                        onError: (error) => {
                            showToast(error?.message || "Ошибка при перевыпуске ключа", "error");
                        }
                    });
                },
                buttonConfirm: { text: 'Выпустить', type: "primary" }
            }
        )
    }

    const handleSave = () => {
        renewBot({
            token: bot.token,
            isActive: bot.isActive,
        }, {
            onSuccess: () => {
                renewLeave({ leaveWebHookUrl: bot.leaveWebHookUrl }, {
                    onSuccess: () => {
                        renewApiLinks({ apiLinksOnly: bot.apiLinksOnly }, {
                            onSuccess: () => {
                                showToast("Бот успешно обнавлен!", "success");
                            }, 
                            onError: (error) => showToast(error?.message || "Ошибка при обнавлении бота", "error")
                        })
                    },
                    onError: (error) => showToast(error?.message || "Ошибка при обнавлении бота", "error")
                })
            },
            onError: (error) => showToast(error?.message || "Ошибка при обновлении бота", "error")
        })
    }

    const handleRemove = () => {
        openPopup('confirmation', 'Удалить бота?',
            {
                text: `Вы действительно хотите удалить бота “${bot.name}”?\nЭто действие нельзя будет отменить.`,
                onConfirm: () => {
                    removeBot({ id: bot.id }, {
                        onSuccess: () => {
                            showToast("Бот успешно удален!", "success");
                            closePopup()
                        },
                        onError: (error) => {
                            showToast(
                                error?.message || "Ошибка при удалении бота",
                                "error"
                            );
                        }
                    })
                },
                buttonConfirm: { text: 'Удалить', type: "danger" }
            }
        )

    }

    return (
        <>
            <InfoContainer>
                <InfoRow
                    label="Токен"
                    value={bot.token.slice(0, 4) + '...' + bot.token.slice(bot.token.length - 4, bot.token.length)}
                    onClick={() => copyToClipboard(bot.token)}
                    actionIcon={
                        <IconWrapper>
                            <CopyIcon
                                width={16}
                                height={16}
                                colorFirst="currentColor"
                                colorSecond="currentColor"
                                uniqueId="first"
                            />
                        </IconWrapper>
                    } />
                <InfoRow
                    label="Ключ доступа"
                    value={bot.apiToken.slice(0, 4) + '...' + bot.apiToken.slice(bot.apiToken.length - 4, bot.apiToken.length)}
                    onClick={() => copyToClipboard(bot.apiToken)}
                    actionIcon={
                        <IconWrapper>
                            <CopyIcon
                                width={16}
                                height={16}
                                colorFirst="currentColor"
                                colorSecond="currentColor"
                                uniqueId="second"
                            />
                        </IconWrapper>
                    } />
            </InfoContainer>
            <GapContainer gap="24px">
                <ToggleContainer>
                    <ToggleSwitch checked={bot.isActive} onChange={setIsActive}><p>Статус</p></ToggleSwitch>
                    <ToggleSwitch checked={bot.apiLinksOnly} onChange={setApiLinksOnly}>
                        <p>Получать только ссылки в API</p>
                        <img src={question} alt="question icon" />
                    </ToggleSwitch>
                </ToggleContainer>
                <InputField
                    id="token"
                    label="Редактирование токена"
                    placeholder="824124:AAFmByelOqKFVa3C0Y7dYKL"
                    value={bot.token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <InputField
                    id="webhook"
                    label="Webhook URL для отписок"
                    labelIcon={question}
                    placeholder="https://example.com/webhook/leaves"
                    value={bot.leaveWebHookUrl}
                    onChange={(e) => setLeaveWebHookUrl(e.target.value)}
                />
            </GapContainer>
            <Buttons>
                <Button variant="default" width="100%" onClick={() => handleNewKey()}>Выпустить новый ключ</Button>
                <Button variant="danger" width="40%" onClick={() => handleRemove()}>Удалить</Button>
            </Buttons>
            <ButtonSaveContainer onClick={() => handleSave()}>
                <Button variant="primary"><mark>Сохранить</mark></Button>
            </ButtonSaveContainer>
        </>
    )
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
`
const IconWrapper = styled.div`
  color: #383d4c;
  cursor: pointer;

  &:hover {
    color: #ffb81a;
  }
`;
const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;

  & > div:first-child  {
    padding-bottom: 16px;
    border-bottom: 1px solid #272A33;
  }
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`
const ButtonSaveContainer = styled.div`
  margin-top: 32px;
  width: 100%;
`

export default GeneralTab