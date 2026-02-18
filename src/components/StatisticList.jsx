import styled from 'styled-components';

const StatisticList = () => {
    return (
        <StatisticContainer>
            <StatisticItem>
                <mark>32.2 ₽</mark>
                <p>Стоимость ресурса</p>
            </StatisticItem>
            <StatisticItem>
                <mark>Без проверки</mark>
                <p>Дневной лимит</p>
            </StatisticItem>
            <StatisticItem>
                <mark>Без проверки</mark>
                <p>Тип проверки</p>
            </StatisticItem>
            <StatisticItem>
                <mark>3 дня</mark>
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