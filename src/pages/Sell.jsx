import styled from "styled-components";

import letter from '@/assets/letter.svg';
import FileIcon from "@/icons/FileIcon";
import TgIcon from "@/icons/TgIcon";

import OptionCard from "@/components/OptionCard";
import BannerSlider from "@/components/BannerSlider";
import MotivatedTraffic from "@/components/MotivatedTraffic";
import TabMenu from "@/components/TabMenu";

import { usePopupStore } from "@/store/popupStore";

const Sell = () => {
  const { openPopup } = usePopupStore()

  const tabs = [
    {
      label: "Трафик",
      onClick: () => openPopup('step', 'Шаг 1 / 2')
    },
    {
      label: "Рассылки",
      icon: letter
    },
    {
      label: "Показы",
      onClick: () => openPopup('resource', 'Ресурс #T356')
    }
  ];
  
  return (
    <div>
      <BannerSlider />
      <SellContainer>
        <OptionCard
          title="API Документация"
          text="Интеграция с проектами"
          icon={<FileIcon width={13} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />}
          bgIcon={
            <FileIcon width={95} height={117} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg" />
          }
          direction="vertical"
        />
        <OptionCard
          title="Поделиться ресурсами"
          text="Отправляйте список"
          icon={<TgIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />}
          bgIcon={
            <TgIcon width={122} height={122} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg" />
          }
          direction="vertical"
        />
      </SellContainer>
      <TabMenu tabs={tabs} />
      <MotivatedTraffic />
    </div>
  )
}
const SellContainer = styled.div`
  display: flex;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px dashed #6A7080;
  margin: 16px 24px 0;
  @media(max-width: 400px) {
    flex-direction: column;
  }
`

export default Sell
