import { create } from "zustand";

export const useNotificationStore = create((set) => ({
    notification: null,

    setNotification: (item) => {
        set(() => ({
            notification: item
        }))
    }
}))