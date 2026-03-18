import styled from 'styled-components';

const StatisticList = ({price, dayLimit, verificationEnabled, timeRemaining, timeRemainingLoading }) => {
    return (
        <StatisticContainer>
            <StatisticItem>
                <mark>{price} ₽</mark>
                <p>Стоимость ресурса</p>
            </StatisticItem>
            <StatisticItem>
                <mark>{dayLimit}</mark>
                <p>Дневной лимит</p>
            </StatisticItem>
            <StatisticItem>
                <mark>{verificationEnabled ? 'С проверкой' : 'Без проверки'}</mark>
                <p>Тип проверки</p>
            </StatisticItem>
            <StatisticItem>
                {/* <mark>{timeRemainingLoading ? '0' : timeRemaining?.timeRemaining ? timeRemaining.timeRemaining : 'Недоступно'}</mark> */}
                <p>Осталось времени</p>
            </StatisticItem>
        </StatisticContainer>
    )
}

const StatisticContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 8px;
`
const StatisticItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 16px;
  background-color: #272A33;
  padding: 16px;

  p {
    font-size: 14px;
    font-weight: 700;
  }
`

export default StatisticList