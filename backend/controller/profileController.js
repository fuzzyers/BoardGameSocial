import { getProfile, updateBio } from "../services/profile.js";

export const getMyProfile = async (req, res) => {
    try {
        const user_id = req.user.id;

        const response = await getProfile(user_id);

        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getProfileByID = async (req, res) => {
    try {
        const user_id = req.params.id;

        const response = await getProfile(user_id);

        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateProfileBio = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { bio } = req.body;

        const response = await updateBio(user_id, bio);

        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
