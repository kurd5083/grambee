import { useState, useMemo } from "react"
import styled from 'styled-components';

import bot from "@/assets/icons/bot-icon.svg";
import question from "@/assets/icons/question.svg";
import ChequeIcon from "@/icons/ChequeIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import EditIcon from "@/icons/EditIcon";

import InputField from "@/shared/InputField";
import Button from "@/shared/Button";
import Note from "@/shared/Note";
import Checkbox from "@/shared/Checkbox";
import { ContainerPadding } from "@/shared/ContainerPadding";
import { GapContainer } from "@/shared/GapContainer";

import СhoicePeriod from "@/components/СhoicePeriod";
import Chart from '@/components/Chart';
import MainIndicators from "@/components/MainIndicators";
import StatisticList from "@/components/StatisticList";
import ChannelBlock from "@/components/ChannelBlock";
import TabsNav from "@/components/TabsNav";

import useUpdateResource from "@/hooks/api/Resource/useUpdateResource";
import useResourceActivate from "@/hooks/api/Resource/useResourceActivate";
import useStatsResource from "@/hooks/api/Resource/useStatsResource";
import useGetTimeRemaining from "@/hooks/api/Resource/useGetTimeRemaining";
import useInviteLinkResolve from "@/hooks/api/Resource/useInviteLinkResolve";

import { getDatesByPeriod } from "@/lib/getDatesByPeriod";
import { generateXAxisLabels } from "@/lib/generateXAxisLabels";

import { useReceiptStore } from "@/store/receiptStore";
import { useToastStore } from "@/store/toastStore";
import { usePopupStore } from "@/store/popupStore";

import { checkBotAdmin } from "@/api/Resource/checkBotAdmin";

const tabs = [
  { label: "Общая", value: "general" },
  { label: "Статистика", value: "statistics" },
];

