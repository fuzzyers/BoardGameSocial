import jwt from "jsonwebtoken"
import { verifyToken } from "../utils/jwt.js"

export const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader){
        return res.status(401).json({
            message: "No Token Provided"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = verifyToken(token)
        req.user = decoded

        next()
    } catch (error){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}