import express from "express";
import { searchBggForGame, searchBggById } from "../controller/bggController.js";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";

const router = express.Router();

router
    .get("/search/:search", firebaseAuthMiddleware, searchBggForGame)
    .get("/searchById/:id", firebaseAuthMiddleware, searchBggById);

export default router;
