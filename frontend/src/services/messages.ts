import { api } from "./api";
// Send Messages
export const sendMessage = async (chatId: number, message: string) => {
    try {
        const response = await api.post(`/messaging/create`,
            {
                chatId: chatId,
                message: message,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
    }
};

// Get Messages
export const getGroupMessages = async (groupId: number) => {
    try {
        const response = await api.get(`/groups/${groupId}`);

        return response.data;
    } catch (error) {

        throw error;
    }
};
