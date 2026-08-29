import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import { addOptionToPoll, createPoll, votePoll } from "../controller/pollController.js";
const router = express.Router();

router.post("/create", authentication, createPoll).post("/vote", authentication, votePoll).post("/option", authentication, addOptionToPoll)

export default router;
