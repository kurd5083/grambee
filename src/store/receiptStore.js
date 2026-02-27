import { create } from "zustand";

const initialReceipt = {
  channel: null,
  typeTraffic: null,
  typeCoverage: null,
  numberSubscribers: null,
  numberCampaignDays: null,
  countries: [],
  selectedFilters: [],
  premiumCoverage: null,
  price: 1540,
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
        console.log(filters)
        set((state) => ({
            receipt: {
                ...state.receipt,
                selectedFilters: filters
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
    })
}))