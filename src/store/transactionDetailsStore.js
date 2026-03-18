import { create } from "zustand";

export const useTransactionDetailsStore = create((set) => ({
    transactionDetails: null,

    setTransactionDetails: ((data) => {
        set(() => ({
            transactionDetails: data
        }))
    }),
}))