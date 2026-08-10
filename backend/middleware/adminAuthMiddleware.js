import { authentication } from "./authMiddleware.js";

export const adminAuthentication = (req, res, next) => {
    authentication(req, res, () => {
        console.log(req.user);
        if (req.user.role !== 2) {
            return res.status(403).json({
                message: "Admin access required",
            });
        }

        next();
    });
};
