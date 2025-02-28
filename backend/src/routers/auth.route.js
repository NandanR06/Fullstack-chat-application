import express from "express";
import {checkAuth, login, logout, signup, verifyEmail} from "../controllers/auth.controller.js";
import {authProtected } from "../middleware/auth.protected.js";
import {updateProfile} from "../controllers/auth.controller.js";
const router = express.Router();

// sing up
router.post("/signup",signup);
// verify phonenumber
 router.post('/email-verify',verifyEmail);
// login
router.post("/login", login);

// logout
router.post("/logout", logout);

//update the profile
router.put('/update-profile',authProtected,updateProfile);

//check the user
router.get('/check',authProtected,checkAuth);

export default router;
