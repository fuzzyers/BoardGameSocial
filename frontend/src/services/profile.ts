import { api } from "./api";

export const getMyProfile = async () => {
    const response = await api.get("/profile/myProfile");

    return response.data.data;
};

export const updateProfileBio = async (newBio: string) => {
    const response = await api.put("/profile/myProfile/updateBio", { bio: newBio });

    return response.data.data;
};

export const updateTop3 = async (gameId:number, position:number) => {
    const response = await api.put("/profile/myProfile/top3", {
        gameId: gameId,
        position: position
    })

    return response
}

export const getAnotherUserProfile = async (userId: number) => {
    try {
        const response = await api.get(`/profile/${userId}`)

        return response.data
    } catch (error) {
        
    }
}