import express from "express";

import {
    createGame,
    getGames,
    getGame,
    searchGames,
    updateGame,
    deleteGame,
    approveGame,
    getCollection,
    addGameToCollection,
    removeGameFromCollection,
    createExpansion,
} from "../controller/gameController.js";

import { adminAuthentication } from "../middleware/adminAuthMiddleware.js";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";

const router = express.Router();

router.get("/", getGames).post("/", firebaseAuthMiddleware, createGame);
router.get("/search", searchGames);
router.get("/:id", getGame).put("/:id", firebaseAuthMiddleware, updateGame).delete("/:id", firebaseAuthMiddleware, deleteGame);
router
    .get("/collection/me", firebaseAuthMiddleware, getCollection)
    .put("/collection/me", firebaseAuthMiddleware, addGameToCollection)
    .put("/collection/me/remove", firebaseAuthMiddleware, removeGameFromCollection);
router.get("/expansion/:id", firebaseAuthMiddleware, getGame).post("/expansion/", firebaseAuthMiddleware, createExpansion);

// =======================
// Moderation
// =======================

// Approve game
router.patch("/:id/approve", adminAuthentication, approveGame);

// Reject game
router.patch("/:id/reject", firebaseAuthMiddleware, async (req, res) => {
    // Add rejectGame controller when needed
});

export default router;
