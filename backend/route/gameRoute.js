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
    addGameToCollection
} from "../controller/gameController.js";

import { authentication } from "../middleware/authMiddleware.js";
import { adminAuthentication } from "../middleware/adminAuthMiddleware.js";


const router = express.Router();

router.get("/", getGames).post("/", authentication, createGame);
router.get("/search", searchGames);
router.get("/:id", getGame).put("/:id", authentication, updateGame).delete("/:id", authentication, deleteGame);
router.get("/collection/me", authentication, getCollection).put("/collection/me", authentication, addGameToCollection)
// router.get("/expansion/")

// =======================
// Moderation
// =======================

// Approve game
router.patch(
    "/:id/approve",
    adminAuthentication,
    approveGame
);


// Reject game
router.patch(
    "/:id/reject",
    authentication,
    async (req,res)=>{

        // Add rejectGame controller when needed

    }
);


export default router;