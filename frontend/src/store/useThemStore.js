import { create } from "zustand";

export const useThemStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark",
  
  setTheme: (data) => {
    localStorage.setItem("chat-theme", data);
    set({ theme: data });
  },
}));
