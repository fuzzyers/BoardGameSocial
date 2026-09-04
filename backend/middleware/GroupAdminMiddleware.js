import pool from "../db/db.js";

export const requireGroupAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const groupId = req.params.group_id || req.body.group_id;

        if (!groupId) {
            return res.status(400).json({
                message: "Group ID is required",
            });
        }

        const result = await pool.query(
            `
            SELECT GR.name
            FROM group_members GM
            JOIN group_roles GR
                ON GR.id = GM.role_id
            WHERE GM.group_id = $1
              AND GM.user_id = $2
              AND GR.name IN ('owner', 'admin')
            `,
            [groupId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(403).json({
                message: "You do not have permission to perform this action",
            });
        }

        req.groupRole = result.rows[0].name;

        next();
    } catch (error) {
        console.error("Group permission check failed:", error);

        return res.status(500).json({
            message: "Failed to verify group permissions",
        });
    }
};
