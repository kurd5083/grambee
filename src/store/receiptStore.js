import { create } from "zustand";

const initialReceipt = {
    id: null,
    typeFitst: null,
    type: null,
    name: null,
    username: null,
    channel: null,
    inviteLink: null,
    verificationEnabled: null,
    typeCoverage: null,
    dayLimit: null,
    activeDays: null,
    regions: [],
    premiumCoverage: null,
    erFrom: null,
    erTo: null,
    coveragePeriod: null,
    coveragePeriodHours: null,
    rangeReactionsFrom: null,
    rangeReactionsTo: null,
    pastPostsDays: null,
    checkerBotToken: '',
    isBotMembersKey: false,
    workBotApiKey: null,
    speedMode: null,
    maintainBoosts: false,
    autoLinkRefresh: false,
    allowPremium: false,
    allowGifts: false,
    isAdult: false,
    channelId: null,
    allowCIS: false,
    // allowRussian: false,
    // allowForeign: false,
    // allowMixed: false,
    price: null,
    pastPostsPeriod: 7
};

export const useReceiptStore = create((set) => ({
    receipt: initialReceipt,

    resetReceipt: () => set((state) => ({ 
        receipt: {
        ...initialReceipt,
        workBotApiKey: state.receipt.workBotApiKey
        } 
    })),
    resetReceiptFull: () => set(() => ({ 
        receipt: {...initialReceipt} 
    })),
    setResource: (({ id, name, pastPostsDays, username, inviteLink, checkerBotToken, price, dayLimit, activeDays, verificationEnabled, autoLinkRefresh }) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                id,
                name,
                username,
                pastPostsDays,
                inviteLink,
                checkerBotToken,
                price,
                dayLimit,
                activeDays,
                verificationEnabled,
                autoLinkRefresh
            }
        }))
    }),
    setInviteLink: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                inviteLink: value
            }
        }))
    }),
    setCheckerBotToken: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                checkerBotToken: value
            }
        }))
    }),
    setWorkBotApiKey: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                workBotApiKey: value
            }
        }))
    }),
    setTypeFirst: ((type) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                typeFirst: type
            }
        }))
    }),
    setType: ((type) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                type: type
            }
        }))
    }),
    setName: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                name: value
            }
        }))
    }),
    setUsername: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                username: value
            }
        }))
    }),
    setChannelId: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                channelId: value
            }
        }))
    }),
    setMaintainBoosts: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                maintainBoosts: value
            }
        }))
    }),
    setVerificationEnabled: ((type) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                verificationEnabled: type
            }
        }))
    }),
    setTypeCoverage: ((type) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                typeCoverage: type
            }
        }))
    }),
    setDayLimit: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                dayLimit: value
            }
        }))
    }),
    setActiveDays: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                activeDays: value
            }
        }))
    }),
    setRegions: ((regions) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                regions: regions
            }
        }))
    }),
    setFilters: ((filters) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                allowPremium: filters.allowPremium ?? false,
                allowGifts: filters.allowGifts ?? false,
                allowCIS: filters.allowCIS ?? false,
                allowRussian: filters.allowRussian,
                allowForeign: filters.allowForeign,
            }
        }))
    }),
    setPremiumCoverage: ((bool) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                premiumCoverage: bool
            }
        }))
    }),
    setPrice: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                price: value
            }
        }))
    }),
    setSpeedMode: ((type) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                speedMode: type
            }
        }))
    }),
    setErFrom: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                erFrom: value
            }
        }))
    }),
    setErTo: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                erTo: value
            }
        }))
    }),
    setCoveragePeriod: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                coveragePeriod: value
            }
        }))
    }),
    setCoveragePeriodHours: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                coveragePeriodHours: value
            }
        }))
    }),
    setRangeReactionsFrom: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                rangeReactionsFrom: value
            }
        }))
    }),
    setRangeReactionsTo: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                rangeReactionsTo: value
            }
        }))
    }),
    setAllowCIS: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                allowCIS: value,
            }
        }))
    }),
    setAllowPremium: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                allowPremium: value,
            }
        }))
    }),
    setAllowGifts: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                allowGifts: value,
            }
        }))
    }),
    setIsAdult: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                isAdult: value,
            }
        }))
    }),
    setAutoLinkRefresh: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                autoLinkRefresh: value
            }
        }))
    }),
}))