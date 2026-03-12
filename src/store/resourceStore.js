import { create } from "zustand";

export const useResourceStore = create((set) => ({
    resource: {
        "type": "CHANNEL",
        id: null,
        name: null,
        pastPostsDays: null,
        username: null,
        inviteLink: null,
        checkerBotToken: null,
        "isBotMembersKey": false,
        "linkRefreshDays": 30,
        "channelId": -1001234567890,
        "activeDays": 7,
        dayLimit: 100,
        "trafficSpeed": 100,
        "speedMode": "MEDIUM",
        "verificationEnabled": true,
        "allowPremium": true,
        "allowRussian": true,
        "allowForeign": true,
        "autoLinkRefresh": false,
        "maintainBoosts": false,
        "allowCIS": true,
        "allowMixed": true,
        "allowGifts": false,
        "workBotApiKey": "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz",
        "regions": [
            "RU",
            "BY",
            "KZ"
        ],
        "isAdult": true,
        price: 0.03,
        "userTelegramId": 123456789,
        "posts": [
            {
                "postLink": "https://t.me/mychannel/123",
                "postName": "Новый пост о технологиях",
                "messageId": 123,
                "description": "Краткое описание содержания поста"
            }
        ]
    },

    setResource: (({ id, name, pastPostsDays, username, inviteLink, checkerBotToken, price, dayLimit }) => {
        set((state) => ({
            resource: {
                ...state.resource,
                id,
                name,
                username,
                pastPostsDays,
                inviteLink,
                checkerBotToken,
                price,
                dayLimit
            }
        }))
    }),
    setInviteLink: ((value) => {
        set((state) => ({
            resource: {
                ...state.resource,
                inviteLink: value
            }
        }))
    }),
    setCheckerBotToken: ((value) => {
        set((state) => ({
            resource: {
                ...state.resource,
                checkerBotToken: value
            }
        }))
    }),
}))