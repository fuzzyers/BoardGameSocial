import { io, Socket } from "socket.io-client";
import { getToken } from "./auth";


const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
    throw new Error("API URL is not defined in the environment variables.");
}

let socket: Socket | null = null;

export const connectSocket = async () => {
    const token = await getToken();

    console.log("Socket token:", token);

    socket = io(apiUrl, {
        auth: {
            token
        }
    });

    return socket;
};

export const getSocket = () => {
    // if (!socket) {
    //     throw new Error("Socket has not been initialized");
    // }

    return socket;
};