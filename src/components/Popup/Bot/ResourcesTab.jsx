import styled from "styled-components";

import Button from "@/shared/Button";

import TrafficHead from "@/components/MotivatedTraffic/TrafficHead";
import Traffic from "@/components/MotivatedTraffic/Traffic";

const ResourcesTab = () => {
  return (
    <div>
      <TrafficHead type="resources" />
      <Traffic
        type="resources"
        // traffic={bots} 
        // loading={botsLoading} 
        title='Упс! Кажется, у вас еще нет ресурсов:('
        text='Подключайте любые ресурсы Telegram, а также внешние источники — и покупайте трафик на выгодных условиях!'
      />
      <ButtonSaveContainer onClick={() => handleSave()}>
        <Button variant="primary"><mark>Добавить ресурс</mark></Button>
      </ButtonSaveContainer>
    </div>
  )
}

const ButtonSaveContainer = styled.div`
  margin-top: 32px;
  width: 100%;
`

export default ResourcesTab
