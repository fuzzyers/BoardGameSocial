import express from "express";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
import { sendMessage } from "../controller/messageController.js";
const router = express.Router();

router.post("/create", firebaseAuthMiddleware, sendMessage);

export default router;
