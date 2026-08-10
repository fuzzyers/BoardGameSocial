import express from "express";
import { getUserByName } from "../controller/userController.js";
const router = express.Router();

router.get("/search", getUserByName);

export default router;
