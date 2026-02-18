import styled from "styled-components";

const TabsNav = ({ tabs, activeTab, setActiveTab, itemWidth, containerGap, textAlign }) => {
  return (
    <Nav>
      <TabList $containerGap={containerGap}>
        {tabs.map((tab) => (
          <TabItem
            key={tab.value}
            $active={activeTab === tab.value}
            $width={itemWidth}
            $textAlign={textAlign}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabList>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const TabList = styled.ul`
  display: flex;
  gap: ${({ $containerGap }) => $containerGap};
`;

const TabItem = styled.li`
  width: ${({ $width }) => $width};
  padding-bottom: 16px;
  text-align: ${({ $textAlign }) => $textAlign};
  border-bottom: 1px solid ${({ $active }) => ($active ? "#FFB81A" : "#6A7080")};
  color: ${({ $active }) => ($active ? "#D6DCEC" : "#6A7080")};
  font-weight: 700;
  cursor: pointer;
`;

export default TabsNav;