import { create } from "zustand";

const initialBot = {
    id: null,
    name: "Traffic Bot",
    token: null,
    apiToken: null,
    isActive: true,
    requiredChannelsCount: 0,
    channelButtonText: '',
    chatButtonText: '',
    botButtonText: '',
    boostButtonText: '',
    subscriptionMessage: "Для продолжения необходимо подписаться на каналы:",
    chatWelcomeMessage: "👋 Добро пожаловать!\n\n📢 Для участия в чате необходимо подписаться на следующие ресурсы:",
    chatSuccessMessage: "✅ Отлично! Вы подписались на все ресурсы. Теперь вы можете писать в чат!",
    channelId: -1001234567890,
    leaveWebHookUrl: null,
    apiLinksOnly: null,
};

export const useBotStore = create((set) => ({
    bot: initialBot,

    resetBot: () => set({ bot: initialBot }),

    setBot: (({ id, token, apiToken, boostButtonText, botButtonText, channelButtonText, chatButtonText, leaveWebHookUrl, isActive, apiLinksOnly }) => {
        set((state) => ({
            bot: {
                ...state.bot,
                id,
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