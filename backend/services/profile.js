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
            COUNT(DISTINCT EP.event_id) AS events_count,

            COALESCE(
                (
                    SELECT JSON_AGG(
                        JSONB_BUILD_OBJECT(
                            'position', UTG.position,
                            'id', G.id,
                            'title', G.title,
                            'primary_image_url', G.primary_image_url
                        )
                        ORDER BY UTG.position
                    )
                    FROM user_top_games UTG
                    JOIN games G
                        ON UTG.game_id = G.id
                    WHERE UTG.user_id = U.id
                ),
                '[]'
            ) AS top3_games

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
            R.name,
            U.description;
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

export const getTop3Games = async (user_id) => {
        const result = await pool.query(
        `
        SELECT * FROM user_top_games
        WHERE user_id = $1
        ORDER BY position ASC;
        `,
        [user_id]
    );

    return result.rows
}

export const deleteTop3Game = async (user_id, position) => {
    await pool.query(
        `
        DELETE FROM user_top_games
        WHERE user_id = $1
        AND position = $2;
        `,
        [user_id, position]
    );
};

export const insertTop3Game = async (user_id, gameId, position) => {
    const response = await pool.query(
        `
        INSERT INTO user_top_games (user_id, game_id, position)
        VALUES ($1, $2, $3);
        `,
        [user_id, gameId, position]
    );

    return response.rows
};