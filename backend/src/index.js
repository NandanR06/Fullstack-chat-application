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

dotenv.config();

// constant variables of environment
const PORT = process.env.PORT || 5000;

// create an express app
// const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));   
app.use(cookieParser());


const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));

});
}


// import the router
app.use("/api/auth", authrouter);
app.use('/api/message',messagerouter);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // database connection
  database();
});
