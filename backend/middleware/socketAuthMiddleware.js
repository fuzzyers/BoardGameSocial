import { firebaseAuth } from "../config/firebase.js";
import pool from "../db/db.js";

export const socketAuthentication = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("No token provided"));
        }

        const decodedToken = await firebaseAuth.verifyIdToken(token);

        const result = await pool.query(
            `SELECT *
             FROM users
             WHERE firebase_uid = $1`,
            [decodedToken.uid]
        );

        if (result.rows.length === 0) {
            return next(new Error("User account not found"));
        }

        socket.user = result.rows[0];

        socket.firebaseUser = decodedToken;

        next();
    } catch (error) {
        console.error("Socket authentication error:", error);

        return next(new Error("Invalid or expired authentication token"));
    }
};
