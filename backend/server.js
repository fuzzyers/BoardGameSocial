import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './route/authRoute.js';
import gameRoutes from './route/gameRoute.js';
import groupRoutes from './route/groupRoute.js'

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
  exposedHeaders: ['Authorization']
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/games", gameRoutes);
app.use("/groups", groupRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
