import express from "express";
import { addUserToGroup, createGroup, getAllGroupByIdData, getAllGroups } from "../controller/groupController.js";
import { authentication } from "../middleware/authMiddleware.js";
const router = express.Router()

router.post("/create", authentication, createGroup)
router.put("/addUser", authentication, addUserToGroup)
router.get("/", authentication, getAllGroups).get("/:id", getAllGroupByIdData)

export default router;