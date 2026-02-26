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
};

export const useReceiptStore = create((set) => ({
    receipt: initialReceipt,

    resetReceipt: () => set({ receipt: initialReceipt }),

    setChannel: ((name, username) => {
        set((state) => ({
            receipt: {
                ...state.receipt,
                channel: { name, username }
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
    })
}))