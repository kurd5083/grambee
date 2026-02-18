import styled from "styled-components";

const InfoRow = ({
  label,
  labelIcon,
  value,
  actionIcon,
  actionText
}) => {
  return (
    <Container>
      <Label>
        {labelIcon && <img src={labelIcon} />}
        {label}
      </Label>

      <Value>{value}</Value>

      {actionIcon && <IconWrapper>{actionIcon}</IconWrapper>}
      {actionText && <TextWrapper>{actionText}</TextWrapper>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  border: 1px solid #272A33;
  border-radius: 14px;
  padding: 20px 24px;
`;

const Label = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
`;
const Value = styled.p`
  flex-grow: 1;
  text-align: right;
  font-size: 14px;
  color: #6A7080CC;
`;

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
const TextWrapper = styled.div`
  font-size: 14px;
  color: #6A7080CC;
  cursor: pointer;
`;

export default InfoRow;