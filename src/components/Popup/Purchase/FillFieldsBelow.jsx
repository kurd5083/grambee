import { useState } from "react";
import styled from "styled-components";

import question from "@/assets/icons/question.svg";

import InputField from "@/shared/InputField";
import Radio from "@/shared/Radio";
import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";
import { GapContainer } from "@/shared/GapContainer";

import useInviteLinkResolve from "@/hooks/api/Resource/useInviteLinkResolve";

import { usePopupStore } from "@/store/popupStore";
import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";

import { checkBotAdmin } from "@/api/Resource/checkBotAdmin";

const FillFieldsBelow = () => {
	const [checkingTask, setCheckingTask] = useState(false)
	const { receipt, setInviteLink, setName, setUsername, setChannelId, setCheckerBotToken, setMaintainBoosts } = useReceiptStore();

	const { openPopup, goBack } = usePopupStore()
	const { showToast } = useToastStore();
	const { inviteLink } = useInviteLinkResolve()

	const handleNext = () => {
		if (!receipt.inviteLink) return showToast("Введите ссылку на канал", "error");
		if (!receipt.inviteLink.includes('t.me/')) return showToast("Ссылка должна содержать t.me/", "error");

		inviteLink({ inviteLink: receipt.inviteLink }, {
			onSuccess: (response) => {
				setName(response.title)
				setUsername(response.username)
				setChannelId(response.channelId)

				if (!receipt.checkerBotToken) return showToast("Введите токен бота", "error");

				checkBotAdmin({ botToken: receipt.checkerBotToken, channelId: response.channelId })
					.then((adminResponse) => {
						if (!adminResponse?.isAdmin) return showToast(adminResponse?.message || "Бот не является администратором канала", "error");
						openPopup('basic-information', 'Основная информация', { step: 4, text: 'Укажите параметры для настройки трафика' })
					})
					.catch((error) => {
						return showToast(error?.message || "Ошибка при проверке бота", "error");
					})
			},
			onError: (error) => {
				showToast(error?.message || "Не удалось резолвить публичную ссылку", "error");
			}
		})
	}

	return (
		<>
			<ContainerPadding>
				<GapContainer gap="32px">
					<InputField
						id="boostLink"
						label="Буст-ссылка"
						placeholder="htttps://t.me/..."
						value={receipt.inviteLink}
						onChange={(e) => setInviteLink(e.target.value)}
						labelIcon={question}
					/>
					<Radio
						checked={checkingTask === true}
						onChange={() => setCheckingTask(!checkingTask)}
						text="Если включено, бот будет проверять выполнение задания перед проверкой"
						view="circleTextMoreNoBG">
						Проверять выполнение задания
					</Radio>
					<InputField
						id="token"
						label="Введите токен вашего бота"
						placeholder="1245231521:AAHwPlf1t3mzjwx8uhlFXojD2lmpr021..."
						value={receipt.checkerBotToken}
						onChange={(e) => setCheckerBotToken(e.target.value)}
						// status={<mark>Инструкция</mark>}
					/>
					<Radio
						checked={receipt.maintainBoosts === true}
						onChange={() => setMaintainBoosts(!receipt.maintainBoosts)}
						text="Выключено: сервис обеспечит указанное количество бустов без ежедневной гарантии"
						view="circleTextMoreNoBG"
					>
						Поддержка бустов
					</Radio>
				</GapContainer>
			</ContainerPadding>
			<Buttons>
				<Button variant="default" onClick={() => goBack()}>Назад</Button>
				<Button variant="primary" onClick={() => handleNext()}>Далее</Button>
			</Buttons>
		</>
	)
}

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 0 24px 24px;
`

export default FillFieldsBelow