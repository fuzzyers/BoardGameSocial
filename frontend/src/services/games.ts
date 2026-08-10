import { api } from "./api";
import { getToken } from "./auth";

export const getAllGames = async () => {
    const response = await api.get("/games/");

    return response.data;
};

export const getAllCollectionGames = async () => {
    try {
        const token = await getToken();
        const response = await api.get("/games/collection/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const createGame = async (game: any) => {
    try {
        const token = await getToken();

        const response = await api.post(
            "/games",
            {
                game,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (game.add_to_collection === true) {
            await api.put(
                "/games/collection/me",
                {
                    game_id: response.data.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        }

        return response;
    } catch (error) {
        console.error("Failed to create game:", error);
        throw error;
    }
};

export const addToCollection = async (game_id: number) => {
    try {
        const token = await getToken()
        const response = await api.put("/games/collection/me",
                {
                    game_id: game_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        console.log("RESPOSNE:", response)
        return response
    } catch (error) {
        console.log("Failed to add game to collection:", error);
        throw error;
    }
}