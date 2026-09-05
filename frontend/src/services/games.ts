import { api } from "./api";
import { Game } from "@/types/apiDataTypes";

export const getAllGames = async () => {
    const response = await api.get("/games/");

    return response.data;
};

export const getAllCollectionGames = async () => {
    try {
        const response = await api.get("/games/collection/me");

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const createGame = async (game: any) => {
    try {
        const response = await api.post("/games", { game });

        // if (game.add_to_collection === true) {
        //     await api.put("/games/collection/me", { game_id: response.data.id });
        // }

        return response;
    } catch (error) {
        console.error("Failed to create game:", error);
        throw error;
    }
};

export const addToCollection = async (game_id: number) => {
    try {
        const response = await api.put("/games/collection/me", { game_id: game_id });

        return response;
    } catch (error) {
        console.log("Failed to add game to collection: ", error);
        throw error;
    }
};

export const removeFromCollection = async (game_id: number) => {
    try {
        const response = await api.put("/games/collection/me/remove", { game_id: game_id });

        return response;
    } catch (error) {
        console.log("Failed to remove game from collection: ", error);
        throw error;
    }
};

export const addExpansionToGame = async (game_id: number, expansion: Game) => {
    try {
        const response = await api.post("/games/expansion", { game_id, expansion });

        return response;
    } catch (error) {
        console.error("Failed to add expansion to game:", error);
        throw error;
    }
};

export const getGameById = async (gameid: number) => {
    try {
        const response = await api.get(`/games/${gameid}`);

        return response.data;
    } catch (error) {
        console.error("Failed to fetch game by ID:", error);
        throw error;
    }
};
