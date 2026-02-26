import letter from '@/assets/icons/letter.svg';

import { ContainerPadding } from '@/shared/ContainerPadding';

import BannerSlider from "@/components/BannerSlider";
import TrafficHead from "@/components/MotivatedTraffic/TrafficHead";
import TrafficFilter from "@/components/MotivatedTraffic/TrafficFilter";
import Traffic from "@/components/MotivatedTraffic/Traffic";
import TabMenu from "@/components/TabMenu";

import { usePopupStore } from "@/store/popupStore";

const Home = () => {
  const { openPopup } = usePopupStore()

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
  
  return (
    <div>
      <BannerSlider />
      {/* <TabMenu tabs={tabs} /> */}
      <ContainerPadding>
        <TrafficHead type="home"/>
        <TrafficFilter type="home"/>
        <Traffic type="home"/>
      </ContainerPadding>
    </div>
  )
}

export default Home