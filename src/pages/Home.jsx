import { useState } from 'react';
import letter from '@/assets/icons/letter.svg';

import { ContainerPadding } from '@/shared/ContainerPadding';

import BannerSlider from "@/components/BannerSlider";
import TrafficHead from "@/components/MotivatedTraffic/TrafficHead";
import TrafficFilter from "@/components/MotivatedTraffic/TrafficFilter";
import Traffic from "@/components/MotivatedTraffic/Traffic";
import TabMenu from "@/components/TabMenu";

import useGetResources from '@/hooks/api/Resource/useGetResources';

import { useUserStore } from '@/store/userStore';

const tabs = [
  {
    label: "Трафик",
    onClick: () => openPopup('create-resources-first', 'Создание ресурса', { step: 1, text: 'Укажите основные данные вашего ресурса' })
  },
  {
    label: "Рассылки",
    icon: letter
  },
  {
    label: "Показы",
    onClick: () => openPopup('choosing-type-traffic', 'Поделиться ресурсами', { text: 'Отправляйте список ваших ресурсов клиентам\n для привлечения дополнительного заработка\n\n Выберите тип трафика и поделитесь ссылкой' })
  }
];

const Home = () => {
  const [stateStatus, setStateStatus] = useState(false);
  const [filter, setFilter] = useState('all');
  const { userLocal } = useUserStore()
  const { resources, resourcesLoading, refetch } = useGetResources({ userTelegramId: userLocal?.telegramId })

  return (
    <div>
      <BannerSlider />
      {/* <TabMenu tabs={tabs} /> */}
      <ContainerPadding>
        <TrafficHead type="home" status={stateStatus} onClickArchive={() => setStateStatus(!stateStatus)} onClickReset={() => refetch()}/>
        <TrafficFilter type="home" filter={filter} onChange={setFilter}/>
        <Traffic
          type="home"
          traffic={resources} 
          loading={resourcesLoading} 
          title='Упс! Кажется, у вас еще нет ресурсов:('
          text='Подключайте любые ресурсы Telegram, а также внешние источники — и покупайте трафик на выгодных условиях!'
          status={stateStatus}
          filter={filter}
        />
      </ContainerPadding>
    </div>
  )
}

export default Home