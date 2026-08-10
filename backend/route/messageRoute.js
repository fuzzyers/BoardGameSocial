import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import { sendMessage } from "../controller/messageController.js";
const router = express.Router();

router.post("/create", authentication, sendMessage);

export default router;
