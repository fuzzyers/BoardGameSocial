import express from "express";
import {
    addUserToGroup,
    createGroup,
    deleteGroup,
    getAllGroupByIdData,
    getAllGroups,
    leaveAgroup,
    removeUserFromGroup,
} from "../controller/groupController.js";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
import { requireGroupAdmin } from "../middleware/GroupAdminMiddleware.js";
const router = express.Router();

router.post("/create", firebaseAuthMiddleware, createGroup);
router
    .put("/addUser", firebaseAuthMiddleware, addUserToGroup)
    .put("/removeUser", firebaseAuthMiddleware, requireGroupAdmin, removeUserFromGroup)
    .put("/leaveGroup", firebaseAuthMiddleware, leaveAgroup);
router
    .get("/", firebaseAuthMiddleware, getAllGroups)
    .get("/:id", getAllGroupByIdData)
    .delete("/:id", firebaseAuthMiddleware, requireGroupAdmin, deleteGroup);

export default router;
