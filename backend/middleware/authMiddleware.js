import jwt from "jsonwebtoken"

export const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader){
        return res.status(401).json({
            message: "No Token Provided"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded

        next()
    } catch (error){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}