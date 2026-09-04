import { verifyToken } from "../utils/jwt.js";

export const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "No Token Provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = await verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
        });
    }
};
