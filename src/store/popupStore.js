import { create } from "zustand";

export const usePopupStore = create((set) => ({
    popup: {
        state: false,
        content: null,
        name: null,
    },
    openPopup: (content, name) => {
        document.body.style.overflow = "hidden";
        set(() => ({
            popup: {
                state: true,
                content: content,
                name: name
            }
        }))
    },

    closePopup: () => {
        document.body.style.overflow = "auto"
        set(() => ({
            popup: { state: false, content: null, name: null }
        }))
    }
})) 