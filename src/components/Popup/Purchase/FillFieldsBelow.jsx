import { useState } from "react";
import styled from "styled-components";

import question from "@/assets/icons/question.svg";

import InputField from "@/shared/InputField";
import Radio from "@/shared/Radio";
import Button from "@/shared/Button";
import { ContainerPadding } from "@/shared/ContainerPadding";
import { GapContainer } from "@/shared/GapContainer";

import { usePopupStore } from "@/store/popupStore";

const FillFieldsBelow = () => {
	const [boostLink, setBoostLink] = useState('')
	const [token, setToken] = useState('')
	const [checkingTask, setCheckingTask] = useState(false)
	const [boostSupport, setBoostSupport] = useState(false)
	const { openPopup, goBack } = usePopupStore()

	return (
		<>
			<ContainerPadding>
				<GapContainer gap="32px">
					<InputField
						id="boostLink"
						label="Буст-ссылка"
						placeholder="htttps://t.me/..."
						value={boostLink}
						onChange={(e) => setBoostLink(e.target.value)}
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
						value={token}
						onChange={(e) => setToken(e.target.value)}
						status={<mark>Инструкция</mark>}
					/>
					<Radio
						checked={boostSupport === true}
						onChange={() => setBoostSupport(!boostSupport)}
						text="Выключено: сервис обеспечит указанное количество бустов без ежедневной гарантии"
						view="circleTextMoreNoBG"
					>
						Поддержка бустов
					</Radio>
				</GapContainer>
			</ContainerPadding>
			<Buttons>
				<Button variant="default" onClick={() => goBack()}>Назад</Button>
				<Button variant="primary"
					onClick={() => {
						openPopup('basic-information', 'Основная информация', { step: 4, text: 'Укажите параметры для настройки трафика' })
					}}
				>Далее</Button>
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