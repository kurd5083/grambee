import styled from "styled-components";

const ToggleSwitch = ({checked, onChange, children}) => {
  return (
    <SwitchContainer>
      <SwitchChildren>
        {children}
      </SwitchChildren>
      <SwitchLabel>
        <SwitchInput 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <Slider />
      </SwitchLabel>
    </SwitchContainer>
  )
}

const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;
const SwitchChildren = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SwitchLabel = styled.label`
  position: relative;
  width: 72px;
  height: 40px;
`;
const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span::before {
    transform: translateX(36px);
  }
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #272A33;
  transition: 0.4s;
  border-radius: 12px;

  &::before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 10px;
    top: 12px;
    background: radial-gradient(circle at center, #FFD26D, #FFB81A);
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export default ToggleSwitch