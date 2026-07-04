import pool from "../db/db.js";

export const registerUser = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *',
            [email, name, password]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', errorDetails: error });
    }   
};