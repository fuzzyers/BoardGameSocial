import pool from "../db/db.js"

export const createMessageBoard = async (client, groupId) => {
    const createMessageGroup = await client.query(
        `
        INSERT INTO group_chats(group_id) VALUES($1)
        `,[groupId]
    )
}

export const createMessage = async (chatId, message, userId) => {
    const messageCreate = await pool.query(
        `
        INSERT INTO messages(chat_id, user_id, message) VALUES ($1, $2, $3)
        `, [chatId, userId, message]
    )
}