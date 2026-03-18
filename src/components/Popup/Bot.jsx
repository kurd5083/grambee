import { useState, useEffect } from "react";
import styled from "styled-components";

import TabsNav from "@/components/TabsNav";
import GeneralTab from "@/components/Popup/Bot/GeneralTab";
import ContentTab from "@/components/Popup/Bot/ContentTab";
import ResourcesTab from "@/components/Popup/Bot/ResourcesTab";
import FilterTab from "@/components/Popup/Bot/FilterTab";

import { useBotStore } from "@/store/botStore";

const tabs = [
  { label: "Общая", value: "general" },
  { label: "Контент", value: "content" },
  { label: "Ресурсы", value: "resources" },
  { label: "Фильтры", value: "filters" },
];

const Bot = () => {
  const [activeTab, setActiveTav] = useState('general')
  
  const { resetBot } = useBotStore()

  useEffect(() => {
    return () => resetBot()
  }, [])

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
      </BotContainer>
    </>
  )
}
const BotContainer = styled.div`
  padding: 0 24px 24px;
`

export default Bot