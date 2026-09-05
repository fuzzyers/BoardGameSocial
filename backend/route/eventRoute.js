import express from "express";
import { addEventGame, createEvent, deleteEventById, getEvents, getEventWithGames, toggleEventAttendance } from "../controller/eventController.js";
import { requireGroupAdmin } from "../middleware/GroupAdminMiddleware.js";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
const router = express.Router();

router
    .post("/create", firebaseAuthMiddleware, createEvent)
    .get("/", firebaseAuthMiddleware, getEvents)
    .get("/:id", firebaseAuthMiddleware, getEventWithGames)
    .delete("/:id", firebaseAuthMiddleware, requireGroupAdmin, deleteEventById);
router.post("/addGameToEvent", firebaseAuthMiddleware, requireGroupAdmin, addEventGame).put("/attendingEvent", firebaseAuthMiddleware, toggleEventAttendance);
export default router;
