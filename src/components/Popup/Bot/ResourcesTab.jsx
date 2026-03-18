import { useState } from "react";
import styled from "styled-components";

import Button from "@/shared/Button";

import TrafficHead from "@/components/MotivatedTraffic/TrafficHead";
import Traffic from "@/components/MotivatedTraffic/Traffic";

import useGetResources from '@/hooks/api/Resource/useGetResources';

import { useUserStore } from '@/store/userStore';
import { useBotStore } from "@/store/botStore";
import { usePopupStore } from "@/store/popupStore";
    
const ResourcesTab = () => {
  const [stateStatus, setStateStatus] = useState(false)
  const { userLocal } = useUserStore()
  const { openPopup } = usePopupStore()

  const { resources, resourcesLoading, refetch } = useGetResources({ userTelegramId: userLocal?.telegramId })

  const { bot } = useBotStore();

  const isLoading = !userLocal || resourcesLoading

  return (
    <div>
      <TrafficHead type="resources" status={stateStatus} onClickArchive={() => setStateStatus(!stateStatus)} />
      <Traffic
        type="resources"
        traffic={resources}
        loading={isLoading}
        title='Упс! Кажется, у вас еще нет ресурсов:('
        text='Подключайте любые ресурсы Telegram, а также внешние источники — и покупайте трафик на выгодных условиях!'
        status={stateStatus}
        apiToken={bot.apiToken}
      />
      <ButtonSaveContainer 
        onClick={() => openPopup(
          'create-resources-first', 'Создание ресурса', { step: 1, text: 'Укажите основные данные вашего ресурса' }
        )}
      >
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
