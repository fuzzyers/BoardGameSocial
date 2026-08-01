import { api } from "./api";
import { getToken } from "./auth";
// Send Messages
export const sendMessage = async (chatId: number, message: string) => {
    try {
        const token = await getToken();
        const response = await api.post(`/messaging/create`,{
            chatId: chatId,
            message: message,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log("Message sent:", response.data)
        return response.data
    } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
    }
}

// Get Messages
export const getGroupMessages = async (groupId: number) => {
    try {
        const response = await api.get(`/groups/${groupId}`);

        return response.data
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}