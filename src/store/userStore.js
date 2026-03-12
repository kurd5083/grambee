import { create } from "zustand";

export const useUserStore = create((set) => ({
  userLocal: null,

  setUserLocal: (user) => set({ userLocal: user }),
}))