import styled from 'styled-components';

import СhoicePeriod from "@/components/СhoicePeriod";
import MainIndicators from "@/components/MainIndicators";
import { ContainerPadding } from "@/shared/ContainerPadding";
import Chart from '@/components/Chart';

const Statistics = () => {
  return (
    <StatisticsContainer>
      <ContainerPadding>
        <СhoicePeriod/>
      </ContainerPadding>
      <Chart/>
      <ContainerPadding>
        <MainIndicators/>
      </ContainerPadding>
    </StatisticsContainer>
  )
}

const StatisticsContainer = styled.div`
  padding-bottom: 24px;
`
export default Statistics
