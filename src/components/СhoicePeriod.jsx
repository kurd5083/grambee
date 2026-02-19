import styled from 'styled-components';

import channel_ava from '@/assets/channel-ava.png';

import CustomSelect from "@/shared/CustomSelect";

const СhoicePeriod = () => {
    return (
        <PeriodContainer>
            <PeriodChannel>
                <ChannelIcon src={channel_ava} alt="ava icon" />

                <h3>Digital Design</h3>
            </PeriodChannel>
            <CustomSelect
                placeholder="Период"
                options={[
                    { value: "all", label: "Все время" },
                    { value: "24h", label: "За 24 часа" },
                    { value: "week", label: "За неделю" },
                    { value: "month", label: "За месяц" },
                ]}
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

export default СhoicePeriod
