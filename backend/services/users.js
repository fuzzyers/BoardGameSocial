import pool from "../db/db.js";

export const searchUsersByName = async (name, groupId) => {
    const result = await pool.query(
        `
        SELECT 
        u.id,
        u.name,
        u.username
        FROM users u
        WHERE LOWER(u.username) LIKE LOWER($1 || '%')
        AND NOT EXISTS (
            SELECT 1
            FROM group_members gm
            WHERE gm.user_id = u.id
            AND gm.group_id = $2
        )
        ORDER BY u.name
        LIMIT 5;
        `,
        [name, groupId]
    );
    return result.rows;
};