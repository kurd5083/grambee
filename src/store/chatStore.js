import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useChatStore = create(
    persist(
        (set) => ({
            chat: [],

            addMessageChat: (data) => {
                set((state) => ({
                    
                    chat: [
                        ...state.chat,
                        {
                            id: Date.now(),
                            from: data.from,
                            name: data.name,
                            text: data.text,
                            date: data.date,
                        }
                    ]
                }))
            },
            clearChat: () => {
                set({ chat: [] });
            },
        }),
        { 
            name: 'chat-storage',
            getStorage: () => localStorage,
        }
    )
)