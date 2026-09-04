import pool from "../db/db.js";

export const createPollQuery = async (event_id, created_by, question, multiple_choice, anonymous, expires_at, closed_at) => {
    const result = await pool.query(
        `
        INSERT INTO polls (
            event_id,
            created_by,
            question,
            multiple_choice,
            anonymous,
            expires_at,
            closed_at
        )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        `,
        [event_id, created_by, question, multiple_choice, anonymous, expires_at, closed_at]
    );

    return result;
};

export const insertVoteQuery = async (userId, pollOptionId) => {
    const result = await pool.query(
        `
        INSERT INTO poll_votes (
            user_id,
            poll_option_id
        )
        VALUES ($1, $2)
        ON CONFLICT (poll_option_id, user_id) DO NOTHING
        RETURNING *;
        `,
        [userId, pollOptionId]
    );

    return result.rows[0];
};

export const getPollByIdQuery = async (pollId) => {
    const result = await pool.query(
        `
        SELECT
            p.*,
            COALESCE(
                json_agg(
                    json_build_object(
                        'id', po.id,
                        'game_id', po.game_id,
                        'created_at', po.created_at
                    )
                ) FILTER (WHERE po.id IS NOT NULL),
                '[]'
            ) AS options
        FROM polls p
        LEFT JOIN poll_options po
            ON po.poll_id = p.id
        WHERE p.id = $1
        GROUP BY p.id;
        `,
        [pollId]
    );

    return result.rows[0];
};

export const addPollOptionQuery = async (pollId, gameId) => {
    const result = await pool.query(
        `
        INSERT INTO poll_options (
            poll_id,
            game_id
        )
        VALUES ($1, $2)
        ON CONFLICT (poll_id, game_id)
        DO NOTHING
        RETURNING *;
        `,
        [pollId, gameId]
    );

    console.log(result.rows[0]);
    return result.rows[0];
};

export const createPollVote = async (poll_id, option_id, user_id) => {
    const result = await pool.query(
        `
        INSERT INTO poll_votes (
            poll_id,
            option_id,
            user_id
        )
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [poll_id, option_id, user_id]
    );

    return result.rows[0];
};
