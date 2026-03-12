import styled from "styled-components"

import SpeakerIcon from "@/icons/SpeakerIcon";
import CustomSelect from "@/shared/CustomSelect";
import Button from "@/shared/Button";
import { usePopupStore } from "@/store/popupStore";

const TrafficFilter = ({ type, filter, onChange }) => {
    const { openPopup } = usePopupStore()

    return (
        <TrafficBuy>
            <CustomSelect
                placeholder="Каналы"
                options={[
                    { value: "all", label: "Все" },
                    { value: "channels", label: "Каналы" },
                    { value: "bots", label: "Боты" },
                    { value: "chats", label: "Чаты" },
                ]}
                value={filter}
                onChange={onChange}
                icon={<SpeakerIcon width={16} height={15} color="#D6DCEC" />}
            />
            <Button
                width="170px"
                onClick={() =>
                    type === 'home'
                        ? openPopup(
                            'create-resources-first',
                            'Создание ресурса',
                            { step: 1, text: 'Укажите основные данные вашего ресурса' }
                        )
                        : openPopup(
                            'step-first',
                            'Создание бота',
                            { step: 1 }
                        )
                }
            >
                {type === 'home' ? 'Купить' : 'Продать'} трафик
            </Button>
        </TrafficBuy>
    )
}

const TrafficBuy = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 30px;
`

export default TrafficFilter