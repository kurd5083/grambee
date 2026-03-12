import styled from "styled-components";

const InfoRow = ({
  label,
  labelIcon,
  value,
  actionIcon,
  actionText,
  input,
  inputValue,
  onClick,
  onChange
}) => {
  return (
    <Container>
      <Label>
        {labelIcon && labelIcon}
        {label}
      </Label>

      {value && <Value>{value}</Value>}

      {actionIcon && <IconWrapper onClick={onClick}>{actionIcon}</IconWrapper>}
      {actionText && <TextWrapper>{actionText}</TextWrapper>}
      {input && <Input 
        type="text" 
        placeholder="текст" 
        value={inputValue}
        onChange={onChange}
      />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
const Input = styled.input`
  background-color: transparent;
  border: 0;
  width: min-content;
  flex: 1;
  text-align: right;
  color: #D6DCEC;
  
  &::placeholder {
    color: #6A7080CC;
  }
`;

export default InfoRow;