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
