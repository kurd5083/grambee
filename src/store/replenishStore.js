import { create } from "zustand";

export const useReplenishStore = create((set) => ({
    state: false,
    replenish: {
        orderId: null,
        paymentId: null,
        paymentURL: null,
        amountDeposit: null,
        commission: null,
        billing: null,
        method: null,
        status: null
    },

    setState: (value) => {
        set((state) => ({
            ...state,
            state: value
        }))
    },

    setOrderId: ((value) => {
        set((state) => ({
            replenish: {
                ...state.replenish,
                orderId: value
            }
        }))
    }),
    setPaymentId: ((value) => {
        set((state) => ({
            replenish: {
                ...state.replenish,
                paymentId: value
            }
        }))
    }),
    setPaymentURL: ((value) => {
        set((state) => ({
            replenish: {
                ...state.replenish,
                paymentURL: value
            }
        }))
    }),
    setAmountDeposit: ((value) => {
        set((state) => ({
            replenish: {
                ...state.replenish,
                amountDeposit: value
            }
        }))
    }),
    setCommission: ((value) => {
        set((state) => ({
            replenish: {
                ...state.replenish,
                commission: value
            }
        }))
    }),
    setBilling: ((value) => {
        set((state) => ({
            replenish: {
                ...state.replenish,
                billing: value
            }
        }))
    }),
    setMethod: ((value) => {
        set((state) => ({
            replenish: {
                ...state.replenish,
                method: value
            }
        }))
    }),
    setStatus: ((value) => {
        set((state) => ({
            replenish: {
                ...state.replenish,
                status: value
            }
        }))
    }),
}))