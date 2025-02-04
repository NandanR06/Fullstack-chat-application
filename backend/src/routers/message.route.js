import express from 'express';
import { authProtected } from '../middleware/auth.protected.js';
import { getMessages, getUserProtected, sendMessage } from '../controllers/message.controler.js';
const router = express.Router();

// get the user for the sidebar
router.get('/user',authProtected,getUserProtected);
router.get('/:id',authProtected,getMessages);
router.post('/send/:id',authProtected,sendMessage);

export default router;