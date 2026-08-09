import { searchUsersByName } from "../services/users.js";

export const getUserByName = async (req, res) => {
    const { name, groupId } = req.query;

    try {
        const users = await searchUsersByName(name, groupId);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching users by name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
