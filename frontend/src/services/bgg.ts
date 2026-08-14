import { api } from "./api";

export type BGGSearchResult = {
    bgg_id: string;
    title: string;
    year_published: string | null;
};

export const searchBGGGame = async (search: string) => {
    const response = await api.get(`/bgg/search/${search}`);

    return response.data.results;
};

export const searchBGGGameByID = async (id: string) => {
    const response = await api.get(`/bgg/searchById/${id}`);

    return response.data.results;
};
