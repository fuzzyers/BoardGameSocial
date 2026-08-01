import { createMessage } from "../services/messages.js"

export const sendMessage = async (req, res) => {
    const { chatId, message } = req.body
    const userId = req.user.id

    try {
        const messageData = await createMessage(chatId, message, userId)

        res.status(200).json({message: "Sent", data: messageData})
    } catch (error) {
        console.log(error)

        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message
        })
    }
}