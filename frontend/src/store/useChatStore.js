import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/message/user");
      set({ users: res.data });
    } catch (error) {
      toast.error("no user");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessage: async (userId) => {
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("error while fetching the result");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (dataInfo) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        dataInfo
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.messages);
    }
  },

  subscriberToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    
    
    socket.on("newMessage", (newMessage) => {
      if(newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unSubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
