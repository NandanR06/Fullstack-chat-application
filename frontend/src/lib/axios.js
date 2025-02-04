import axios from "axios";
export const axiosInstance = axios.create({
  baseURL :"https://fullstack-chat-app-server.onrender.com/api",
  // baseURL:  import.meta.env.MODE ===  "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,
});
