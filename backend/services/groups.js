import pool from "../db/db.js";

export const create = async (client, name, description) => {
    const createGroup = await client.query(
        'INSERT INTO groups (name, description) VALUES ($1, $2) RETURNING *', 
        [name, description]
    )

    return createGroup.rows["0"]
}

export const addMemberToGroup = async (client, groupId, userId, roleId) => {
    await client.query(
        'INSERT INTO group_members(group_id, user_id, role_id) VALUES($1, $2, $3)',
        [groupId, userId, roleId]
    );

    return
};

export const getGroupWithMembers = async (client, groupId) => {
    const result = await client.query(
        `
        SELECT 
            g.id,
            g.name,
            g.description,
            g.created_at,

            json_agg(
                json_build_object(
                    'id', u.id,
                    'name', u.name,
                    'email', u.email,
                    'role', gr.name
                )
            ) AS members

        FROM groups g

        JOIN group_members gm 
            ON g.id = gm.group_id

        JOIN users u 
            ON gm.user_id = u.id

        JOIN group_roles gr
            ON gm.role_id = gr.id

        WHERE g.id = $1

        GROUP BY g.id;
        `,
        [groupId]
    );
    return result.rows["0"]
}

export const getGroupsWithUser = async (userId) => {
    const query = `
        SELECT 
            g.id,
            g.name,
            g.description,
            g.created_at,
            gc.id AS chat_id
        FROM groups g
        INNER JOIN group_members gm
            ON g.id = gm.group_id
        INNER JOIN group_chats gc
            ON g.id = gc.group_id
        WHERE gm.user_id = $1
        ORDER BY g.created_at DESC;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
}