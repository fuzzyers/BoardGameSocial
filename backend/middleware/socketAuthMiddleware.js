import { verifyToken } from "../utils/jwt.js";

export const socketAuthentication = (socket, next) => {
    const token = socket.handshake.auth.token;
    console.log("Socket handshake auth token:", token);
    if (!token) {
        return next(new Error("No token provided"));
    }

    const decodedUser = verifyToken(token);

    if (!decodedUser) {
        return next(new Error("Invalid token"));
    }

    socket.user = decodedUser;

    next();
};