const Resource = () => {
  const [activeTab, setActiveTav] = useState('general')
  const [period, setPeriod] = useState("all");

  const { openPopup } = usePopupStore()
  const { receipt, setInviteLink, setCheckerBotToken, setAutoLinkRefresh } = useReceiptStore();

  const { activate, isEnabling } = useResourceActivate();
  const { renewResource, isConservation } = useUpdateResource({ id: receipt.id });
  const { timeRemaining, timeRemainingLoading } = useGetTimeRemaining({ resourceId: receipt.id });
  const { inviteLink, isGetting } = useInviteLinkResolve()

  const { showToast } = useToastStore();

  const { dateFrom, dateTo } = getDatesByPeriod(period)

  const { statisticsResource, statisticsResourceLoading } = useStatsResource({
    resourceId: receipt.id,
    dateFrom,
    dateTo
  });
  console.log(statisticsResource)
  const xAxisLabels = useMemo(() => {
    if (!statisticsResource?.data?.stats?.dailyStats) return [];

    return generateXAxisLabels(
      period,
      period === '24h'
        ? statisticsResource?.data?.stats?.dailyStats[0]?.hourlyStats
        : statisticsResource?.data?.stats?.dailyStats
    );
  }, [period, statisticsResource]);

  const handleSave = () => {
    if (!receipt.inviteLink) return showToast("Введите ссылку на канал", "error");
    if (!receipt.checkerBotToken) return showToast("Введите токен бота", "error");

    inviteLink({ inviteLink: receipt.inviteLink }, {
      onSuccess: (response) => {
        checkBotAdmin({ botToken: receipt.checkerBotToken, channelId: response.channelId })
          .then((adminResponse) => {
            if (!adminResponse?.isAdmin) return showToast(adminResponse?.message || "Бот не является администратором канала", "error");

            renewResource({
              inviteLink: receipt.inviteLink,
              checkerBotToken: receipt.checkerBotToken,
              autoLinkRefresh: receipt.autoLinkRefresh
            }, {
              onSuccess: () => {
                showToast("Ресурс успешно обновлен!", "success");
              },
              onError: (error) => {
                showToast(error?.message || "Ошибка при обновлении ресурса", "error");
              }
            })
          })
          .catch((error) => {
            showToast(error?.message || "Ошибка при проверке бота", "error");
          })
      },
      onError: (error) => {
        showToast(error?.message || "Не удалось резолвить публичную ссылку", "error");
      }
    })
  }

  const handleActive = () => {
    activate({ id: receipt.id }, {
      onSuccess: () => {
        showToast("Ресурс успешно активирован!", "success");
      },
      onError: (error) => {
        showToast(
          error?.message || "Ошибка при активировании ресурса",
          "error"
        );
      }
    })
  }

  const isLoading = isConservation || isGetting

  return (
    <>
      <TabsNav
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTav}
        itemWidth="130px"
        containerGap="32px"
        textAlign="center"
      />
      {activeTab == 'general' ? (
        <ContainerPadding>
          <TextBlock>
            <Label>Параметры ресурса</Label>
            <Status><mark>Итоговый чек</mark><ChequeIcon width={12} height={12} colorFirst="#FFD26D " colorSecond="#FFB81A" /></Status>
          </TextBlock>
          <ChannelBlock type="button" name={receipt.name} username={receipt.username} disabled={isEnabling} onClick={() => handleActive()} />
          <StatisticList
            price={receipt.price}
            dayLimit={receipt.dayLimit}
            verificationEnabled={receipt.verificationEnabled}
            timeRemaining={timeRemaining}
            timeRemainingLoading={timeRemainingLoading}
          />
          <ButtonEditContainer>
            <Button
              variant="outline"
              iconLeft={<EditIcon width={16} height={16} color="#6A7080" />}
              onClick={() => openPopup('change-resource-limits', 'Изменить лимиты ресурса')}
            >
              Изменить лимиты
            </Button>
          </ButtonEditContainer>
          <Note><p>По истечению <mark>длительности рекламной кампании</mark> произойдет расчётный час, и вас уведомят о результатах</p></Note>
          <TextBlock>
            <Label>Способ замены ссылки</Label>
          </TextBlock>
          <GapContainer gap="24px">
            <CheckboxContainer>
              <Checkbox
                checked={receipt.autoLinkRefresh == true}
                onChange={() => setAutoLinkRefresh(true)}
              >
                Заменять через Grambee
              </Checkbox>
              <Checkbox
                checked={receipt.autoLinkRefresh == false}
                onChange={() => setAutoLinkRefresh(false)}
              >
                Вручную
              </Checkbox>
            </CheckboxContainer>
            <InputField
              id="link"
              label="Инвайт ссылка"
              labelIcon={question}
              placeholder="Ссылка на канал"
              value={receipt.inviteLink}
              onChange={(e) => setInviteLink(e.target.value)}
              icon={<SpeakerIcon width={18} height={16} color="#FFB000" />}
              inputAction="Сохранить"
            />
          </GapContainer>
          <GapContainer gap="24px">
            <Note><p>По истечению <mark>длительности рекламной кампании</mark> произойдет расчётный час, и вас уведомят о результатах</p></Note>
            <InputField
              id="token"
              label="Введите бота-чекера"
              status={!receipt.checkerBotToken ? "Токен не установлен" : "Токен установлен"}
              placeholder="Введите токен"
              value={receipt.checkerBotToken}
              onChange={(e) => setCheckerBotToken(e.target.value)}
              icon={<img src={bot} alt="bot" />}
            />
          </GapContainer>
        </ContainerPadding>
      ) : (
        <>
          <ContainerPadding>
            <СhoicePeriod name={receipt.name} period={period} onChange={setPeriod} />
          </ContainerPadding>
          <Chart
            points={
              period == '24h'
                ? statisticsResource?.data.stats.dailyStats[0]?.hourlyStats.map((item) => item.joins)
                : statisticsResource?.data.stats.dailyStats.map((item) => item.joins)
            }
            params={
              period == '24h'
                ? statisticsResource?.data.stats.dailyStats[0]?.hourlyStats.map(item => ({
                  joins: item.joins,
                  leaves: item.leaves,
                  remained: item.remained,
                  totalActive: statisticsResource?.data.stats.dailyStats[0]?.totalActive,
                  date: `${item.hour} час`
                }))
                : statisticsResource?.data.stats.dailyStats.map(item => ({
                  joins: item.joins,
                  leaves: item.leaves,
                  remained: item.remained,
                  totalActive: item.totalActive,
                  date: item.date
                }))
            }
            xAxisLabels={xAxisLabels}
          />
          <ContainerPadding>
            <IndicatorsContainer>
              <MainIndicators
                totalJoins={statisticsResource?.data.stats.summary.totalJoins}
                totalLeaves={statisticsResource?.data.stats.summary.totalLeaves}
              />
            </IndicatorsContainer>
            <StatisticList
              price={receipt.price}
              dayLimit={receipt.dayLimit}
              verificationEnabled={receipt.verificationEnabled}
              timeRemaining={timeRemaining}
              timeRemainingLoading={timeRemainingLoading}
            />
          </ContainerPadding>
        </>
      )}
      <ButtonSaveContainer onClick={() => handleSave()}>
        <Button variant="primary" disabled={isLoading}><mark>{isLoading ? 'Сохранение...' : 'Сохранить'}</mark></Button>
      </ButtonSaveContainer>
    </>
  )
}

const ButtonEditContainer = styled.div`
  margin-top: 16px;
`
const TextBlock = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
`;
const Status = styled.p`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #6a7080;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div:first-child  {
    padding-bottom: 16px;
    border-bottom: 1px solid #272A33;
  }
`
const ButtonSaveContainer = styled.div`
  box-sizing: border-box;
  margin-top: 32px;
  width: 100%;
  padding: 0 24px 24px;
`
const IndicatorsContainer = styled.div`
  margin-bottom: 32px;
  width: 100%;
`

export default Resource