import express from "express";
import { registerGame, getGames, getGameById, updateGame, deleteGame} from "../controller/gameController.js";
const router = express.Router();

router.post("/register", registerGame);
router.get("/", getGames);
router.get("/:id", getGameById);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;