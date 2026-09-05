import express from "express";
import {
    addUserToGroup,
    createGroup,
    deleteGroup,
    getAllGroupByIdData,
    getAllGroups,
    removeUserFromGroup,
} from "../controller/groupController.js";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
const router = express.Router();

router.post("/create", firebaseAuthMiddleware, createGroup);
router.put("/addUser", firebaseAuthMiddleware, addUserToGroup).put("/removeUser", firebaseAuthMiddleware, removeUserFromGroup);
router
    .get("/", firebaseAuthMiddleware, getAllGroups)
    .get("/:id", getAllGroupByIdData)
    .delete("/:id", firebaseAuthMiddleware, deleteGroup);

export default router;
