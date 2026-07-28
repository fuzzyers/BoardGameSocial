import express from "express";
import { addUserToGroup, createGroup, getAllGroups } from "../controller/groupController.js";
import { authentication } from "../middleware/authMiddleware.js";
const router = express.Router()

router.post("/create", authentication, createGroup)
router.put("/addUser", authentication, addUserToGroup)
router.get("/", authentication, getAllGroups)

export default router;