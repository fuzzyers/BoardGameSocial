import pool from "../db/db.js";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/jwt.js";

export const registerUser = async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;
    console.log("Registering user with email:", email, "and name:", name);
    try {
        const hashedPassword = await bcrypt.hashSync(password, 10);

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const result = await pool.query(
            'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *',
            [email, name, hashedPassword]
        );

        const token = generateToken(result.rows[0]); 
        res.setHeader('Authorization', `Bearer ${token}`); 
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Internal server error', errorDetails: error });
    }   
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const match = await bcrypt.compare(password, result.rows[0].password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(result.rows[0]); 
        res.setHeader('Authorization', `Bearer ${token}`); 
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', errorDetails: error });
    }
};