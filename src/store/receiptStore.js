import { create } from "zustand";

const initialReceipt = {
  channel: null,
  typeResource: null,
  metrics: null,
  typeTraffic: null,
  typeCoverage: null,
  numberSubscribers: null,
  numberCampaignDays: null,
  countries: [],
  selectedFilters: null,
  premiumCoverage: null,
  price: null,
  dailyTraffic: null,
  compDuration: null,
  speedMode: null,
  erFrom: null,
  erTo: null,
  coveragePeriod: null,
  coveragePeriodHours: null,
  rangeReactionsFrom: null,
  rangeReactionsTo: null,
};

export const useReceiptStore = create((set) => ({
    receipt: initialReceipt,

    resetReceipt: () => set({ receipt: initialReceipt }),

    setChannel: ((name, username, data) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                channel: { name, username, data }
            }
        }))
    }),
    setTypeResource: ((type) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                typeResource: type
            }
        }))
    }),
    setMetrics: ((type) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                metrics: type
            }
        }))
    }),
    setTypeTraffic: ((type) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                typeTraffic: type
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
    setNumberSubscribers: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                numberSubscribers: value
            }
        }))
    }),
    setNumberCampaignDays: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                numberCampaignDays: value
            }
        }))
    }),
    setCountries: ((countries) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                countries: countries
            }
        }))
    }),
    setFilters: ((filters) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                selectedFilters: {
                    allowPremium: filters.allowPremium ?? false,
                    allowGifts: filters.allowGifts ?? false,
                    allowCIS: filters.allowCIS ?? false,
                    allowRussian: filters.allowRussian,
                    allowForeign: filters.allowForeign,
                }
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
    setDailyTraffic: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
               dailyTraffic: value
            }
        }))
    }),
    setCompDuration: ((value) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
               compDuration: value
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
}))