import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import { addEventGame, createEvent, getEvents, getEventWithGames } from "../controller/eventController.js";
const router = express.Router();

router.post("/create", authentication, createEvent).get("/", authentication, getEvents).get("/:id", authentication, getEventWithGames);
router.post("/addGameToEvent", authentication, addEventGame)
export default router;
