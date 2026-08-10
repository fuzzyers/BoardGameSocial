import { createMessage } from "../services/messages.js";

const registerChatSocket = (io, socket) => {
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
    });

    socket.on("send_message", async (data) => {
        try {
            const savedMessage = await create8Message(data.chatId, socket.user.id, data.message);

            io.to(`chat-${data.chatId}`).emit("new_message", savedMessage);
        } catch (error) {
            console.error(error);
        }
    });
};

export default registerChatSocket;
