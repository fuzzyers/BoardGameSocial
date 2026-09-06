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
        RETURNING id, poll_id, game_id, created_at;
        `,
        [pollId, gameId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    const optionResult = await pool.query(
        `
        SELECT
            po.id,
            po.poll_id,
            po.game_id,
            po.created_at,
            g.title,
            0 AS votes
        FROM poll_options po
        JOIN games g
            ON g.id = po.game_id
        WHERE po.id = $1;
        `,
        [result.rows[0].id]
    );

    return optionResult.rows[0];
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
