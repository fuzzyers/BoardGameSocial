import pool from "../db/db.js";
import { deleteTop3Game, getProfile, getTop3Games, insertTop3Game, updateBio } from "../services/profile.js";

export const getMyProfile = async (req, res) => {
    try {
        const user_id = req.user.id;

        const response = await getProfile(user_id);

        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
};

export const getProfileByID = async (req, res) => {
    try {
        const user_id = req.params.id;

        const response = await getProfile(user_id);

        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateProfileBio = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { bio } = req.body;

        const response = await updateBio(user_id, bio);

        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateTop3Games = async (req, res) => {
    const client = await pool.connect();

    try {
        const user_id = req.user.id;
        const { gameId, position } = req.body;

        await client.query("BEGIN");

        // Get the user's current top 3
        const result = await client.query(
            `
            SELECT
                position,
                game_id
            FROM user_top_games
            WHERE user_id = $1
            ORDER BY position;
            `,
            [user_id]
        );

        const top3Games = result.rows;

        // Remove whatever game is currently in this position
        const existingPosition = top3Games.find(
            (game) => game.position === position
        );

        if (existingPosition) {
            await client.query(
                `
                DELETE FROM user_top_games
                WHERE user_id = $1
                AND position = $2;
                `,
                [user_id, position]
            );
        }

        const existingGame = top3Games.find(
            (game) => game.game_id === gameId
        );

        if (
            existingGame &&
            existingGame.position !== position
        ) {
            await client.query(
                `
                DELETE FROM user_top_games
                WHERE user_id = $1
                AND position = $2;
                `,
                [user_id, existingGame.position]
            );
        }

        await client.query(
            `
            INSERT INTO user_top_games (
                user_id,
                game_id,
                position
            )
            VALUES ($1, $2, $3);
            `,
            [user_id, gameId, position]
        );

        await client.query("COMMIT");

        res.status(200).json({
            message: "Top 3 games updated successfully",
        });
    } catch (error) {
        await client.query("ROLLBACK");

        console.error(error);

        res.status(500).json({
            message: "Failed to update Top 3 games",
        });
    } finally {
        client.release();
    }
};