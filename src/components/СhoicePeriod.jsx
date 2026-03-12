import styled from 'styled-components';

import channel_ava from '@/assets/channel-ava.png';
import SpeakerIcon from "@/icons/SpeakerIcon";

import CustomSelect from "@/shared/CustomSelect";

const СhoicePeriod = ({ name, period, onChange }) => {
    return (
        <PeriodContainer>
            <PeriodChannel>
                {/* <ChannelIcon src={channel_ava} alt="ava icon" /> */}
                <ItemDefoultAva>
                    <SpeakerIcon width={18} height={16} color="#6A7080CC" />
                </ItemDefoultAva>
                <h3>{name}</h3>
            </PeriodChannel>
            <CustomSelect
                placeholder="Период"
                options={[
                    { value: "all", label: "Все время" },
                    { value: "24h", label: "За 24 часа" },
                    { value: "week", label: "За неделю" },
                    { value: "month", label: "За месяц" },
                ]}
                value={period}
                onChange={onChange}
                width="150px"
            />
        </PeriodContainer>
    )
}
const PeriodContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

`
const PeriodChannel = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex-grow: 1;
`
const ChannelIcon = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 12px;
`
const ItemDefoultAva = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #333845;
`

export default СhoicePeriod
