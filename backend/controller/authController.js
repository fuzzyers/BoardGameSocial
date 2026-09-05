import pool from "../db/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
    const { email, name, username, password, confirmPassword, role_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hashSync(password, 10);

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const result = await pool.query(
            "INSERT INTO users (email, name, username, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [email, name, username, hashedPassword, role_id]
        );

        const token = generateToken(result.rows[0]);
        res.setHeader("Authorization", `Bearer ${token}`);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        const match = await bcrypt.compare(password, result.rows[0].password);

        if (!match) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(result.rows[0]);
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error });
    }
};

export const getFirebaseUser = async (req, res) => {
    const firebaseUid = req.firebaseUser.uid;

    try {
        const result = await pool.query("SELECT * FROM users WHERE firebase_uid = $1", [firebaseUid]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Get Firebase user error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const createFirebaseUser = async (req, res) => {
    const { username } = req.body;

    const firebaseUid = req.firebaseUser.uid;
    const email = req.firebaseUser.email;
    const name = req.firebaseUser.name;

    try {
        const result = await pool.query(
            `INSERT INTO users
                (firebase_uid, email, name, username, role_id)
             VALUES
                ($1, $2, $3, $4, $5)
             RETURNING *`,
            [firebaseUid, email, name, username, 1]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Create Firebase user error:", error);

        if (error.code === "23505") {
            return res.status(409).json({
                error: "Username already exists",
            });
        }

        return res.status(500).json({
            error: "Internal server error",
        });
    }
};
