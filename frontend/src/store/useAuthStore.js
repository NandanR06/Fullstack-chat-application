import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASEURL = import.meta.env.MODE ===  "development" ? "http://localhost:5000" : "/";

// const BASEURL = "https://fullstack-chat-app-server.onrender.com"
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  islogingIng: false,
  isUpdatingProfile: false,
  // checking is user login or not
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      get().connectSocket();
      set({ authUser: res.data });
    } catch (error) {
      console.log(`error in checkAuth ${error}`);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ----------------------------signUp---------------------------------------
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successgully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  // -----------------------------logout--------------------------------------
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  // -----------------------------login--------------------------------------
  login: async (data) => {
    set({ islogingIng: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ islogingIng: false });
    }
  },
  // -----------------------------update profile--------------------------------------
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("updated profile successfully");
    } catch (error) {
      toast.error("Image is too large");
      console.log(`error in uploading file : ${error.response.data.message}`);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // connection of the socket
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASEURL, { query: { userId: authUser._id } });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers",(userId) => {
      set({ onlineUsers: userId });
    });
  },

// disconnection of the socket like logout 
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
