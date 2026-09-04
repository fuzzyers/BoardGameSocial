import pool from "../db/db.js";

export const getProfile = async (user_id) => {
    const result = await pool.query(
        `
        SELECT 
            U.id,
            U.email,
            U.username,
            U.name,
            R.name AS role,
            U.description,
            COUNT(DISTINCT UG.game_id) AS game_count,
            COUNT(DISTINCT GM.group_id) AS group_count,
            COUNT(DISTINCT EP.event_id) AS events_count
        FROM users U
        JOIN roles R
            ON U.role_id = R.id
        LEFT JOIN user_games UG
            ON U.id = UG.user_id
        LEFT JOIN group_members GM
            ON U.id = GM.user_id
        LEFT JOIN event_players EP
            ON U.id = EP.user_id 
        WHERE U.id = $1
        GROUP BY
            U.id,
            U.email,
            U.username,
            U.name,
            R.name;
        `,
        [user_id]
    );

    return result.rows[0];
};

export const updateBio = async (user_id, bio) => {
    const result = await pool.query(
        `
        UPDATE users
        SET description = $1
        WHERE id = $2
        RETURNING *;
        `,
        [bio, user_id]
    );

    return result.rows[0];
};