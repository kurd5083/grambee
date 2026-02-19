import letter from '@/assets/letter.svg';

import BannerSlider from "@/components/BannerSlider";
import MotivatedTraffic from "@/components/MotivatedTraffic";
import TabMenu from "@/components/TabMenu";

import { usePopupStore } from "@/store/popupStore";

const Home = () => {
  const { openPopup } = usePopupStore()

  const tabs = [
    {
      label: "Трафик",
      onClick: () => openPopup('bot', 'Бот #T356')
    },
    {
      label: "Рассылки",
      icon: letter
    },
    {
      label: "Показы",
      onClick: () => openPopup('statistics', 'Статистика')
    }
  ];
  
  return (
    <div>
      <BannerSlider />
      <TabMenu tabs={tabs} />
      <MotivatedTraffic />
    </div>
  )
}

export default Home