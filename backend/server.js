import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import registerSockets from "./sockets/index.js";

dotenv.config();

const port = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.set("io", io);

registerSockets(io);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
