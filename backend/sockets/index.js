import { socketAuthentication } from '../middleware/socketAuthMiddleware.js';
import registerChatSocket from './chatSocket.js';

const registerSockets = (io) => {
  io.use(socketAuthentication);

    io.on("connection", (socket) => {
        console.log(socket.id);

        registerChatSocket(io, socket);
    });
}

export default registerSockets;