import axios from "axios";
export const axiosInstance = axios.create({
  baseURL :"https://fullstack-chat-server.onrender.com",
  // baseURL:  import.meta.env.MODE ===  "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,
});
