import pool from "../db/db.js";

export const registerGame = async (req, res) => {
    const { title, description, minPlayers, maxPlayers, minPlayTime, maxPlayTime } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO games (title, description, min_players, max_players, min_play_time, max_play_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, minPlayers, maxPlayers, minPlayTime, maxPlayTime]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', errorDetails: error });
    }
};

export const getGames = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM games');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', errorDetails: error });
    }
};

export const getGameById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', errorDetails: error });
    }
};

export const updateGame = async (req, res) => {
    const { id } = req.params;
    const { title, description, minPlayers, maxPlayers, minPlayTime, maxPlayTime } = req.body;
    try {
        const result = await pool.query(
            'UPDATE games SET title = $1, description = $2, min_players = $3, max_players = $4, min_play_time = $5, max_play_time = $6 WHERE id = $7 RETURNING *',
            [title, description, minPlayers, maxPlayers, minPlayTime, maxPlayTime, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', errorDetails: error });
    }
};

export const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', errorDetails: error });
    }
};

