import styled from "styled-components";
import rating from "@/assets/rating.svg";
import PlusIcon from "@/icons/PlusIcon";
import MinusIcon from "@/icons/MinusIcon";

const MainIndicators = () => {
  return (
    <>
      <Header>
        <img src={rating} alt="rating icon" />
        <h2>Главные показатели</h2>
      </Header>

      <IndicatorsList>
        <IndicatorCard>
          <Value>642</Value>
          <IndicatorInfo>
            <IconWrapper>
              <PlusIcon  width={16} height={16} colorFirst = "#FFD26D" colorSecond = "#FFB81A"/>
            </IconWrapper>
            <Label><mark>Подписки</mark><br/>за период</Label>
          </IndicatorInfo>
        </IndicatorCard>
        <IndicatorCard>
          <Value>48</Value>
          <IndicatorInfo>
            <IconWrapper>
              <MinusIcon width={16} height={2} colorFirst = "#FFD26D" colorSecond = "#FFB81A"/>
            </IconWrapper>
            <Label><mark>Отписки</mark><br/>за период</Label>
          </IndicatorInfo>
        </IndicatorCard>
      </IndicatorsList>
    </>
  );
};

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    margin-top: 32px;

    h2 {
        font-size: 20px;
    }
`;
const IndicatorsList = styled.div`
    display: flex;
    gap: 8px;
`;
const IndicatorCard = styled.div`
    flex: 1;
    background: #1F222B;
    padding: 16px;
    border-radius: 16px;
`;
const Value = styled.h3`
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 10px;
    text-align: left;
`;
const IndicatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #383D4C;
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;
const Label = styled.p`
    font-size: 16px;
    font-weight: 700;
`;

export default MainIndicators;