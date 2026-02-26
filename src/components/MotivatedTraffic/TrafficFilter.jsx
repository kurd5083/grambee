import styled from "styled-components"

import SpeakerIcon from "@/icons/SpeakerIcon";
import CustomSelect from "@/shared/CustomSelect";
import Button from "@/shared/Button";
import { usePopupStore } from "@/store/popupStore";

const TrafficFilter = ({ type }) => {
    const { openPopup } = usePopupStore()

    return (
        <TrafficBuy>
            <CustomSelect
                placeholder="Каналы"
                options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                ]}
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