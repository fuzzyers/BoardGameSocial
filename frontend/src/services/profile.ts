import { api } from "./api";

export const getMyProfile = async () => {
    const response = await api.get("/profile/myProfile");

    return response.data.data;
};

export const updateProfileBio = async (newBio: string) => {
    const response = await api.put("/profile/myProfile/updateBio", { bio: newBio });

    return response.data.data;
};
