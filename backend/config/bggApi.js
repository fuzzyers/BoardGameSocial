import axios from "axios";
import PQueue from "p-queue";

const bggToken = process.env.BGG_API_TOKEN;

if (!bggToken) {
    throw new Error("BGG API token is not defined.");
}

const bggQueue = new PQueue({
    concurrency: 1,
    intervalCap: 1,
    interval: 5000,
});

export const axiosInstance = axios.create({
    baseURL: "https://boardgamegeek.com/xmlapi2",
    headers: {
        Authorization: `Bearer ${bggToken}`,
    },
});

export const bggApi = {
    get: (url, config) => bggQueue.add(() => axiosInstance.get(url, config)),
};
