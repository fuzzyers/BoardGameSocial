import { io, Socket } from "socket.io-client";
import { getToken } from "./auth";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
    throw new Error("API URL is not defined in the environment variables.");
}

let socket: Socket | null = null;

export const connectSocket = async () => {
    if (socket?.connected) {
        return socket;
    }

    const token = await getToken();

    socket = io(apiUrl, {
        auth: {
            token,
        },
    });

    await new Promise<void>((resolve) => {
        socket?.on("connect", () => {
            resolve();
        });
    });

    return socket;
};

export const getSocket = () => {
    // if (!socket) {
    //     throw new Error("Socket has not been initialized");
    // }

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
