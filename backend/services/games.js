import pool from "../db/db.js";

// =======================
// CREATE GAME
// =======================

export const createGame = async (
    title,
    description,
    bgg_id,
    year_published,
    min_players,
    max_players,
    min_play_time,
    max_play_time,
    min_age,
    submitted_by
) => {
    const result = await pool.query(
        `
        INSERT INTO games
        (
            title,
            description,
            bgg_id,
            year_published,
            min_players,
            max_players,
            min_play_time,
            max_play_time,
            min_age,
            submitted_by
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *
        `,
        [
            title,
            description,
            bgg_id,
            year_published,
            min_players,
            max_players,
            min_play_time,
            max_play_time,
            min_age,
            submitted_by,
        ]
    );

    return result.rows[0];
};

// =======================
// GET ALL GAMES
// =======================

export const getGames = async () => {
    const result = await pool.query(
        `
        SELECT *
        FROM games
        ORDER BY title;
        `
    );

    return result.rows;
};

// =======================
// GET GAME BY ID
// =======================

export const getGameById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM games
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

// =======================
// SEARCH
// =======================

export const searchGames = async (query) => {
    const result = await pool.query(
        `
        SELECT *
        FROM games
        WHERE LOWER(title)
        LIKE LOWER($1 || '%')
        ORDER BY title
        LIMIT 20
        `,
        [query]
    );

    return result.rows;
};

// =======================
// UPDATE GAME
// =======================

export const updateGame = async (id, data) => {
    const result = await pool.query(
        `
        UPDATE games
        SET
            title=$1,
            description=$2,
            min_players=$3,
            max_players=$4,
            min_play_time=$5,
            max_play_time=$6,
            updated_at=CURRENT_TIMESTAMP
        WHERE id=$7

        RETURNING *
        `,
        [
            data.title,
            data.description,
            data.min_players,
            data.max_players,
            data.min_play_time,
            data.max_play_time,
            id,
        ]
    );

    return result.rows[0];
};

// =======================
// DELETE GAME
// =======================

export const deleteGame = async (id) => {
    await pool.query(
        `
        DELETE FROM games
        WHERE id=$1
        `,
        [id]
    );
};

// =======================
// REVIEW SYSTEM
// =======================

export const approveGame = async (id, userId) => {
    const result = await pool.query(
        `
        UPDATE games
        SET
            review_status='approved',
            reviewed_by=$2,
            reviewed_at=CURRENT_TIMESTAMP
        WHERE id=$1

        RETURNING *
        `,
        [id, userId]
    );

    return result.rows[0];
};

export const rejectGame = async (id, userId) => {
    const result = await pool.query(
        `
        UPDATE games
        SET
            review_status='rejected',
            reviewed_by=$2,
            reviewed_at=CURRENT_TIMESTAMP
        WHERE id=$1

        RETURNING *
        `,
        [id, userId]
    );

    return result.rows[0];
};

// =======================
// EXPANSIONS
// =======================

export const createExpansion = async (game) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const baseGame = await client.query(
            `
            SELECT id
            FROM games
            WHERE id = $1
            `,
            [game.base_game_id]
        );

        if (baseGame.rowCount === 0) {
            throw new Error("Base game not found");
        }

        const expansionResult = await client.query(
            `
            INSERT INTO games (
                title,
                description,
                bgg_id,
                year_published,
                min_players,
                max_players,
                min_play_time,
                max_play_time,
                min_age,
                submitted_by
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10
            )
            RETURNING *
            `,
            [
                game.title,
                game.description,
                game.bgg_id,
                game.year_published,
                game.min_players,
                game.max_players,
                game.min_play_time,
                game.max_play_time,
                game.min_age,
                game.submitted_by,
            ]
        );

        const expansion = expansionResult.rows[0];

        await client.query(
            `
            INSERT INTO game_expansions (
                base_game_id,
                expansion_id
            )
            VALUES ($1, $2)
            `,
            [game.base_game_id, expansion.id]
        );

        await client.query("COMMIT");

        return expansion;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

// =======================
// COLLECTION
// =======================

export const addGameToCollection = async (userId, gameId) => {
    await pool.query(
        `
        INSERT INTO user_games
        (
            user_id,
            game_id
        )
        VALUES($1,$2)
        ON CONFLICT DO NOTHING
        `,
        [userId, gameId]
    );
};

export const removeGameFromCollection = async (userId, gameId) => {
    await pool.query(
        `
        DELETE FROM user_games
        WHERE user_id=$1
        AND game_id=$2
        `,
        [userId, gameId]
    );
};

export const getUserCollection = async (userId) => {
    const result = await pool.query(
        `
        SELECT g.*
        FROM user_games ug

        JOIN games g
        ON g.id=ug.game_id

        WHERE ug.user_id=$1

        ORDER BY g.title
        `,
        [userId]
    );

    return result.rows;
};
