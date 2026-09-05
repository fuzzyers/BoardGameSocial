import express from "express";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
import { insertScoreForPlayer } from "../controller/eventScoringController.js";
const router = express.Router();

router.post("/insertResult", firebaseAuthMiddleware, insertScoreForPlayer)

export default router;
