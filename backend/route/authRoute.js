import express from "express";
import { registerUser, loginUser, createFirebaseUser, getFirebaseUser } from "../controller/authController.js";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/firebase-login", firebaseAuthMiddleware, createFirebaseUser);
router.get("/firebase-user", firebaseAuthMiddleware, getFirebaseUser);

export default router;
