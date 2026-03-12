import { create } from "zustand";

export const useToastStore = create((set) => ({
    toasts: [],
    
    showToast: (message, type = "success", duration = 3000) => {
        const id = Date.now();
        set((state) => ({
            toasts: [...state.toasts, { id, message, type, duration }]
        }));
        
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter(toast => toast.id !== id)
            }));
        }, duration + 300);
    },
    
    hideToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter(toast => toast.id !== id)
        }));
    }
}));