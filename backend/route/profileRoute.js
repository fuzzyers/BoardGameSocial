import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import { getMyProfile, getProfileByID, updateProfileBio } from "../controller/profileController.js";
const router = express.Router();

router.get("/myProfile", authentication, getMyProfile).get("/:id", authentication, getProfileByID).put("/myProfile/updateBio", authentication, updateProfileBio);

export default router;
