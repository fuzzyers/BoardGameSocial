import pool from "../db/db.js";

export const eventGameResult = async (event_id, game_id) => {
    return await pool.query(
        `
        SELECT id
        FROM event_games
        WHERE event_id = $1
        AND game_id = $2
        `,
        [event_id, game_id]
    )
}

export const insertGameScores = async (eventGameId, user_id, score, placement, leaderboard_points) => {
    const result = await pool.query(
        `
        INSERT INTO game_scores (
            event_game_id,
            user_id,
            score,
            placement,
            leaderboard_points
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (event_game_id, user_id)
        DO UPDATE SET
            score = EXCLUDED.score,
            placement = EXCLUDED.placement,
            leaderboard_points = EXCLUDED.leaderboard_points
        RETURNING *
        `,
        [
            eventGameId,
            user_id,
            score,
            placement,
            leaderboard_points,
        ]
    );

    return result.rows[0]
}