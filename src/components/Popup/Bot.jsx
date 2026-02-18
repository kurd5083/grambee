import { useState } from "react";
import styled from "styled-components";

import Button from "@/shared/Button";

import TabsNav from "@/components/TabsNav";
import GeneralTab from "@/components/popup/Bot/GeneralTab";
import ContentTab from "@/components/popup/Bot/ContentTab";

const tabs = [
  { label: "Общая", value: "general" },
  { label: "Контент", value: "content" },
  { label: "Ресурсы", value: "resources" },
  { label: "Фильтры", value: "filters" },
];

const Bot = () => {
  const [activeTab, setActiveTav] = useState('general')
  
  return (
    <BotContainer>
      <TabsNav
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTav}
        itemWidth="72px"
        containerGap="24px"
        textAlign="left"
      />
      {activeTab == 'general' ? (
        <GeneralTab/>
      ) : (
        <ContentTab/>
      )}
      
      <ButtonSaveContainer>
        <Button variant="primary"><mark>Сохранить</mark></Button>
      </ButtonSaveContainer>
    </BotContainer>
  )
}
const BotContainer = styled.div`
  padding: 0 24px 24px;
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: none;
`
const ButtonSaveContainer = styled.button`
  margin-top: 32px;
  width: 100%;
`

export default Bot
