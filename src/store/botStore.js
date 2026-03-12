import { create } from "zustand";

export const useBotStore = create((set) => ({
    bot: {
        name: "Traffic Bot",
        token: null,
        apiToken: null,
        isActive: true,
        isApproved: false,
        moderationStatus: "PENDING",
        requiredChannelsCount: 0,
        buttonLayout: 2,
        channelButtonText: null,
        chatButtonText: null,
        botButtonText: null,
        boostButtonText: null,
        subscriptionMessage: "Для продолжения необходимо подписаться на каналы:",
        chatWelcomeMessage: "👋 Добро пожаловать!\n\n📢 Для участия в чате необходимо подписаться на следующие ресурсы:",
        chatSuccessMessage: "✅ Отлично! Вы подписались на все ресурсы. Теперь вы можете писать в чат!",
        userTelegramId: 123456789,
        sellerType: "BOT",
        channelId: -1001234567890,
        channelLink: "@my_channel",
        rewardGiftId: "5922558454332916696",
        cooldownGateway: 24,
        leaveWebHookUrl: null,
        apiLinksOnly: null,
    },

    setBot: (({token, apiToken, boostButtonText, botButtonText, channelButtonText, chatButtonText, leaveWebHookUrl, isActive, apiLinksOnly}) => {
        set((state) => ({
            bot: {
                ...state.bot,
                token,
                apiToken,
                boostButtonText,
                botButtonText, 
                channelButtonText, 
                chatButtonText,
                leaveWebHookUrl,
                isActive,
                apiLinksOnly
            }
        }))
    }),
    setToken: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                token: value
            }
        }))
    }),
    setIsActive: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                isActive: value
            }
        }))
    }),
    
    setRequiredChannelsCount: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                requiredChannelsCount: value
            }
        }))
    }),
    setChannelButtonText: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                channelButtonText: value
            }
        }))
    }),
    setChatButtonText: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                chatButtonText: value
            }
        }))
    }),
    setBotButtonText: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                botButtonText: value
            }
        }))
    }),
    setBoostButtonText: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                boostButtonText: value
            }
        }))
    }),
    setSubscriptionMessage: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                subscriptionMessage: value
            }
        }))
    }),
    setLeaveWebHookUrl: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                leaveWebHookUrl: value
            }
        }))
    }),
    setApiLinksOnly: ((value) => {
        set((state) => ({
            bot: {
                ...state.bot,
                apiLinksOnly: value
            }
        }))
    }),
}))