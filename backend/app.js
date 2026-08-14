import express from "express";
import cors from "cors";
import authRoutes from "./route/authRoute.js";
import gameRoutes from "./route/gameRoute.js";
import groupRoutes from "./route/groupRoute.js";
import messageRouting from "./route/messageRoute.js";
import userRoutes from "./route/userRoute.js";
import eventRoutes from "./route/eventRoute.js";
import bggRoutes from "./route/bggRoute.js";

const app = express();

app.use(
    cors({
        exposedHeaders: ["Authorization"],
    })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/games", gameRoutes);
app.use("/groups", groupRoutes);
app.use("/messaging", messageRouting);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/bgg", bggRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

export default app;
