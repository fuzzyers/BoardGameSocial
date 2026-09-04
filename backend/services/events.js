import pool from "../db/db.js";

export const createEventQuery = async (group_id, name, description, location, event_date) => {
    const result = await pool.query(
        `
        INSERT INTO events (
            group_id,
            name,
            description,
            location,
            event_date
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [group_id, name, description, location, event_date]
    );

    return result.rows[0];
};

export const getEventsQuery = async () => {
    const result = await pool.query(
        `
        SELECT
            e.*,
            COALESCE(
                json_agg(
                    json_build_object(
                        'id', p.id,
                        'question', p.question,
                        'created_at', p.created_at
                    )
                ) FILTER (WHERE p.id IS NOT NULL),
                '[]'
            ) AS polls
        FROM events e
        LEFT JOIN polls p ON p.event_id = e.id
        GROUP BY e.id
        ORDER BY e.id;
        `
    );

    return result.rows;
};

export const addGameToEventQuery = async (event_id, game_id) => {
    const result = await pool.query(
        `
        INSERT INTO event_games (
            event_id,
            game_id
        )
        VALUES ($1, $2)
        RETURNING *
        `,
        [event_id, game_id]
    );
    return result;
};

export const getEventWithGamesQuery = async (event_id) => {
    const result = await pool.query(
        `
        SELECT 
            E.id,
            E.group_id,
            E.name,
            E.description,
            E.location,
            E.event_date,

            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'id', G.id,
                            'title', G.title,
                            'bgg_id', G.bgg_id,
                            'year_published', G.year_published,
                            'min_players', G.min_players,
                            'max_players', G.max_players,
                            'min_play_time', G.min_play_time,
                            'max_play_time', G.max_play_time,
                            'age', G.min_age,
                            'image', G.primary_image_url
                        )
                    )
                    FROM event_games EG
                    JOIN games G
                        ON G.id = EG.game_id
                    WHERE EG.event_id = E.id
                ),
                '[]'
            ) AS games,

            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'id', P.id,
                            'question', P.question,
                            'multiple_choice', P.multiple_choice,
                            'anonymous', P.anonymous,
                            'expires_at', P.expires_at,
                            'closed_at', P.closed_at,
                            'created_at', P.created_at,
                            'created_by', P.created_by,

                            'total_votes', (
                                SELECT COUNT(*)
                                FROM poll_votes PV
                                WHERE PV.poll_id = P.id
                            ),

                            'options', COALESCE(
                                (
                                    SELECT json_agg(
                                        json_build_object(
                                            'id', PO.id,
                                            'game_id', PO.game_id,
                                            'title', G2.title,
                                            'bgg_id', G2.bgg_id,
                                            'image', G2.primary_image_url,

                                            'votes', (
                                                SELECT COUNT(*)
                                                FROM poll_votes PV2
                                                WHERE PV2.option_id = PO.id
                                            )
                                        )
                                    )
                                    FROM poll_options PO
                                    JOIN games G2
                                        ON G2.id = PO.game_id
                                    WHERE PO.poll_id = P.id
                                ),
                                '[]'
                            )
                        )
                    )
                    FROM polls P
                    WHERE P.event_id = E.id
                ),
                '[]'
            ) AS polls

        FROM events E
        WHERE E.id = $1;
        `,
        [event_id]
    );

    return result.rows[0];
};

export const deleteEventByIdQuery = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM events
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
};
