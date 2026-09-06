import express from "express";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
import { insertScoreForPlayer, removePlayerScore } from "../controller/eventScoringController.js";
const router = express.Router();

router
    .post("/insertResult", firebaseAuthMiddleware, insertScoreForPlayer)
    .delete("/removeResult", firebaseAuthMiddleware, removePlayerScore);

export default router;
