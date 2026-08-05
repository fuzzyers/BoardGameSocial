import pool from "../db/db.js"

export const createMessageBoard = async (groupId, client=pool) => {
    const createMessageGroup = await client.query(
        `
        INSERT INTO group_chats(group_id) VALUES($1)
        `,[groupId]
    )
}

export const createMessage = async (chatId, userId, message, client=pool) => {
    const insertQuery = `
        INSERT INTO messages (
            chat_id,
            user_id,
            message
        )
        VALUES ($1, $2, $3)
        RETURNING id;
    `;

    const insertResult = await client.query(insertQuery, [
        chatId,
        userId,
        message
    ]);

    const messageId = insertResult.rows[0].id;

    const getMessageQuery = `
        SELECT
            m.id,
            m.message,
            m.user_id,
            m.created_at,
            u.name AS sender_name
        FROM messages m
        JOIN users u
            ON u.id = m.user_id
        WHERE m.id = $1;
    `;

    const messageResult = await client.query(getMessageQuery, [
        messageId
    ]);

    return messageResult.rows[0];
};