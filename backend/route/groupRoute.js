import express from "express";
import {
    addUserToGroup,
    createGroup,
    deleteGroup,
    getAllGroupByIdData,
    getAllGroups,
    removeUserFromGroup,
} from "../controller/groupController.js";
import { authentication } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", authentication, createGroup);
router
    .put("/addUser", authentication, addUserToGroup)
    .put("/removeUser", authentication, removeUserFromGroup);
router
    .get("/", authentication, getAllGroups)
    .get("/:id", getAllGroupByIdData)
    .delete("/:id", authentication, deleteGroup);

export default router;
