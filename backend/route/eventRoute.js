import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import { createEvent, getEvents } from "../controller/eventController.js";
const router = express.Router();

router.post("/create", authentication, createEvent).get("/", authentication, getEvents)

export default router;
