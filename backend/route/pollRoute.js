import express from "express";
import { addOptionToPoll, createPoll, votePoll } from "../controller/pollController.js";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
const router = express.Router();

router
    .post("/create", firebaseAuthMiddleware, createPoll)
    .post("/vote", firebaseAuthMiddleware, votePoll)
    .post("/option", firebaseAuthMiddleware, addOptionToPoll);

export default router;
