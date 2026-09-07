import express from "express";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
import { getMyProfile, getProfileByID, updateProfileBio, updateTop3Games } from "../controller/profileController.js";
const router = express.Router();

router
    .get("/myProfile", firebaseAuthMiddleware, getMyProfile)
    .get("/:id", firebaseAuthMiddleware, getProfileByID)
    .put("/myProfile/updateBio", firebaseAuthMiddleware, updateProfileBio).put("/myProfile/top3", firebaseAuthMiddleware, updateTop3Games);

export default router;
