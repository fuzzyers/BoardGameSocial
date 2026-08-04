import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './route/authRoute.js';
import gameRoutes from './route/gameRoute.js';
import groupRoutes from './route/groupRoute.js'
import messageRouting from "./route/messageRoute.js"
import userRoutes from "./route/userRoute.js"
import {createServer} from 'http';
import { Server } from 'socket.io';
import { socketAuthentication } from './middleware/socketAuthMiddleware.js';
import { createMessage } from './services/messages.js';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.use(socketAuthentication);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("send_message", async (data) => {
      try {
          const savedMessage = await createMessage(
              data.chatId,
              socket.user.id,
              data.message
          );

          io.to(`chat-${data.chatId}`).emit("new_message", savedMessage);

      } catch(error) {
          console.error(error);
      }
  });


  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

app.use(cors({
  exposedHeaders: ['Authorization']
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/games", gameRoutes);
app.use("/groups", groupRoutes)
app.use("/messaging", messageRouting)
app.use("/users", userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
