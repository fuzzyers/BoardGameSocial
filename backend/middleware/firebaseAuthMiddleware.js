import { firebaseAuth } from "../config/firebase.js";
import pool from "../db/db.js";

export const firebaseAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const username = req.body?.username;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing",
            });
        }

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization header",
            });
        }
        // Verify the Firebase ID token
        const decodedToken = await firebaseAuth.verifyIdToken(token);

        // Find the corresponding PostgreSQL user
        const result = await pool.query(
            `SELECT *
             FROM users
             WHERE firebase_uid = $1`,
            [decodedToken.uid]
        );

        if (result.rows.length === 0 && !username) {
            return res.status(401).json({
                message: "User account not found",
            });
        }

        // Attach both if you want access to Firebase information as well
        req.firebaseUser = decodedToken;
        req.user = result.rows[0];

        next();
    } catch (error) {
        console.error("Firebase authentication error:", error);

        return res.status(401).json({
            message: "Invalid or expired authentication token",
        });
    }
};
