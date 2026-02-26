import styled from "styled-components";

const InputField = ({ id, label, labelIcon, status, value, onChange, icon, iconRight, inputAction, ...inputProps }) => {
  return (
    <Container>
      {label && (
        <TextBlock>
          <Label htmlFor={id}>{label}{labelIcon &&<img src={labelIcon}/>}</Label>
          {status && <Status>{status}</Status>}
        </TextBlock>
      )}
      <InputContainer>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <Input id={id} {...inputProps} hasIconLeft={!!icon} hasIconRight={!!iconRight} value={value} onChange={onChange}/>
        {iconRight && <IconWrapperRight>{iconRight}</IconWrapperRight>}
        {inputAction && <TextWrapper><mark>{inputAction}</mark></TextWrapper>}
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
`;
const TextBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
`;
const Status = styled.p`
  font-size: 12px;
  color: #6a7080;
`;
const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  padding: 20px 24px;
  padding-left: ${({ hasIconLeft }) => (hasIconLeft ? "56px" : "24px")};
  padding-right: ${({ hasIconRight }) => (hasIconRight ? "44px" : "24px")};
  border-radius: 14px;
  border: 1px solid #272a33;
  background: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #d6dcec;
  transition: 0.2s;

  &::placeholder {
    color: #6a7080cc;
  }

  &:focus {
    outline: none;
    border-color: #ffb81a;
  }

  &:hover {
    border-color: #ffd26d;
  }
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;

  pointer-events: none;
`;
const IconWrapperRight = styled.div`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;
  cursor: pointer;
  color: #6A7080;

  &:hover {
    color: #D6DCEC;
  }
`;
const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  font-size: 14px;
`;

export default InputField;