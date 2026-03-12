import { useState } from "react";
import styled from "styled-components";

import letter from '@/assets/icons/letter.svg';
import FileIcon from "@/icons/FileIcon";
import TgIcon from "@/icons/TgIcon";

import { ContainerPadding } from '@/shared/ContainerPadding';

import OptionCard from "@/components/OptionCard";
import BannerSlider from "@/components/BannerSlider";
import TrafficHead from "@/components/MotivatedTraffic/TrafficHead";
import TrafficFilter from "@/components/MotivatedTraffic/TrafficFilter";
import Traffic from "@/components/MotivatedTraffic/Traffic";
import TabMenu from "@/components/TabMenu";

import useGetBots from "@/hooks/api/Bots/useGetBots";

import { useUserStore } from "@/store/userStore";
import { usePopupStore } from "@/store/popupStore";

const tabs = [
  {
    label: "Трафик",
    onClick: () => openPopup('additional-parameters', 'Указать доп. параметры', { text: 'Укажите нужные вам параметры аудитории' })
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

const Sell = () => {
  const [stateStatus, setStateStatus] = useState(false);
  const [filter, setFilter] = useState('all');
  const { openPopup } = usePopupStore()
  const { userLocal } = useUserStore()
  const { bots, botsLoading, refetch } = useGetBots({ telegramId: userLocal?.telegramId })

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
          onClick={() => window.open("https://docs.grambee.net/", "_blank")}
        />
        <OptionCard
          title="Поделиться ресурсами"
          text="Отправляйте список"
          icon={<TgIcon width={16} height={16} colorFirst="#FFD26D" colorSecond="#FFB81A" uniqueId="small" />}
          bgIcon={
            <TgIcon width={122} height={122} colorFirst="#252934" colorSecond="#1F222B" uniqueId="bg" />
          }
          direction="vertical"
          onClick={() => openPopup('share-resources', 'Поделиться ресурсами', { text: 'Отправляйте список ваших ресурсов клиентам\n для привлечения дополнительного заработка\n\n Выберите тип трафика и поделитесь ссылкой' })}
        />
      </SellContainer>
      {/* <TabMenu tabs={tabs} /> */}
      <ContainerPadding>
        <TrafficHead type="sell" status={stateStatus} onClickArchive={() => setStateStatus(!stateStatus)} onClickReset={() => refetch()}/>
        <TrafficFilter type="sell"  filter={filter} onChange={setFilter}/>
        <Traffic
          type="sell"
          traffic={bots}
          loading={botsLoading}
          title='Упс! Кажется, у вас еще нет ботов:('
          text='Подключайте любые ресурсы Telegram, а также внешние источники — и продавайте трафик на выгодных условиях!'
          status={stateStatus}
          filter={filter}
        />
      </ContainerPadding>
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