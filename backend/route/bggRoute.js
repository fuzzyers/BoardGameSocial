import express from "express";
import { searchBggForGame, searchBggById } from "../controller/bggController.js";
import { authentication } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get("/search/:search", authentication, searchBggForGame).get("/searchById/:id", authentication, searchBggById)

export default router;