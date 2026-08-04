import pool from "../db/db.js"

export const createMessageBoard = async (client, groupId) => {
    const createMessageGroup = await client.query(
        `
        INSERT INTO group_chats(group_id) VALUES($1)
        `,[groupId]
    )
}

export const createMessage = async (chatId, userId, message) => {
    const query = `
        INSERT INTO messages
            (chat_id, user_id, message)
        VALUES
            ($1, $2, $3)
        RETURNING *
    `;

    const result = await pool.query(query, [
        chatId,
        userId,
        message
    ]);

    return result.rows[0];
};