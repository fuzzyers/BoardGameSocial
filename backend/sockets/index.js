import { socketAuthentication } from '../middleware/socketAuthMiddleware.js';
import registerChatSocket from './chatSocket.js';

const registerSockets = (io) => {
  io.use(socketAuthentication);

    io.on("connection", (socket) => {

        registerChatSocket(io, socket);
    });
}

export default registerSockets;