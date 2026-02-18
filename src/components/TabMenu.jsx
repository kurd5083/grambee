import { useState } from "react";
import styled from "styled-components";

const TabMenu = ({ tabs }) => {
  const [menuId, setMenuId] = useState(0);

  return (
    <NavigationMenu>
      {tabs.map((tab, index) => (
        <MenuItem
          key={index}
          $active={menuId === index}
          onClick={() => {
            setMenuId(index);
            tab.onClick?.();
          }}
        >
          {tab.icon && <img src={tab.icon} />}
          {tab.label}
        </MenuItem>
      ))}
    </NavigationMenu>
  );
};

const NavigationMenu = styled.div`
  display: flex;
  gap: 8px;
  padding: 24px 24px 30px;

  button:nth-child(2) {
    padding: 0 16px;
  }
`;

const MenuItem = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 48px;
  background-color: #272A33;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 800 : 700)};
  border-radius: 16px;
  border: ${({ $active }) => ($active ? '1px solid #FFB81A' : 'none')};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #33363f;
  }
`;

export default TabMenu;
