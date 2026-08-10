import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const payload = { id: user.id, email: user.email, name: user.name, role: user.role_id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_EXPIRES_IN || "1h" };
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token) => {
    try {
        const secret = process.env.JWT_SECRET;
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("verifyToken error:", error);

        return null;
    }
};
