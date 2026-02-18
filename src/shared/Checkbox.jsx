import styled from "styled-components";

const Checkbox = ({ checked, onChange, children }) => {
  return (
    <CheckboxContainer onClick={onChange}>
      <HiddenCheckbox type="checkbox" $checked={checked} readOnly />
      <StyledCheckbox $checked={checked}/>
      {children}
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
  pointer-events: none;
`;

const StyledCheckbox = styled.div`
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid #272A33;
  background-color: ${({$checked}) => $checked ? "#272A33" : "transporent"};
  border-radius: 12px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: "";
    width: 16px;
    height: 16px;
    background: radial-gradient(circle at center, #FFD26D, #FFB81A);
    border-radius: 50%;
    display: ${({$checked}) => $checked ? "block" : "none"};
  }
`;

export default Checkbox;
