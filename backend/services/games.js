import pool from "../db/db.js";

// =======================
// CREATE GAME
// =======================

export const createGame = async (game, submitted_by) => {
    const result = await pool.query(
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
            average_rating,
            avg_weight,
            submitted_by,
            review_status
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
            $10,
            $11,
            $12,
            'imported'
        )
        ON CONFLICT (bgg_id)
        DO NOTHING
        RETURNING *;
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
            game.avg_rating,
            game.avg_weight,
            submitted_by,
        ]
    );

    // Game already exists
    if (result.rows.length === 0) {
        const existing = await pool.query(
            `
            SELECT *
            FROM games
            WHERE bgg_id = $1
            `,
            [game.bgg_id]
        );

        return existing.rows[0];
    }

    return result.rows[0];
};

// =======================
// GET ALL GAMES
// =======================

export const getGames = async () => {
    const result = await pool.query(`
        SELECT
            g.*,
            COALESCE(
                json_agg(
                    json_build_object(
                        'id', e.id,
                        'title', e.title,
                        'description', e.description,
                        'bgg_id', e.bgg_id,
                        'year_published', e.year_published,
                        'min_players', e.min_players,
                        'max_players', e.max_players,
                        'min_play_time', e.min_play_time,
                        'max_play_time', e.max_play_time,
                        'min_age', e.min_age,
                        'avgerage_rating', e.average_rating,
                        'avg_weight', e.avg_weight,
                        'primary_image_url', e.primary_image_url
                    )
                ) FILTER (WHERE e.id IS NOT NULL),
                '[]'
            ) AS expansions
        FROM games g

        LEFT JOIN game_expansions ge
            ON ge.base_game_id = g.id

        LEFT JOIN games e
            ON e.id = ge.expansion_id

        WHERE NOT EXISTS (
            SELECT 1
            FROM game_expansions expansion_check
            WHERE expansion_check.expansion_id = g.id
        )

        GROUP BY g.id
        ORDER BY g.title;
    `);

    return result.rows;
};
// =======================
// GET GAME BY ID
// =======================

export const getGameById = async (id) => {
    const result = await pool.query(
        `
        SELECT
            g.*,
            COALESCE(
                json_agg(
                    json_build_object(
                        'id', e.id,
                        'title', e.title,
                        'description', e.description,
                        'bgg_id', e.bgg_id,
                        'year_published', e.year_published,
                        'min_players', e.min_players,
                        'max_players', e.max_players,
                        'min_play_time', e.min_play_time,
                        'max_play_time', e.max_play_time,
                        'min_age', e.min_age,
                        'average_rating', e.average_rating,
                        'avg_weight', e.avg_weight,
                        'primary_image_url', e.primary_image_url
                    )
                ) FILTER (WHERE e.id IS NOT NULL),
                '[]'
            ) AS expansions

        FROM games g

        LEFT JOIN game_expansions ge
            ON ge.base_game_id = g.id

        LEFT JOIN games e
            ON e.id = ge.expansion_id

        WHERE g.id = $1

        GROUP BY g.id;
        `,
        [id]
    );

    return result.rows[0];
};

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
        [data.title, data.description, data.min_players, data.max_players, data.min_play_time, data.max_play_time, id]
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
                average_rating,
                avg_weight,
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
                $10,
                $11,
                $12
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
                game.avg_rating,
                game.avg_weight,
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
        SELECT
            g.*,
            COALESCE(
                json_agg(
                    json_build_object(
                        'id', e.id,
                        'title', e.title,
                        'description', e.description,
                        'bgg_id', e.bgg_id,
                        'year_published', e.year_published,
                        'min_players', e.min_players,
                        'max_players', e.max_players,
                        'min_play_time', e.min_play_time,
                        'max_play_time', e.max_play_time,
                        'min_age', e.min_age,
                        'primary_image_url', e.primary_image_url
                    )
                ) FILTER (WHERE e.id IS NOT NULL),
                '[]'
            ) AS expansions
        FROM games g

        LEFT JOIN game_expansions ge
            ON ge.base_game_id = g.id

        LEFT JOIN games e
            ON e.id = ge.expansion_id

        WHERE
            EXISTS (
                SELECT 1
                FROM user_games ug
                WHERE ug.user_id = $1
                AND ug.game_id = g.id
            )
            OR EXISTS (
                SELECT 1
                FROM user_games ug
                JOIN game_expansions ge2
                    ON ge2.expansion_id = ug.game_id
                WHERE ug.user_id = $1
                AND ge2.base_game_id = g.id
            )

        GROUP BY g.id
        ORDER BY g.title;
        `,
        [userId]
    );

    return result.rows;
};
