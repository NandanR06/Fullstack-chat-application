import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASEURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

// const BASEURL = "https://fullstack-chat-app-server.onrender.com"
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  islogingIng: false,
  isUpdatingProfile: false,
  emailOTP: "",
  // checking is user login or not
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
  console.log("res data",res.data.fullName);
  
      // Ensure res.data is a valid object (not undefined, null, or an array)
      const userData = (res.data.fullName !== undefined && res.data.fullName !== null) 
        ? res.data 
        : false;
      
      get().connectSocket();
      set({ authUser: userData });
    } catch (error) {
      console.log(`Error in checkAuth: ${error}`);
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

  // verify the number
  verifyEmails: async (data) => {
    console.log(typeof(data));
    try {
       
      const res = await axiosInstance.post("/auth/email-verify",{ email: data });
      
      toast.success(res.data.message || "OTP Sent Successfully"); 
      console.log(res.data);
      set({ emailOTP: res.data.otp });
      console.log("emailOTP", get().emailOTP);
      
      
    } catch (error) {
      console.error("Error verifying Email:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
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

    socket.on("getOnlineUsers", (userId) => {
      set({ onlineUsers: userId });
    });
  },

  // disconnection of the socket like logout
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
