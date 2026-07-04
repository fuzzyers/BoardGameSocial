import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './route/authRoute.js';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});