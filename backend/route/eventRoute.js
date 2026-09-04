import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import { addEventGame, createEvent, deleteEventById, getEvents, getEventWithGames } from "../controller/eventController.js";
import { requireGroupAdmin } from "../middleware/GroupAdminMiddleware.js";
const router = express.Router();

router
    .post("/create", authentication, createEvent)
    .get("/", authentication, getEvents)
    .get("/:id", authentication, getEventWithGames)
    .delete("/:id", authentication, requireGroupAdmin, deleteEventById);
router.post("/addGameToEvent", authentication, requireGroupAdmin, addEventGame);
export default router;
