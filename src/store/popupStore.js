import { create } from "zustand";

import { useReceiptStore } from "@/store/receiptStore";

export const usePopupStore = create((set) => ({
    popup: {
        state: false,
        content: null,
        name: null,
        data: null,
        previousPage: [],
    },

    openPopup: (content, name, data) => {
        document.body.style.overflow = "hidden";
        set((state) => ({
            popup: {
                state: true,
                content: content,
                name: name,
                data: data,
                previousPage: [...state?.popup?.previousPage, content]
            }
        }))
    },

    closePopup: () => {
        document.body.style.overflow = "auto"
        
        // useReceiptStore.getState().resetReceipt()
        
        set(() => ({
            popup: { state: false, content: null, name: null, data: null, previousPage: [] }
        }))
    },

    goBack: () => {
        set((state) => {
            const prevPages = [...state.popup.previousPage]
            prevPages.pop()

            return {
                popup: { ...state.popup, content: prevPages[prevPages.length - 1], previousPage: prevPages }
            }
        })
    }
})) 