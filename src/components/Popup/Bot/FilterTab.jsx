import { useState, useEffect } from "react";
import styled from "styled-components";

import like from "@/assets/icons/like.svg";
import robot from "@/assets/icons/robot.svg";
import gamble from "@/assets/icons/gamble.svg";
import spam from "@/assets/icons/spam.svg";
import eyeCilia from "@/assets/icons/eye-cilia.svg";
import external from "@/assets/icons/external.svg";
import MessageIcon from "@/icons/MessageIcon";
import StarIcon from "@/icons/StarIcon";
import TgSplashIcon from "@/icons/TgSplashIcon";

import Radio from "@/shared/Radio";
import Button from "@/shared/Button";

import useGetFilters from "@/hooks/api/Bots/useGetFilters";
import useUpdateFilter from "@/hooks/api/Bots/useUpdateFilter";

import { useToastStore } from "@/store/toastStore";
import { usePopupStore } from "@/store/popupStore";

const showResources = [
    { code: "showBots", name: "Боты", icon: <img src={robot} alt="bots" /> },
    { code: "showChannels", name: "Каналы", icon: <TgSplashIcon width={16} height={16} colorFirst="#579AFF" colorSecond="#236EDE" /> },
    { code: "showChats", name: "Чаты", icon: <MessageIcon width={16} height={16} color="#6A7080" /> },
    { code: "showBoosts", name: "Бусты", icon: <StarIcon width={16} height={16} colorFirst="#579AFF" colorSecond="#236EDE" /> },
    { code: "showViews", name: "Просмотры", icon: <img src={eyeCilia} alt="eye" /> },
    { code: "showExternal", name: "Внешние", icon: <img src={external} alt="external" /> },
]
const permittedContent = [
    { code: "allowAdultContent", name: "Взрослые (18+)", icon: <img src={like} alt="adult" /> },
    { code: "allowGamblingContent", name: "Азарт", icon: <img src={gamble} alt="gambling" /> },
    { code: "allowSpamContent", name: "Спам-контент", icon: <img src={spam} alt="spam" /> },
]

const FilterTab = () => {
    const { popup } = usePopupStore()
    const { filters, filtersLoading } = useGetFilters({ botId: popup.data.botId })

    const { renewFilter } = useUpdateFilter({ botId: popup.data.botId })
    const { showToast } = useToastStore();
    
    const [showBots, setShowBots] = useState(false)
    const [showChannels, setShowChannels] = useState(false)
    const [showChats, setShowChats] = useState(false)
    const [showBoosts, setShowBoosts] = useState(false)
    const [showViews, setShowViews] = useState(false)
    const [showExternal, setShowExternal] = useState(false)

    const [allowAdult, setAllowAdult] = useState(false)
    const [allowGambling, setAllowGambling] = useState(false)
    const [allowSpam, setAllowSpam] = useState(false)

    useEffect(() => {
        if (filters) {
            setShowBots(filters.showBots || false)
            setShowChannels(filters.showChannels || false)
            setShowChats(filters.showChats || false)
            setShowBoosts(filters.showBoosts || false)
            setShowViews(filters.showViews || false)
            setShowExternal(filters.showExternal || false)

            setAllowAdult(filters.allowAdultContent || false)
            setAllowGambling(filters.allowGamblingContent || false)
            setAllowSpam(filters.allowSpamContent || false)
        }
    }, [filters])

    const toggleResource = (resourceCode) => {
        switch (resourceCode) {
            case 'showBots':
                setShowBots(!showBots)
                break
            case 'showChannels':
                setShowChannels(!showChannels)
                break
            case 'showChats':
                setShowChats(!showChats)
                break
            case 'showBoosts':
                setShowBoosts(!showBoosts)
                break
            case 'showViews':
                setShowViews(!showViews)
                break
            case 'showExternal':
                setShowExternal(!showExternal)
                break
            default:
                break
        }
    }

    const toggleContent = (contentCode) => {
        switch (contentCode) {
            case 'allowAdultContent':
                setAllowAdult(!allowAdult)
                break
            case 'allowGamblingContent':
                setAllowGambling(!allowGambling)
                break
            case 'allowSpamContent':
                setAllowSpam(!allowSpam)
                break
            default:
                break
        }
    }

    const handleSave = () => {
        renewFilter({
            showBots,
            showChannels,
            showChats,
            showBoosts,
            showViews,
            showExternal,
            allowAdultContent: allowAdult,
            allowGamblingContent: allowGambling,
            allowSpamContent: allowSpam
        }, {
            onSuccess: () => {
                showToast("Фильтры успешно обновлёны!", "success");
            },
            onError: (error) => {
                showToast(
                    error?.message || "Ошибка при обновлении фильтров",
                    "error"
                );
            }
        })
    }

    return (
        <>
            <FilterTitle>Показывать ресурсы</FilterTitle>
            <RadioContainer>
                {showResources.map((item) => (
                    <Radio
                        key={item.code}
                        checked={
                            item.code === 'showBots' ? showBots :
                                item.code === 'showChannels' ? showChannels :
                                    item.code === 'showChats' ? showChats :
                                        item.code === 'showBoosts' ? showBoosts :
                                            item.code === 'showViews' ? showViews :
                                                item.code === 'showExternal' ? showExternal :
                                                    false
                        }
                        onChange={() => toggleResource(item.code)}
                        view="circleBG"
                    >
                        {item.icon}
                        {item.name}
                    </Radio>
                ))}
            </RadioContainer>
            <FilterTitle>Разрешенный контент</FilterTitle>
            <RadioContainer>
                {permittedContent.map((item) => (
                    <Radio
                        key={item.code}
                        checked={
                            item.code === 'allowAdultContent' ? allowAdult :
                                item.code === 'allowGamblingContent' ? allowGambling :
                                    item.code === 'allowSpamContent' ? allowSpam :
                                        false
                        }
                        onChange={() => toggleContent(item.code)}
                        view="circleBG"
                    >
                        {item.icon}
                        {item.name}
                    </Radio>
                ))}
            </RadioContainer>
            <ButtonSaveContainer onClick={() => handleSave()}>
                <Button variant="primary"><mark>Сохранить</mark></Button>
            </ButtonSaveContainer>
        </>
    )
}
const FilterTitle = styled.h2`
    margin-top: 32px;
    font-size: 18px;
    margin-bottom: 24px;
`
const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`
const ButtonSaveContainer = styled.div`
  margin-top: 32px;
  width: 100%;
`

export default FilterTab