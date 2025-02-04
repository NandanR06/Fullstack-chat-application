import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authrouter from "./routers/auth.route.js";
import cors from "cors";
import { database } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messagerouter from './routers/message.route.js'
import {app,server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// constant variables of environment
const PORT = process.env.PORT || 5000;

// create an express app
// const app = express();




const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route to serve `index.html`
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


app.use(cors({
  origin: "https://fullstack-chat-application-hc4x.onrender.com",
  credentials: true,
}));
app.use(express.json());
// app.use(morgan("dev"));   
app.use(cookieParser());





// import the router
app.use("/api/auth", authrouter);
app.use('/api/message',messagerouter);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // database connection
  database();
});
