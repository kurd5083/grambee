import { useState } from "react";
import styled from "styled-components";

import Button from "@/shared/Button";

import TabsNav from "@/components/TabsNav";
import GeneralTab from "@/components/Popup/Bot/GeneralTab";
import ContentTab from "@/components/Popup/Bot/ContentTab";
import ResourcesTab from "@/components/Popup/Bot/ResourcesTab";
import FilterTab from "@/components/Popup/Bot/FilterTab";

const tabs = [
  { label: "Общая", value: "general" },
  { label: "Контент", value: "content" },
  { label: "Ресурсы", value: "resources" },
  { label: "Фильтры", value: "filters" },
];

const Bot = () => {
  const [activeTab, setActiveTav] = useState('general')
  
  return (
    <>
      <TabsNav
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTav}
        itemWidth="72px"
        containerGap="24px"
        textAlign="left"
      />
      <BotContainer>
        {activeTab == 'general' ? (
          <GeneralTab/>
        ) : activeTab == 'content' ? (
          <ContentTab/>
        ) : activeTab == 'resources' ? (
          <ResourcesTab/>
        ) : activeTab == 'filters' && (
          <FilterTab/>
        )}
        
        <ButtonSaveContainer>
          <Button variant="primary"><mark>Сохранить</mark></Button>
        </ButtonSaveContainer>
      </BotContainer>
    </>
  )
}
const BotContainer = styled.div`
  padding: 0 24px 24px;
`
const ButtonSaveContainer = styled.div`
  margin-top: 32px;
  width: 100%;
`

export default Bot
