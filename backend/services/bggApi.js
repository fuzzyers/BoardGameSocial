import axios from "axios";

const bggToken = process.env.BGG_API_TOKEN;

if (!bggToken) {
    throw new Error("BGG API token is not defined.");
}

export const bggApi = axios.create({
    baseURL: "https://boardgamegeek.com/xmlapi2",
    headers: {
        Authorization: `Bearer ${bggToken}`,
    },
});