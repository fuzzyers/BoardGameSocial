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
        SELECT * FROM events;
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
    )
    return result
}

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
            json_agg(
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
            ) as games
        FROM events E
        LEFT JOIN event_games EG
            ON EG.event_id = E.id
        LEFT JOIN games G
            ON G.id = EG.game_id
        WHERE E.id = $1
        GROUP BY
            E.id,
            E.group_id,
            E.name,
            E.description,
            E.location,
            E.event_date;
        `,[event_id]
    )

    return result
}