import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import ArrowIcon from "@/icons/ArrowIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";

const CustomSelect = ({ options = [], value, onChange, placeholder = "Выберите значение", icon, width }) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const toggle = () => setOpen(prev => !prev);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectWrapper ref={selectRef} $width={width}>
      <SelectHeader onClick={toggle}>
        {icon && (<SpeakerIcon width={16} height={15} color="#D6DCEC"/>)}
        <SelectText>{selectedOption?.label || placeholder}</SelectText>
        <HeaderArrow className={open ? "open" : ""}>
          <ArrowIcon width = "8" height = "14" color="#FFB81A" />
        </HeaderArrow>
      </SelectHeader>
      {open && (
        <SelectList>
          {options?.map((opt) => (
            <SelectItem
              key={opt.value}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectList>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  position: relative;
  font-weight: 700;
  
  ${({$width}) => $width ? `
    width: ${$width};
  ` : `
    flex: 1;
  `}
`;
const SelectHeader = styled.div`
  box-sizing: border-box;
  border: 1px solid #272A33;
  border-radius: 12px;
  padding: 18px 24px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
`;
const SelectText = styled.div`
  color: #d6dcec;
  font-size: 14px;
  flex-grow: 1;
`;
const HeaderArrow = styled.div`
  transition: transform 0.2s ease;
  transform: rotate(90deg);

  &.open {
    transform: rotate(270deg);
  }
`;
const SelectList = styled.ul`
  box-sizing: border-box;
  position: absolute;
  top: calc(100% + 4px);
  min-width: fit-content;
  left: 0;
  width: 100%;
  background: #272A33;
  border-radius: 16px;
  z-index: 20;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SelectItem = styled.li`
  padding: 16px 24px;
  cursor: pointer;
  color: #d6dcec;
  font-size: 14px;
  border-bottom: 1px solid #30343F;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: #1F222B;
  }
`;

export default CustomSelect;